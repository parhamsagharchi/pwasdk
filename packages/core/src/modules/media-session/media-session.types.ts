export interface IMediaSessionArtwork {
  src: string;
  sizes?: string;
  type?: string;
}

export interface IMediaSessionMetadata {
  title?: string;
  artist?: string;
  album?: string;
  artwork?: IMediaSessionArtwork[];
}

export type TMediaSessionAction =
  | "play"
  | "pause"
  | "previoustrack"
  | "nexttrack"
  | "seekbackward"
  | "seekforward"
  | "stop";

export type TMediaSessionPlaybackState = "none" | "paused" | "playing";
