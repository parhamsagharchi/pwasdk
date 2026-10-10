export const INSTALL_EXAMPLE = `import { Install, Pwa } from "@pwasdk/core";

Install.init();

if (Pwa.platform() === "ios") {
  console.log(Pwa.getIOSInstallInstructions());
} else if (Install.canPrompt()) {
  await Install.prompt();
}
`;
