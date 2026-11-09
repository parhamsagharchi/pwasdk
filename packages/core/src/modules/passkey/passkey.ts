/**
 * Passkeys / WebAuthn helpers (Face ID, fingerprint, platform authenticator).
 */

import type { IPasskeyCreateOptions, IPasskeyGetOptions } from "./passkey.types";

function toBufferSource(bytes: Uint8Array): BufferSource {
  const copy = new Uint8Array(bytes.byteLength);
  copy.set(bytes);
  return copy.buffer;
}

export const Passkey = {
  isSupported(): boolean {
    return (
      typeof window !== "undefined" &&
      typeof window.PublicKeyCredential !== "undefined" &&
      typeof navigator !== "undefined" &&
      !!navigator.credentials
    );
  },

  async isPlatformAuthenticatorAvailable(): Promise<boolean> {
    if (!this.isSupported()) return false;
    try {
      return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
    } catch {
      return false;
    }
  },

  /** Create a new passkey (registration). */
  async create(
    options: IPasskeyCreateOptions,
  ): Promise<PublicKeyCredential | null> {
    if (!this.isSupported()) {
      throw new Error("WebAuthn / passkeys are not supported");
    }
    const userId = new TextEncoder().encode(options.userId);
    const credential = await navigator.credentials.create({
      publicKey: {
        challenge: toBufferSource(options.challenge),
        rp: {
          id: options.rpId ?? window.location.hostname,
          name: options.rpName,
        },
        user: {
          id: toBufferSource(userId),
          name: options.userName,
          displayName: options.userDisplayName ?? options.userName,
        },
        pubKeyCredParams: [
          { type: "public-key", alg: -7 },
          { type: "public-key", alg: -257 },
        ],
        authenticatorSelection: {
          authenticatorAttachment: "platform",
          userVerification: "preferred",
          residentKey: "preferred",
        },
        timeout: options.timeoutMs ?? 60_000,
      },
    });
    return credential as PublicKeyCredential | null;
  },

  /** Assert an existing passkey (login). */
  async get(options: IPasskeyGetOptions): Promise<PublicKeyCredential | null> {
    if (!this.isSupported()) {
      throw new Error("WebAuthn / passkeys are not supported");
    }
    const credential = await navigator.credentials.get({
      publicKey: {
        challenge: toBufferSource(options.challenge),
        rpId: options.rpId ?? window.location.hostname,
        timeout: options.timeoutMs ?? 60_000,
        userVerification: "preferred",
        allowCredentials: options.allowCredentials?.map((c) => ({
          type: c.type ?? "public-key",
          id: toBufferSource(c.id),
        })),
      },
    });
    return credential as PublicKeyCredential | null;
  },

  /** Random challenge for demos / your server handshake. */
  randomChallenge(byteLength = 32): Uint8Array {
    const bytes = new Uint8Array(byteLength);
    crypto.getRandomValues(bytes);
    return bytes;
  },
};
