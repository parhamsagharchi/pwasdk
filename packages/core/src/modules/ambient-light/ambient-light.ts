/**
 * Ambient light sensor (Generic Sensor API). Limited browser support.
 */

import type {
  IAmbientLightReading,
  TAmbientLightListener,
} from "./ambient-light.types";

type TAmbientLightSensor = {
  start: () => void;
  stop: () => void;
  illuminance: number;
  onreading: ((this: TAmbientLightSensor, ev: Event) => void) | null;
  onerror: ((this: TAmbientLightSensor, ev: Event) => void) | null;
};

type TAmbientLightSensorCtor = new (options?: {
  frequency?: number;
}) => TAmbientLightSensor;

function getAmbientLightSensorCtor(): TAmbientLightSensorCtor | null {
  if (typeof window === "undefined") return null;
  return (
    (window as Window & { AmbientLightSensor?: TAmbientLightSensorCtor })
      .AmbientLightSensor ?? null
  );
}

export const AmbientLight = {
  isSupported(): boolean {
    return getAmbientLightSensorCtor() !== null;
  },

  /**
   * Watch ambient illuminance (lux). Returns a stop function.
   */
  watch(onReading: TAmbientLightListener): () => void {
    const Ctor = getAmbientLightSensorCtor();
    if (!Ctor) return () => {};

    let sensor: TAmbientLightSensor | null = null;
    try {
      sensor = new Ctor({ frequency: 5 });
      sensor.onreading = () => {
        if (!sensor) return;
        onReading({
          illuminance: sensor.illuminance,
          at: Date.now(),
        });
      };
      sensor.onerror = () => {
        /* permission / hardware */
      };
      sensor.start();
    } catch {
      return () => {};
    }

    return () => {
      try {
        sensor?.stop();
      } catch {
        /* ignore */
      }
      sensor = null;
    };
  },
};
