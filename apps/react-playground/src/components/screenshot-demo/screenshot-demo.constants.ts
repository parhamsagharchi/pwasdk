export const SCREENSHOT_EXAMPLE = `import { Screenshot } from "@pwasdk/core";

// Install once so a native WebView can call window.PwaSdkScreenshot.notify()
Screenshot.installBridge();

const stop = Screenshot.watch({
  autoNotify: false,
  listenKeyboard: true, // desktop PrintScreen only
  onDetected: (event) => {
    // Open your bottom sheet / modal here
    console.log("screenshot", event.source);
  },
});

// Demo / tests:
Screenshot.notifyDetected({ source: "manual" });

// Real phones in a browser: OS screenshots are NOT visible to the page.
// Capacitor / native shell must forward:
//   window.PwaSdkScreenshot.notify()

stop();
`;
