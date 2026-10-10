import type {
  IAiModuleOption,
  TAiFramework,
  TAiModuleId,
  TAiPackageManager,
} from "./ai-prompt.types";

export const AI_FRAMEWORKS: TAiFramework[] = [
  "Next.js",
  "React (Vite)",
  "Vue / Nuxt",
  "SvelteKit",
  "Vanilla TS",
];

export const AI_PACKAGE_MANAGERS: TAiPackageManager[] = [
  "pnpm",
  "npm",
  "bun",
  "yarn",
];

export const AI_MODULE_OPTIONS: IAiModuleOption[] = [
  { id: "Haptic", label: "Haptic — vibration" },
  { id: "Camera", label: "Camera — video stream" },
  { id: "Microphone", label: "Microphone — audio / speech" },
  { id: "Device", label: "Device — platform / online" },
  { id: "Push", label: "Push — web notifications" },
  { id: "Install", label: "Install — PWA prompt" },
  { id: "Pwa", label: "Pwa — platform / standalone" },
  { id: "Share", label: "Share — system share sheet" },
  { id: "Clipboard", label: "Clipboard — copy / paste" },
  { id: "WakeLock", label: "WakeLock — keep screen on" },
  { id: "Orientation", label: "Orientation — lock screen" },
  { id: "Fullscreen", label: "Fullscreen — display mode" },
  { id: "Badge", label: "Badge — app icon count" },
  { id: "Geolocation", label: "Geolocation — GPS" },
  { id: "Screenshot", label: "Screenshot — notify on capture" },
  { id: "AppStorage", label: "AppStorage — local / session" },
];

export const DEFAULT_AI_MODULES: TAiModuleId[] = [
  "Haptic",
  "Camera",
  "Push",
  "Install",
];

export const AI_MODULE_INSTRUCTIONS: Record<TAiModuleId, string> = {
  Haptic:
    "- Haptic: Call Haptic.isSupported() before use, then Haptic.trigger('light' | 'medium' | 'heavy') on interactions.",
  Camera:
    "- Camera: Use Camera.openFront / openBack / openDefault, attach the stream to a <video>, and pass your own frame action to Camera.watch.",
  Microphone:
    "- Microphone: Use Microphone.open for the stream, and Microphone.listen for transcripts; match keywords in your own callback.",
  Push:
    "- Push: Call Push.register('/sw.js'), Push.requestPermission(), and Push.subscribe(VAPID_PUBLIC_KEY).",
  Install:
    "- Install: Call Install.init() once at startup, check Install.canPrompt(), then Install.prompt().",
  Share:
    "- Share: Call Share.share({ title, text, url }) with a clipboard fallback when unsupported.",
  Clipboard:
    "- Clipboard: Use Clipboard.copy(text) and Clipboard.paste() for async clipboard IO.",
  WakeLock:
    "- WakeLock: Keep the display awake with WakeLock.request() and release when the task ends.",
  Badge:
    "- Badge: Update the dock / home icon with Badge.set(count) and Badge.clear().",
  Geolocation:
    "- Geolocation: Use Geolocation.getCurrent() / watch() after checking Geolocation.isSupported().",
  Screenshot:
    "- Screenshot: Call Screenshot.installBridge() in WebViews, Screenshot.watch({ autoNotify: true }) for notifications, and have native Android/iOS call window.PwaSdkScreenshot.notify() on OS screenshots (browsers cannot detect Power+Volume alone).",
  AppStorage:
    "- AppStorage: Persist JSON with AppStorage.local.setJSON / getJSON.",
  Orientation:
    "- Orientation: Check Orientation.isSupported(), read Orientation.current(), and use Orientation.lock / unlock (often needs fullscreen or an installed PWA).",
  Pwa:
    "- Pwa: Use Pwa.platform(), Pwa.isStandalone(), and Pwa.getIOSInstallInstructions() for iOS Add to Home Screen.",
  Device:
    "- Device: Read Device.isMobile, Device.online, Device.platform, and Device.onOnlineStatusChange.",
  Fullscreen:
    "- Fullscreen: Call Fullscreen.isSupported() then Fullscreen.request / exit / toggle.",
};

export const AI_INSTALL_COMMANDS: Record<TAiPackageManager, string> = {
  pnpm: "pnpm add @pwasdk/core",
  npm: "npm i @pwasdk/core",
  bun: "bun add @pwasdk/core",
  yarn: "yarn add @pwasdk/core",
};
