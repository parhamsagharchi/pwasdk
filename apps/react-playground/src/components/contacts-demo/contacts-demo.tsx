import { useState } from "react";
import { Contacts, type IContactInfo } from "@pwasdk/core";
import {
  DEMO_BUTTON_CLASS,
  DEMO_SECTION_CLASS,
} from "../../constants/demo.constants";

function ContactsDemo() {
  const [people, setPeople] = useState<IContactInfo[]>([]);
  const [status, setStatus] = useState("");

  const handlePickClick = () => {
    void (async () => {
      try {
        const next = await Contacts.pick(["name", "tel", "email"], {
          multiple: true,
        });
        setPeople(next);
        setStatus(
          next.length
            ? `Picked ${next.length} contact(s).`
            : "No contacts selected.",
        );
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        setStatus(message || "Could not open contacts.");
      }
    })();
  };

  return (
    <section className={DEMO_SECTION_CLASS}>
      {!Contacts.isSupported() ? (
        <div className="demo-callout">
          Contact Picker works mainly on Android Chrome (HTTPS).
        </div>
      ) : (
        <p className="demo-meta">
          Open the phone address book and pick people to invite — like a native
          app.
        </p>
      )}
      <div className="demo-actions-row demo-actions-single">
        <button
          type="button"
          className={DEMO_BUTTON_CLASS}
          onClick={handlePickClick}
          disabled={!Contacts.isSupported()}
        >
          Pick contacts
        </button>
      </div>
      <div className="demo-meta demo-meta-spaced">
        <p>Works here: {Contacts.isSupported() ? "Yes" : "No"}</p>
        {people.map((person, index) => (
          <p key={`${person.name?.[0] ?? "c"}-${index}`}>
            {(person.name ?? []).join(" ") || "Unnamed"}
            {person.tel?.[0] ? ` · ${person.tel[0]}` : ""}
            {person.email?.[0] ? ` · ${person.email[0]}` : ""}
          </p>
        ))}
        {status ? <p>{status}</p> : null}
      </div>
    </section>
  );
}

export default ContactsDemo;
