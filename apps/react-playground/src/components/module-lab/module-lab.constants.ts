import { BADGE_EXAMPLE } from "../badge-demo/badge-demo.constants";
import { BATTERY_EXAMPLE } from "../battery-demo/battery-demo.constants";
import { CAMERA_EXAMPLE } from "../camera-demo/camera-demo.constants";
import { CLIPBOARD_EXAMPLE } from "../clipboard-demo/clipboard-demo.constants";
import { CONTACTS_EXAMPLE } from "../contacts-demo/contacts-demo.constants";
import { DEVICE_EXAMPLE } from "../device-info/device-info.constants";
import { FULLSCREEN_EXAMPLE } from "../fullscreen-demo/fullscreen-demo.constants";
import { HAPTIC_EXAMPLE } from "../haptic-demo/haptic-demo.constants";
import { INSTALL_EXAMPLE } from "../install-demo/install-demo.constants";
import { LOCATION_EXAMPLE } from "../location-demo/location-demo.constants";
import { MEDIA_SESSION_EXAMPLE } from "../media-session-demo/media-session-demo.constants";
import { MICROPHONE_EXAMPLE } from "../microphone-demo/microphone-demo.constants";
import { NETWORK_EXAMPLE } from "../network-demo/network-demo.constants";
import { NFC_EXAMPLE } from "../nfc-demo/nfc-demo.constants";
import { ORIENTATION_EXAMPLE } from "../orientation-demo/orientation-demo.constants";
import { PASSKEY_EXAMPLE } from "../passkey-demo/passkey-demo.constants";
import { PIP_EXAMPLE } from "../pip-demo/pip-demo.constants";
import { PUSH_EXAMPLE } from "../push-demo/push-demo.constants";
import { PWA_EXAMPLE } from "../pwa-demo/pwa-demo.constants";
import { QR_EXAMPLE } from "../qr-demo/qr-demo.constants";
import { SCREEN_SHARE_EXAMPLE } from "../screen-share-demo/screen-share-demo.constants";
import { SCREENSHOT_EXAMPLE } from "../screenshot-demo/screenshot-demo.constants";
import { SHAKE_EXAMPLE } from "../shake-demo/shake-demo.constants";
import { SHARE_EXAMPLE } from "../share-demo/share-demo.constants";
import { STORAGE_EXAMPLE } from "../storage-demo/storage-demo.constants";
import { TORCH_EXAMPLE } from "../torch-demo/torch-demo.constants";
import { WAKE_LOCK_EXAMPLE } from "../wake-lock-demo/wake-lock-demo.constants";
import { WEB_OTP_EXAMPLE } from "../web-otp-demo/web-otp-demo.constants";
import type { IModuleLabItem, TModuleLabId } from "./module-lab.types";

/**
 * Wow-first order: instant physical / visual demos first,
 * then social-app patterns, then utilities.
 */
