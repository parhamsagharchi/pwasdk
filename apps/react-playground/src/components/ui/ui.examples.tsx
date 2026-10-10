import { BADGE_EXAMPLE } from "../badge-demo/badge-demo.constants";
import BadgeDemo from "../badge-demo";
import { CAMERA_EXAMPLE } from "../camera-demo/camera-demo.constants";
import CameraDemo from "../camera-demo";
import { CLIPBOARD_EXAMPLE } from "../clipboard-demo/clipboard-demo.constants";
import ClipboardDemo from "../clipboard-demo";
import DemoSlot from "../demo-slot";
import { DEVICE_EXAMPLE } from "../device-info/device-info.constants";
import DeviceInfo from "../device-info";
import { FULLSCREEN_EXAMPLE } from "../fullscreen-demo/fullscreen-demo.constants";
import FullscreenDemo from "../fullscreen-demo";
import { HAPTIC_EXAMPLE } from "../haptic-demo/haptic-demo.constants";
import HapticDemo from "../haptic-demo";
import { INSTALL_EXAMPLE } from "../install-demo/install-demo.constants";
import InstallDemo from "../install-demo";
import { LOCATION_EXAMPLE } from "../location-demo/location-demo.constants";
import LocationDemo from "../location-demo";
import { MICROPHONE_EXAMPLE } from "../microphone-demo/microphone-demo.constants";
import MicrophoneDemo from "../microphone-demo";
import { ORIENTATION_EXAMPLE } from "../orientation-demo/orientation-demo.constants";
import OrientationDemo from "../orientation-demo";
import { PUSH_EXAMPLE } from "../push-demo/push-demo.constants";
import PushDemo from "../push-demo";
import { PWA_EXAMPLE } from "../pwa-demo/pwa-demo.constants";
import PwaDemo from "../pwa-demo";
import { SCREENSHOT_EXAMPLE } from "../screenshot-demo/screenshot-demo.constants";
import ScreenshotDemo from "../screenshot-demo";
import { SHARE_EXAMPLE } from "../share-demo/share-demo.constants";
import ShareDemo from "../share-demo";
import { STORAGE_EXAMPLE } from "../storage-demo/storage-demo.constants";
import StorageDemo from "../storage-demo";
import { WAKE_LOCK_EXAMPLE } from "../wake-lock-demo/wake-lock-demo.constants";
import WakeLockDemo from "../wake-lock-demo";
import { useUiContext } from "./ui.hooks";
import type { IExampleSlotProps } from "./ui.types";

function ExampleSlot({
  category,
  label,
  span,
  signature,
  status,
  title,
  description,
  code,
  children,
}: IExampleSlotProps) {
  const { chrome } = useUiContext();

  return (
    <DemoSlot
      category={category}
      label={label}
      query={chrome.query}
      activeCategory={chrome.category}
      span={span}
      signature={signature}
      status={status}
      title={title}
      description={description}
      code={code}
    >
      {children}
    </DemoSlot>
  );
}

function Camera() {
  return (
    <ExampleSlot
      category="hardware"
      label="camera stream watch"
      span="col-span-8"
      signature="Camera.openFront() · Camera.watch"
      status="getUserMedia"
      title="Camera"
      description="Open the front or back camera and run your own frame callback with Camera.watch."
      code={CAMERA_EXAMPLE}
    >
      <CameraDemo />
    </ExampleSlot>
  );
}

function Haptic() {
  return (
    <ExampleSlot
      category="hardware"
      label="haptic vibration"
      signature="Haptic.trigger('heavy')"
      status="Vibration API"
      title="Haptic"
      description="Trigger short vibration patterns on supported phones."
      code={HAPTIC_EXAMPLE}
    >
      <HapticDemo />
    </ExampleSlot>
  );
}

function Microphone() {
  return (
    <ExampleSlot
      category="hardware"
      label="microphone speech listen"
      signature="Microphone.listen(onTranscript)"
      status="getUserMedia"
      title="Microphone"
      description="Open the mic and pass your own speech callback — this demo listens for “hello”."
      code={MICROPHONE_EXAMPLE}
    >
      <MicrophoneDemo />
    </ExampleSlot>
  );
}

function Device() {
  const { online, orientation } = useUiContext();

  return (
    <ExampleSlot
      category="sensors"
      label="device platform online orientation"
      span="col-span-8"
      signature="Device.isMobile · Device.online"
      status="Navigator"
      title="Device"
      description="Read platform, online status, connection hints, and screen orientation."
      code={DEVICE_EXAMPLE}
    >
      <DeviceInfo online={online} orientation={orientation} />
    </ExampleSlot>
  );
}

function Location() {
  return (
    <ExampleSlot
      category="sensors"
      label="geolocation location"
      signature="Geolocation.getCurrent()"
      status="Geolocation API"
      title="Geolocation"
      description="Get the current position or watch updates with permission."
      code={LOCATION_EXAMPLE}
    >
      <LocationDemo />
    </ExampleSlot>
  );
}

