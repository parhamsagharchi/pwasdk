export interface IAmbientLightReading {
  /** Illuminance in lux. */
  illuminance: number;
  at: number;
}

export type TAmbientLightListener = (reading: IAmbientLightReading) => void;
