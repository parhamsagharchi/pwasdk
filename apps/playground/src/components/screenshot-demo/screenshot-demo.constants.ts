export const SCREENSHOT_EXAMPLE = `import { Screenshot } from "@pwasdk/core";

const stop = Screenshot.onDetected((event) => {
  // Your action. A notification is optional.
  event.source;
});

Screenshot.notifyDetected({ source: "manual" });
stop();
`;
