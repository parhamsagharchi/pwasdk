import type { ChangeEvent } from "react";

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

export interface IPlaygroundHeroProps {
  packageManager: TPackageManager;
  copied: boolean;
  query: string;
  category: TDemoCategory;
  packageManagerHandlers: Record<TPackageManager, () => void>;
  categoryHandlers: Record<TDemoCategory, () => void>;
  handleCopyInstall: () => void;
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
