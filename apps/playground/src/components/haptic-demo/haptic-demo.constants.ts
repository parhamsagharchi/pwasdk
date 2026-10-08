export const HAPTIC_EXAMPLE = `import { Haptic } from "@pwasdk/core";

if (Haptic.isSupported()) {
  Haptic.trigger("light");
  Haptic.pattern([200, 100, 200, 100, 200]);
  Haptic.stop();
}
`;
