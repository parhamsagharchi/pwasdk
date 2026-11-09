export interface IPasskeyCreateOptions {
  /** Relying party id (usually hostname). */
  rpId?: string;
  rpName: string;
  userId: string;
  userName: string;
  userDisplayName?: string;
  /** Random challenge bytes as Uint8Array — required by WebAuthn. */
  challenge: Uint8Array;
  timeoutMs?: number;
}

export interface IPasskeyGetOptions {
  rpId?: string;
  challenge: Uint8Array;
  timeoutMs?: number;
  /** Allow any credential on this device when empty. */
  allowCredentials?: Array<{ id: Uint8Array; type?: PublicKeyCredentialType }>;
}
