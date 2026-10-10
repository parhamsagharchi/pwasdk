import { useState } from "react";
import { AppStorage, Device } from "@pwasdk/core";
import {
  DEMO_BUTTON_CLASS,
  DEMO_SECTION_CLASS,
} from "../../constants/demo.constants";

function StorageDemo() {
  const [storedName, setStoredName] = useState<string>(
    () => AppStorage.local.get("demo:name") || "",
  );
  const [online, setOnline] = useState(() => Device.online);

  const handleSetNameClick = () => {
    const name = prompt("Enter a name to store:", storedName) || "";
    try {
      AppStorage.local.set("demo:name", name);
      setStoredName(name);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to store name";
      alert(message);
    }
  };

  const handleClearNameClick = () => {
    try {
      AppStorage.local.remove("demo:name");
      setStoredName("");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to clear name";
      alert(message);
    }
  };

  const handleToggleOnlineClick = () => {
    setOnline((current) => !current);
  };

  const connection = Device.connection?.effectiveType || "unknown";

  return (
    <section className={DEMO_SECTION_CLASS}>
      {!AppStorage.local.isSupported() ? (
        <div className="demo-callout">localStorage is not available.</div>
      ) : null}
      <div className="storage-network-stage">
        <div className="storage-online-row">
          <span
            className={
              online ? "storage-online-dot is-online" : "storage-online-dot"
            }
          />
          <span>
            {online
              ? `Online (${connection})`
              : "Offline (simulated view)"}
          </span>
        </div>
        <button
          type="button"
          className={DEMO_BUTTON_CLASS}
          onClick={handleToggleOnlineClick}
        >
          {online ? "Simulate Offline" : "Simulate Online"}
        </button>
        <div className="haptic-pulse-grid">
          <button
            type="button"
            className={DEMO_BUTTON_CLASS}
            onClick={handleSetNameClick}
            disabled={!AppStorage.local.isSupported()}
          >
            Set Name
          </button>
          <button
            type="button"
            className={DEMO_BUTTON_CLASS}
            onClick={handleClearNameClick}
            disabled={!AppStorage.local.isSupported()}
          >
            Clear Name
          </button>
        </div>
        <p className="demo-meta">
          Stored name: {storedName ? <code>{storedName}</code> : "—"}
        </p>
      </div>
    </section>
  );
}

export default StorageDemo;
