export const FULLSCREEN_EXAMPLE = `import { Fullscreen } from "@pwasdk/core";

if (Fullscreen.isSupported()) {
  await Fullscreen.toggle();
}
`;
