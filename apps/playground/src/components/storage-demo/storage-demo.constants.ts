export const STORAGE_EXAMPLE = `import { AppStorage } from "@pwasdk/core";

if (AppStorage.local.isSupported()) {
  AppStorage.local.set("demo:name", "Ada");
  const name = AppStorage.local.get("demo:name");
  AppStorage.local.remove("demo:name");
}
`;