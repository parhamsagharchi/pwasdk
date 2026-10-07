import type { TOrientationLockType } from "../../types";

export type TOrientationScreen = Screen & {
  orientation?: ScreenOrientation & {
    lock?: (orientation: TOrientationLockType) => Promise<void>;
    unlock?: () => void;
  };
};
