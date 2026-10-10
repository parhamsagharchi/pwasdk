export const PUSH_EXAMPLE = `import { Push } from "@pwasdk/core";

if (Push.isSupported()) {
  await Push.register("/sw.js");
  await Push.requestPermission();
  await Push.subscribe(vapidPublicKey);
}
`;
