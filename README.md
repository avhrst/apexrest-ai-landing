# APEXREST

Public landing page for APEXREST—a company that helps Oracle APEX customers build AI teams with Project Manager, APEX Developers, QA, and Support Agent roles, backed by compiler-checked and human-gated delivery.

The site is plain HTML, CSS, and JavaScript. It is designed to publish directly through GitHub Pages with no build step.

## Preview locally

```sh
python3 -m http.server 8000
```

Open <http://localhost:8000>.

## Languages

- English: `/` (`index.html`)
- Ukrainian: `/uk/` (`uk/index.html`)

Both pages are complete static documents with a visible EN / UA switch. There is no automatic language redirect. HTML language and `hreflang` use the standard Ukrainian code `uk`; UA is the switch's display label.

Keep the two pages aligned when content changes, including metadata, accessible labels and contact email drafts. They share `assets/css/site.css` and `assets/js/site.js`; interactive copy follows the document language. The Ukrainian page uses a Cyrillic display font and its own social preview, `assets/og-uk.png`. The Pages workflow stages both language routes and social images.

## Publish

1. In the repository's **Settings → Pages**, select **GitHub Actions** as the source.
2. Configure `apex.rest` as the custom domain and verify the DNS records.
3. Push to `main`; `.github/workflows/pages.yml` deploys the static site.

The implementation story is grounded in [pi-apex](https://github.com/avhrst/pi-apex), [pi-slack-team](https://github.com/avhrst/pi-slack-team), and the [Oracle APEX 26.1 documentation](https://docs.oracle.com/en/database/oracle/apex/26.1/apxdc/introduction.html).
