export const QR_EXAMPLE = `import { Camera, Qr } from "@pwasdk/core";

const stream = await Camera.openBack();
Camera.attachToVideo(video, stream);

const stop = Qr.watch(video, (results) => {
  console.log(results[0].rawValue);
});
`;
