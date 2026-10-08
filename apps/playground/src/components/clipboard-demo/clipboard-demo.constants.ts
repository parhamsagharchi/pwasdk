export const CLIPBOARD_EXAMPLE = `import { Clipboard } from "@pwasdk/core";

if (Clipboard.isSupported()) {
  await Clipboard.copy("Hello from PWA SDK!");
  const text = await Clipboard.paste();
}
`;
