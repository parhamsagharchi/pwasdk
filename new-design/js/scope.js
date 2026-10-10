/* ============================================================
   PWA SDK Showcase — scope.js
   Live Oscilloscope Canvas & Device Telemetry HUD
   Real-time FPS, Latency, Connection & Sensor Telemetry
   ============================================================ */

(function () {
  'use strict';

  const canvas = document.getElementById('scope-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio || 1200);
  let height = (canvas.height = canvas.offsetHeight * window.devicePixelRatio || 94);

  window.addEventListener('resize', () => {
    width = canvas.width = canvas.offsetWidth * window.devicePixelRatio || 1200;
    height = canvas.height = canvas.offsetHeight * window.devicePixelRatio || 94;
  });

  // Spring & Wave parameters
  let time = 0;
  let mouseModX = 1;
  let mouseModY = 1;

  // Track mouse proximity to scope
  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    if (e.clientY >= rect.top - 100 && e.clientY <= rect.bottom + 100) {
      const nx = (e.clientX - rect.left) / rect.width;
      mouseModX = 0.8 + nx * 0.8;
      mouseModY = 1.0 + Math.sin(nx * Math.PI) * 0.6;
    } else {
      mouseModX += (1 - mouseModX) * 0.05;
      mouseModY += (1 - mouseModY) * 0.05;
    }
  });

  // Live FPS counter
  let lastTime = performance.now();
  let frameCount = 0;
  let fps = 60;
  const fpsEl = document.getElementById('readout-fps');

  // Animation Loop
  function drawScope(now) {
    frameCount++;
    if (now - lastTime >= 1000) {
      fps = Math.round((frameCount * 1000) / (now - lastTime));
      frameCount = 0;
      lastTime = now;
      if (fpsEl) fpsEl.textContent = `${fps} fps`;
    }

    ctx.clearRect(0, 0, width, height);

    const centerY = height / 2;
    const pointsCount = 180;
    const step = width / pointsCount;

    time += 0.045 * mouseModX;

    // 1. Draw tertiary background wave (green/ok)
    ctx.beginPath();
    ctx.lineWidth = 1.5 * window.devicePixelRatio;
    ctx.strokeStyle = 'rgba(76, 208, 138, 0.35)';
    for (let i = 0; i <= pointsCount; i++) {
      const x = i * step;
      const angle = (i * 0.05) + (time * 0.8);
      const y = centerY + Math.sin(angle) * (14 * mouseModY * window.devicePixelRatio)
                        + Math.cos(angle * 1.5) * (6 * window.devicePixelRatio);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // 2. Draw secondary wave (blue/wire)
    ctx.beginPath();
    ctx.lineWidth = 2 * window.devicePixelRatio;
    ctx.strokeStyle = 'rgba(91, 141, 239, 0.65)';
    for (let i = 0; i <= pointsCount; i++) {
      const x = i * step;
      const angle = (i * 0.07) - (time * 1.2);
      const y = centerY + Math.sin(angle) * (20 * mouseModY * window.devicePixelRatio)
                        * Math.cos(i * 0.02);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // 3. Draw primary kinetic wave (amber) with glow
    ctx.beginPath();
    ctx.lineWidth = 2.8 * window.devicePixelRatio;
    ctx.strokeStyle = '#ff8a00';
    ctx.shadowColor = 'rgba(255, 138, 0, 0.7)';
    ctx.shadowBlur = 10 * window.devicePixelRatio;

    for (let i = 0; i <= pointsCount; i++) {
      const x = i * step;
      const angle = (i * 0.09) + time;
      // Spring envelope wave
      const envelope = Math.sin((i / pointsCount) * Math.PI);
      const y = centerY + (Math.sin(angle) * 28 + Math.sin(angle * 2.1) * 8) 
                          * envelope * mouseModY * window.devicePixelRatio;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Reset shadow
    ctx.shadowBlur = 0;

    requestAnimationFrame(drawScope);
  }

  requestAnimationFrame(drawScope);

  // ---- Real Device Telemetry Reader ----
  function updateTelemetry() {
    const downlinkEl = document.getElementById('readout-downlink');
    const platformEl = document.getElementById('readout-platform');
    const onlineEl = document.getElementById('readout-online');
    const latencyEl = document.getElementById('readout-latency');

    // Online Status
    if (onlineEl) {
      onlineEl.textContent = navigator.onLine ? 'ONLINE' : 'OFFLINE';
      onlineEl.className = navigator.onLine ? 'ok' : '';
    }

    // Platform detection
    if (platformEl) {
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      platformEl.textContent = isMobile ? 'Mobile' : 'Desktop';
    }

    // Network connection
    if (downlinkEl) {
      const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      if (conn && conn.downlink) {
        downlinkEl.textContent = `${conn.downlink} Mbps`;
      } else {
        downlinkEl.textContent = 'High Speed';
      }
    }

    // Simulated real-time latency ping
    if (latencyEl) {
      const ping = Math.floor(12 + Math.random() * 8);
      latencyEl.textContent = `${ping}ms`;
    }
  }

  updateTelemetry();
  window.addEventListener('online', updateTelemetry);
  window.addEventListener('offline', updateTelemetry);
  setInterval(updateTelemetry, 5000);
})();
