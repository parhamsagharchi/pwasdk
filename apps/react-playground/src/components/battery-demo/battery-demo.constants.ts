export const BATTERY_EXAMPLE = `import { Battery } from "@pwasdk/core";

if (Battery.isSupported()) {
  const status = await Battery.getStatus();
  console.log(status.percent, status.charging);

  const stop = await Battery.watch((next) => {
    console.log(next.percent, next.charging);
  });
  // stop();
}
`;
