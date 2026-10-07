# @pwasdk/core

Browser helpers for Progressive Web Apps: haptics, share, clipboard, push, install prompts, geolocation, wake lock, camera, and more.

## Install

```bash
pnpm add @pwasdk/core
# or
npm install @pwasdk/core
```

## Quick start

```ts
import { Haptic, Share, Install, Geolocation } from "@pwasdk/core";

// Capture install prompt early in your app
Install.init();

if (Haptic.isSupported()) {
  Haptic.trigger("medium");
}

await Share.share({ title: "Hello", url: location.href });

const position = await Geolocation.getCurrent();
```

## Modules

| Export | Purpose |
|--------|---------|
| `Haptic` | Vibration / haptic feedback |
| `Share` | Web Share API |
| `Clipboard` | Copy / paste text |
| `Device` | UA, online status, connection |
| `Push` | Service worker + push subscribe |
| `Install` | PWA install prompt |
| `Badge` | App badge count |
| `Geolocation` | Current / watch position |
| `WakeLock` | Keep screen awake |
| `Fullscreen` | Enter / exit fullscreen |
| `AppStorage` | localStorage / sessionStorage + JSON |
| `Orientation` | Screen orientation lock |
| `Camera` | getUserMedia video |
| `Microphone` | getUserMedia audio |
| `Pwa` | Standalone / platform helpers |
| `Screenshot` | Screenshot event bus + notification helpers |

## Notes

- Browser-only. Do not import into Node/SSR without guards.
- `Push.subscribe(vapidPublicKey)` requires **your** VAPID public key.
- Call `Install.init()` during app bootstrap to capture `beforeinstallprompt`.
- OS screenshot detection is **not** available in pure browsers. Use a native WebView bridge that calls `Screenshot.notifyDetected()`.

## License

MIT
