/**
 * Microphone helper via getUserMedia.
 * Speech handling stays in the app: pass a callback to `listen`.
 */

import type {
  IMicrophoneListenOptions,
  TMicrophoneTranscriptListener,
} from "./microphone.types";
import { getSpeechRecognition } from "./microphone.utils";

export const Microphone = {
  isSupported(): boolean {
    return !!(
      typeof navigator !== "undefined" &&
      navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia
    );
  },

  async open(
    audioConstraints: MediaTrackConstraints = {}
  ): Promise<MediaStream> {
    if (!this.isSupported()) {
      throw new Error("Microphone API is not supported");
    }
    try {
      return await navigator.mediaDevices.getUserMedia({
        audio: audioConstraints,
        video: false,
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(message || "Failed to open microphone");
    }
  },

  isSpeechSupported(): boolean {
    return getSpeechRecognition() !== null;
  },

  /**
   * Stream recognized speech into `onTranscript`.
   * The callback is the app's action (match a word, run a command, and so on).
   * Returns a function that stops listening.
   */
  listen(
    onTranscript: TMicrophoneTranscriptListener,
    options: IMicrophoneListenOptions = {},
  ): () => void {
    const Recognition = getSpeechRecognition();
    if (!Recognition) {
      throw new Error("Speech recognition is not supported");
    }

    const recognition = new Recognition();
    recognition.lang = options.lang ?? "en-US";
    recognition.continuous = options.continuous ?? true;
    recognition.interimResults = true;

    let stopped = false;

    recognition.onresult = (event) => {
      const list = event.results;
      const latest = list[list.length - 1];
      const text = latest?.[0]?.transcript?.trim() ?? "";
      if (!text) return;
      onTranscript({ text, isFinal: latest?.isFinal ?? false });
    };

    recognition.onerror = (event) => {
      if (
        event.error === "not-allowed" ||
        event.error === "service-not-allowed"
      ) {
        stopped = true;
      }
    };

    recognition.onend = () => {
      if (stopped) return;
      try {
        recognition.start();
      } catch {
        stopped = true;
      }
    };

    recognition.start();

    return () => {
      stopped = true;
      recognition.onresult = null;
      recognition.onend = null;
      recognition.onerror = null;
      recognition.stop();
    };
  },

  attachToAudio(audio: HTMLAudioElement, stream: MediaStream): void {
    audio.srcObject = stream;
    void audio.play().catch(() => {
      /* autoplay may be blocked */
    });
  },

  stop(stream: MediaStream | null | undefined): void {
    if (!stream) return;
    stream.getTracks().forEach((t) => t.stop());
  },
};
