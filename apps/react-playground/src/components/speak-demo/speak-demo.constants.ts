export const SPEAK_EXAMPLE = `import { Speak } from "@pwasdk/core";

if (Speak.isSupported()) {
  await Speak.speak("Hello from your PWA", { rate: 1, pitch: 1 });
}
`;

export const SPEAK_DEMO_TEXT = "Hello from PWA SDK. This is text to speech.";
