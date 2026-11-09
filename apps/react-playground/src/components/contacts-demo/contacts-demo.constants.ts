export const CONTACTS_EXAMPLE = `import { Contacts } from "@pwasdk/core";

if (Contacts.isSupported()) {
  const people = await Contacts.pick(["name", "tel", "email"], {
    multiple: true,
  });
  console.log(people);
}
`;
