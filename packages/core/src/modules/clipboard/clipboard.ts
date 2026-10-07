/**
 * Clipboard API helper.
 */
export const Clipboard = {
  isSupported(): boolean {
    return typeof navigator !== "undefined" && !!navigator.clipboard;
  },

  async copy(text: string): Promise<boolean> {
    if (!this.isSupported()) {
      throw new Error("Clipboard API is not supported");
    }
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      throw new Error("Failed to copy to clipboard");
    }
  },

  async paste(): Promise<string> {
    if (!this.isSupported()) {
      throw new Error("Clipboard API is not supported");
    }
    try {
      return await navigator.clipboard.readText();
    } catch {
      throw new Error(
        "Failed to read from clipboard. Make sure clipboard permissions are granted."
      );
    }
  },
};
