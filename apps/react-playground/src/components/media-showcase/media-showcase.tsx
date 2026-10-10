function MediaShowcase() {
  return (
    <section className="media-showcase-section" id="media-showcase">
      <div className="wrap">
        <div className="bento-section-head">
          <h2 className="bento-title">
            <span>Interactive Motion &amp; 3D Device Showcase</span>
          </h2>
          <span className="bento-counter mono">// REAL HARDWARE ACCELERATION</span>
        </div>

        <div className="media-grid-layout">
          <div className="media-render-container">
            <img
              src="/assets/showcase.jpg"
              alt="PWA SDK 3D hardware smartphone visual"
              loading="lazy"
            />
            <div className="media-render-overlay">
              <div>
                <div className="media-render-title">Spatial Telemetry &amp; Vision</div>
                <div className="media-render-copy">
                  Zero native bridge overhead — 100% web standard browser execution
                </div>
              </div>
              <span className="radar-chip active media-sync-chip">
                <span className="dot" />
                Hardware Synced
              </span>
            </div>
          </div>

          <div className="video-preview-wrapper">
            <div className="video-badge-tag mono">
              <span>▶ LIVE DEMO VIDEO</span>
            </div>
            <video
              src="/assets/demo.mp4"
              autoPlay
              muted
              loop
              playsInline
              controls
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default MediaShowcase;
