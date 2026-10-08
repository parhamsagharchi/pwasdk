export const SHARE_EXAMPLE = `import { Share } from "@pwasdk/core";

if (Share.isSupported()) {
  await Share.share({
    title: "PWA SDK",
    text: "Check out this awesome PWA SDK!",
    url: location.href,
  });
}
`;
