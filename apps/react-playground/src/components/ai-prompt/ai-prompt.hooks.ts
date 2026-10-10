import { useReducer } from "react";
import { Clipboard } from "@pwasdk/core";
import {
  AI_FRAMEWORKS,
  AI_MODULE_OPTIONS,
  AI_PACKAGE_MANAGERS,
  DEFAULT_AI_MODULES,
} from "./ai-prompt.constants";
import type {
  IAiPromptState,
  TAiFramework,
  TAiModuleId,
  TAiPackageManager,
} from "./ai-prompt.types";
import { buildAiPrompt } from "./ai-prompt.utils";

type TAiPromptAction =
  | { type: "SET_FRAMEWORK"; framework: TAiFramework }
  | { type: "SET_PACKAGE_MANAGER"; packageManager: TAiPackageManager }
  | { type: "TOGGLE_MODULE"; moduleId: TAiModuleId }
  | { type: "SET_COPIED"; copied: boolean };

const initialState: IAiPromptState = {
  framework: "Next.js",
  packageManager: "pnpm",
  modules: DEFAULT_AI_MODULES,
  copied: false,
};

function aiPromptReducer(
  state: IAiPromptState,
  action: TAiPromptAction,
): IAiPromptState {
  switch (action.type) {
    case "SET_FRAMEWORK":
      return { ...state, framework: action.framework };
    case "SET_PACKAGE_MANAGER":
      return { ...state, packageManager: action.packageManager };
    case "TOGGLE_MODULE": {
      const exists = state.modules.includes(action.moduleId);
      const modules = exists
        ? state.modules.filter((id) => id !== action.moduleId)
        : [...state.modules, action.moduleId];
      return { ...state, modules };
    }
    case "SET_COPIED":
      return { ...state, copied: action.copied };
    default:
      return state;
  }
}

export function useAiPrompt() {
  const [state, dispatch] = useReducer(aiPromptReducer, initialState);

  const promptText = buildAiPrompt(
    state.framework,
    state.packageManager,
    state.modules,
  );

  const frameworkHandlers = Object.fromEntries(
    AI_FRAMEWORKS.map((framework) => [
      framework,
      () => {
        dispatch({ type: "SET_FRAMEWORK", framework });
      },
    ]),
  ) as Record<TAiFramework, () => void>;

  const packageManagerHandlers = Object.fromEntries(
    AI_PACKAGE_MANAGERS.map((packageManager) => [
      packageManager,
      () => {
        dispatch({ type: "SET_PACKAGE_MANAGER", packageManager });
      },
    ]),
  ) as Record<TAiPackageManager, () => void>;

  const moduleHandlers = Object.fromEntries(
    AI_MODULE_OPTIONS.map((option) => [
      option.id,
      () => {
        dispatch({ type: "TOGGLE_MODULE", moduleId: option.id });
      },
    ]),
  ) as Record<TAiModuleId, () => void>;

  const handleCopyClick = () => {
    void (async () => {
      try {
        await Clipboard.copy(promptText);
        dispatch({ type: "SET_COPIED", copied: true });
        window.setTimeout(() => {
          dispatch({ type: "SET_COPIED", copied: false });
        }, 1500);
      } catch {
        dispatch({ type: "SET_COPIED", copied: false });
      }
    })();
  };

  return {
    state,
    promptText,
    frameworkHandlers,
    packageManagerHandlers,
    moduleHandlers,
    handleCopyClick,
  };
}
