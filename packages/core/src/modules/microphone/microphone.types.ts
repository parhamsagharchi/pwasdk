export interface IMicrophoneTranscript {
  text: string;
  isFinal: boolean;
}

/** App-owned action for recognized speech. The app decides which word matters. */
export type TMicrophoneTranscriptListener = (
  result: IMicrophoneTranscript,
) => void;

export interface IMicrophoneListenOptions {
  lang?: string;
  continuous?: boolean;
}
