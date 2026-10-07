/**
 * Type definitions for browser APIs that may not be in TypeScript's DOM lib
 */

export interface NetworkInformation extends EventTarget {
  readonly effectiveType?: '2g' | '3g' | '4g' | 'slow-2g';
  readonly downlink?: number;
  readonly rtt?: number;
  readonly saveData?: boolean;
  onchange?: ((this: NetworkInformation, ev: Event) => any) | null;
}

export type OrientationType = 
  | 'portrait-primary'
  | 'portrait-secondary'
  | 'landscape-primary'
  | 'landscape-secondary';

export type OrientationLockType =
  | 'any'
  | 'natural'
  | 'landscape'
  | 'portrait'
  | 'portrait-primary'
  | 'portrait-secondary'
  | 'landscape-primary'
  | 'landscape-secondary';

