import BadgeDemo from "../badge-demo";
import BatteryDemo from "../battery-demo";
import CameraDemo from "../camera-demo";
import ClipboardDemo from "../clipboard-demo";
import ContactsDemo from "../contacts-demo";
import DeviceInfo from "../device-info";
import FullscreenDemo from "../fullscreen-demo";
import HapticDemo from "../haptic-demo";
import InstallDemo from "../install-demo";
import LocationDemo from "../location-demo";
import MediaSessionDemo from "../media-session-demo";
import MicrophoneDemo from "../microphone-demo";
import NetworkDemo from "../network-demo";
import NfcDemo from "../nfc-demo";
import OrientationDemo from "../orientation-demo";
import PasskeyDemo from "../passkey-demo";
import PipDemo from "../pip-demo";
import PushDemo from "../push-demo";
import PwaDemo from "../pwa-demo";
import QrDemo from "../qr-demo";
import ScreenShareDemo from "../screen-share-demo";
import ScreenshotDemo from "../screenshot-demo";
import ShakeDemo from "../shake-demo";
import ShareDemo from "../share-demo";
import StorageDemo from "../storage-demo";
import TorchDemo from "../torch-demo";
import WakeLockDemo from "../wake-lock-demo";
import WebOtpDemo from "../web-otp-demo";
import { useUiContext } from "../ui/ui.hooks";
import type { TModuleLabId } from "./module-lab.types";

export function ModuleLabDemo({ id }: { id: TModuleLabId }) {
  const { online, orientation } = useUiContext();

  switch (id) {
    case "torch":
      return <TorchDemo />;
    case "qr":
      return <QrDemo />;
    case "camera":
      return <CameraDemo />;
    case "shake":
      return <ShakeDemo />;
    case "screenshare":
      return <ScreenShareDemo />;
    case "haptic":
      return <HapticDemo />;
    case "screenshot":
      return <ScreenshotDemo />;
    case "passkey":
      return <PasskeyDemo />;
    case "pip":
      return <PipDemo />;
    case "nfc":
      return <NfcDemo />;
    case "share":
      return <ShareDemo />;
    case "microphone":
      return <MicrophoneDemo />;
    case "contacts":
      return <ContactsDemo />;
    case "mediasession":
      return <MediaSessionDemo />;
    case "webotp":
      return <WebOtpDemo />;
    case "clipboard":
      return <ClipboardDemo />;
    case "geolocation":
      return <LocationDemo />;
    case "wakelock":
      return <WakeLockDemo />;
    case "fullscreen":
      return <FullscreenDemo />;
    case "orientation":
      return <OrientationDemo />;
    case "device":
      return <DeviceInfo online={online} orientation={orientation} />;
    case "network":
      return <NetworkDemo />;
    case "battery":
      return <BatteryDemo />;
    case "push":
      return <PushDemo />;
    case "install":
      return <InstallDemo />;
    case "pwa":
      return <PwaDemo />;
    case "badge":
      return <BadgeDemo />;
    case "storage":
      return <StorageDemo />;
    default:
      return null;
  }
}
