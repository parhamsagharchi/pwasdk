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
    const name = prompt("Enter a name to save on this device:", storedName) || "";
    try {
      AppStorage.local.set("demo:name", name);
      setStoredName(name);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Could not save the name";
      alert(message);
    }
  };

  const handleClearNameClick = () => {
    try {
      AppStorage.local.remove("demo:name");
      setStoredName("");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Could not clear the name";
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
        <div className="demo-callout">
          Device storage is not available in this browser.
        </div>
      ) : (
        <p className="demo-meta">
          Save a small value on the device (survives refresh). The online toggle
          below is only a UI simulation.
        </p>
      )}
      <div className="storage-network-stage">
        <div className="storage-online-row">
          <span
            className={
              online ? "storage-online-dot is-online" : "storage-online-dot"
            }
          />
          <span>
            {online
              ? `Online view (${connection})`
              : "Offline view (simulated)"}
          </span>
        </div>
        <div className="demo-actions-row demo-actions-single">
          <button
            type="button"
            className={DEMO_BUTTON_CLASS}
            onClick={handleToggleOnlineClick}
          >
            {online ? "Simulate offline UI" : "Simulate online UI"}
          </button>
        </div>
        <div className="demo-actions-row">
          <button
            type="button"
            className={DEMO_BUTTON_CLASS}
            onClick={handleSetNameClick}
            disabled={!AppStorage.local.isSupported()}
          >
            Save name
          </button>
          <button
            type="button"
            className={DEMO_BUTTON_CLASS}
            onClick={handleClearNameClick}
            disabled={!AppStorage.local.isSupported()}
          >
            Clear name
          </button>
        </div>
        <p className="demo-meta">
          Saved name: {storedName ? <code>{storedName}</code> : "—"}
        </p>
      </div>
    </section>
  );
}

export default StorageDemo;
