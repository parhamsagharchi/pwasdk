import type {
  INetworkConnectionLike,
  INetworkSnapshot,
  TNetworkEffectiveType,
  TNetworkQuality,
  TNetworkTransport,
} from "./network.types";

export function getConnection(): INetworkConnectionLike | null {
  if (typeof navigator === "undefined") return null;
  const nav = navigator as Navigator & {
    connection?: INetworkConnectionLike;
    mozConnection?: INetworkConnectionLike;
    webkitConnection?: INetworkConnectionLike;
  };
  return nav.connection || nav.mozConnection || nav.webkitConnection || null;
}

export function normalizeEffectiveType(
  value: string | undefined,
): TNetworkEffectiveType {
  if (
    value === "slow-2g" ||
    value === "2g" ||
    value === "3g" ||
    value === "4g"
  ) {
    return value;
  }
  return "unknown";
}

export function normalizeTransport(value: string | undefined): TNetworkTransport {
  const allowed: TNetworkTransport[] = [
    "bluetooth",
    "cellular",
    "ethernet",
    "none",
    "wifi",
    "wimax",
    "other",
    "unknown",
  ];
  if (value && (allowed as string[]).includes(value)) {
    return value as TNetworkTransport;
  }
  return "unknown";
}

export function estimateGeneration(
  online: boolean,
  effectiveType: TNetworkEffectiveType,
  downlinkMbps: number | null,
  transport: TNetworkTransport,
): INetworkSnapshot["generation"] {
  if (!online) return "offline";
  if (effectiveType === "unknown") return "unknown";
  if (effectiveType === "slow-2g") return "slow-2g";
  if (effectiveType === "2g") return "2g";
  if (effectiveType === "3g") return "3g";
  // Spec stops at "4g". High downlink on cellular is often 5G / LTE-A.
  if (
    effectiveType === "4g" &&
    downlinkMbps != null &&
    downlinkMbps >= 10 &&
    (transport === "cellular" || transport === "unknown" || transport === "wifi")
  ) {
    return "5g-est";
  }
  return "4g";
}

export function scoreStrength(
  online: boolean,
  effectiveType: TNetworkEffectiveType,
  downlinkMbps: number | null,
  rttMs: number | null,
): number {
  if (!online) return 0;

  let score = 40;
  switch (effectiveType) {
    case "slow-2g":
      score = 15;
      break;
    case "2g":
      score = 30;
      break;
    case "3g":
      score = 55;
      break;
    case "4g":
      score = 78;
      break;
    default:
      score = 50;
  }

  if (downlinkMbps != null) {
    if (downlinkMbps >= 20) score += 18;
    else if (downlinkMbps >= 10) score += 12;
    else if (downlinkMbps >= 5) score += 6;
    else if (downlinkMbps < 1) score -= 15;
  }

  if (rttMs != null) {
    if (rttMs <= 50) score += 10;
    else if (rttMs <= 100) score += 5;
    else if (rttMs >= 500) score -= 20;
    else if (rttMs >= 300) score -= 10;
  }

  return Math.max(0, Math.min(100, Math.round(score)));
}

export function qualityFromStrength(strength: number, online: boolean): TNetworkQuality {
  if (!online || strength <= 0) return "offline";
  if (strength < 30) return "poor";
  if (strength < 55) return "fair";
  if (strength < 80) return "good";
  return "excellent";
}

export function readSnapshot(connection: INetworkConnectionLike | null): INetworkSnapshot {
  const online = typeof navigator !== "undefined" ? navigator.onLine : false;
  const effectiveType = normalizeEffectiveType(connection?.effectiveType);
  const transport = normalizeTransport(connection?.type);
  const downlinkMbps =
    typeof connection?.downlink === "number" ? connection.downlink : null;
  const rttMs = typeof connection?.rtt === "number" ? connection.rtt : null;
  const saveData = connection?.saveData === true;
  const strength = scoreStrength(online, effectiveType, downlinkMbps, rttMs);

  return {
    online,
    effectiveType,
    generation: estimateGeneration(online, effectiveType, downlinkMbps, transport),
    transport,
    downlinkMbps,
    rttMs,
    saveData,
    quality: qualityFromStrength(strength, online),
    strength,
  };
}
