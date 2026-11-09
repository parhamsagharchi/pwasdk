export const AMBIENT_LIGHT_EXAMPLE = `import { AmbientLight } from "@pwasdk/core";

if (AmbientLight.isSupported()) {
  const stop = AmbientLight.watch(({ illuminance }) => {
    console.log(illuminance);
  });
}
`;
