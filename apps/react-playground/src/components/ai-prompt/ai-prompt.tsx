import {
  AI_FRAMEWORKS,
  AI_MODULE_OPTIONS,
  AI_PACKAGE_MANAGERS,
} from "./ai-prompt.constants";
import { useAiPrompt } from "./ai-prompt.hooks";

function AiPrompt() {
  const {
    state,
    promptText,
    frameworkHandlers,
    packageManagerHandlers,
    moduleHandlers,
    handleCopyClick,
  } = useAiPrompt();

  return (
    <section className="ai-copilot-section" id="copilot">
      <div className="wrap">
        <div className="ai-copilot-card">
          <div className="copilot-header">
            <div className="copilot-title-group">
              <h3>
                <span>AI Prompt Generator</span>
                <span className="ai-badge mono">Cursor / Claude / Copilot</span>
              </h3>
              <p className="copilot-sub">
                Pick a framework and the @pwasdk/core modules you need. Copy the
                prompt and paste it into Cursor, Claude, or ChatGPT to wire the
                real package APIs into your app.
              </p>
            </div>
          </div>

          <div className="copilot-builder-grid">
            <div>
              <div className="builder-field-group">
                <span className="builder-label">1. Select Target Framework</span>
                <div className="selector-chips-row">
                  {AI_FRAMEWORKS.map((framework) => (
                    <button
                      key={framework}
                      type="button"
                      className={
                        state.framework === framework
                          ? "framework-chip active"
                          : "framework-chip"
                      }
                      onClick={frameworkHandlers[framework]}
                    >
                      {framework === "Next.js"
                        ? "Next.js (App Router)"
                        : framework}
                    </button>
                  ))}
                </div>
              </div>

              <div className="builder-field-group">
                <span className="builder-label">2. Package Manager</span>
                <div className="selector-chips-row">
                  {AI_PACKAGE_MANAGERS.map((manager) => (
                    <button
                      key={manager}
                      type="button"
                      className={
                        state.packageManager === manager
                          ? "pm-chip active"
                          : "pm-chip"
                      }
                      onClick={packageManagerHandlers[manager]}
                    >
                      {manager}
                    </button>
                  ))}
                </div>
              </div>

              <div className="builder-field-group">
                <span className="builder-label">
                  3. Select @pwasdk/core Modules
                </span>
                <div className="modules-checklist">
                  {AI_MODULE_OPTIONS.map((option) => {
                    const checked = state.modules.includes(option.id);
                    return (
                      <label
                        key={option.id}
                        className={
                          checked
                            ? "module-check-item checked"
                            : "module-check-item"
                        }
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={moduleHandlers[option.id]}
                        />
                        <span>{option.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            <div>
              <div className="prompt-output-box">
                <div className="prompt-output-header">
                  <div className="prompt-target-tag">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="4 17 10 11 4 5" />
                      <line x1="12" y1="19" x2="20" y2="19" />
                    </svg>
                    <span>ENGINEER PROMPT // CURSOR &amp; CLAUDE</span>
                  </div>
                  <button
                    type="button"
                    className={
                      state.copied ? "btn-copy-prompt copied" : "btn-copy-prompt"
                    }
                    onClick={handleCopyClick}
                  >
                    {state.copied ? "Copied to Clipboard!" : "Copy AI Prompt"}
                  </button>
                </div>
                <pre className="prompt-text-display">{promptText}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AiPrompt;
