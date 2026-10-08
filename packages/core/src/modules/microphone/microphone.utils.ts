interface ISpeechRecognitionAlternative {
  transcript: string;
}

interface ISpeechRecognitionResult {
  isFinal: boolean;
  0?: ISpeechRecognitionAlternative;
}

interface ISpeechRecognitionResultEvent {
  results: ArrayLike<ISpeechRecognitionResult>;
}

interface ISpeechRecognition {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: ISpeechRecognitionResultEvent) => void) | null;
  onend: (() => void) | null;
  onerror: ((event: { error?: string }) => void) | null;
}

type TSpeechRecognitionCtor = new () => ISpeechRecognition;

export function getSpeechRecognition(): TSpeechRecognitionCtor | null {
  if (typeof window === "undefined") return null;
  const host = window as Window & {
    SpeechRecognition?: TSpeechRecognitionCtor;
    webkitSpeechRecognition?: TSpeechRecognitionCtor;
  };
  return host.SpeechRecognition ?? host.webkitSpeechRecognition ?? null;
}
