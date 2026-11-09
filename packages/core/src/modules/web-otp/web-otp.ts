/**
 * WebOTP — read one-time codes from SMS (Chrome/Android).
 */

type TOtpCredential = Credential & { code: string };

export const WebOtp = {
  isSupported(): boolean {
    return (
      typeof window !== "undefined" &&
      "OTPCredential" in window &&
      typeof navigator !== "undefined" &&
      !!navigator.credentials
    );
  },

  /**
   * Wait for an SMS OTP. Abort with the signal (or after timeoutMs).
   * SMS must include `@your.origin #123456` per WebOTP format.
   */
  async listen(options?: {
    signal?: AbortSignal;
    timeoutMs?: number;
  }): Promise<string> {
    if (!this.isSupported()) {
      throw new Error("WebOTP is not supported in this browser");
    }

    const controller = new AbortController();
    const timeoutMs = options?.timeoutMs ?? 120_000;
    const timer = window.setTimeout(() => controller.abort(), timeoutMs);

    const onAbort = () => controller.abort();
    options?.signal?.addEventListener("abort", onAbort);

    try {
      const credential = (await navigator.credentials.get({
        // @ts-expect-error — otp is not in all TS DOM libs yet
        otp: { transport: ["sms"] },
        signal: controller.signal,
      })) as TOtpCredential | null;

      if (!credential?.code) {
        throw new Error("No OTP code received");
      }
      return credential.code;
    } catch (error: unknown) {
      if (error instanceof DOMException && error.name === "AbortError") {
        throw new Error("OTP wait was cancelled or timed out");
      }
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(message || "Failed to read OTP");
    } finally {
      window.clearTimeout(timer);
      options?.signal?.removeEventListener("abort", onAbort);
    }
  },
};
