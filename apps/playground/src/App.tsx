import ConnectionStatus from "./components/connection-status";
import HapticDemo from "./components/haptic-demo";
import ShareDemo from "./components/share-demo";
import ClipboardDemo from "./components/clipboard-demo";
import PushDemo from "./components/push-demo";
import InstallDemo from "./components/install-demo";
import BadgeDemo from "./components/badge-demo";
import CameraDemo from "./components/camera-demo";
import MicrophoneDemo from "./components/microphone-demo";
import DeviceInfo from "./components/device-info";
import LocationDemo from "./components/location-demo";
import WakeLockDemo from "./components/wake-lock-demo";
import FullscreenDemo from "./components/fullscreen-demo";
import StorageDemo from "./components/storage-demo";
import ScreenshotDemo from "./components/screenshot-demo";
import { useDemoBootstrap } from "./hooks/use-demo-bootstrap.hooks";

export default function App() {
  const { online, debugInfo, protocol, orientation } = useDemoBootstrap();

  return (
    <div
      style={{
        padding: 20,
        fontFamily: "sans-serif",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <h1>PWA SDK – Full Demo</h1>

      <ConnectionStatus protocol={protocol} debugInfo={debugInfo} />
      <HapticDemo />
      <ShareDemo />
      <ClipboardDemo />
      <PushDemo />
      <InstallDemo />
      <BadgeDemo />
      <CameraDemo />
      <MicrophoneDemo />
      <ScreenshotDemo />
      <DeviceInfo online={online} orientation={orientation} />
      <LocationDemo />
      <WakeLockDemo />
      <FullscreenDemo />
      <StorageDemo />
    </div>
  );
}
