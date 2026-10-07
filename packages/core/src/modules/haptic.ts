/**
 * Haptic feedback via the Vibration API.
 */
export const Haptic = {
  isSupported(): boolean {
    return typeof navigator !== "undefined" && "vibrate" in navigator;
  },

  /**
   * Trigger a preset vibration intensity.
   */
  trigger(type: "light" | "medium" | "heavy" = "light"): boolean {
    if (!this.isSupported()) return false;

    const map: Record<"light" | "medium" | "heavy", number | number[]> = {
      light: 100,
      medium: 200,
      heavy: [300, 100, 300],
    };

    try {
      return navigator.vibrate(map[type]) !== false;
    } catch {
      return false;
    }
  },

  /**
   * Trigger a custom vibration pattern (vibrate, pause, vibrate, ...).
   */
  pattern(pattern: number[]): boolean {
    if (!this.isSupported()) return false;
    try {
      return navigator.vibrate(pattern) !== false;
    } catch {
      return false;
    }
  },

  /** Stop any ongoing vibration. */
  stop(): boolean {
    if (!this.isSupported()) return false;
    navigator.vibrate(0);
    return true;
  },
};
