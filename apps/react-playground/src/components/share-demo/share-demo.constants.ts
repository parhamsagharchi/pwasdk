export const SHARE_EXAMPLE = `import { Share, Clipboard } from "@pwasdk/core";

const data = {
  title: "PWA SDK",
  text: "Check out this PWA SDK!",
  url: location.href,
};

if (Share.isSupported()) {
  await Share.share(data);
} else if (Clipboard.isSupported()) {
  await Clipboard.copy(data.url);
}
`;
