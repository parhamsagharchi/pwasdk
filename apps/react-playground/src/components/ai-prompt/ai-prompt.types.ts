export type TAiFramework =
  | "Next.js"
  | "React (Vite)"
  | "Vue / Nuxt"
  | "SvelteKit"
  | "Vanilla TS";

export type TAiPackageManager = "pnpm" | "npm" | "bun" | "yarn";

export type TAiModuleId =
  | "Haptic"
  | "Camera"
  | "Microphone"
  | "Push"
  | "Install"
  | "Share"
  | "Clipboard"
  | "WakeLock"
  | "Badge"
  | "Geolocation"
  | "Screenshot"
  | "AppStorage";

export interface IAiModuleOption {
  id: TAiModuleId;
  label: string;
}

export interface IAiPromptState {
  framework: TAiFramework;
  packageManager: TAiPackageManager;
  modules: TAiModuleId[];
  copied: boolean;
}
