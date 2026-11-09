export const TORCH_EXAMPLE = `import { Torch } from "@pwasdk/core";

const stream = await Torch.open();
if (Torch.canUse(stream)) {
  await Torch.setEnabled(stream, true); // flashlight on
  await Torch.toggle(stream);
}
Torch.stop(stream);
`;
