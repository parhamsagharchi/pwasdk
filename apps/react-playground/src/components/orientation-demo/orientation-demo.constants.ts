export const ORIENTATION_EXAMPLE = `import { Orientation } from "@pwasdk/core";

if (Orientation.isSupported()) {
  console.log(Orientation.current());
  await Orientation.lock("portrait");
  Orientation.unlock();
}
`;
