export interface IGeoPosition {
  lat: number;
  lng: number;
  accuracy?: number;
  raw?: GeolocationPosition;
}

export type TGeoPermissionState = PermissionState | "unknown";
