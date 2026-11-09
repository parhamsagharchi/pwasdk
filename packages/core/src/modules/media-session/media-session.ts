/**
 * Media Session API — lock-screen / notification media controls.
 */

import type {
  IMediaSessionMetadata,
  TMediaSessionAction,
  TMediaSessionPlaybackState,
} from "./media-session.types";

export const MediaSession = {
  isSupported(): boolean {
    return typeof navigator !== "undefined" && "mediaSession" in navigator;
  },

  setMetadata(meta: IMediaSessionMetadata): boolean {
    if (!this.isSupported()) return false;
    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: meta.title,
        artist: meta.artist,
        album: meta.album,
        artwork: meta.artwork,
      });
      return true;
    } catch {
      return false;
    }
  },

  setPlaybackState(state: TMediaSessionPlaybackState): boolean {
    if (!this.isSupported()) return false;
    try {
      navigator.mediaSession.playbackState = state;
      return true;
    } catch {
      return false;
    }
  },

  setActionHandler(
    action: TMediaSessionAction,
    handler: MediaSessionActionHandler | null,
  ): boolean {
    if (!this.isSupported()) return false;
    try {
      navigator.mediaSession.setActionHandler(action, handler);
      return true;
    } catch {
      return false;
    }
  },

  clear(): void {
    if (!this.isSupported()) return;
    navigator.mediaSession.metadata = null;
    navigator.mediaSession.playbackState = "none";
    const actions: TMediaSessionAction[] = [
      "play",
      "pause",
      "previoustrack",
      "nexttrack",
      "seekbackward",
      "seekforward",
      "stop",
    ];
    for (const action of actions) {
      try {
        navigator.mediaSession.setActionHandler(action, null);
      } catch {
        /* unsupported action */
      }
    }
  },
};
