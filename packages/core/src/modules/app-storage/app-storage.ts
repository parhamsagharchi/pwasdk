/**
 * localStorage / sessionStorage helpers with JSON support.
 */

import { createStorageWrapper } from "./app-storage.utils";

export const AppStorage = {
  local: createStorageWrapper("localStorage"),
  session: createStorageWrapper("sessionStorage"),
};
