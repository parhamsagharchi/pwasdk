export const MEDIA_SESSION_EXAMPLE = `import { MediaSession } from "@pwasdk/core";

MediaSession.setMetadata({
  title: "Night Drive",
  artist: "PWA SDK",
  artwork: [{ src: "/icon-192.png", sizes: "192x192", type: "image/png" }],
});
MediaSession.setPlaybackState("playing");
MediaSession.setActionHandler("pause", () => audio.pause());
`;
