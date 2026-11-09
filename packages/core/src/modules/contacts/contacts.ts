/**
 * Contact Picker API — pick people from the phone address book.
 */

import type {
  IContactInfo,
  IContactsPickOptions,
  TContactProperty,
} from "./contacts.types";

type TContactsManager = {
  getProperties: () => Promise<string[]>;
  select: (
    properties: string[],
    options?: { multiple?: boolean },
  ) => Promise<IContactInfo[]>;
};

function getContactsManager(): TContactsManager | null {
  if (typeof navigator === "undefined") return null;
  return (
    (navigator as Navigator & { contacts?: TContactsManager }).contacts ?? null
  );
}

export const Contacts = {
  isSupported(): boolean {
    return getContactsManager() !== null;
  },

  async getProperties(): Promise<string[]> {
    const manager = getContactsManager();
    if (!manager) return [];
    try {
      return await manager.getProperties();
    } catch {
      return [];
    }
  },

  async pick(
    properties: TContactProperty[] = ["name", "email", "tel"],
    options?: IContactsPickOptions,
  ): Promise<IContactInfo[]> {
    const manager = getContactsManager();
    if (!manager) {
      throw new Error("Contact Picker API is not supported");
    }
    try {
      return await manager.select(properties, {
        multiple: options?.multiple ?? false,
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(message || "Failed to pick contacts");
    }
  },
};
