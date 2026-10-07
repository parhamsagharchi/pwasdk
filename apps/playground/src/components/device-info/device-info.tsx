import { Device, Pwa } from "@pwasdk/core";
import { DEMO_SECTION_STYLE } from "../../constants/demo.constants";
import type { IDeviceInfoProps } from "./device-info.types";

function DeviceInfo({ online, orientation }: IDeviceInfoProps) {
  return (
    <section style={DEMO_SECTION_STYLE}>
      <h2>📱 Device Information</h2>
      <div style={{ fontFamily: "monospace", fontSize: "14px" }}>
        <p>
          <strong>Mobile:</strong> {String(Device.isMobile)}
        </p>
        <p>
          <strong>Online:</strong> {String(online)}
        </p>
        <p>
          <strong>Platform:</strong> {Device.platform}
        </p>
        <p>
          <strong>User Agent:</strong> {Device.userAgent.substring(0, 50)}...
        </p>
        {Device.connection && (
          <>
            <p>
              <strong>Connection Type:</strong>{" "}
              {Device.connection.effectiveType || "unknown"}
            </p>
            <p>
              <strong>Downlink:</strong> {Device.connection.downlink} Mbps
            </p>
          </>
        )}
        {Device.orientation && (
          <p>
            <strong>Orientation (Device API):</strong> {Device.orientation}
          </p>
        )}
        {orientation && (
          <p>
            <strong>Orientation (Screen API):</strong> {orientation}
          </p>
        )}
        <p>
          <strong>PWA Platform:</strong> {Pwa.platform()}
        </p>
        <p>
          <strong>Standalone:</strong> {String(Pwa.isStandalone())}
        </p>
      </div>
    </section>
  );
}

export default DeviceInfo;
