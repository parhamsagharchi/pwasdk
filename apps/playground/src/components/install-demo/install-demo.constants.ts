export const INSTALL_EXAMPLE = `import { Install } from "@pwasdk/core";

Install.init();

if (Install.canPrompt()) {
  await Install.prompt();
}
`;
