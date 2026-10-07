/**
 * App Badge API helper.
 */
export const Badge = {
  isSupported(): boolean {
    return (
      typeof navigator !== "undefined" &&
      "setAppBadge" in navigator &&
      "clearAppBadge" in navigator
    );
  },

  async set(count: number): Promise<void> {
    if (!this.isSupported()) {
      throw new Error("Badge API is not supported");
    }
    try {
      if (count === 0) {
        await navigator.clearAppBadge();
      } else {
        await navigator.setAppBadge(count);
      }
    } catch {
      throw new Error("Failed to set app badge");
    }
  },

  async clear(): Promise<void> {
    if (!this.isSupported()) {
      throw new Error("Badge API is not supported");
    }
    try {
      await navigator.clearAppBadge();
    } catch {
      throw new Error("Failed to clear app badge");
    }
  },
};
