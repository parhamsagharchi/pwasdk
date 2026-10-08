export const DEVICE_EXAMPLE = `import { Device, Pwa } from "@pwasdk/core";

const mobile = Device.isMobile;
const online = Device.online;
const platform = Pwa.platform();
const standalone = Pwa.isStandalone();
`;
