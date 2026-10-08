import { uiExamples } from "./ui.examples";
import { uiParts } from "./ui";

export const Ui = Object.assign(uiParts.Root, {
  Header: uiParts.Header,
  Main: uiParts.Main,
  Hero: uiParts.Hero,
  Examples: uiParts.Examples,
  HowItWorks: uiParts.HowItWorks,
  Contributors: uiParts.Contributors,
  Footer: uiParts.Footer,
  ...uiExamples,
});
