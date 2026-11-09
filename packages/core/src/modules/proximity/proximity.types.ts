export interface IProximityReading {
  /** Distance in cm when the sensor provides it. */
  distance: number | null;
  /** True when something is near the sensor. */
  near: boolean;
  /** Max measurable distance when provided. */
  max: number | null;
  at: number;
}

export type TProximityListener = (reading: IProximityReading) => void;
