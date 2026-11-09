export type TContactProperty =
  | "name"
  | "email"
  | "tel"
  | "address"
  | "icon";

export interface IContactInfo {
  name?: string[];
  email?: string[];
  tel?: string[];
  address?: string[];
  icon?: Blob[];
}

export interface IContactsPickOptions {
  multiple?: boolean;
}
