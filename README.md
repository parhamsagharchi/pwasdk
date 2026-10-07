# pwasdk

Progressive Web App helpers for the browser. One small TypeScript package with focused modules for common device and web APIs.

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
- **Screenshot** — native-bridge screenshot events + notify helpers

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
packages/core     # @pwasdk/core (published)
apps/playground   # local demo (not published)
```

```bash
pnpm install
pnpm --filter @pwasdk/core build
pnpm dev
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md), [STYLE_GUIDE.md](STYLE_GUIDE.md), and the [Code of Conduct](CODE_OF_CONDUCT.md).

## License

[MIT](LICENSE) © Parham Sagharichi Ha
