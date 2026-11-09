export const PIP_EXAMPLE = `import { Pip } from "@pwasdk/core";

if (Pip.isSupported()) {
  await Pip.enter(videoElement);
  // later:
  await Pip.exit();
}
`;
