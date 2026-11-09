export const NFC_EXAMPLE = `import { Nfc } from "@pwasdk/core";

const stop = await Nfc.read((message) => {
  console.log(message.records);
});

await Nfc.write({
  records: [{ recordType: "text", data: "Hello from PWA SDK" }],
});
`;
