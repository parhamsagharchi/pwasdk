export const WEB_OTP_EXAMPLE = `import { WebOtp } from "@pwasdk/core";

// SMS must include: @your.origin #123456
const code = await WebOtp.listen({ timeoutMs: 120_000 });
console.log(code);
`;
