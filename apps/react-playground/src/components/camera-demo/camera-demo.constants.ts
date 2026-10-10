export const CAMERA_EXAMPLE = `import { Camera } from "@pwasdk/core";

if (Camera.isSupported()) {
  const stream = await Camera.openBack();
  Camera.attachToVideo(video, stream);

  const stop = Camera.watch(video, async (frame) => {
    if (!frame.video.videoWidth) return;
    // Your action: QR, barcode, or anything else.
  });

  stop();
  Camera.stop(stream);
}
`;
