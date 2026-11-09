import { useEffect, useRef, useState } from "react";
import { Camera, Microphone } from "@pwasdk/core";

export function useCameraDemo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const stopFramesRef = useRef<(() => void) | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const lastFramePaintRef = useRef(0);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState("");
  const [isCameraLoading, setIsCameraLoading] = useState(false);
  const [frameCallbackRan, setFrameCallbackRan] = useState(false);

  const isMediaDevicesSupported =
    Camera.isSupported() || Microphone.isSupported();

  const stopFrames = () => {
    stopFramesRef.current?.();
    stopFramesRef.current = null;
    lastFramePaintRef.current = 0;
    setFrameCallbackRan(false);
  };

  const stopCameraOnly = () => {
    stopFrames();
    Camera.stop(streamRef.current);
    streamRef.current = null;
    setCameraStream(null);
    if (videoRef.current) videoRef.current.srcObject = null;
    setCameraError("");
  };

  const openCamera = async (which: "front" | "back" | "laptop") => {
    setCameraError("");

    if (!Camera.isSupported()) {
      setCameraError("Camera is not available in this browser.");
      return;
    }

    stopCameraOnly();
    setIsCameraLoading(true);

    try {
      let stream: MediaStream;
      if (which === "front") stream = await Camera.openFront();
      else if (which === "back") stream = await Camera.openBack();
      else stream = await Camera.openDefault();

      streamRef.current = stream;
      setCameraStream(stream);

      if (videoRef.current) {
        const video = videoRef.current;
        Camera.attachToVideo(video, stream);
        stopFramesRef.current = Camera.watch(video, (frame) => {
          if (frame.time - lastFramePaintRef.current < 500) return;
          lastFramePaintRef.current = frame.time;
          setFrameCallbackRan(true);
        });
      }
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      setCameraError(
        message ||
          "Could not open the camera. Check HTTPS and camera permission.",
      );
    } finally {
      setIsCameraLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      stopFrames();
      Camera.stop(streamRef.current);
      streamRef.current = null;
    };
  }, []);

  return {
    videoRef,
    cameraStream,
    cameraError,
    isCameraLoading,
    frameCallbackRan,
    isMediaDevicesSupported,
    openCamera,
    stopCameraOnly,
  };
}
