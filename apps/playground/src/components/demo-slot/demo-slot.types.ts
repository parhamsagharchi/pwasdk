import type { ReactNode } from "react";
import type { TDemoCategory } from "../playground-hero/playground-hero.types";

export interface IDemoSlotProps {
  category: Exclude<TDemoCategory, "all">;
  label: string;
  query: string;
  activeCategory: TDemoCategory;
  span?: "col-span-8" | "col-span-6";
  children: ReactNode;
}
