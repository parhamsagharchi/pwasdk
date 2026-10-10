function MediaShowcase() {
  return (
    <section className="media-showcase-section" id="media-showcase">
      <div className="wrap">
        <div className="bento-section-head">
          <h2 className="bento-title">
            <span>Preview</span>
          </h2>
          <span className="bento-counter mono">runs in the browser</span>
        </div>

        <div className="media-grid-layout">
          <div className="media-render-container">
            <img
              src="/assets/showcase.jpg"
              alt="Phone using @pwasdk/core browser APIs"
              loading="lazy"
            />
            <div className="media-render-overlay">
              <div>
                <div className="media-render-title">
                  Same APIs you import from npm
                </div>
                <div className="media-render-copy">
                  No native plugin — standard Web APIs behind a small TypeScript
                  surface
                </div>
              </div>
              <span className="radar-chip active media-sync-chip">
                <span className="dot" />
                @pwasdk/core
              </span>
            </div>
          </div>

          <div className="video-preview-wrapper">
            <div className="video-badge-tag mono">
              <span>▶ Demo video</span>
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
