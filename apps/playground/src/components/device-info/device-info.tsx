import { Device, Pwa } from "@pwasdk/core";
import { DEMO_SECTION_CLASS } from "../../constants/demo.constants";
import CodeSnippet from "../code-snippet";
import { DEVICE_EXAMPLE } from "./device-info.constants";
import type { IDeviceInfoProps } from "./device-info.types";

function DeviceInfo({ online, orientation }: IDeviceInfoProps) {
  return (
    <section className={DEMO_SECTION_CLASS}>
      <h2>📱 Device Information</h2>
      <div className="demo-meta">
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
      <CodeSnippet code={DEVICE_EXAMPLE} />
    </section>
  );
}

export default DeviceInfo;
