export const DOUBLE_TAP_EXAMPLE = `import { DoubleTap } from "@pwasdk/core";

const stop = DoubleTap.watch(photoEl, () => {
  // Instagram-style like
  console.log("liked");
}, { haptic: true });
`;
