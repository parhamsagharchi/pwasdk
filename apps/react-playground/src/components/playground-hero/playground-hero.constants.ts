import type {
  ICategoryPill,
  TPackageManager,
} from "./playground-hero.types";

export const INSTALL_COMMANDS: Record<TPackageManager, string> = {
  npm: "npm i @pwasdk/core",
  pnpm: "pnpm add @pwasdk/core",
  bun: "bun add @pwasdk/core",
  yarn: "yarn add @pwasdk/core",
};

export const PACKAGE_MANAGERS: TPackageManager[] = [
  "npm",
  "pnpm",
  "bun",
  "yarn",
];

export const CATEGORY_PILLS: ICategoryPill[] = [
  { id: "all", label: "All Modules (14)" },
  { id: "hardware", label: "Hardware & Vision (3)" },
  { id: "sensors", label: "Sensors & Motion (4)" },
  { id: "system", label: "System & Data (5)" },
  { id: "network", label: "Network & Storage (2)" },
];

export const GITHUB_URL = "https://github.com/parhamsagharchi/pwasdk";
export const SDK_VERSION = "v1.1.0";
