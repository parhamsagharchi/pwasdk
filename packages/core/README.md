# @pwasdk/core

**Version:** `1.5.0`

Small TypeScript modules for browser and PWA APIs — one export per feature (`Camera`, `Haptic`, `Push`, `Share`, …). Import, call `isSupported()`, then use it.

Live demo: [pwasdk.vercel.app](https://pwasdk.vercel.app)

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
| `Shake` | DeviceMotion shake detection + callback |
| `Network` | Connection generation / quality / strength |
| `Battery` | Charge level and charging state |
| `Torch` | Phone flashlight via camera torch |
| `Qr` | QR / barcode detect + video watch |
| `ScreenShare` | getDisplayMedia screen capture |
| `Contacts` | Contact Picker API |
| `Pip` | Picture-in-Picture |
| `MediaSession` | Lock-screen media controls |
| `Passkey` | WebAuthn passkeys |
| `WebOtp` | SMS one-time codes |
| `Nfc` | Web NFC read / write (Android) |

## Notes

- Browser-only. Do not import into Node/SSR without guards.
- `Push.subscribe(vapidPublicKey)` requires **your** VAPID public key.
- Call `Install.init()` during app bootstrap to capture `beforeinstallprompt`.
- OS screenshot detection is **not** available in pure browsers (mobile Chrome / Safari / installed PWA included). Power+Volume never reaches JavaScript there. On Android 14+, a native Activity can use `ScreenCaptureCallback`, then call `window.PwaSdkScreenshot.advertise()` once and `window.PwaSdkScreenshot.notify()` on each capture after `Screenshot.installBridge()`. `isNativeDetectionSupported()` stays `false` until that native host connects.

## License

MIT
