export const SCREENSHOT_EXAMPLE = `import { Screenshot } from "@pwasdk/core";

Screenshot.installBridge();

Screenshot.watch({
  autoNotify: false,
  onDetected: (event) => {
    // Open your bottom sheet here
    console.log(event.source);
  },
});

// ❌ Chrome / Safari / PWA: Power+Volume NEVER reaches JS.
// ✅ Android WebView (API 34+): register ScreenCaptureCallback, then:

// window.PwaSdkScreenshot.advertise();
// window.PwaSdkScreenshot.notify();

// Demo without native:
Screenshot.notifyDetected({ source: "manual" });
`;

export const SCREENSHOT_ANDROID_HINT = `For real Power+Volume on Android 14+ (native app / Capacitor):

1) Add DETECT_SCREEN_CAPTURE to the Android manifest
2) When the OS reports a screenshot, call:
   window.PwaSdkScreenshot.notify()
3) In JS: Screenshot.installBridge() + Screenshot.watch({ onDetected })

A normal Chrome tab or “Add to Home Screen” PWA cannot see OS screenshots.`;
