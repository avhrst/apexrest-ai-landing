# Supplied logo sources

These files were supplied by the user for the September 2026 site redesign. Every source file is copied byte-for-byte; the Desktop originals have not been changed. `SHA256SUMS` records all 20 source files, with paths relative to this directory.

## Primary identity: APEXREST-logo

The later supplied `APEXREST-logo/` folder is the primary identity for this redesign. `apex rgb line.svg` is the horizontal full-colour APEXREST logo used by the website. The palette comes directly from this source: cyan `#31BEF9`, yellow `#FFD541`, red `#FF4141` and ink `#1E1E1E`.

`apex bw line .svg` is the supplied monochrome horizontal version. Its outlined symbol differs intentionally from the filled RGB version. Its geometry is preserved for the monochrome and reversed white exports. The crossed pencil and ruler symbol is extracted from the existing group in `apex rgb line.svg`; it has not been redrawn.

`Oracle 1.*` and `Oracle 2.*` are archived third-party-related artwork, not APEXREST identity assets. They are not deployed to the public website or used as endorsement. `apex new year.jpg` is archived seasonal artwork, not a core identity variant.

## Earlier reference: apeks

`apeks/` preserves the earlier supplied five-file folder. It contains a distinct phonetic “apeks” identity. It remains a source archive and is not used as the primary APEXREST website logo.

## Derived web assets

`../../assets/brand/` contains SVG exports produced by `../tools/export_logos.py`:

| Asset | Source and transformation | ViewBox |
| --- | --- | --- |
| `apexrest-logo.svg` | RGB horizontal; crop blank artboard, resolve source fill classes | `16 157 368 86` |
| `apexrest-logo-mono.svg` | Original monochrome horizontal; same crop | `16 157 368 86` |
| `apexrest-logo-light.svg` | Original monochrome horizontal, fills changed to white | `16 157 368 86` |
| `apexrest-symbol.svg` | Original RGB symbol group only, crop blank artboard | `16 157 86 86` |
| `favicon.svg` | Same original RGB symbol, additional surrounding space | `10 151 98 98` |

All original path data and polygon points are preserved. Only the SVG container, blank artboard, element IDs, and style representation are normalised. Public exports have direct element fills so the original generic `.st0` class names cannot collide with site styles. Use SVG files as image assets with accessible alternative text appropriate to their context.

The brandbook's minimum sizes and clear-space rules are new recommendations for this redesign; they are not claimed to be supplied designer specifications.

To verify source integrity from this directory, run `shasum -a 256 -c SHA256SUMS`. To regenerate web assets, run `python3 brand/tools/export_logos.py` from the repository root.
