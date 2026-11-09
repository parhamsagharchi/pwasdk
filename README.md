# pwasdk

`@pwasdk/core` is a small TypeScript package: one import per browser/PWA API (camera, vibration, push, share, storage, and more). Check `isSupported()`, then call the method.

**What it is not:** a native mobile SDK or a UI kit — just thin, typed wrappers around Web APIs.

**Current version:** `1.5.0`  
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
- **Shake** — DeviceMotion shake detection (open your own bottom sheet in the callback)
- **Network** — 2G–4G (and 5G estimate), quality, and strength
- **Battery** — charge level and charging state
- **Torch** — phone flashlight
- **QR** — scan QR codes from the camera
- **ScreenShare** — share a tab or window
- **Contacts** — pick people from the address book
- **PiP** — Picture-in-Picture video
- **MediaSession** — lock-screen media controls
- **Passkey** — Face ID / fingerprint (WebAuthn)
- **WebOtp** — auto-read SMS one-time codes
- **NFC** — read/write tags (Android Chrome)
- **Speak** — text-to-speech
- **Tilt** — DeviceOrientation tilt readings (gyro games)
- **Proximity** — near/far sensor (limited browsers)
- **AmbientLight** — ambient lux readings (limited browsers)
- **DoubleTap** — double-tap like with optional haptic

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

The React demo (`apps/react-playground`) lets you try each module:

- Install snippet
- Module lab (pick a module → try it → show code)
- Contributors

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
| `@pwasdk/core` | `1.5.0` |
| Monorepo (`pwasdk`) | `1.5.0` |

See [CHANGELOG.md](CHANGELOG.md) for release notes.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md), [STYLE_GUIDE.md](STYLE_GUIDE.md), and the [Code of Conduct](CODE_OF_CONDUCT.md).

## License

[MIT](LICENSE) © Parham Sagharichi Ha