export const MODULE_LAB_ITEMS: IModuleLabItem[] = [
  {
    id: "torch",
    title: "Torch",
    hint: "Phone flashlight",
    blurb:
      "Turn the real flashlight on — one tap, instant wow on Android phones.",
    signature: "Torch.setEnabled(stream, true)",
    code: TORCH_EXAMPLE,
  },
  {
    id: "qr",
    title: "QR",
    hint: "Scan QR codes",
    blurb:
      "Open the camera and read a QR code automatically — same idea as Telegram scan.",
    signature: "Qr.watch(video, onDetect)",
    code: QR_EXAMPLE,
  },
  {
    id: "camera",
    title: "Camera",
    hint: "Open the camera",
    blurb:
      "Open the front or back camera, show live video, and run code on each frame if you need it.",
    signature: "Camera.openFront() · watch",
    code: CAMERA_EXAMPLE,
  },
  {
    id: "shake",
    title: "Shake",
    hint: "Detect phone shake",
    blurb:
      "When the user shakes the phone, run your code — for example open a “Report a problem” sheet (like Instagram).",
    signature: "Shake.watch(onShake)",
    code: SHAKE_EXAMPLE,
  },
  {
    id: "screenshare",
    title: "ScreenShare",
    hint: "Share your screen",
    blurb: "Let the user pick a tab or window and share it live in your app.",
    signature: "ScreenShare.start()",
    code: SCREEN_SHARE_EXAMPLE,
  },
  {
    id: "haptic",
    title: "Haptic",
    hint: "Vibrate the phone",
    blurb:
      "Make the phone vibrate — useful for button feedback, alerts, and confirmations.",
    signature: "Haptic.trigger('heavy')",
    code: HAPTIC_EXAMPLE,
  },
  {
    id: "screenshot",
    title: "Screenshot",
    hint: "React to screenshots",
    blurb:
      "When a screenshot is detected, show your own tip or warning. Real phone detection needs a native Android app shell — in the browser, use Simulate.",
    signature: "Screenshot.watch({ onDetected })",
    code: SCREENSHOT_EXAMPLE,
  },
  {
    id: "passkey",
    title: "Passkey",
    hint: "Face ID / fingerprint",
    blurb:
      "Passwordless login with Face ID or fingerprint via WebAuthn passkeys.",
    signature: "Passkey.create({ ... })",
    code: PASSKEY_EXAMPLE,
  },
  {
    id: "pip",
    title: "PiP",
    hint: "Floating video",
    blurb:
      "Pop a video into a floating Picture-in-Picture window while the user browses.",
    signature: "Pip.enter(video)",
    code: PIP_EXAMPLE,
  },
  {
    id: "nfc",
    title: "NFC",
    hint: "Tap to read tags",
    blurb:
      "Read or write NFC tags on Android Chrome — hold the phone near a chip.",
    signature: "Nfc.read(onReading)",
    code: NFC_EXAMPLE,
  },
  {
    id: "share",
    title: "Share",
    hint: "Open share menu",
    blurb:
      "Open the phone’s share menu so the user can send a link via WhatsApp, Messages, and more.",
    signature: "Share.share({ title, url })",
    code: SHARE_EXAMPLE,
  },
  {
    id: "microphone",
    title: "Microphone",
    hint: "Mic + speech to text",
    blurb:
      "Turn on the microphone, and optionally convert speech to text (this demo listens for the word “hello”).",
    signature: "Microphone.listen(onText)",
    code: MICROPHONE_EXAMPLE,
  },
  {
    id: "contacts",
    title: "Contacts",
    hint: "Pick from address book",
    blurb:
      "Open the phone contacts picker to invite friends — feels like a native app.",
    signature: "Contacts.pick(['name', 'tel'])",
    code: CONTACTS_EXAMPLE,
  },
  {
    id: "mediasession",
    title: "MediaSession",
    hint: "Lock screen controls",
    blurb:
      "Show Now Playing metadata and play/pause on the lock screen — like Spotify.",
    signature: "MediaSession.setMetadata({ title })",
    code: MEDIA_SESSION_EXAMPLE,
  },
  {
    id: "webotp",
    title: "WebOtp",
    hint: "Auto-read SMS codes",
    blurb:
      "Wait for an SMS one-time code and fill it automatically (Android Chrome).",
    signature: "WebOtp.listen()",
    code: WEB_OTP_EXAMPLE,
  },
  {
    id: "badge",
    title: "Badge",
    hint: "Icon unread count",
    blurb:
      "Put a number badge on the app icon (like unread messages). Works only where the browser supports it.",
    signature: "Badge.set(count)",
    code: BADGE_EXAMPLE,
  },
  {
    id: "battery",
    title: "Battery",
    hint: "Battery level",
    blurb:
      "Read battery percent and whether the phone is charging. Not available on many iPhones.",
    signature: "Battery.getStatus()",
    code: BATTERY_EXAMPLE,
  },
  {
    id: "network",
    title: "Network",
    hint: "Connection speed",
    blurb:
      "See if the user is online and roughly how fast the connection is (2G–4G). Helpful for low-bandwidth UIs.",
    signature: "Network.getStatus()",
    code: NETWORK_EXAMPLE,
  },
  {
    id: "geolocation",
    title: "Location",
    hint: "Read GPS position",
    blurb:
      "Ask for the user’s location once, or keep updating as they move (with permission).",
    signature: "Geolocation.getCurrent()",
    code: LOCATION_EXAMPLE,
  },
  {
    id: "clipboard",
    title: "Clipboard",
    hint: "Copy and paste text",
    blurb: "Copy text to the clipboard, or read what the user pasted.",
    signature: "Clipboard.copy(text)",
    code: CLIPBOARD_EXAMPLE,
  },
  {
    id: "fullscreen",
    title: "Fullscreen",
    hint: "Fill the whole screen",
    blurb: "Expand the page (or an element) to fill the entire screen, then exit again.",
    signature: "Fullscreen.toggle()",
    code: FULLSCREEN_EXAMPLE,
  },
  {
    id: "wakelock",
    title: "Wake Lock",
    hint: "Keep the screen on",
    blurb:
      "Stop the screen from sleeping — useful for video, workouts, recipes, or kiosk screens.",
    signature: "WakeLock.request()",
    code: WAKE_LOCK_EXAMPLE,
  },
  {
    id: "orientation",
    title: "Orientation",
    hint: "Lock screen rotation",
    blurb:
      "Lock the screen to portrait or landscape when the browser allows it (often needs fullscreen or an installed app).",
    signature: "Orientation.lock('portrait')",
    code: ORIENTATION_EXAMPLE,
  },
  {
    id: "device",
    title: "Device",
    hint: "Phone or desktop?",
    blurb:
      "Read basic device info: phone vs desktop, online/offline, platform, and screen orientation.",
    signature: "Device.isMobile · online",
    code: DEVICE_EXAMPLE,
  },
  {
    id: "install",
    title: "Install",
    hint: "Add app to home screen",
    blurb:
      "Show an Install button when the browser is ready — or guide iPhone users through Add to Home Screen.",
    signature: "Install.prompt()",
    code: INSTALL_EXAMPLE,
  },
  {
    id: "push",
    title: "Push",
    hint: "Push notifications",
    blurb:
      "Ask permission and subscribe so your server can send notifications even when the tab is closed.",
    signature: "Push.subscribe(VAPID)",
    code: PUSH_EXAMPLE,
  },
  {
    id: "pwa",
    title: "PWA",
    hint: "Is the app installed?",
    blurb:
      "Detect platform (iOS / Android / desktop) and whether the app is already running from the home screen.",
    signature: "Pwa.platform()",
    code: PWA_EXAMPLE,
  },
  {
    id: "storage",
    title: "Storage",
    hint: "Save data on device",
    blurb:
      "Save and read small values on the device (like a name) with simple helpers for local and session storage.",
    signature: "AppStorage.local.setJSON",
    code: STORAGE_EXAMPLE,
  },
];

export const DEFAULT_MODULE_LAB_ID: TModuleLabId = "torch";
