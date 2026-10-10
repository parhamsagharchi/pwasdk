/* ============================================================
   PWA SDK — Interactive Hardware Demos Logic
   High-performance browser APIs with tactile audio & visual fallbacks
   ============================================================ */

(function () {
  'use strict';

  // Audio Context synthesizer for tactile sound on desktop
  let audioCtx = null;
  function getAudioContext() {
    if (!audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) audioCtx = new AudioCtx();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playCyberTone(freq = 150, duration = 0.05, type = 'sine') {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (_) {}
  }

  /* -------------------------------------------------------------
     1. Haptic & Sensory Pulse
  ------------------------------------------------------------- */
  const phoneMock = document.getElementById('haptic-device-mock');
  const hapticBtns = document.querySelectorAll('.pulse-chip-btn');

  function triggerHaptic(pattern, toneFreq, duration) {
    if (phoneMock) {
      phoneMock.classList.add('buzzing');
      setTimeout(() => phoneMock.classList.remove('buzzing'), duration || 200);
    }
    playCyberTone(toneFreq || 140, 0.06, 'triangle');

    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch (_) {}
    }
  }

  hapticBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.pattern;
      if (type === 'light') triggerHaptic(20, 240, 120);
      else if (type === 'medium') triggerHaptic(50, 180, 200);
      else if (type === 'heavy') triggerHaptic(100, 100, 320);
      else if (type === 'heartbeat') {
        triggerHaptic([60, 70, 130], 140, 400);
        setTimeout(() => playCyberTone(110, 0.06), 130);
      }
    });
  });

  /* -------------------------------------------------------------
     2. Camera Stream & Vision Lab
  ------------------------------------------------------------- */
  const videoEl = document.getElementById('camera-video-elem');
  const camPlaceholder = document.getElementById('camera-idle-ui');
  const camStartBtn = document.getElementById('cam-start-btn');
  const camFlipBtn = document.getElementById('cam-flip-btn');
  const camSnapBtn = document.getElementById('cam-snap-btn');
  const camFlash = document.getElementById('camera-flash-layer');

  let currentFacing = 'user';
  let mediaStream = null;

  async function startCamera() {
    try {
      if (mediaStream) {
        mediaStream.getTracks().forEach((t) => t.stop());
      }
      mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: currentFacing },
        audio: false,
      });
      if (videoEl) {
        videoEl.srcObject = mediaStream;
        videoEl.play();
        videoEl.classList.add('active');
      }
      if (camPlaceholder) camPlaceholder.style.display = 'none';
      if (camStartBtn) camStartBtn.textContent = 'Stop Stream';
    } catch (err) {
      if (camPlaceholder) {
        camPlaceholder.innerHTML = `<span style="color:var(--cyan); font-weight:600;">Hardware Stream Active (Simulated)</span>`;
      }
      if (camStartBtn) camStartBtn.textContent = 'Active (Sim)';
    }
  }

  function stopCamera() {
    if (mediaStream) {
      mediaStream.getTracks().forEach((t) => t.stop());
      mediaStream = null;
    }
    if (videoEl) {
      videoEl.classList.remove('active');
      videoEl.srcObject = null;
    }
    if (camPlaceholder) camPlaceholder.style.display = 'flex';
    if (camStartBtn) camStartBtn.textContent = 'Start Stream';
  }

  if (camStartBtn) {
    camStartBtn.addEventListener('click', () => {
      if (mediaStream || (camPlaceholder && camPlaceholder.textContent.includes('Simulated'))) {
        stopCamera();
      } else {
        startCamera();
      }
    });
  }

  if (camFlipBtn) {
    camFlipBtn.addEventListener('click', () => {
      currentFacing = currentFacing === 'user' ? 'environment' : 'user';
      if (mediaStream) startCamera();
    });
  }

  if (camSnapBtn) {
    camSnapBtn.addEventListener('click', () => {
      playCyberTone(700, 0.08);
      if (camFlash) {
        camFlash.classList.add('flashing');
        setTimeout(() => camFlash.classList.remove('flashing'), 100);
      }
    });
  }

  /* -------------------------------------------------------------
     3. Audio Spectrum Analyzer
  ------------------------------------------------------------- */
  const micBtn = document.getElementById('mic-toggle-btn');
  const spectrumCanvas = document.getElementById('cyber-spectrum-canvas');
  let micActive = false;
  let micStream = null;
  let analyserNode = null;

  function drawSpectrum() {
    if (!spectrumCanvas) return;
    const ctx = spectrumCanvas.getContext('2d');
    const w = (spectrumCanvas.width = spectrumCanvas.offsetWidth * window.devicePixelRatio || 280);
    const h = (spectrumCanvas.height = spectrumCanvas.offsetHeight * window.devicePixelRatio || 64);

    const barCount = 32;
    const barWidth = (w / barCount) - (2 * window.devicePixelRatio);
    const dataArray = new Uint8Array(barCount);

    if (analyserNode && micActive) {
      analyserNode.getByteFrequencyData(dataArray);
    } else if (micActive) {
      // Dynamic synth rhythm
      const t = Date.now() * 0.006;
      for (let i = 0; i < barCount; i++) {
        dataArray[i] = Math.floor(
          70 + Math.sin(i * 0.35 + t) * 45 + Math.cos(i * 0.7 - t * 1.4) * 35
        );
      }
    } else {
      for (let i = 0; i < barCount; i++) dataArray[i] = 10;
    }

    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < barCount; i++) {
      const val = dataArray[i] / 255;
      const barHeight = Math.max(4, val * h * 0.92);
      const x = i * (barWidth + 2 * window.devicePixelRatio);
      const y = h - barHeight;

      const grad = ctx.createLinearGradient(0, h, 0, 0);
      grad.addColorStop(0, '#00f2fe');
      grad.addColorStop(1, '#8b5cf6');

      ctx.fillStyle = micActive ? grad : 'rgba(255, 255, 255, 0.12)';
      ctx.fillRect(x, y, barWidth, barHeight);
    }

    requestAnimationFrame(drawSpectrum);
  }

  drawSpectrum();

  if (micBtn) {
    micBtn.addEventListener('click', async () => {
      micActive = !micActive;
      micBtn.classList.toggle('recording', micActive);
      const label = micBtn.querySelector('.mic-status-label');

      if (micActive) {
        if (label) label.textContent = 'Listening (FFT)...';
        try {
          micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const ctx = getAudioContext();
          const source = ctx.createMediaStreamSource(micStream);
          analyserNode = ctx.createAnalyser();
          analyserNode.fftSize = 64;
          source.connect(analyserNode);
        } catch (_) {}
      } else {
        if (label) label.textContent = 'Record Voice';
        if (micStream) {
          micStream.getTracks().forEach((t) => t.stop());
          micStream = null;
        }
        analyserNode = null;
      }
    });
  }

  /* -------------------------------------------------------------
     4. Dynamic Push Notifications
  ------------------------------------------------------------- */
  const pushBtn = document.getElementById('push-trigger-btn');
  const pushToast = document.getElementById('dynamic-push-toast');

  if (pushBtn && pushToast) {
    pushBtn.addEventListener('click', async () => {
      playCyberTone(350, 0.09);
      pushToast.classList.add('visible');

      if ('Notification' in window && Notification.permission !== 'granted') {
        try {
          await Notification.requestPermission();
        } catch (_) {}
      }

      setTimeout(() => {
        pushToast.classList.remove('visible');
      }, 3500);
    });
  }

  /* -------------------------------------------------------------
     5. Holographic 3D Gyroscope
  ------------------------------------------------------------- */
  const gyroCard = document.getElementById('gyro-gimbal-card');
  const gyroReadout = document.getElementById('gyro-coord-readout');

  if (gyroCard) {
    gyroCard.parentElement.addEventListener('mousemove', (e) => {
      const rect = gyroCard.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotY = (x / rect.width) * 40;
      const rotX = -(y / rect.height) * 40;

      gyroCard.style.transform = `rotateX(${rotX.toFixed(1)}deg) rotateY(${rotY.toFixed(1)}deg)`;
      if (gyroReadout) {
        gyroReadout.textContent = `X: ${rotX.toFixed(0)}°  Y: ${rotY.toFixed(0)}°`;
      }
    });

    gyroCard.parentElement.addEventListener('mouseleave', () => {
      gyroCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
      if (gyroReadout) gyroReadout.textContent = 'Move cursor to tilt in 3D';
    });

    window.addEventListener('deviceorientation', (e) => {
      if (e.beta !== null && e.gamma !== null) {
        const beta = Math.min(35, Math.max(-35, e.beta - 45));
        const gamma = Math.min(35, Math.max(-35, e.gamma));
        gyroCard.style.transform = `rotateX(${beta.toFixed(1)}deg) rotateY(${gamma.toFixed(1)}deg)`;
        if (gyroReadout) {
          gyroReadout.textContent = `β: ${beta.toFixed(0)}°  γ: ${gamma.toFixed(0)}°`;
        }
      }
    });
  }

  /* -------------------------------------------------------------
     6. Smart Clipboard
  ------------------------------------------------------------- */
  const clipInput = document.getElementById('clip-input');
  const clipCopyBtn = document.getElementById('clip-copy-btn');
  const clipPasteBtn = document.getElementById('clip-paste-btn');

  if (clipCopyBtn && clipInput) {
    clipCopyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(clipInput.value || 'PWA SDK Core');
        clipCopyBtn.textContent = 'Copied!';
        clipCopyBtn.style.color = 'var(--emerald)';
        playCyberTone(280, 0.05);
        setTimeout(() => {
          clipCopyBtn.textContent = 'Copy';
          clipCopyBtn.style.color = '';
        }, 1200);
      } catch (_) {}
    });
  }

  if (clipPasteBtn && clipInput) {
    clipPasteBtn.addEventListener('click', async () => {
      try {
        const text = await navigator.clipboard.readText();
        if (text) clipInput.value = text;
        clipPasteBtn.textContent = 'Pasted!';
        setTimeout(() => { clipPasteBtn.textContent = 'Paste'; }, 1200);
      } catch (_) {
        clipInput.value = 'Data read from clipboard';
      }
    });
  }

  /* -------------------------------------------------------------
     7. Native Web Share
  ------------------------------------------------------------- */
  const shareBtn = document.getElementById('share-trigger-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'PWA SDK Hardware Showcase',
            text: 'Test native device capabilities on modern Web Apps!',
            url: window.location.href,
          });
        } catch (_) {}
      } else {
        try {
          await navigator.clipboard.writeText(window.location.href);
          alert('Web Share API not supported on desktop. Page URL copied to clipboard!');
        } catch (_) {}
      }
    });
  }

  /* -------------------------------------------------------------
     8. Network & Offline Storage
  ------------------------------------------------------------- */
  const netDot = document.getElementById('net-status-dot');
  const netText = document.getElementById('net-status-text');
  const netToggle = document.getElementById('net-toggle-btn');
  let isSimOffline = false;

  if (netToggle && netDot && netText) {
    netToggle.addEventListener('click', () => {
      isSimOffline = !isSimOffline;
      if (isSimOffline) {
        netDot.style.background = 'var(--coral)';
        netText.textContent = 'Offline (PWA Cache Serving)';
        netToggle.textContent = 'Restore Online';
      } else {
        netDot.style.background = 'var(--emerald)';
        netText.textContent = 'Online (High Speed Cache)';
        netToggle.textContent = 'Simulate Offline';
      }
    });
  }

  /* -------------------------------------------------------------
     9. Battery Status
  ------------------------------------------------------------- */
  const batteryBar = document.getElementById('cyber-battery-bar');
  const batteryText = document.getElementById('cyber-battery-text');

  async function updateBattery() {
    if ('getBattery' in navigator) {
      try {
        const battery = await navigator.getBattery();
        const pct = Math.round(battery.level * 100);
        if (batteryBar) batteryBar.style.width = `${pct}%`;
        if (batteryText) {
          batteryText.textContent = `${pct}% ${battery.charging ? '⚡ Charging' : 'Discharging'}`;
        }
      } catch (_) {}
    }
  }
  updateBattery();

  /* -------------------------------------------------------------
     10. Screen Wake Lock
  ------------------------------------------------------------- */
  const wakeSwitch = document.getElementById('wake-cyber-switch');
  const wakeStatus = document.getElementById('wake-status-text');
  let wakeLockSentinel = null;

  if (wakeSwitch && wakeStatus) {
    wakeSwitch.addEventListener('click', async () => {
      const active = wakeSwitch.classList.toggle('active');
      if (active) {
        wakeStatus.textContent = 'Awake: LOCKED';
        wakeStatus.style.color = 'var(--cyan)';
        if ('wakeLock' in navigator) {
          try {
            wakeLockSentinel = await navigator.wakeLock.request('screen');
          } catch (_) {}
        }
      } else {
        wakeStatus.textContent = 'Awake: NORMAL';
        wakeStatus.style.color = '';
        if (wakeLockSentinel) {
          wakeLockSentinel.release();
          wakeLockSentinel = null;
        }
      }
    });
  }

  /* -------------------------------------------------------------
     11. App Badging
  ------------------------------------------------------------- */
  const badgeEl = document.getElementById('cyber-counter-badge');
  const badgeInc = document.getElementById('badge-inc-btn');
  const badgeDec = document.getElementById('badge-dec-btn');
  let currentBadge = 5;

  function setBadgeCount(n) {
    currentBadge = Math.max(0, n);
    if (badgeEl) {
      badgeEl.textContent = currentBadge;
      badgeEl.style.display = currentBadge > 0 ? 'flex' : 'none';
      badgeEl.style.transform = 'scale(1.25)';
      setTimeout(() => { badgeEl.style.transform = 'scale(1)'; }, 150);
    }
    if ('setAppBadge' in navigator) {
      try {
        if (currentBadge > 0) navigator.setAppBadge(currentBadge);
        else navigator.clearAppBadge();
      } catch (_) {}
    }
  }

  if (badgeInc) badgeInc.addEventListener('click', () => setBadgeCount(currentBadge + 1));
  if (badgeDec) badgeDec.addEventListener('click', () => setBadgeCount(currentBadge - 1));

})();
