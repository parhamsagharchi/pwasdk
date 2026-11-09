export type TPackageManager = "npm" | "pnpm" | "bun" | "yarn";

export type TDemoCategory = "all" | "hardware" | "sensors" | "system" | "network";

export interface IRadarChip {
  id: string;
  label: string;
  active: boolean;
}

export interface IPlaygroundChromeState {
  packageManager: TPackageManager;
  copied: boolean;
  query: string;
  category: TDemoCategory;
}

export type TPlaygroundChromeAction =
  | { type: "SET_PACKAGE_MANAGER"; packageManager: TPackageManager }
  | { type: "SET_COPIED"; copied: boolean }
  | { type: "SET_QUERY"; query: string }
  | { type: "SET_CATEGORY"; category: TDemoCategory };

export interface ICategoryPill {
  id: TDemoCategory;
  label: string;
}

/** Compact hero — install switcher only (search lives in the lab). */
export interface IPlaygroundHeroProps {
  packageManager: TPackageManager;
  copied: boolean;
  packageManagerHandlers: Record<TPackageManager, () => void>;
  handleCopyInstall: () => void;
}
