export const SHAKE_EXAMPLE = `import { Shake } from "@pwasdk/core";

if (Shake.isSupported()) {
  // iOS: call from a tap / click handler
  await Shake.requestPermission();

  const stop = Shake.watch((event) => {
    // Open your bottom sheet / feedback UI
    console.log("shake", event.magnitude);
  }, {
    threshold: 15,
    cooldownMs: 1500,
  });

  // stop();
}
`;
