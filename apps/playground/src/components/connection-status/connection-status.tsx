import type { IConnectionStatusProps } from "./connection-status.types";

function ConnectionStatus({ protocol, debugInfo }: IConnectionStatusProps) {
  return (
    <div
      style={{
        padding: "12px",
        marginBottom: "20px",
        backgroundColor: protocol === "https:" ? "#d4edda" : "#fff3cd",
        border: `2px solid ${protocol === "https:" ? "#28a745" : "#ffc107"}`,
        borderRadius: "8px",
      }}
    >
      <strong>Connection:</strong>{" "}
      {protocol === "https:" ? "✅ HTTPS (Secure)" : "⚠️ HTTP (Not Secure)"}
      <br />
      <strong>URL:</strong> {window.location.href}
      {debugInfo && (
        <div
          style={{
            marginTop: "10px",
            fontSize: "14px",
            whiteSpace: "pre-line",
          }}
        >
          {debugInfo}
        </div>
      )}
    </div>
  );
}

export default ConnectionStatus;
