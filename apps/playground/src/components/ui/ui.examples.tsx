import BadgeDemo from "../badge-demo";
import CameraDemo from "../camera-demo";
import ClipboardDemo from "../clipboard-demo";
import DemoSlot from "../demo-slot";
import DeviceInfo from "../device-info";
import FullscreenDemo from "../fullscreen-demo";
import HapticDemo from "../haptic-demo";
import InstallDemo from "../install-demo";
import LocationDemo from "../location-demo";
import MicrophoneDemo from "../microphone-demo";
import PushDemo from "../push-demo";
import ScreenshotDemo from "../screenshot-demo";
import ShareDemo from "../share-demo";
import StorageDemo from "../storage-demo";
import WakeLockDemo from "../wake-lock-demo";
import { useUiContext } from "./ui.hooks";
import type { IExampleSlotProps } from "./ui.types";

function ExampleSlot({ category, label, span, children }: IExampleSlotProps) {
  const { chrome } = useUiContext();

  return (
    <DemoSlot
      category={category}
      label={label}
      query={chrome.query}
      activeCategory={chrome.category}
      span={span}
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
    >
      <CameraDemo />
    </ExampleSlot>
  );
}

function Haptic() {
  return (
    <ExampleSlot category="hardware" label="haptic vibration feedback">
      <HapticDemo />
    </ExampleSlot>
  );
}

function Microphone() {
  return (
    <ExampleSlot category="hardware" label="microphone audio">
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
    >
      <DeviceInfo online={online} orientation={orientation} />
    </ExampleSlot>
  );
}

function Location() {
  return (
    <ExampleSlot category="sensors" label="geolocation location">
      <LocationDemo />
    </ExampleSlot>
  );
}

function WakeLock() {
  return (
    <ExampleSlot category="sensors" label="wake lock screen awake">
      <WakeLockDemo />
    </ExampleSlot>
  );
}

function Fullscreen() {
  return (
    <ExampleSlot category="sensors" label="fullscreen display">
      <FullscreenDemo />
    </ExampleSlot>
  );
}

function Share() {
  return (
    <ExampleSlot category="system" label="share native sheet">
      <ShareDemo />
    </ExampleSlot>
  );
}

function Clipboard() {
  return (
    <ExampleSlot category="system" label="clipboard copy paste">
      <ClipboardDemo />
    </ExampleSlot>
  );
}

function Push() {
  return (
    <ExampleSlot category="system" label="push notifications">
      <PushDemo />
    </ExampleSlot>
  );
}

function Screenshot() {
  return (
    <ExampleSlot category="system" label="screenshot notify capture">
      <ScreenshotDemo />
    </ExampleSlot>
  );
}

function Install() {
  return (
    <ExampleSlot category="system" label="install pwa prompt">
      <InstallDemo />
    </ExampleSlot>
  );
}

function Badge() {
  return (
    <ExampleSlot category="network" label="badge app icon" span="col-span-6">
      <BadgeDemo />
    </ExampleSlot>
  );
}

function Storage() {
  return (
    <ExampleSlot
      category="network"
      label="storage local session"
      span="col-span-6"
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
