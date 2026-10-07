import { Geolocation } from "@pwasdk/core";
import {
  DEMO_BUTTON_STYLE,
  DEMO_SECTION_STYLE,
} from "../../constants/demo.constants";
import { useLocationDemo } from "./location-demo.hooks";

function LocationDemo() {
  const {
    location,
    locationError,
    isWatchingLocation,
    getCurrentLocation,
    toggleWatchLocation,
  } = useLocationDemo();

  return (
    <section style={DEMO_SECTION_STYLE}>
      <h2>📍 Location</h2>
      <p style={{ fontSize: "14px" }}>
        Get the user&apos;s current location using the Geolocation API.
      </p>
      {!Geolocation.isSupported() && (
        <div
          style={{
            padding: "10px",
            backgroundColor: "#fff3cd",
            border: "1px solid #ffc107",
            borderRadius: "4px",
            marginBottom: "10px",
          }}
        >
          <strong>⚠️ Location not supported:</strong>
          <br />
          Your browser does not support the Geolocation API.
        </div>
      )}
      <div>
        <button
          style={DEMO_BUTTON_STYLE}
          onClick={getCurrentLocation}
          disabled={!Geolocation.isSupported()}
        >
          Get Current Location
        </button>
        <button
          style={DEMO_BUTTON_STYLE}
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
    </section>
  );
}

export default LocationDemo;
