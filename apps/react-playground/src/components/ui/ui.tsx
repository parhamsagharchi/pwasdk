import type { ReactNode } from "react";
import AiPrompt from "../ai-prompt";
import ConnectionStatus from "../connection-status";
import Contributors from "../contributors";
import MediaShowcase from "../media-showcase";
import PlaygroundHero from "../playground-hero";
import { usePlaygroundChrome } from "../playground-hero";
import SiteArchitecture from "../site-architecture";
import SiteFooter from "../site-footer";
import SiteHeader from "../site-header";
import { useDemoBootstrap } from "../../hooks/use-demo-bootstrap.hooks";
import { UiContext, useUiContext } from "./ui.hooks";
import type { IUiProps } from "./ui.types";

function Ui({ children }: IUiProps) {
  const { online, debugInfo, protocol, orientation } = useDemoBootstrap();
  const chrome = usePlaygroundChrome();

  return (
    <UiContext.Provider
      value={{ online, debugInfo, protocol, orientation, chrome }}
    >
      <div className="bg-grid-pattern" />
      {children}
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
      query={chrome.query}
      category={chrome.category}
      packageManagerHandlers={chrome.packageManagerHandlers}
      categoryHandlers={chrome.categoryHandlers}
      handleCopyInstall={chrome.handleCopyInstall}
      handleSearchChange={chrome.handleSearchChange}
    />
  );
}

function Examples({ children }: { children: ReactNode }) {
  const { protocol, debugInfo } = useUiContext();

  return (
    <section className="bento-section" id="capabilities">
      <div className="wrap">
        <div className="bento-section-head">
          <h2 className="bento-title">
            <span>Try the modules</span>
          </h2>
          <span className="bento-counter mono">16 live examples</span>
        </div>
        <ConnectionStatus protocol={protocol} debugInfo={debugInfo} />
        <div className="bento-grid">{children}</div>
      </div>
    </section>
  );
}

export const uiParts = {
  Root: Ui,
  Header: SiteHeader,
  Main,
  Hero,
  AiPrompt,
  MediaShowcase,
  Examples,
  HowItWorks: SiteArchitecture,
  Contributors,
  Footer: SiteFooter,
};
