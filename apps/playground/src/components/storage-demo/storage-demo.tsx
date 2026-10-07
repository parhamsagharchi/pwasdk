import { useState } from "react";
import { AppStorage } from "@pwasdk/core";
import {
  DEMO_BUTTON_STYLE,
  DEMO_SECTION_STYLE,
} from "../../constants/demo.constants";

function StorageDemo() {
  const [storedName, setStoredName] = useState<string>(
    () => AppStorage.local.get("demo:name") || "",
  );

  return (
    <section style={DEMO_SECTION_STYLE}>
      <h2>💾 Storage</h2>
      <p style={{ fontSize: "14px" }}>
        Simple wrapper around <code>localStorage</code> and{" "}
        <code>sessionStorage</code>.
      </p>
      {!AppStorage.local.isSupported() && (
        <div
          style={{
            padding: "10px",
            backgroundColor: "#fff3cd",
            border: "1px solid #ffc107",
            borderRadius: "4px",
            marginBottom: "10px",
          }}
        >
          <strong>⚠️ localStorage not available:</strong>
          <br />
          This browser does not allow access to localStorage (possibly due to
          privacy settings).
        </div>
      )}
      <div>
        <button
          style={DEMO_BUTTON_STYLE}
          onClick={() => {
            const name = prompt("Enter a name to store:", storedName) || "";
            try {
              AppStorage.local.set("demo:name", name);
              setStoredName(name);
            } catch (e: any) {
              alert(e?.message || "Failed to store name");
            }
          }}
          disabled={!AppStorage.local.isSupported()}
        >
          Set Name in localStorage
        </button>
        <button
          style={DEMO_BUTTON_STYLE}
          onClick={() => {
            try {
              AppStorage.local.remove("demo:name");
              setStoredName("");
            } catch (e: any) {
              alert(e?.message || "Failed to clear name");
            }
          }}
          disabled={!AppStorage.local.isSupported()}
        >
          Clear Name
        </button>
      </div>
      <p style={{ fontSize: "14px", marginTop: "8px" }}>
        <strong>Stored name:</strong>{" "}
        {storedName ? <code>{storedName}</code> : "—"}
      </p>
    </section>
  );
}

export default StorageDemo;
