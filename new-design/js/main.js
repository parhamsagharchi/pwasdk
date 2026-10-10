/* ============================================================
   PWA SDK — main.js
   Package Switcher, Hardware Auto-Scanner, Code Modal, AI Copilot
   ============================================================ */

(function () {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ---------------------------------------------------------
     1. Automatic Hardware Capability Scanner
  --------------------------------------------------------- */
  function probeHardwareCapabilities() {
    const capabilities = {
      haptics: 'vibrate' in navigator,
      camera: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
      audio: !!(window.AudioContext || window.webkitAudioContext),
      push: 'serviceWorker' in navigator && 'Notification' in window,
      gyro: 'DeviceOrientationEvent' in window,
      clipboard: !!(navigator.clipboard && navigator.clipboard.writeText),
      share: 'share' in navigator,
      battery: 'getBattery' in navigator,
      wakelock: 'wakeLock' in navigator,
      badge: 'setAppBadge' in navigator,
      connection: 'connection' in navigator,
      storage: 'storage' in navigator && 'persist' in navigator.storage
    };

    let activeCount = 0;
    const totalCount = Object.keys(capabilities).length;

    for (const key in capabilities) {
      if (capabilities[key]) activeCount++;
      const chip = document.getElementById(`radar-${key}`);
      if (chip) {
        if (capabilities[key]) {
          chip.classList.add('active');
        } else {
          chip.classList.remove('active');
        }
      }
    }

    const headline = document.getElementById('hardware-scanner-summary');
    if (headline) {
      headline.textContent = `${activeCount} / ${totalCount} NATIVE APIS DETECTED ON THIS BROWSER`;
    }
  }

  probeHardwareCapabilities();

  /* ---------------------------------------------------------
     2. Package Manager Switcher (pnpm / npm / bun / yarn)
  --------------------------------------------------------- */
  const pmTabs = $$('.pm-tab');
  const installCmdCode = document.getElementById('install-cmd-code');
  const installCmdLine = document.getElementById('install-cmd-line');
  const copyBadge = document.getElementById('copy-cmd-badge');

  const commands = {
    pnpm: 'pnpm add @pwasdk/core',
    npm: 'npm i @pwasdk/core',
    bun: 'bun add @pwasdk/core',
    yarn: 'yarn add @pwasdk/core'
  };

  let activePm = 'pnpm';

  pmTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      pmTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      activePm = tab.dataset.pm;
      if (installCmdCode) installCmdCode.textContent = commands[activePm];
      updateCopilotPrompt();
    });
  });

  if (installCmdLine) {
    installCmdLine.addEventListener('click', async () => {
      const cmd = commands[activePm] || 'pnpm add @pwasdk/core';
      try {
        await navigator.clipboard.writeText(cmd);
      } catch (_) {}
      if (copyBadge) {
        const prev = copyBadge.textContent;
        copyBadge.textContent = 'Copied!';
        copyBadge.style.color = 'var(--emerald)';
        setTimeout(() => {
          copyBadge.textContent = prev;
          copyBadge.style.color = '';
        }, 1500);
      }
    });
  }

  /* ---------------------------------------------------------
     3. Cyber Code Modal
  --------------------------------------------------------- */
  const modal = (function createModal() {
    let el = document.getElementById('cyber-modal');
    if (!el) {
      el = document.createElement('div');
      el.className = 'cyber-modal';
      el.id = 'cyber-modal';
      el.innerHTML = `
        <div class="cyber-modal-backdrop" data-close></div>
        <div class="cyber-modal-dialog" role="dialog" aria-modal="true" aria-label="API Source Code">
          <div class="cyber-modal-head">
            <div class="cyber-modal-title"></div>
            <button class="cyber-modal-close" data-close aria-label="Close">✕</button>
          </div>
          <div class="cyber-modal-content"></div>
        </div>
      `;
      document.body.appendChild(el);
    }
    return el;
  })();

  const modalTitle = $('.cyber-modal-title', modal);
  const modalContent = $('.cyber-modal-content', modal);
  let lastTrigger = null;

  const openCodeModal = (card) => {
    const panel = $('.code-panel', card);
    if (!panel) return;
    const name = ($('.bento-foot-title', card) || {}).textContent || 'API Implementation';
    const sig = ($('.method-sig-badge', card) || {}).textContent || '';

    modalTitle.innerHTML = `${name} ${sig ? `<span class="param">${sig}</span>` : ''}`;

    modalContent.innerHTML = '';
    const clone = panel.cloneNode(true);
    clone.style.display = 'block';
    modalContent.appendChild(clone);

    // Default to the first (TypeScript SDK) tab
    const tabs = $$('.cyber-tab', clone);
    const pres = $$('pre[data-lang]', clone);
    tabs.forEach((t, i) => t.classList.toggle('active', i === 0));
    const firstLang = tabs[0] && tabs[0].dataset.lang;
    pres.forEach((p) => p.classList.toggle('hidden', p.dataset.lang !== firstLang));

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeCodeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => {
      modalContent.innerHTML = '';
    }, 250);
    if (lastTrigger) lastTrigger.focus();
  };

  $$('.btn-code-trigger').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      lastTrigger = btn;
      openCodeModal(btn.closest('.bento-card'));
    });
  });

  modal.addEventListener('click', async (e) => {
    if (e.target.closest('[data-close]')) {
      closeCodeModal();
      return;
    }

    const tab = e.target.closest('.cyber-tab');
    if (tab) {
      const lang = tab.dataset.lang;
      $$('.cyber-tab', modalContent).forEach((t) => t.classList.toggle('active', t === tab));
      $$('pre[data-lang]', modalContent).forEach((pre) => {
        pre.classList.toggle('hidden', pre.dataset.lang !== lang);
      });
      return;
    }

    const copyBtn = e.target.closest('.cyber-copy-btn');
    if (copyBtn) {
      const visible = $$('pre[data-lang]', modalContent).find((p) => !p.classList.contains('hidden'));
      if (!visible) return;
      try {
        await navigator.clipboard.writeText(visible.innerText.trim());
      } catch (_) {
        const r = document.createRange();
        r.selectNodeContents(visible);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(r);
        document.execCommand('copy');
        sel.removeAllRanges();
      }
      const prev = copyBtn.textContent;
      copyBtn.textContent = 'Copied!';
      copyBtn.classList.add('copied');
      setTimeout(() => {
        copyBtn.textContent = prev;
        copyBtn.classList.remove('copied');
      }, 1400);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeCodeModal();
    }
  });

  /* ---------------------------------------------------------
     4. Instant Search & '/' Shortcut
  --------------------------------------------------------- */
  const searchInput = document.getElementById('cyber-search-input');
  const cards = $$('.bento-card');

  function filterCards() {
    const q = (searchInput ? searchInput.value : '').trim().toLowerCase();

    cards.forEach((card) => {
      const text = card.textContent.toLowerCase();
      const matches = !q || text.includes(q);
      card.style.display = matches ? 'flex' : 'none';
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterCards);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== searchInput && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      if (searchInput) {
        searchInput.focus();
        searchInput.select();
      }
    }
  });

  /* ---------------------------------------------------------
     5. Category Pills Filter
  --------------------------------------------------------- */
  const catPills = $$('.cat-pill');
  catPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      catPills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');

      const cat = pill.dataset.cat;
      cards.forEach((card) => {
        const cardCat = card.dataset.category || 'all';
        const matches = cat === 'all' || cardCat.includes(cat);
        card.style.display = matches ? 'flex' : 'none';
      });
    });
  });

  /* ---------------------------------------------------------
     6. Interactive AI Prompt Copilot Generator
  --------------------------------------------------------- */
  let copilotFramework = 'Next.js';
  let copilotPm = 'pnpm';
  const promptOutputEl = document.getElementById('copilot-prompt-text');
  const copyPromptBtn = document.getElementById('btn-copy-copilot-prompt');

  const frameworkChips = $$('.framework-chip');
  frameworkChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      frameworkChips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      copilotFramework = chip.dataset.framework;
      updateCopilotPrompt();
    });
  });

  const pmChips = $$('.pm-chip');
  pmChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      pmChips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      copilotPm = chip.dataset.pm;
      updateCopilotPrompt();
    });
  });

  const moduleChecks = $$('.module-check-item input');
  moduleChecks.forEach((input) => {
    input.addEventListener('change', () => {
      input.closest('.module-check-item').classList.toggle('checked', input.checked);
      updateCopilotPrompt();
    });
  });

  function updateCopilotPrompt() {
    if (!promptOutputEl) return;

    const selectedModules = [];
    $$('.module-check-item input:checked').forEach((input) => {
      selectedModules.push(input.value);
    });

    const installCmd = `${copilotPm} add @pwasdk/core`;

    const moduleInstructions = {
      Haptic: "- Haptic: Call Haptic.isSupported() before use, and trigger Haptic.trigger('light') on button clicks / interactions.",
      Push: "- Push: Call Push.register('/sw.js'), Push.requestPermission(), and Push.subscribe(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || VAPID_KEY).",
      Camera: "- Camera: Use Camera stream helpers with user/environment facingMode switching and error boundaries.",
      Install: "- Install: Call Install.init() once at startup, check Install.canPrompt(), and trigger custom Install.prompt().",
      Share: "- Share: Call Share.share({ title, text, url }) with fallback clipboard copy if unsupported.",
      Clipboard: "- Clipboard: Use Clipboard.copy(text) and Clipboard.paste() for clean async copy/paste operations.",
      Geolocation: "- Geolocation: Fetch coordinates via Geolocation.getCurrent() and persist safely via AppStorage.local.",
      WakeLock: "- WakeLock: Keep display awake using WakeLock helper during active user tasks.",
      Badge: "- Badge: Update application dock/home badge count via Badge helper.",
      Microphone: "- Microphone: Setup getUserMedia audio stream with Web Audio API frequency analysis."
    };

    const instructionsList = selectedModules.map((m) => moduleInstructions[m] || `- ${m}: Integrate ${m} module from @pwasdk/core.`).join('\n');

    const promptText = 
`You are an expert full-stack engineer. I want to add native Progressive Web App (PWA) device capabilities to my ${copilotFramework} project using the official @pwasdk/core package (https://github.com/parhamsagharchi/pwasdk).

Step 1: Install the package
Run: ${installCmd}

Step 2: Integration Requirements
Import the following modules from '@pwasdk/core':
import { ${selectedModules.join(', ')} } from '@pwasdk/core';

Implement the following capabilities:
${instructionsList}

Step 3: Best Practices
- Ensure code runs strictly client-side / browser context (avoid SSR hydration issues in ${copilotFramework}).
- Always check feature support checks (e.g. module.isSupported()) before invoking device APIs.
- Provide graceful degradation for restricted desktop browsers.`;

    promptOutputEl.textContent = promptText;
  }

  updateCopilotPrompt();

  if (copyPromptBtn) {
    copyPromptBtn.addEventListener('click', async () => {
      const text = promptOutputEl ? promptOutputEl.textContent : '';
      if (!text) return;
      try {
        await navigator.clipboard.writeText(text);
      } catch (_) {}
      const prev = copyPromptBtn.textContent;
      copyPromptBtn.textContent = 'Copied to Clipboard!';
      copyPromptBtn.classList.add('copied');
      setTimeout(() => {
        copyPromptBtn.textContent = prev;
        copyPromptBtn.classList.remove('copied');
      }, 1500);
    });
  }

})();
