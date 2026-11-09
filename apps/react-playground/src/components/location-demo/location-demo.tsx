import { Geolocation } from "@pwasdk/core";
import {
  DEMO_BUTTON_CLASS,
  DEMO_SECTION_CLASS,
} from "../../constants/demo.constants";
import PageLoader from "../page-loader";
import { useLocationDemo } from "./location-demo.hooks";

function LocationDemo() {
  const {
    location,
    locationError,
    isLocationLoading,
    isWatchingLocation,
    getCurrentLocation,
    toggleWatchLocation,
  } = useLocationDemo();

  return (
    <section className={DEMO_SECTION_CLASS}>
      {isLocationLoading ? <PageLoader /> : null}
      {!Geolocation.isSupported() ? (
        <div className="demo-callout">
          Location is not available in this browser.
        </div>
      ) : (
        <p className="demo-meta">
          Ask once for the current position, or keep updating as the user moves.
        </p>
      )}
      <div className="demo-actions-row">
        <button
          type="button"
          className={DEMO_BUTTON_CLASS}
          onClick={getCurrentLocation}
          disabled={!Geolocation.isSupported()}
        >
          Get current location
        </button>
        <button
          type="button"
          className={DEMO_BUTTON_CLASS}
          onClick={toggleWatchLocation}
          disabled={!Geolocation.isSupported()}
        >
          {isWatchingLocation ? "Stop live updates" : "Start live updates"}
        </button>
      </div>
      {locationError ? <p className="demo-error">{locationError}</p> : null}
      {location ? (
        <div className="demo-meta demo-meta-spaced">
          <p>
            <strong>Latitude:</strong> {location.lat}
          </p>
          <p>
            <strong>Longitude:</strong> {location.lng}
          </p>
          {location.accuracy != null ? (
            <p>
              <strong>Accuracy:</strong> about {Math.round(location.accuracy)} m
            </p>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

export default LocationDemo;
