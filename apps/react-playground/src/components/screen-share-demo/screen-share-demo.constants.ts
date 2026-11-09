export const SCREEN_SHARE_EXAMPLE = `import { ScreenShare } from "@pwasdk/core";

const stream = await ScreenShare.start();
video.srcObject = stream;
// later:
ScreenShare.stop(stream);
`;