function WakeLock() {
  return (
    <ExampleSlot
      category="sensors"
      label="wake lock screen"
      signature="WakeLock.request()"
      status="Wake Lock API"
      title="WakeLock"
      description="Keep the screen on while a task is active (video, workout, kiosk)."
      code={WAKE_LOCK_EXAMPLE}
    >
      <WakeLockDemo />
    </ExampleSlot>
  );
}

function Fullscreen() {
  return (
    <ExampleSlot
      category="sensors"
      label="fullscreen display"
      signature="Fullscreen.toggle()"
      status="Fullscreen API"
      title="Fullscreen"
      description="Enter or exit fullscreen for the page or an element."
      code={FULLSCREEN_EXAMPLE}
    >
      <FullscreenDemo />
    </ExampleSlot>
  );
}

function OrientationExample() {
  return (
    <ExampleSlot
      category="sensors"
      label="orientation lock portrait landscape"
      signature="Orientation.lock('portrait')"
      status="Screen Orientation"
      title="Orientation"
      description="Read the current screen orientation and lock portrait or landscape when the browser allows it."
      code={ORIENTATION_EXAMPLE}
    >
      <OrientationDemo />
    </ExampleSlot>
  );
}

function Share() {
  return (
    <ExampleSlot
      category="system"
      label="share web share"
      signature="Share.share({ title, url })"
      status="Web Share API"
      title="Share"
      description="Open the system share sheet, with clipboard fallback when share is missing."
      code={SHARE_EXAMPLE}
    >
      <ShareDemo />
    </ExampleSlot>
  );
}

function Clipboard() {
  return (
    <ExampleSlot
      category="system"
      label="clipboard copy paste"
      signature="Clipboard.copy(text)"
      status="Clipboard API"
      title="Clipboard"
      description="Copy and paste text with the async Clipboard helpers."
      code={CLIPBOARD_EXAMPLE}
    >
      <ClipboardDemo />
    </ExampleSlot>
  );
}

function Push() {
  return (
    <ExampleSlot
      category="system"
      label="push notifications"
      signature="Push.subscribe(VAPID_KEY)"
      status="Push API"
      title="Push"
      description="Register a service worker, ask for permission, and subscribe with your VAPID key."
      code={PUSH_EXAMPLE}
    >
      <PushDemo />
    </ExampleSlot>
  );
}

function Screenshot() {
  return (
    <ExampleSlot
      category="system"
      label="screenshot notify"
      signature="Screenshot.watch({ autoNotify })"
      status="Event + Notification"
      title="Screenshot"
      description="Show a notification when a screenshot is reported. Real OS detection needs a native WebView bridge."
      code={SCREENSHOT_EXAMPLE}
    >
      <ScreenshotDemo />
    </ExampleSlot>
  );
}

function Install() {
  return (
    <ExampleSlot
      category="system"
      label="install pwa prompt"
      signature="Install.init() · Install.prompt()"
      status="beforeinstallprompt"
      title="Install"
      description="Catch the browser install event and show your own Install button."
      code={INSTALL_EXAMPLE}
    >
      <InstallDemo />
    </ExampleSlot>
  );
}

function Pwa() {
  return (
    <ExampleSlot
      category="system"
      label="pwa platform standalone ios install"
      signature="Pwa.platform() · Pwa.isStandalone()"
      status="Display mode"
      title="Pwa"
      description="Detect platform, standalone mode, and show iOS Add to Home Screen steps."
      code={PWA_EXAMPLE}
    >
      <PwaDemo />
    </ExampleSlot>
  );
}

function Badge() {
  return (
    <ExampleSlot
      category="network"
      label="badge app icon"
      span="col-span-6"
      signature="Badge.set(count)"
      status="Badging API"
      title="Badge"
      description="Set or clear the unread count on the app icon (when the browser supports it)."
      code={BADGE_EXAMPLE}
    >
      <BadgeDemo />
    </ExampleSlot>
  );
}

function Storage() {
  return (
    <ExampleSlot
      category="network"
      label="storage local session online"
      span="col-span-6"
      signature="AppStorage.local · Device.online"
      status="Storage API"
      title="AppStorage"
      description="Typed get/set/JSON helpers for localStorage and sessionStorage, plus online status."
      code={STORAGE_EXAMPLE}
    >
      <StorageDemo />
    </ExampleSlot>
  );
}

export const uiExamples = {
  Camera,
  Haptic,
  Microphone,
  Device,
  Location,
  WakeLock,
  Fullscreen,
  Orientation: OrientationExample,
  Share,
  Clipboard,
  Push,
  Screenshot,
  Install,
  Pwa,
  Badge,
  Storage,
};
