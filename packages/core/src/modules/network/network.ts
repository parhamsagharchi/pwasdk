/**
 * Network Information helper (effectiveType, downlink, quality).
 * Note: browsers expose slow-2g…4g — not a guaranteed OS "5g" flag.
 */

import type { INetworkSnapshot } from "./network.types";
import { getConnection, readSnapshot } from "./network.utils";

export const Network = {
  isSupported(): boolean {
    return getConnection() !== null;
  },

  /** Online / offline from `navigator.onLine`. */
  isOnline(): boolean {
    return typeof navigator !== "undefined" ? navigator.onLine : false;
  },

  /** Current snapshot (works partially even when Network Information API is missing). */
  getStatus(): INetworkSnapshot {
    return readSnapshot(getConnection());
  },

  /**
   * Subscribe to connection + online/offline changes.
   * Returns unsubscribe.
   */
  watch(callback: (status: INetworkSnapshot) => void): () => void {
    if (typeof window === "undefined") return () => {};

    const emit = () => callback(this.getStatus());
    const connection = getConnection();

    window.addEventListener("online", emit);
    window.addEventListener("offline", emit);
    connection?.addEventListener("change", emit);

    emit();

    return () => {
      window.removeEventListener("online", emit);
      window.removeEventListener("offline", emit);
      connection?.removeEventListener("change", emit);
    };
  },
};
