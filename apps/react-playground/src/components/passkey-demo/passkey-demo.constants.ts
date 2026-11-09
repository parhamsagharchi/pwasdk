export const PASSKEY_EXAMPLE = `import { Passkey } from "@pwasdk/core";

const challenge = Passkey.randomChallenge();
const cred = await Passkey.create({
  rpName: "My App",
  userId: "user-1",
  userName: "you@example.com",
  challenge,
});
`;
