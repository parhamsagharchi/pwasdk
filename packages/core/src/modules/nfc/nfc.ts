/**
 * Web NFC (Android Chrome) — read / write NDEF tags.
 */

import type { INfcMessage, TNfcReadingListener } from "./nfc.types";

type TNdefReader = {
  scan: (options?: { signal?: AbortSignal }) => Promise<void>;
  write: (
    message: { records: Array<{ recordType: string; data: string }> },
    options?: { signal?: AbortSignal },
  ) => Promise<void>;
  onreading: ((event: Event & { message: { records: Array<{ recordType: string; data?: DataView }> } }) => void) | null;
  onreadingerror: ((event: Event) => void) | null;
};

type TNdefReaderCtor = new () => TNdefReader;

function getNdefReaderCtor(): TNdefReaderCtor | null {
  if (typeof window === "undefined") return null;
  return (window as Window & { NDEFReader?: TNdefReaderCtor }).NDEFReader ?? null;
}

function decodeRecord(record: {
  recordType: string;
  data?: DataView;
}): { recordType: "text" | "url"; data: string } | null {
  if (!record.data) return null;
  const bytes = new Uint8Array(
    record.data.buffer,
    record.data.byteOffset,
    record.data.byteLength,
  );
  if (record.recordType === "url") {
    return { recordType: "url", data: new TextDecoder().decode(bytes) };
  }
  if (record.recordType === "text") {
    // Text records: status byte + language code + payload
    const langLen = bytes[0] & 0x3f;
    const text = new TextDecoder().decode(bytes.slice(1 + langLen));
    return { recordType: "text", data: text };
  }
  try {
    return {
      recordType: "text",
      data: new TextDecoder().decode(bytes),
    };
  } catch {
    return null;
  }
}

export const Nfc = {
  isSupported(): boolean {
    return getNdefReaderCtor() !== null;
  },

  /**
   * Start scanning. Returns a stop function (aborts the scan).
   */
  async read(onReading: TNfcReadingListener): Promise<() => void> {
    const Ctor = getNdefReaderCtor();
    if (!Ctor) {
      throw new Error("Web NFC is not supported (Android Chrome only)");
    }
    const reader = new Ctor();
    const controller = new AbortController();

    reader.onreading = (event) => {
      const records = event.message.records
        .map(decodeRecord)
        .filter((r): r is NonNullable<typeof r> => r !== null);
      onReading({ records });
    };

    await reader.scan({ signal: controller.signal });
    return () => controller.abort();
  },

  async write(message: INfcMessage): Promise<void> {
    const Ctor = getNdefReaderCtor();
    if (!Ctor) {
      throw new Error("Web NFC is not supported (Android Chrome only)");
    }
    const reader = new Ctor();
    await reader.write({
      records: message.records.map((r) => ({
        recordType: r.recordType,
        data: r.data,
      })),
    });
  },
};
