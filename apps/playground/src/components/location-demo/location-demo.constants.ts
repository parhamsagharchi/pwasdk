export const LOCATION_EXAMPLE = `import { Geolocation } from "@pwasdk/core";

if (Geolocation.isSupported()) {
  const position = await Geolocation.getCurrent({
    enableHighAccuracy: true,
  });

  let latest = position;
  const stop = Geolocation.watch((next) => {
    latest = next;
  });

  stop();
}
`;
