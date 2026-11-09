export const PROXIMITY_EXAMPLE = `import { Proximity } from "@pwasdk/core";

if (Proximity.isSupported()) {
  const stop = Proximity.watch(({ near, distance }) => {
    console.log(near, distance);
  });
}
`;
