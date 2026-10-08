import { useState } from "react";
import { AppStorage } from "@pwasdk/core";
import {
  DEMO_BUTTON_CLASS,
  DEMO_SECTION_CLASS,
} from "../../constants/demo.constants";
import CodeSnippet from "../code-snippet";
import { STORAGE_EXAMPLE } from "./storage-demo.constants";

function StorageDemo() {
  const [storedName, setStoredName] = useState<string>(
    () => AppStorage.local.get("demo:name") || "",
  );

  const handleSetNameClick = () => {
    const name = prompt("Enter a name to store:", storedName) || "";
    try {
      AppStorage.local.set("demo:name", name);
      setStoredName(name);
    } catch (e: any) {
      alert(e?.message || "Failed to store name");
    }
  };

  const handleClearNameClick = () => {
    try {
      AppStorage.local.remove("demo:name");
      setStoredName("");
    } catch (e: any) {
      alert(e?.message || "Failed to clear name");
    }
  };

  return (
    <section className={DEMO_SECTION_CLASS}>
      <h2>💾 Storage</h2>
      <p style={{ fontSize: "14px" }}>
        Simple wrapper around <code>localStorage</code> and{" "}
        <code>sessionStorage</code>.
      </p>
      {!AppStorage.local.isSupported() && (
        <div className="demo-callout">
          <strong>⚠️ localStorage not available:</strong>
          <br />
          This browser does not allow access to localStorage (possibly due to
          privacy settings).
        </div>
      )}
      <div>
        <button
          className={DEMO_BUTTON_CLASS}
          onClick={handleSetNameClick}
          disabled={!AppStorage.local.isSupported()}
        >
          Set Name in localStorage
        </button>
        <button
          className={DEMO_BUTTON_CLASS}
          onClick={handleClearNameClick}
          disabled={!AppStorage.local.isSupported()}
        >
          Clear Name
        </button>
      </div>
      <p style={{ fontSize: "14px", marginTop: "8px" }}>
        <strong>Stored name:</strong>{" "}
        {storedName ? <code>{storedName}</code> : "—"}
      </p>
      <CodeSnippet code={STORAGE_EXAMPLE} />
    </section>
  );
}

export default StorageDemo;
