export const SCREENSHOT_EXAMPLE = `import { Screenshot } from "@pwasdk/core";

// 1) In a WebView / Capacitor shell, install the bridge once:
Screenshot.installBridge();

// 2) Listen + show "you took a screenshot" notification:
const stop = Screenshot.watch({
  autoNotify: true,
  notification: {
    title: "Screenshot detected",
    body: "You took a screenshot of this page.",
  },
});

await Screenshot.requestPermission();

// 3) Native Android / iOS code must call this when the OS fires:
//    window.PwaSdkScreenshot.notify()
// or from JS:
Screenshot.notifyDetected({ source: "native" });

stop();
`;
