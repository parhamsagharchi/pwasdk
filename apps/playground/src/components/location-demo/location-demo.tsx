import { Geolocation } from "@pwasdk/core";
import {
  DEMO_BUTTON_CLASS,
  DEMO_SECTION_CLASS,
} from "../../constants/demo.constants";
import CodeSnippet from "../code-snippet";
import PageLoader from "../page-loader";
import { LOCATION_EXAMPLE } from "./location-demo.constants";
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
      <h2>📍 Location</h2>
      <p style={{ fontSize: "14px" }}>
        Get the user&apos;s current location using the Geolocation API.
      </p>
      {!Geolocation.isSupported() && (
        <div className="demo-callout">
          <strong>⚠️ Location not supported:</strong>
          <br />
          Your browser does not support the Geolocation API.
        </div>
      )}
      <div>
        <button
          className={DEMO_BUTTON_CLASS}
          onClick={getCurrentLocation}
          disabled={!Geolocation.isSupported()}
        >
          Get Current Location
        </button>
        <button
          className={DEMO_BUTTON_CLASS}
          onClick={toggleWatchLocation}
          disabled={!Geolocation.isSupported()}
        >
          {isWatchingLocation ? "Stop Watching" : "Watch Location"}
        </button>
      </div>
      {locationError && (
        <p style={{ color: "red", marginTop: "10px", fontSize: "13px" }}>
          {locationError}
        </p>
      )}
      {location && (
        <div
          style={{
            marginTop: "10px",
            fontFamily: "monospace",
            fontSize: "14px",
          }}
        >
          <p>
            <strong>Latitude:</strong> {location.lat}
          </p>
          <p>
            <strong>Longitude:</strong> {location.lng}
          </p>
          {location.accuracy != null && (
            <p>
              <strong>Accuracy:</strong> {Math.round(location.accuracy)} m
            </p>
          )}
        </div>
      )}
      <CodeSnippet code={LOCATION_EXAMPLE} />
    </section>
  );
}

export default LocationDemo;
