# pwasdk

Progressive Web App helpers for the browser. One small TypeScript package with focused modules for common device and web APIs.

**Current version:** `1.1.0`  
**Live demo:** [pwasdk.vercel.app](https://pwasdk.vercel.app)

```bash
pnpm add @pwasdk/core
```

## Features

- **Haptic** — vibration patterns
- **Share** — native share sheet
- **Clipboard** — copy / paste
- **Device** — online status, platform, network hints
- **Push** — service worker registration & push subscribe
- **Install** — PWA install prompt handling
- **Badge** — app icon badge
- **Geolocation** — current position & watch
- **WakeLock** — keep the screen on
- **Fullscreen / Orientation** — display helpers
- **AppStorage** — safe local/session storage + JSON
- **Camera / Microphone** — getUserMedia helpers
- **Pwa** — standalone detection & install hints
- **Screenshot** — callback when a host or your app reports a capture

## Usage

```ts
import {
  Haptic,
  Share,
  Clipboard,
  Install,
  Geolocation,
  AppStorage,
  Microphone,
} from "@pwasdk/core";

Install.init();

if (Haptic.isSupported()) {
  Haptic.trigger("light");
}

await Share.share({
  title: "My App",
  text: "Check this out",
  url: "https://example.com",
});

await Clipboard.copy("Hello");

const pos = await Geolocation.getCurrent();
AppStorage.local.setJSON("last-pos", pos);
```

### Push notifications

```ts
import { Push } from "@pwasdk/core";

await Push.register("/sw.js");
await Push.requestPermission();
await Push.subscribe(import.meta.env.VITE_VAPID_PUBLIC_KEY);
```

Generate your own VAPID keys per project. Do not reuse shared keys.

### Install prompt

```ts
import { Install } from "@pwasdk/core";

// Call once at startup
Install.init();

if (Install.canPrompt()) {
  await Install.prompt();
}
```

## Browser support

Works in modern Chromium, Firefox, and Safari. Feature availability varies:

- Haptic: mostly Android (iOS Safari has no Vibration API)
- Share / Badge / Install: browser-dependent
- Push: requires HTTPS (or localhost) + a service worker

Each module exposes `isSupported()` — check before use.

## Monorepo

```
packages/core            # @pwasdk/core (published)
apps/react-playground    # React live demo (not published)
```

The React demo (`apps/react-playground`) is the official showcase:

- Hardware radar + searchable capability labs
- AI prompt generator for Cursor / Claude / Copilot
- Media showcase (image + demo video)
- Interactive bento stages for camera, haptics, mic, push, and more
- Contributors section

A future Vue demo can live at `apps/vue-playground` without changing the SDK package.

```bash
pnpm install
pnpm --filter @pwasdk/core build
pnpm dev                         # starts apps/react-playground
pnpm build:react-playground      # core + demo production build
```

## Versioning

| Package | Version |
|---------|---------|
| `@pwasdk/core` | `1.1.0` |
| Monorepo (`pwasdk`) | `1.1.0` |

See [CHANGELOG.md](CHANGELOG.md) for release notes.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md), [STYLE_GUIDE.md](STYLE_GUIDE.md), and the [Code of Conduct](CODE_OF_CONDUCT.md).

## License

[MIT](LICENSE) © Parham Sagharichi Ha
