# Changelog

## [1.4.0] – 2026-11-10

### Features

- Added `Torch` — flashlight via camera track constraints
- Added `Qr` — QR scan with `BarcodeDetector` + `watch(video, onDetect)`
- Added `ScreenShare` — `getDisplayMedia` helpers
- Added `Contacts` — Contact Picker API
- Added `Pip` — Picture-in-Picture enter/exit
- Added `MediaSession` — lock-screen Now Playing controls
- Added `Passkey` — WebAuthn create/get + `randomChallenge()`
- Added `WebOtp` — SMS one-time code listener
- Added `Nfc` — Web NFC read/write (Android Chrome)
- Playground demos for all new modules; lab ordered wow-first (Torch first)

### Notes

- QR / Contacts / WebOTP / NFC are strongest on Android Chrome
- Torch needs a camera track that exposes the `torch` capability
- Passkey demos create local credentials; production apps must verify on a server

## [1.3.0] – 2026-11-10

### Features

- Added `Network` module: `getStatus()` / `watch()` with effectiveType (2g–4g), quality, strength score, and optional `5g-est` from fast downlink
- Added `Battery` module: `getStatus()` / `watch()` for level, charging, and time estimates
- Playground lab demos for Network and Battery

### Notes

- Browsers do not expose a real OS `5g` enum; `generation: "5g-est"` is heuristic
- Battery Status API is often missing on iOS Safari

## [1.2.0] – 2026-11-10

### Features

- Added `Shake` module: `isSupported()`, `needsPermission()`, `requestPermission()`, and `watch(onShake)` for Instagram-style shake detection via DeviceMotion
- Playground: enable shake on a phone, then open a global bottom sheet from the `Shake.watch` callback (plus Preview sheet for desktop)
- Screenshot playground now opens a global “You took a screenshot” bottom sheet from `onDetected` (Simulate / PrintScreen / native bridge)
- `Screenshot.watch({ listenKeyboard: true })` optionally detects desktop PrintScreen-style shortcuts
- Playground UI: Gestalt-style module lab (module list + one active demo) instead of a crowded bento grid; media / architecture / AI prompt removed from the main path
- Screenshot bridge: `isNativeDetectionSupported()` is true only after a native host calls `advertise()` / `notify()` (installing the JS bridge alone is not enough)

### Notes

- iOS requires `Shake.requestPermission()` from a user gesture before motion events fire
- Core reports shakes / screenshot events only — bottom sheet / feedback UI stays in the app
- Pure mobile browsers still cannot observe Power+Volume screenshots; Android needs `ScreenCaptureCallback` → `window.PwaSdkScreenshot.notify()`

## [1.1.0] – 2026-10-10

### Features

- Redesigned the live React demo around the `new-design` visual language: hardware radar, AI prompt generator, media showcase, and interactive bento stages
- Renamed `apps/playground` → `apps/react-playground` and wired root scripts, Vercel, and docs to the new package name
- Added stage UIs for camera HUD, haptic device shell, audio spectrum, gyroscope tilt card, push toast, wake lock switch, clipboard, badge, and network + AppStorage
- Expanded Screenshot helpers: `watch({ autoNotify })`, `requestPermission()`, and `installBridge()` / `window.PwaSdkScreenshot.notify()` for native WebView hosts
- Expanded Tailwind design tokens (surfaces, accent alphas, shadows, z-index, breakpoints) mapped through `theme.css`

### Changes

- Kept Contributors and the STYLE_GUIDE demo folder structure
- Demo cards use real `@pwasdk/core` APIs only (no fake `Camera.start` / `Microphone.getStream` snippets)
- Code samples open from a `[ View Code ]` trigger in each card footer
- Documented that pure mobile browsers cannot detect OS Power+Volume screenshots; native Android/iOS must forward the event

### Fixes

- Align JSX event handlers with STYLE_GUIDE named-handler rules across demo components
- Refresh README / monorepo paths after the playground rename
- Screenshot demo now enables notifications and simulates detection for the notify UX

## [1.0.0] – 2026-10-08

### Features

- Released `@pwasdk/core` 1.0.0 with haptic, share, clipboard, device, push, install, badge, geolocation, wake lock, fullscreen, orientation, storage, camera, microphone, and PWA helpers
- Added the Screenshot module for native-bridge detection, `notifyDetected()`, notifications, and canvas or video capture
- Rebuilt the playground as the live demo: install snippet, searchable examples, architecture, and contributors
- Added a theme-colored full-page loader: a `ScaleLoader`-style splash in the HTML shell until the app mounts, then the `react-spinners` overlay while camera, microphone, or location is in progress
- Added a copyable example on each playground card for the matching `@pwasdk/core` call
- Let the app own the action: `Camera.watch` for each frame, `Microphone.listen` for speech, and `Screenshot.onDetected` without requiring a notification

### Fixes

- Restored playground HTTPS so the local Vite server serves the demo again

## [0.2.0] – 2026-10-07

### Features

- Published the first public release of `@pwasdk/core`
- Pointed the package and README homepage at the public demo on Vercel
