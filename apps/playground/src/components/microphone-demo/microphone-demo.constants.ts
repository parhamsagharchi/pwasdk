export const MICROPHONE_DEMO_WORD = "hello";

export const MICROPHONE_EXAMPLE = `import { Microphone } from "@pwasdk/core";

if (Microphone.isSpeechSupported()) {
  const stop = Microphone.listen((result) => {
    if (result.isFinal && result.text.toLowerCase().includes("hello")) {
      // Your action when that word is heard.
    }
  });

  stop();
}
`;
