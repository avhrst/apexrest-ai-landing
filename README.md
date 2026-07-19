# APEXREST

Public landing page for APEXREST—AI developer-agent teams built around deterministic Oracle APEX delivery.

The site is plain HTML, CSS, and JavaScript. It is designed to publish directly through GitHub Pages with no build step.

## Preview locally

```sh
python3 -m http.server 8000
```

Open <http://localhost:8000>.

## Publish

1. In the repository's **Settings → Pages**, select **GitHub Actions** as the source.
2. Configure `apex.rest` as the custom domain and verify the DNS records.
3. Push to `main`; `.github/workflows/pages.yml` deploys the static site.

The implementation story is grounded in [pi-apex](https://github.com/avhrst/pi-apex), [pi-slack-team](https://github.com/avhrst/pi-slack-team), and the [Oracle APEX 26.1 documentation](https://docs.oracle.com/en/database/oracle/apex/26.1/apxdc/introduction.html).
