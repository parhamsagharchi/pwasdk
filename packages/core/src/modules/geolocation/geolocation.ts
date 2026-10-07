/**
 * Geolocation helper module.
 */

import type { IGeoPosition, TGeoPermissionState } from "./geolocation.types";

export const Geolocation = {
  isSupported(): boolean {
    return typeof navigator !== "undefined" && "geolocation" in navigator;
  },

  async getPermission(): Promise<TGeoPermissionState> {
    if (!this.isSupported()) return "denied";
    if (!("permissions" in navigator)) return "unknown";

    try {
      const status = await navigator.permissions.query({
        name: "geolocation",
      });
      return status.state;
    } catch {
      return "unknown";
    }
  },

  getCurrent(options?: PositionOptions): Promise<IGeoPosition> {
    if (!this.isSupported()) {
      return Promise.reject(new Error("Geolocation API is not supported"));
    }

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude, accuracy } = pos.coords;
          resolve({ lat: latitude, lng: longitude, accuracy, raw: pos });
        },
        (err) => {
          reject(new Error(err.message || "Failed to get current position"));
        },
        options
      );
    });
  },

  /**
   * Watch position changes. Returns a function to stop watching.
   */
  watch(
    callback: (position: IGeoPosition) => void,
    errorCallback?: (error: GeolocationPositionError) => void,
    options?: PositionOptions
  ): () => void {
    if (!this.isSupported()) {
      throw new Error("Geolocation API is not supported");
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        callback({ lat: latitude, lng: longitude, accuracy, raw: pos });
      },
      (err) => {
        errorCallback?.(err);
      },
      options
    );

    return () => navigator.geolocation.clearWatch(watchId);
  },
};
