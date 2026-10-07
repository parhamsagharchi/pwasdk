/**
 * Web Share API helper.
 */
export const Share = {
  isSupported(): boolean {
    return typeof navigator !== "undefined" && "share" in navigator;
  },

  async share(data: ShareData): Promise<boolean> {
    if (!this.isSupported()) return false;
    try {
      await navigator.share(data);
      return true;
    } catch {
      // User cancelled or share failed
      return false;
    }
  },
};
