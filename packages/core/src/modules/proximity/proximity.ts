/**
 * Proximity sensor (Generic Sensor API). Limited browser support.
 */

import type { IProximityReading, TProximityListener } from "./proximity.types";

type TProximitySensor = {
  start: () => void;
  stop: () => void;
  distance: number;
  max: number;
  near: boolean;
  onreading: ((this: TProximitySensor, ev: Event) => void) | null;
  onerror: ((this: TProximitySensor, ev: Event) => void) | null;
};

type TProximitySensorCtor = new (options?: {
  frequency?: number;
}) => TProximitySensor;

function getProximitySensorCtor(): TProximitySensorCtor | null {
  if (typeof window === "undefined") return null;
  return (
    (window as Window & { ProximitySensor?: TProximitySensorCtor })
      .ProximitySensor ?? null
  );
}

export const Proximity = {
  isSupported(): boolean {
    return getProximitySensorCtor() !== null;
  },

  /**
   * Watch proximity. Returns a stop function.
   * Requires a secure context; many phones still lack this sensor in the browser.
   */
  watch(onReading: TProximityListener): () => void {
    const Ctor = getProximitySensorCtor();
    if (!Ctor) return () => {};

    let sensor: TProximitySensor | null = null;
    try {
      sensor = new Ctor({ frequency: 10 });
      sensor.onreading = () => {
        if (!sensor) return;
        onReading({
          distance: Number.isFinite(sensor.distance) ? sensor.distance : null,
          near: Boolean(sensor.near),
          max: Number.isFinite(sensor.max) ? sensor.max : null,
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
