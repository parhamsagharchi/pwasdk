# Changelog

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
