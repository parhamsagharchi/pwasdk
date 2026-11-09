export const TILT_EXAMPLE = `import { Tilt } from "@pwasdk/core";

await Tilt.requestPermission();
const stop = Tilt.watch(({ beta, gamma }) => {
  console.log(beta, gamma);
});
`;
