import type { ReactNode } from "react";
import Contributors from "../contributors";
import ModuleLab from "../module-lab";
import PlaygroundHero from "../playground-hero";
import { usePlaygroundChrome } from "../playground-hero";
import ScreenshotFeedbackSheet from "../screenshot-feedback-sheet";
import ShakeFeedbackSheet from "../shake-feedback-sheet";
import SiteFooter from "../site-footer";
import SiteHeader from "../site-header";
import { useDemoBootstrap } from "../../hooks/use-demo-bootstrap.hooks";
import { useScreenshotFeedback } from "../../hooks/use-screenshot-feedback.hooks";
import { useShakeFeedback } from "../../hooks/use-shake-feedback.hooks";
import { UiContext, useUiContext } from "./ui.hooks";
import type { IUiProps } from "./ui.types";

function Ui({ children }: IUiProps) {
  const { online, debugInfo, protocol, orientation } = useDemoBootstrap();
  const chrome = usePlaygroundChrome();
  const shake = useShakeFeedback();
  const screenshot = useScreenshotFeedback();

  return (
    <UiContext.Provider
      value={{
        online,
        debugInfo,
        protocol,
        orientation,
        chrome,
        shake,
        screenshot,
      }}
    >
      <div className="bg-grid-pattern" />
      {children}
      <ShakeFeedbackSheet
        open={shake.isSheetOpen}
        lastShake={shake.lastShake}
        onClose={shake.closeSheet}
      />
      <ScreenshotFeedbackSheet
        open={screenshot.isSheetOpen}
        lastEvent={screenshot.lastEvent}
        onClose={screenshot.closeSheet}
      />
    </UiContext.Provider>
  );
}

function Main({ children }: { children: ReactNode }) {
  return <main>{children}</main>;
}

function Hero() {
  const { chrome } = useUiContext();
  return (
    <PlaygroundHero
      packageManager={chrome.packageManager}
      copied={chrome.copied}
      packageManagerHandlers={chrome.packageManagerHandlers}
      handleCopyInstall={chrome.handleCopyInstall}
    />
  );
}

export const uiParts = {
  Root: Ui,
  Header: SiteHeader,
  Main,
  Hero,
  Lab: ModuleLab,
  Contributors,
  Footer: SiteFooter,
};
