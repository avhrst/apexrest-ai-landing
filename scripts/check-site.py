#!/usr/bin/env python3
"""Static checks for the public site. Standard library only.

    python3 scripts/check-site.py             # local structure checks
    python3 scripts/check-site.py --external  # also external links and npm version

Exits non-zero and lists every failure.
"""
import json
import os
import re
import sys
import urllib.error
import urllib.request
import xml.dom.minidom

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGES = ["index.html", "uk/index.html", "404.html", "brand/social/en.html", "brand/social/uk.html"]
LANGUAGE_PAIR = ("index.html", "uk/index.html")
# These hosts reject automated requests; their links are checked by hand.
BOT_BLOCKED = ("linkedin.com", "npmjs.com")

failures = []


def read(path):
    with open(os.path.join(ROOT, path), encoding="utf-8") as handle:
        return handle.read()


def check_page(page):
    html = read(page)
    ids = re.findall(r'\sid="([^"]+)"', html)
    for duplicate in sorted({i for i in ids if ids.count(i) > 1}):
        failures.append(f"{page}: duplicate id #{duplicate}")
    for fragment in sorted(set(re.findall(r'href="#([^"]+)"', html))):
        if fragment not in ids:
            failures.append(f"{page}: fragment #{fragment} has no target")
    for value in re.findall(r'(?:href|src)="([^"]+)"', html):
        target = re.split(r"[#?]", value)[0]
        if not target or re.match(r"[a-z][a-z0-9+.-]*:", target):
            continue
        path = target.lstrip("/") if target.startswith("/") else os.path.normpath(os.path.join(os.path.dirname(page), target))
        if target.endswith("/") or path in ("", "."):
            path = os.path.join(path, "index.html")
        if not os.path.exists(os.path.join(ROOT, path)):
            failures.append(f"{page}: missing local target {target}")
    for block in re.findall(r'<script type="application/ld\+json">(.*?)</script>', html, re.S):
        try:
            json.loads(block)
        except json.JSONDecodeError as error:
            failures.append(f"{page}: invalid JSON-LD ({error})")
    return set(ids)


def software_version(page):
    match = re.search(r'"softwareVersion":\s*"([^"]+)"', read(page))
    return match.group(1) if match else None


def check_local():
    ids = {page: check_page(page) for page in PAGES}
    english, ukrainian = LANGUAGE_PAIR
    if ids[english] != ids[ukrainian]:
        failures.append(f"EN/UK id mismatch: {sorted(ids[english] ^ ids[ukrainian])}")
    if software_version(english) != software_version(ukrainian):
        failures.append("EN/UK softwareVersion mismatch")
    for stylesheet in ("assets/css/site.css", "brand/brandbook.css"):
        css = read(stylesheet)
        if css.count("{") != css.count("}"):
            failures.append(f"{stylesheet}: unbalanced braces")
    try:
        xml.dom.minidom.parseString(read("sitemap.xml"))
    except Exception as error:  # noqa: BLE001 - report any parse failure
        failures.append(f"sitemap.xml: {error}")


def fetch(url, method="GET"):
    request = urllib.request.Request(url, method=method, headers={"User-Agent": "apexrest-site-check"})
    return urllib.request.urlopen(request, timeout=20)


def check_external():
    links = set()
    for page in LANGUAGE_PAIR + ("404.html",):
        links |= set(re.findall(r'href="(https://[^"]+)"', read(page)))
    for url in sorted(links):
        if any(host in url for host in BOT_BLOCKED):
            continue
        try:
            fetch(url, "HEAD").close()
        except urllib.error.HTTPError as error:
            failures.append(f"external link {error.code}: {url}")
        except urllib.error.URLError as error:
            failures.append(f"external link unreachable ({error.reason}): {url}")
    try:
        with fetch("https://registry.npmjs.org/apexrest") as response:
            latest = json.load(response)["dist-tags"]["latest"]
        published = software_version(LANGUAGE_PAIR[0])
        if latest != published:
            failures.append(f"npm latest is {latest}, but the site shows {published}")
    except (urllib.error.URLError, KeyError, ValueError) as error:
        failures.append(f"npm registry check failed: {error}")


def main():
    check_local()
    if "--external" in sys.argv[1:]:
        check_external()
    for failure in failures:
        print(f"FAIL {failure}")
    print("OK" if not failures else f"{len(failures)} failure(s)")
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
