import type { IConnectionStatusProps } from "./connection-status.types";

function ConnectionStatus({ protocol, debugInfo }: IConnectionStatusProps) {
  const secure = protocol === "https:";

  return (
    <div className={secure ? "demo-callout ok" : "demo-callout"}>
      <strong>Connection:</strong>{" "}
      {secure ? "HTTPS (Secure)" : "HTTP (Not Secure)"}
      <br />
      <strong>URL:</strong> {window.location.href}
      {debugInfo && <div className="demo-callout-body">{debugInfo}</div>}
    </div>
  );
}

export default ConnectionStatus;
