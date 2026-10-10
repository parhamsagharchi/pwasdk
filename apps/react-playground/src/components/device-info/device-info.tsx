import { useEffect, useRef, useState } from "react";
import { Device, Pwa } from "@pwasdk/core";
import { DEMO_SECTION_CLASS } from "../../constants/demo.constants";
import type { IDeviceInfoProps } from "./device-info.types";

function DeviceInfo({ online, orientation }: IDeviceInfoProps) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [readout, setReadout] = useState("Move pointer to tilt");

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const handleMove = (event: MouseEvent) => {
      const rect = stage.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      const rotY = (x / rect.width) * 40;
      const rotX = -(y / rect.height) * 40;
      setTilt({ x: rotX, y: rotY });
      setReadout(`X: ${rotX.toFixed(0)}°  Y: ${rotY.toFixed(0)}°`);
    };

    const handleLeave = () => {
      setTilt({ x: 0, y: 0 });
      setReadout("Move pointer to tilt");
    };

    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.beta === null || event.gamma === null) return;
      const beta = Math.min(35, Math.max(-35, event.beta - 45));
      const gamma = Math.min(35, Math.max(-35, event.gamma));
      setTilt({ x: beta, y: gamma });
      setReadout(`β: ${beta.toFixed(0)}°  γ: ${gamma.toFixed(0)}°`);
    };

    stage.addEventListener("mousemove", handleMove);
    stage.addEventListener("mouseleave", handleLeave);
    window.addEventListener("deviceorientation", handleOrientation);

    return () => {
      stage.removeEventListener("mousemove", handleMove);
      stage.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  const connection = Device.connection?.effectiveType || "unknown";
  const gimbalStyle = {
    transform: `rotateX(${tilt.x.toFixed(1)}deg) rotateY(${tilt.y.toFixed(1)}deg)`,
  };

  return (
    <section className={DEMO_SECTION_CLASS}>
      <div className="gyro-hologram-stage" ref={stageRef}>
        <div className="gyro-gimbal-card" style={gimbalStyle}>
          <div className="gyro-axis-indicator" />
          <div className="gyro-coord-readout">{readout}</div>
        </div>
      </div>
      <div className="demo-meta demo-meta-spaced">
        <p>
          {Device.isMobile ? "Mobile" : "Desktop"} · {Device.platform} ·{" "}
          {online ? "Online" : "Offline"} ({connection})
        </p>
        <p>
          Screen: {orientation || "—"} · Standalone:{" "}
          {String(Pwa.isStandalone())} · PWA: {Pwa.platform()}
        </p>
      </div>
    </section>
  );
}

export default DeviceInfo;
