/**
 * Text-to-speech via the Web Speech Synthesis API.
 */

import type { ISpeakOptions } from "./speak.types";

export const Speak = {
  isSupported(): boolean {
    return typeof window !== "undefined" && "speechSynthesis" in window;
  },

  getVoices(): SpeechSynthesisVoice[] {
    if (!this.isSupported()) return [];
    return window.speechSynthesis.getVoices();
  },

  /**
   * Speak text. Returns a promise that resolves when utterance ends
   * (or rejects if speech fails / is cancelled before start).
   */
  speak(text: string, options?: ISpeakOptions): Promise<void> {
    if (!this.isSupported()) {
      return Promise.reject(new Error("Speech synthesis is not supported"));
    }
    const trimmed = text.trim();
    if (!trimmed) {
      return Promise.reject(new Error("Nothing to speak"));
    }

    return new Promise((resolve, reject) => {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(trimmed);
      if (options?.lang) utterance.lang = options.lang;
      if (options?.rate != null) utterance.rate = options.rate;
      if (options?.pitch != null) utterance.pitch = options.pitch;
      if (options?.volume != null) utterance.volume = options.volume;
      if (options?.voiceURI) {
        const voice = this.getVoices().find((v) => v.voiceURI === options.voiceURI);
        if (voice) utterance.voice = voice;
      }
      utterance.onend = () => resolve();
      utterance.onerror = (event) => {
        reject(new Error(event.error || "Speech failed"));
      };
      window.speechSynthesis.speak(utterance);
    });
  },

  stop(): void {
    if (!this.isSupported()) return;
    window.speechSynthesis.cancel();
  },

  pause(): void {
    if (!this.isSupported()) return;
    window.speechSynthesis.pause();
  },

  resume(): void {
    if (!this.isSupported()) return;
    window.speechSynthesis.resume();
  },

  isSpeaking(): boolean {
    return this.isSupported() && window.speechSynthesis.speaking;
  },
};
