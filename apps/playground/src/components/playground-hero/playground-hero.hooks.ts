import { useEffect, useReducer } from "react";
import type { ChangeEvent } from "react";
import { INSTALL_COMMANDS } from "./playground-hero.constants";
import type {
  IPlaygroundChromeState,
  TDemoCategory,
  TPackageManager,
  TPlaygroundChromeAction,
} from "./playground-hero.types";

const initialState: IPlaygroundChromeState = {
  packageManager: "pnpm",
  copied: false,
  query: "",
  category: "all",
};

function playgroundChromeReducer(
  state: IPlaygroundChromeState,
  action: TPlaygroundChromeAction,
): IPlaygroundChromeState {
  switch (action.type) {
    case "SET_PACKAGE_MANAGER":
      return { ...state, packageManager: action.packageManager, copied: false };
    case "SET_COPIED":
      return { ...state, copied: action.copied };
    case "SET_QUERY":
      return { ...state, query: action.query };
    case "SET_CATEGORY":
      return { ...state, category: action.category };
    default:
      return state;
  }
}

export function usePlaygroundChrome() {
  const [state, dispatch] = useReducer(playgroundChromeReducer, initialState);

  useEffect(() => {
    const handleSlashShortcut = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      if (event.key !== "/") return;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      event.preventDefault();
      document.getElementById("cyber-search-input")?.focus();
    };

    document.addEventListener("keydown", handleSlashShortcut);
    return () => document.removeEventListener("keydown", handleSlashShortcut);
  }, []);

  const handleSelectNpm = () => {
    dispatch({ type: "SET_PACKAGE_MANAGER", packageManager: "npm" });
  };
  const handleSelectPnpm = () => {
    dispatch({ type: "SET_PACKAGE_MANAGER", packageManager: "pnpm" });
  };
  const handleSelectBun = () => {
    dispatch({ type: "SET_PACKAGE_MANAGER", packageManager: "bun" });
  };
  const handleSelectYarn = () => {
    dispatch({ type: "SET_PACKAGE_MANAGER", packageManager: "yarn" });
  };

  const handleCopyInstall = async () => {
    const command = INSTALL_COMMANDS[state.packageManager];
    try {
      await navigator.clipboard.writeText(command);
      dispatch({ type: "SET_COPIED", copied: true });
      window.setTimeout(() => {
        dispatch({ type: "SET_COPIED", copied: false });
      }, 1500);
    } catch {
      dispatch({ type: "SET_COPIED", copied: false });
    }
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_QUERY", query: event.target.value });
  };

  const handleSelectAll = () => {
    dispatch({ type: "SET_CATEGORY", category: "all" });
  };
  const handleSelectHardware = () => {
    dispatch({ type: "SET_CATEGORY", category: "hardware" });
  };
  const handleSelectSensors = () => {
    dispatch({ type: "SET_CATEGORY", category: "sensors" });
  };
  const handleSelectSystem = () => {
    dispatch({ type: "SET_CATEGORY", category: "system" });
  };
  const handleSelectNetwork = () => {
    dispatch({ type: "SET_CATEGORY", category: "network" });
  };

  const packageManagerHandlers: Record<TPackageManager, () => void> = {
    npm: handleSelectNpm,
    pnpm: handleSelectPnpm,
    bun: handleSelectBun,
    yarn: handleSelectYarn,
  };

  const categoryHandlers: Record<TDemoCategory, () => void> = {
    all: handleSelectAll,
    hardware: handleSelectHardware,
    sensors: handleSelectSensors,
    system: handleSelectSystem,
    network: handleSelectNetwork,
  };

  return {
    ...state,
    packageManagerHandlers,
    categoryHandlers,
    handleCopyInstall,
    handleSearchChange,
  };
}
