export const PWA_EXAMPLE = `import { Pwa } from "@pwasdk/core";

const platform = Pwa.platform(); // "ios" | "android" | "desktop" | "unknown"
const standalone = Pwa.isStandalone();

if (platform === "ios" && !standalone) {
  console.log(Pwa.getIOSInstallInstructions());
}
`;
