import { useRef, useState } from "react";
import { Geolocation, type IGeoPosition } from "@pwasdk/core";

export function useLocationDemo() {
  const [location, setLocation] = useState<IGeoPosition | null>(null);
  const [locationError, setLocationError] = useState("");
  const [isWatchingLocation, setIsWatchingLocation] = useState(false);
  const locationStopRef = useRef<(() => void) | null>(null);

  const getCurrentLocation = async () => {
    setLocationError("");
    try {
      const pos = await Geolocation.getCurrent({
        enableHighAccuracy: true,
        timeout: 10000,
      });
      setLocation(pos);
    } catch (e: any) {
      setLocationError(e?.message || "Failed to get location");
    }
  };

  const toggleWatchLocation = () => {
    if (!isWatchingLocation) {
      setLocationError("");
      try {
        const stop = Geolocation.watch(
          (pos) => {
            setLocation(pos);
          },
          (err) => {
            setLocationError(err.message);
          },
          { enableHighAccuracy: true },
        );
        locationStopRef.current = stop;
        setIsWatchingLocation(true);
      } catch (e: any) {
        setLocationError(e?.message || "Failed to watch location");
      }
    } else {
      if (locationStopRef.current) locationStopRef.current();
      locationStopRef.current = null;
      setIsWatchingLocation(false);
    }
  };

  return {
    location,
    locationError,
    isWatchingLocation,
    getCurrentLocation,
    toggleWatchLocation,
  };
}
