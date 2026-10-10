import { createContext, useContext } from "react";
import type { IUiContext } from "./ui.types";

export const UiContext = createContext<IUiContext | null>(null);

export function useUiContext(): IUiContext {
  const value = useContext(UiContext);
  if (!value) {
    throw new Error("Ui parts must render inside <Ui>");
  }
  return value;
}
