/**
 * Type definitions for browser APIs that may not be in TypeScript's DOM lib
 */

export interface INetworkInformation extends EventTarget {
  readonly effectiveType?: "2g" | "3g" | "4g" | "slow-2g";
  readonly downlink?: number;
  readonly rtt?: number;
  readonly saveData?: boolean;
  onchange?: ((this: INetworkInformation, ev: Event) => any) | null;
}
