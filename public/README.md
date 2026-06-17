# Static assets (`public/`)

Organized by family. Every file here is served from the site root
(`public/brand/resonance/logo.svg` → `https://…/brand/resonance/logo.svg`).

```
public/
├── favicon.ico            # auto-probed by browsers → keep at the root
├── apple-touch-icon.png   # auto-probed by iOS → keep at the root
├── site.webmanifest       # PWA manifest (referenced as /site.webmanifest)
│
├── icons/                 # favicons + PWA app icons (referenced explicitly)
│   ├── icon.svg
│   ├── favicon-16x16.png · favicon-32x32.png · favicon-96x96.png
│   └── icon-192x192.png · icon-512x512.png · maskable-icon-512x512.png
│
├── brand/                 # logos & brands, one folder per entity
│   ├── resonance/  logo.svg · logo-caramel.svg
│   ├── intuition/  mark.svg · wordmark.svg · hero.png · box.png
│   └── metamask/   fox.svg · wordmark.svg
│
└── media/                 # CONTENT imagery, by element family
    ├── conferences/<slug>/   # one folder per conference (key = slug)
    │   └── cover.jpg          #   cover, and any custom image for the conf
    └── speakers/             # avatars (key = handle), e.g. 0xbilly.jpg
```

## Adding custom images

- **Conference** → `media/conferences/<slug>/<name>.jpg`, then reference the path
  in `src/data/conferences/<slug>/meta.ts` (e.g. `cover`).
- **Speaker** → `media/speakers/<handle>.jpg`, `avatar` field in `speakers.ts`.
- **Organization** → logo in `brand/<org>/`, `logo` field in `orgs.ts`.
- **New family** (missions, themes…) → create `media/<family>/` following the
  same model and reference it from the matching data files.

> Reference assets by absolute path (`/media/…`). SVGs displayed in the OG card
> (`src/app/api/og/[slug]/route.tsx`) are read from the file system via
> `fileDataUri("/path", mime)`.
