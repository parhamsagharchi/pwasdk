import type { ReactNode } from "react";
import type {
  IPlaygroundHeroProps,
  TDemoCategory,
} from "../playground-hero/playground-hero.types";

export interface IUiContext {
  online: boolean;
  debugInfo: string;
  protocol: string;
  orientation: string | null;
  chrome: IPlaygroundHeroProps;
}

export interface IUiProps {
  children: ReactNode;
}

export interface IExampleSlotProps {
  category: Exclude<TDemoCategory, "all">;
  label: string;
  span?: "col-span-8" | "col-span-6";
  signature?: string;
  status?: string;
  title: string;
  description: string;
  code: string;
  children: ReactNode;
}
