export const BADGE_EXAMPLE = `import { Badge } from "@pwasdk/core";

if (Badge.isSupported()) {
  await Badge.set(5);
  await Badge.clear();
}
`;
