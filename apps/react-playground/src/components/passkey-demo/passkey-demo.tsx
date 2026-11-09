import { useEffect, useState } from "react";
import { Passkey } from "@pwasdk/core";
import {
  DEMO_BUTTON_CLASS,
  DEMO_SECTION_CLASS,
} from "../../constants/demo.constants";

function PasskeyDemo() {
  const [platformOk, setPlatformOk] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    void (async () => {
      setPlatformOk(await Passkey.isPlatformAuthenticatorAvailable());
    })();
  }, []);

  const handleCreateClick = () => {
    void (async () => {
      try {
        const cred = await Passkey.create({
          rpName: "PWA SDK Demo",
          userId: "demo-user",
          userName: "demo@pwasdk.local",
          userDisplayName: "Demo User",
          challenge: Passkey.randomChallenge(),
        });
        setStatus(
          cred
            ? "Passkey created on this device."
            : "No credential returned (cancelled?).",
        );
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        setStatus(message || "Could not create passkey.");
      }
    })();
  };

  const handleGetClick = () => {
    void (async () => {
      try {
        const cred = await Passkey.get({
          challenge: Passkey.randomChallenge(),
        });
        setStatus(
          cred
            ? "Passkey assertion ok (login demo)."
            : "No assertion (cancelled?).",
        );
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        setStatus(message || "Could not use passkey.");
      }
    })();
  };

  return (
    <section className={DEMO_SECTION_CLASS}>
      {!Passkey.isSupported() ? (
        <div className="demo-callout">
          Passkeys / WebAuthn are not available in this browser.
        </div>
      ) : (
        <p className="demo-meta">
          Sign in with Face ID / fingerprint — modern passwordless login.
        </p>
      )}
      <div className="demo-actions-row">
        <button
          type="button"
          className={DEMO_BUTTON_CLASS}
          onClick={handleCreateClick}
          disabled={!Passkey.isSupported()}
        >
          Create passkey
        </button>
        <button
          type="button"
          className={DEMO_BUTTON_CLASS}
          onClick={handleGetClick}
          disabled={!Passkey.isSupported()}
        >
          Use passkey
        </button>
      </div>
      <div className="demo-meta demo-meta-spaced">
        <p>Works here: {Passkey.isSupported() ? "Yes" : "No"}</p>
        <p>Platform authenticator: {platformOk ? "Yes" : "No"}</p>
        {status ? <p>{status}</p> : null}
      </div>
    </section>
  );
}

export default PasskeyDemo;
