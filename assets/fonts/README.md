# Self-hosted APEXREST typography

Retrieved on 2026-09-12 from the official Google Fonts service and the Google Fonts repository.
Font binaries are unmodified; filenames are descriptive local aliases.

- **Manrope**: normal variable font; CSS exposes weights 400–800.
- **IBM Plex Mono**: normal static fonts in weights 400, 500 and 600.
- Included subsets: Latin, Latin Extended, Cyrillic and Cyrillic Extended. These cover English and Ukrainian, including Ґ/ґ, Є/є, І/і, Ї/ї and the hryvnia sign.
- `fonts.css` uses relative local URLs and `font-display: swap`; no request to Google is required at runtime.
- Both families are distributed under the SIL Open Font License 1.1. See `OFL-Manrope.txt` and `OFL-IBM-Plex-Mono.txt`.

## Usage

```html
<link rel="stylesheet" href="/assets/fonts/fonts.css">
```

```css
body { font-family: "Manrope", sans-serif; }
.label { font-family: "IBM Plex Mono", monospace; }
```

Use a path relative to each page when hosting below a subdirectory. The font URLs inside `fonts.css` are already relative to that stylesheet.

## Official sources

- [Manrope specimen](https://fonts.google.com/specimen/Manrope)
- [IBM Plex Mono specimen](https://fonts.google.com/specimen/IBM+Plex+Mono)
- [Manrope license](https://github.com/google/fonts/blob/main/ofl/manrope/OFL.txt)
- [IBM Plex Mono license](https://github.com/google/fonts/blob/main/ofl/ibmplexmono/OFL.txt)
- [Google Fonts stylesheet used for these assets](https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Manrope:wght@400;500;600;700;800&display=swap)

The response used the normal styles, a Chromium user agent and the Google Fonts v20 asset paths listed below. Manrope repeated the same variable binary for every requested weight; its duplicated rules were consolidated into a 400–800 range. Only the four required alphabet subsets were retained. No font binary was modified.

## Asset provenance

| Local file | Bytes | SHA-256 | Original URL |
| --- | ---: | --- | --- |
| `ibm-plex-mono-400-cyrillic-ext.woff2` | 6912 | `f8c22ec1804bd6966b70f43ac7c327025645b4c09597117fca2a5a6c750106fe` | [source](https://fonts.gstatic.com/s/ibmplexmono/v20/-F63fjptAgt5VM-kVkqdyU8n1iIq129k.woff2) |
| `ibm-plex-mono-400-cyrillic.woff2` | 8356 | `7635422bd10ddbbcb0e0caa1154b928298f5c8319b8c00b30978d4395f4783ce` | [source](https://fonts.gstatic.com/s/ibmplexmono/v20/-F63fjptAgt5VM-kVkqdyU8n1isq129k.woff2) |
| `ibm-plex-mono-400-latin-ext.woff2` | 13348 | `6bc0f226a5b7884a8170e3f62c63d7675609d4631bdc5931b5cdab81821f00eb` | [source](https://fonts.gstatic.com/s/ibmplexmono/v20/-F63fjptAgt5VM-kVkqdyU8n1iEq129k.woff2) |
| `ibm-plex-mono-400-latin.woff2` | 14708 | `08949f728dc52d528e69b1667d15c89a5686a4ee9a296ff90983985f99c380f7` | [source](https://fonts.gstatic.com/s/ibmplexmono/v20/-F63fjptAgt5VM-kVkqdyU8n1i8q1w.woff2) |
| `ibm-plex-mono-500-cyrillic-ext.woff2` | 6972 | `3febe5c7f22e4b07b4552738673c3dbe8bced2dc5f48b866edf7ccd9552d109a` | [source](https://fonts.gstatic.com/s/ibmplexmono/v20/-F6qfjptAgt5VM-kVkqdyU8n3twJwl1FgtIU.woff2) |
| `ibm-plex-mono-500-cyrillic.woff2` | 8460 | `1d89462e86cb8e87e7e9d6f6635605bd7c3081baca6caaecee84916bf7b60edc` | [source](https://fonts.gstatic.com/s/ibmplexmono/v20/-F6qfjptAgt5VM-kVkqdyU8n3twJwlRFgtIU.woff2) |
| `ibm-plex-mono-500-latin-ext.woff2` | 13432 | `6bb06407c97584b0867a959e05e8874693bfeb8c317de190811c51598f2d99ea` | [source](https://fonts.gstatic.com/s/ibmplexmono/v20/-F6qfjptAgt5VM-kVkqdyU8n3twJwl5FgtIU.woff2) |
| `ibm-plex-mono-500-latin.woff2` | 14888 | `01d285447409c8a588692162439a038b8cbd7871309ee20267b0d2d91c6e8e22` | [source](https://fonts.gstatic.com/s/ibmplexmono/v20/-F6qfjptAgt5VM-kVkqdyU8n3twJwlBFgg.woff2) |
| `ibm-plex-mono-600-cyrillic-ext.woff2` | 7692 | `83109cdd4f8665b475dfc11d61bd44da328bf7e6eab3d3953d39c49b1b9f6015` | [source](https://fonts.gstatic.com/s/ibmplexmono/v20/-F6qfjptAgt5VM-kVkqdyU8n3vAOwl1FgtIU.woff2) |
| `ibm-plex-mono-600-cyrillic.woff2` | 9352 | `2b05a8695c7f9f4abd7178b279646a3b005a8ce57546bef6fd145f25d131e0aa` | [source](https://fonts.gstatic.com/s/ibmplexmono/v20/-F6qfjptAgt5VM-kVkqdyU8n3vAOwlRFgtIU.woff2) |
| `ibm-plex-mono-600-latin-ext.woff2` | 14328 | `32057cf50dd14bdb21a2c93766c4a2c43e4abe688ea3922df3203cac7751a98b` | [source](https://fonts.gstatic.com/s/ibmplexmono/v20/-F6qfjptAgt5VM-kVkqdyU8n3vAOwl5FgtIU.woff2) |
| `ibm-plex-mono-600-latin.woff2` | 15620 | `0d1f0b8d0722224e32e9f28261bdc86c79115be73444ae5eceb73976a1bcdf83` | [source](https://fonts.gstatic.com/s/ibmplexmono/v20/-F6qfjptAgt5VM-kVkqdyU8n3vAOwlBFgg.woff2) |
| `manrope-variable-cyrillic-ext.woff2` | 2552 | `de37de877dc17e4577341fa68bb5cb526b53d54cb29721e674208546a3c7849d` | [source](https://fonts.gstatic.com/s/manrope/v20/xn7gYHE41ni1AdIRggqxSuXd.woff2) |
| `manrope-variable-cyrillic.woff2` | 14500 | `c268b459a9329e59fecf39a17618efd44c71735532048d60b12aab76a8c14914` | [source](https://fonts.gstatic.com/s/manrope/v20/xn7gYHE41ni1AdIRggOxSuXd.woff2) |
| `manrope-variable-latin-ext.woff2` | 15120 | `3911b66d9f2e005a4b989223405d0e5032619c668597ba467cc76a23c8fffcfb` | [source](https://fonts.gstatic.com/s/manrope/v20/xn7gYHE41ni1AdIRggmxSuXd.woff2) |
| `manrope-variable-latin.woff2` | 24836 | `a30ddcd349703aff7464c34bef3fffdff405ee50c113440d7c8693c02d210972` | [source](https://fonts.gstatic.com/s/manrope/v20/xn7gYHE41ni1AdIRggexSg.woff2) |
| `OFL-Manrope.txt` | 4384 | `e01b637272e0cbdfb240184dd98ea5cc671556d9894dae2668d92ab2c906787c` | [source](https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/OFL.txt) |
| `OFL-IBM-Plex-Mono.txt` | 4456 | `7e6b2818edbd8f6a01ae80641cc8f16a51080d08fb4e532be3a0b6f74adb07da` | [source](https://raw.githubusercontent.com/google/fonts/main/ofl/ibmplexmono/OFL.txt) |
