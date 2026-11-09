export type TNetworkEffectiveType = "slow-2g" | "2g" | "3g" | "4g" | "unknown";

/** Connection medium when the browser exposes it (not the same as 2g/4g). */
export type TNetworkTransport =
  | "bluetooth"
  | "cellular"
  | "ethernet"
  | "none"
  | "wifi"
  | "wimax"
  | "other"
  | "unknown";

export type TNetworkQuality = "offline" | "poor" | "fair" | "good" | "excellent";

export interface INetworkSnapshot {
  online: boolean;
  /** Network Information `effectiveType` (browsers do not expose a real "5g" enum). */
  effectiveType: TNetworkEffectiveType;
  /**
   * Best-effort label for developers/UI: may show `5g-est` when downlink is
   * high on cellular — still an estimate, not an OS 5G flag.
   */
  generation: "offline" | "slow-2g" | "2g" | "3g" | "4g" | "5g-est" | "unknown";
  transport: TNetworkTransport;
  /** Approximate downlink in Mbps (when available). */
  downlinkMbps: number | null;
  /** Round-trip time in ms (when available). */
  rttMs: number | null;
  saveData: boolean;
  quality: TNetworkQuality;
  /** 0–100 score derived from type / rtt / downlink for strength UI. */
  strength: number;
}

export interface INetworkConnectionLike extends EventTarget {
  readonly effectiveType?: string;
  readonly type?: string;
  readonly downlink?: number;
  readonly rtt?: number;
  readonly saveData?: boolean;
}
