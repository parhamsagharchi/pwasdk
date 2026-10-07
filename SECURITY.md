# Security Policy

## Supported versions

| Version | Supported |
|---------|-----------|
| 0.x     | ✅        |

## Reporting a vulnerability

Please report security issues privately via GitHub Security Advisories on this repository, or email the maintainer listed on the GitHub profile.

Do not open a public issue for undisclosed vulnerabilities.

## Notes for consumers

- `@pwasdk/core` is a browser library. Treat all client-side storage and clipboard data as untrusted until validated by your app.
- Always supply your own VAPID keys for `Push.subscribe`.
- Prefer HTTPS in production for service workers, geolocation, camera, and microphone.
