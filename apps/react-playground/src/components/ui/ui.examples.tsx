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
import { PUSH_EXAMPLE } from "../push-demo/push-demo.constants";
import PushDemo from "../push-demo";
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
      label="camera vision stream"
      span="col-span-8"
      signature="Camera.openFront() + Camera.watch"
      status="WebRTC Ready"
      title="Vision Lab & Camera Stream"
      description="Hardware-accelerated capture with lens switching and your own Camera.watch frame action."
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
      label="haptic vibration feedback"
      signature="Haptic.trigger('heavy')"
      status="Vibrate Engine"
      title="Tactile Haptics Engine"
      description="Physical vibration patterns with desktop visual feedback."
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
      label="microphone audio"
      signature="Microphone.listen(onTranscript)"
      status="Speech Ready"
      title="Audio Spectrum & Microphone"
      description="Open the mic stream and pass your own listen callback — this card matches “hello”."
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
      label="device information orientation platform"
      span="col-span-8"
      signature="Device.isMobile / Device.orientation"
      status="3-Axis Spatial"
      title="3D Gyroscope & Spatial Motion"
      description="Device telemetry with pointer parallax tilt and live platform signals."
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
      status="Geo Ready"
      title="Geolocation"
      description="Read or watch the user location with the Geolocation helpers."
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
      label="wake lock screen awake"
      signature="WakeLock.request()"
      status="Display Awake"
      title="Screen Wake Lock Engine"
      description="Keep the display awake during workouts, video, or presentations."
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
      status="Display"
      title="Fullscreen"
      description="Toggle fullscreen mode for immersive pages and media."
      code={FULLSCREEN_EXAMPLE}
    >
      <FullscreenDemo />
    </ExampleSlot>
  );
}

function Share() {
  return (
    <ExampleSlot
      category="system"
      label="share native sheet"
      signature="Share.share({ title, url })"
      status="OS Share Sheet"
      title="Native OS Share Target"
      description="Open the system share sheet with a clipboard fallback when needed."
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
      status="Async Clip"
      title="Asynchronous Clipboard"
      description="Async text copy and paste through the Clipboard helpers."
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
      status="VAPID Push"
      title="Push Notification Pipeline"
      description="Register a worker, request permission, and subscribe with your VAPID key."
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
      label="screenshot notify capture"
      signature="Screenshot.watch({ autoNotify })"
      status="Notify Ready"
      title="Screenshot Notification"
      description="Shows a system notification when a screenshot is reported. OS detection needs a native Android/iOS bridge."
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
      signature="Install.init() & Install.prompt()"
      status="Standalone"
      title="Native PWA Installation Flow"
      description="Capture the deferred install event and trigger a custom install prompt."
      code={INSTALL_EXAMPLE}
    >
      <InstallDemo />
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
      status="Dock Badge"
      title="Dynamic App Icon Badging"
      description="Show unread counts on the dock or home-screen icon when supported."
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
      label="storage local session network offline"
      span="col-span-6"
      signature="Device.online & AppStorage"
      status="Cache Hydration"
      title="Network & AppStorage"
      description="Connection telemetry with typed JSON-safe AppStorage helpers."
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
  Share,
  Clipboard,
  Push,
  Screenshot,
  Install,
  Badge,
  Storage,
};
