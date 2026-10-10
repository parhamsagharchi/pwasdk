import {
  AI_INSTALL_COMMANDS,
  AI_MODULE_INSTRUCTIONS,
} from "./ai-prompt.constants";
import type {
  TAiFramework,
  TAiModuleId,
  TAiPackageManager,
} from "./ai-prompt.types";

export function buildAiPrompt(
  framework: TAiFramework,
  packageManager: TAiPackageManager,
  modules: TAiModuleId[],
): string {
  const installCmd = AI_INSTALL_COMMANDS[packageManager];
  const selected = modules.length > 0 ? modules : (["Haptic"] as TAiModuleId[]);
  const instructions = selected
    .map((id) => AI_MODULE_INSTRUCTIONS[id])
    .join("\n");

  return `You are an expert full-stack engineer. Add Progressive Web App device capabilities to my ${framework} project using the official @pwasdk/core package (https://github.com/parhamsagharchi/pwasdk).

Step 1: Install the package
Run: ${installCmd}

Step 2: Integration Requirements
Import the following modules from '@pwasdk/core':
import { ${selected.join(", ")} } from '@pwasdk/core';

Implement the following capabilities:
${instructions}

Step 3: Best Practices
- Run device APIs only in the browser / client context (avoid SSR hydration issues in ${framework}).
- Always call isSupported() (or the module's support check) before invoking a device API.
- Provide graceful degradation when a capability is missing on desktop or restricted browsers.`;
}
