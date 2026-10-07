import { useRef, useState } from "react";
import { Camera, Microphone } from "@pwasdk/core";

export function useCameraDemo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState("");

  const isMediaDevicesSupported =
    Camera.isSupported() || Microphone.isSupported();

  const stopStream = (
    stream: MediaStream | null,
    setFn: (s: MediaStream | null) => void,
  ) => {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      setFn(null);
    }
  };

  const openCamera = async (which: "front" | "back" | "laptop") => {
    setCameraError("");

    if (!Camera.isSupported()) {
      setCameraError("Camera API is not supported in this browser.");
      return;
    }

    stopStream(cameraStream, setCameraStream);

    try {
      let stream: MediaStream;
      if (which === "front") stream = await Camera.openFront();
      else if (which === "back") stream = await Camera.openBack();
      else stream = await Camera.openDefault();

      setCameraStream(stream);

      if (videoRef.current) {
        Camera.attachToVideo(videoRef.current, stream);
      }
    } catch (e: any) {
      console.error("camera error:", e);
      setCameraError(
        e?.message ||
          "Failed to open camera. Check HTTPS and camera permissions.",
      );
    }
  };

  const stopCameraOnly = () => {
    stopStream(cameraStream, setCameraStream);
    if (videoRef.current) videoRef.current.srcObject = null;
    setCameraError("");
  };

  return {
    videoRef,
    cameraStream,
    cameraError,
    isMediaDevicesSupported,
    openCamera,
    stopCameraOnly,
  };
}
