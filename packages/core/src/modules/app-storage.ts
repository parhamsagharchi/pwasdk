/**
 * localStorage / sessionStorage helpers with JSON support.
 */

function safeAccessStorage(
  type: "localStorage" | "sessionStorage"
): Storage | null {
  try {
    const storage = window[type];
    const testKey = "__pwasdk_test__";
    storage.setItem(testKey, "1");
    storage.removeItem(testKey);
    return storage;
  } catch {
    return null;
  }
}

function createStorageWrapper(type: "localStorage" | "sessionStorage") {
  return {
    isSupported(): boolean {
      return typeof window !== "undefined" && safeAccessStorage(type) !== null;
    },

    get(key: string): string | null {
      const storage = safeAccessStorage(type);
      if (!storage) throw new Error(`${type} is not supported`);
      return storage.getItem(key);
    },

    set(key: string, value: string): void {
      const storage = safeAccessStorage(type);
      if (!storage) throw new Error(`${type} is not supported`);
      storage.setItem(key, value);
    },

    remove(key: string): void {
      const storage = safeAccessStorage(type);
      if (!storage) return;
      storage.removeItem(key);
    },

    clear(): void {
      const storage = safeAccessStorage(type);
      if (!storage) return;
      storage.clear();
    },

    getJSON<T = unknown>(key: string): T | null {
      const raw = this.get(key);
      if (raw == null) return null;
      try {
        return JSON.parse(raw) as T;
      } catch {
        return null;
      }
    },

    setJSON(key: string, value: unknown): void {
      this.set(key, JSON.stringify(value));
    },
  };
}

export const AppStorage = {
  local: createStorageWrapper("localStorage"),
  session: createStorageWrapper("sessionStorage"),
};
