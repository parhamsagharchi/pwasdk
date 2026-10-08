# Changelog

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
