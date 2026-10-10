import { useEffect, useReducer } from "react";
import {
  Clipboard,
  Device,
  Haptic,
  Install,
  Orientation,
  Push,
} from "@pwasdk/core";

interface IDemoBootstrapState {
  online: boolean;
  debugInfo: string;
  protocol: string;
  orientation: string | null;
}

type TDemoBootstrapAction =
  | { type: "SET_ONLINE"; online: boolean }
  | { type: "SET_ORIENTATION"; orientation: string | null }
  | { type: "SET_DEBUG"; debugInfo: string; protocol: string };

const initialState: IDemoBootstrapState = {
  online: Device.online,
  debugInfo: "",
  protocol: window.location.protocol,
  orientation: null,
};

function demoBootstrapReducer(
  state: IDemoBootstrapState,
  action: TDemoBootstrapAction,
): IDemoBootstrapState {
  switch (action.type) {
    case "SET_ONLINE":
      return { ...state, online: action.online };
    case "SET_ORIENTATION":
      return { ...state, orientation: action.orientation };
    case "SET_DEBUG":
      return {
        ...state,
        debugInfo: action.debugInfo,
        protocol: action.protocol,
      };
    default:
      return state;
  }
}

export function useDemoBootstrap() {
  const [state, dispatch] = useReducer(demoBootstrapReducer, initialState);

  useEffect(() => {
    Install.init();
    const unsubscribe = Device.onOnlineStatusChange((isOnline) => {
      dispatch({ type: "SET_ONLINE", online: isOnline });
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!Orientation.isSupported()) return;
    dispatch({ type: "SET_ORIENTATION", orientation: Orientation.current() });
    const unsubscribe = Orientation.onChange((o) => {
      dispatch({ type: "SET_ORIENTATION", orientation: o });
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    console.log("App mounted, checking features...");

    const isHTTPS = window.location.protocol === "https:";
    const isLocalhost =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    const warnings: string[] = [];

    if (!isHTTPS && !isLocalhost) {
      warnings.push(
        "⚠️ HTTPS required for many PWA features! Use https:// instead of http://",
      );
    }

    if (!Haptic.isSupported()) {
      warnings.push(
        "📳 Haptic not supported - Make sure you're on a mobile device",
      );
    }

    if (!Clipboard.isSupported()) {
      warnings.push("📋 Clipboard requires HTTPS (except localhost)");
    }

    if (!Push.isSupported()) {
      warnings.push("🔔 Push notifications require HTTPS");
    }

    dispatch({
      type: "SET_DEBUG",
      debugInfo: warnings.join("\n"),
      protocol: window.location.protocol,
    });
    console.log("Protocol:", window.location.protocol);
    console.log("Hostname:", window.location.hostname);
  }, []);

  return state;
}
