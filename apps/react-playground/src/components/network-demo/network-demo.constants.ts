export const NETWORK_EXAMPLE = `import { Network } from "@pwasdk/core";

if (Network.isSupported()) {
  const status = Network.getStatus();
  console.log(status.generation, status.quality, status.strength);

  const stop = Network.watch((next) => {
    console.log(next.effectiveType, next.downlinkMbps, next.rttMs);
  });
  // stop();
}
`;
