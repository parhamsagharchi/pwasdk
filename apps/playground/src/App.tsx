import { useState, useEffect, useRef } from "react";
import {
  Haptic,
  Share,
  Clipboard,
  Device,
  Push,
  Install,
  Badge,
  Geolocation,
  WakeLock,
  Fullscreen,
  AppStorage,
  Orientation,
  Camera,
  Microphone,
  Pwa,
  type GeoPosition,
} from "@pwasdk/core";

export default function App() {
  const [online, setOnline] = useState(Device.online);
  const [clipboardText, setClipboardText] = useState("");
  const [debugInfo, setDebugInfo] = useState<string>("");
  const [protocol, setProtocol] = useState(window.location.protocol);

  // --- Location state ---
  const [location, setLocation] = useState<GeoPosition | null>(null);
  const [locationError, setLocationError] = useState<string>("");
  const [isWatchingLocation, setIsWatchingLocation] = useState(false);
  const locationStopRef = useRef<(() => void) | null>(null);

  // --- Orientation state ---
  const [orientation, setOrientation] = useState<string | null>(null);

  // --- Wake Lock / Fullscreen state ---
  const [wakeLockActive, setWakeLockActive] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // --- Storage demo state ---
  const [storedName, setStoredName] = useState<string>(
    () => AppStorage.local.get("demo:name") || ""
  );

  // --- Camera & Mic state ---
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [micStream, setMicStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string>("");
  const [micError, setMicError] = useState<string>("");

  const isMediaDevicesSupported =
    Camera.isSupported() || Microphone.isSupported();

  const stopStream = (
    stream: MediaStream | null,
    setFn: (s: MediaStream | null) => void
  ) => {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      setFn(null);
    }
  };

  const openCamera = async (which: "front" | "back" | "laptop") => {
    setCameraError("");

    if (!Camera.isSupported()) {
      setCameraError("Camera API is not supported in this browser.");
      return;
    }

    stopStream(cameraStream, setCameraStream);

    try {
      let stream: MediaStream;
      if (which === "front") stream = await Camera.openFront();
      else if (which === "back") stream = await Camera.openBack();
      else stream = await Camera.openDefault();

      setCameraStream(stream);

      if (videoRef.current) {
        Camera.attachToVideo(videoRef.current, stream);
      }
    } catch (e: any) {
      console.error("camera error:", e);
      setCameraError(
        e?.message ||
          "Failed to open camera. Check HTTPS and camera permissions."
      );
    }
  };

  const openMic = async () => {
    setMicError("");

    if (!Microphone.isSupported()) {
      setMicError("Microphone API is not supported in this browser.");
      return;
    }

    stopStream(micStream, setMicStream);

    try {
      const stream = await Microphone.open();
      setMicStream(stream);

      if (audioRef.current) {
        Microphone.attachToAudio(audioRef.current, stream);
      }
    } catch (e: any) {
      console.error("mic error:", e);
      setMicError(
        e?.message || "Failed to open microphone. Check permissions."
      );
    }
  };

  const stopCameraOnly = () => {
    stopStream(cameraStream, setCameraStream);
    if (videoRef.current) videoRef.current.srcObject = null;
    setCameraError("");
  };

  const stopMicOnly = () => {
    stopStream(micStream, setMicStream);
    if (audioRef.current) audioRef.current.srcObject = null;
    setMicError("");
  };

  // --- existing logic ---
  useEffect(() => {
    Install.init();
    const unsubscribe = Device.onOnlineStatusChange((isOnline) => {
      setOnline(isOnline);
    });
    return unsubscribe;
  }, []);

  // track orientation changes
  useEffect(() => {
    if (!Orientation.isSupported()) return;
    setOrientation(Orientation.current());
    const unsubscribe = Orientation.onChange((o) => setOrientation(o));
    return unsubscribe;
  }, []);

  useEffect(() => {
    console.log("App mounted, checking features...");

    // Check if we're on HTTPS
    const isHTTPS = window.location.protocol === "https:";
    const isLocalhost =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    let warnings: string[] = [];

    if (!isHTTPS && !isLocalhost) {
      warnings.push(
        "⚠️ HTTPS required for many PWA features! Use https:// instead of http://"
      );
    }

    if (!Haptic.isSupported()) {
      warnings.push(
        "📳 Haptic not supported - Make sure you're on a mobile device"
      );
    }

    if (!Clipboard.isSupported()) {
      warnings.push("📋 Clipboard requires HTTPS (except localhost)");
    }

    if (!Push.isSupported()) {
      warnings.push("🔔 Push notifications require HTTPS");
    }

    setDebugInfo(warnings.join("\n"));
    setProtocol(window.location.protocol);
    console.log("Protocol:", window.location.protocol);
    console.log("Hostname:", window.location.hostname);
  }, []);

  const buttonStyle: React.CSSProperties = {
    padding: "12px 24px",
    margin: "8px",
    fontSize: "16px",
    cursor: "pointer",
    border: "2px solid #000",
    backgroundColor: "#fff",
    borderRadius: "8px",
    minWidth: "200px",
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: "32px",
    padding: "20px",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
  };

  return (
    <div
      style={{
        padding: 20,
        fontFamily: "sans-serif",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <h1>PWA SDK – Full Demo</h1>

      {/* Connection Status */}
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

      {/* Haptic Feedback */}
      <section style={sectionStyle}>
        <h2>📳 Haptic Feedback</h2>
        <p>Test vibration patterns on mobile devices</p>
        {!Haptic.isSupported() && (
          <div
            style={{
              padding: "10px",
              backgroundColor: "#fff3cd",
              border: "1px solid #ffc107",
              borderRadius: "4px",
              marginBottom: "10px",
            }}
          >
            <strong>⚠️ Vibration not supported:</strong>
            <br />
            {/iPhone|iPad|iPod/.test(navigator.userAgent) ? (
              <>
                iOS Safari doesn't support vibration API. Try Chrome on Android
                instead.
              </>
            ) : (
              <>
                Your browser/device doesn't support the Vibration API. Make sure
                you're using Chrome on Android.
              </>
            )}
          </div>
        )}
        <div>
          <button
            style={buttonStyle}
            onClick={() => {
              console.log("Testing light vibration...");
              const result = Haptic.trigger("light");
              console.log("Result:", result);
              if (!result) {
                alert(
                  "Vibration failed. Check console for details. Make sure you're on Chrome/Android!"
                );
              } else {
                console.log("✅ Light vibration should have triggered");
              }
            }}
          >
            Light Vibration (100ms)
          </button>
          <button
            style={buttonStyle}
            onClick={() => {
              console.log("Testing medium vibration...");
              const result = Haptic.trigger("medium");
              console.log("Result:", result);
              if (!result) {
                alert(
                  "Vibration failed. Check console for details. Make sure you're on Chrome/Android!"
                );
              } else {
                console.log("✅ Medium vibration should have triggered");
              }
            }}
          >
            Medium Vibration (200ms)
          </button>
          <button
            style={buttonStyle}
            onClick={() => {
              console.log("Testing heavy vibration...");
              const result = Haptic.trigger("heavy");
              console.log("Result:", result);
              if (!result) {
                alert(
                  "Vibration failed. Check console for details. Make sure you're on Chrome/Android!"
                );
              } else {
                console.log("✅ Heavy vibration should have triggered");
              }
            }}
          >
            Heavy Vibration (300-100-300ms)
          </button>
          <button
            style={buttonStyle}
            onClick={() => {
              console.log("Testing custom pattern...");
              const result = Haptic.pattern([200, 100, 200, 100, 200]);
              console.log("Result:", result);
              if (!result) {
                alert("Vibration failed. Check console for details.");
              } else {
                console.log("✅ Custom pattern should have triggered");
              }
            }}
          >
            Custom Pattern (200-100-200-100-200ms)
          </button>
          <button
            style={buttonStyle}
            onClick={() => {
              const result = Haptic.stop();
              console.log("Stop vibration result:", result);
            }}
          >
            Stop Vibration
          </button>
        </div>
        <div style={{ marginTop: "10px", fontSize: "14px" }}>
          <p>
            <strong>Status:</strong>{" "}
            {Haptic.isSupported() ? "✅ Supported" : "❌ Not Supported"}
          </p>
          <p>
            <strong>Device:</strong>{" "}
            {Device.isMobile ? "📱 Mobile" : "💻 Desktop"}
          </p>
          <p>
            <strong>Browser:</strong>{" "}
            {navigator.userAgent.includes("Chrome")
              ? "Chrome ✅"
              : navigator.userAgent.includes("Safari")
              ? "Safari ⚠️ (iOS Safari doesn't support vibration)"
              : "Other"}
          </p>
          <p>
            <small>
              💡 Tip: Open browser console (F12 or DevTools) to see detailed
              vibration logs
            </small>
          </p>
        </div>
      </section>

      {/* Share API */}
      <section style={sectionStyle}>
        <h2>📤 Share</h2>
        <button
          style={buttonStyle}
          onClick={async () => {
            const result = await Share.share({
              title: "PWA SDK",
              text: "Check out this awesome PWA SDK!",
              url: window.location.href,
            });
            if (result) {
              alert("Shared successfully!");
            }
          }}
        >
          Share This Page
        </button>
        <p>
          <small>Supported: {String(Share.isSupported())}</small>
        </p>
      </section>

      {/* Clipboard */}
      <section style={sectionStyle}>
        <h2>📋 Clipboard</h2>
        <div>
          <button
            style={buttonStyle}
            onClick={async () => {
              try {
                await Clipboard.copy("Hello from PWA SDK!");
                alert("Copied to clipboard!");
              } catch (error: any) {
                alert("Failed to copy: " + error.message);
              }
            }}
          >
            Copy Text
          </button>
          <button
            style={buttonStyle}
            onClick={async () => {
              try {
                const text = await Clipboard.paste();
                setClipboardText(text);
                alert("Pasted: " + text);
              } catch (error: any) {
                alert("Failed to paste: " + error.message);
              }
            }}
          >
            Paste Text
          </button>
        </div>
        {clipboardText && (
          <p>
            Last pasted: <code>{clipboardText}</code>
          </p>
        )}
        <p>
          <small>Supported: {String(Clipboard.isSupported())}</small>
        </p>
      </section>

      {/* Push Notifications */}
      <section style={sectionStyle}>
        <h2>🔔 Push Notifications</h2>
        <div>
          <button
            style={buttonStyle}
            onClick={async () => {
              try {
                console.log("Step 1: Registering service worker...");
                const reg = await Push.register();
                if (!reg) {
                  alert(
                    "Failed to register service worker. Check console for details."
                  );
                  return;
                }

                console.log("Step 2: Requesting notification permission...");
                const permission = await Push.requestPermission();
                console.log("Permission result:", permission);

                if (permission === "granted") {
                  const vapidPublicKey = import.meta.env
                    .VITE_VAPID_PUBLIC_KEY as string | undefined;
                  if (!vapidPublicKey) {
                    alert(
                      "Permission granted, but no VAPID public key is configured.\n\nSet VITE_VAPID_PUBLIC_KEY in apps/playground/.env and restart the dev server."
                    );
                    return;
                  }
                  try {
                    const subscription = await Push.subscribe(vapidPublicKey);
                    console.log("Push subscription:", subscription);
                    alert(
                      "Push notifications enabled.\n\nSubscription endpoint is logged in the console."
                    );
                  } catch (subError: any) {
                    console.error("Subscription error:", subError);
                    alert(
                      "Notifications allowed, but failed to create push subscription: " +
                        (subError.message || subError)
                    );
                  }
                } else if (permission === "denied") {
                  alert(
                    "❌ Push notifications permission denied. Check browser settings."
                  );
                } else {
                  alert(
                    "⚠️ Push notifications permission dismissed. Try again."
                  );
                }
              } catch (error: any) {
                console.error("Push notification error:", error);
                alert("Failed to enable push: " + (error.message || error));
              }
            }}
          >
            Enable Push Notifications
          </button>
        </div>
        <div style={{ marginTop: "10px", fontSize: "14px" }}>
          <p>
            <strong>Supported:</strong> {String(Push.isSupported())}
          </p>
          <p>
            <strong>Service Worker:</strong>{" "}
            {"serviceWorker" in navigator ? "✅" : "❌"}
          </p>
          <p>
            <strong>Push Manager:</strong>{" "}
            {"PushManager" in window ? "✅" : "❌"}
          </p>
          <p>
            <strong>Notification API:</strong>{" "}
            {"Notification" in window ? "✅" : "❌"}
          </p>
          <p>
            <small>💡 Open browser console to see detailed logs</small>
          </p>
        </div>
      </section>

      {/* Install */}
      <section style={sectionStyle}>
        <h2>📱 Install PWA</h2>
        {Install.isInstalled() && (
          <div
            style={{
              padding: "10px",
              backgroundColor: "#d4edda",
              border: "1px solid #28a745",
              borderRadius: "4px",
              marginBottom: "10px",
            }}
          >
            ✅ App is already installed!
          </div>
        )}
        {!Install.isSupported() && (
          <div
            style={{
              padding: "10px",
              backgroundColor: "#fff3cd",
              border: "1px solid #ffc107",
              borderRadius: "4px",
              marginBottom: "10px",
            }}
          >
            <strong>⚠️ Install not available:</strong>
            <br />
            Make sure you have:
            <ul style={{ margin: "5px 0", paddingLeft: "20px" }}>
              <li>Valid manifest.json</li>
              <li>Service worker registered</li>
              <li>HTTPS connection</li>
              <li>App meets installability criteria</li>
            </ul>
          </div>
        )}
        <button
          style={buttonStyle}
          onClick={async () => {
            console.log("Install button clicked");
            try {
              const installed = await Install.prompt();
              console.log("Install result:", installed);
              if (installed) {
                alert("✅ PWA installed successfully!");
              } else {
                alert(
                  "Install prompt not available. Check console for details."
                );
              }
            } catch (error: any) {
              console.error("Install error:", error);
              alert("Install error: " + (error.message || error));
            }
          }}
          disabled={Install.isInstalled()}
        >
          {Install.isInstalled() ? "Already Installed" : "Install App"}
        </button>
        <div style={{ marginTop: "10px", fontSize: "14px" }}>
          <p>
            <strong>Installed:</strong> {String(Install.isInstalled())}
          </p>
          <p>
            <strong>Supported:</strong> {String(Install.isSupported())}
          </p>
          <p>
            <strong>Standalone Mode:</strong>{" "}
            {window.matchMedia("(display-mode: standalone)").matches
              ? "✅"
              : "❌"}
          </p>
          <p>
            <small>💡 Open browser console to see install prompt events</small>
          </p>
        </div>
      </section>

      {/* Badge */}
      <section style={sectionStyle}>
        <h2>🏷️ App Badge</h2>
        <div>
          <button
            style={buttonStyle}
            onClick={async () => {
              try {
                await Badge.set(5);
                alert("Badge set to 5");
              } catch (error: any) {
                alert("Failed: " + error.message);
              }
            }}
          >
            Set Badge (5)
          </button>
          <button
            style={buttonStyle}
            onClick={async () => {
              try {
                await Badge.clear();
                alert("Badge cleared");
              } catch (error: any) {
                alert("Failed: " + error.message);
              }
            }}
          >
            Clear Badge
          </button>
        </div>
        <p>
          <small>Supported: {String(Badge.isSupported())}</small>
        </p>
        <p style={{ fontSize: "12px", marginTop: "4px" }}>
          📌 The badge is a small number shown on the installed app icon (for
          example in the taskbar/dock). It only works in some browsers (like
          Chrome/Edge) when the PWA is installed; on iOS it is usually not
          supported.
        </p>
      </section>

      {/* Camera */}
      <section style={sectionStyle}>
        <h2>📷 Camera</h2>
        <p style={{ fontSize: "14px" }}>
          Open device camera (front / back). Requires HTTPS and user permission.
        </p>

        {!isMediaDevicesSupported && (
          <div
            style={{
              padding: "10px",
              backgroundColor: "#fff3cd",
              border: "1px solid #ffc107",
              borderRadius: "4px",
              marginBottom: "10px",
            }}
          >
            <strong>⚠️ Camera not supported:</strong>
            <br />
            Your browser does not support{" "}
            <code>navigator.mediaDevices.getUserMedia</code>.
          </div>
        )}

        <div>
          <button
            style={buttonStyle}
            onClick={() => openCamera("front")}
            disabled={!isMediaDevicesSupported}
          >
            Open Front Camera
          </button>
          <button
            style={buttonStyle}
            onClick={() => openCamera("back")}
            disabled={!isMediaDevicesSupported}
          >
            Open Back Camera
          </button>
          <button
            style={buttonStyle}
            onClick={() => openCamera("laptop")}
            disabled={!isMediaDevicesSupported}
          >
            Open Camera (Laptop)
          </button>
          <button
            style={buttonStyle}
            onClick={stopCameraOnly}
            disabled={!cameraStream}
          >
            Stop Camera
          </button>
        </div>

        {cameraError && (
          <p style={{ color: "red", marginTop: "10px", fontSize: "13px" }}>
            {cameraError}
          </p>
        )}

        <div style={{ marginTop: "10px" }}>
          <video
            ref={videoRef}
            style={{
              width: "100%",
              maxWidth: "400px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              background: "#000",
              display: "block",
            }}
            playsInline
            muted
          />
          <p style={{ fontSize: "12px", marginTop: "6px" }}>
            💡 On mobile you must allow camera permissions and use HTTPS.
          </p>
        </div>
      </section>

      {/* Microphone */}
      <section style={sectionStyle}>
        <h2>🎙️ Microphone</h2>
        <p style={{ fontSize: "14px" }}>
          Capture audio from the device microphone. Requires HTTPS and user
          permission.
        </p>

        {!isMediaDevicesSupported && (
          <div
            style={{
              padding: "10px",
              backgroundColor: "#fff3cd",
              border: "1px solid #ffc107",
              borderRadius: "4px",
              marginBottom: "10px",
            }}
          >
            <strong>⚠️ Microphone not supported:</strong>
            <br />
            Your browser does not support{" "}
            <code>navigator.mediaDevices.getUserMedia</code>.
          </div>
        )}

        <div>
          <button
            style={buttonStyle}
            onClick={openMic}
            disabled={!isMediaDevicesSupported}
          >
            Open Microphone
          </button>
          <button
            style={buttonStyle}
            onClick={stopMicOnly}
            disabled={!micStream}
          >
            Stop Microphone
          </button>
        </div>

        {micError && (
          <p style={{ color: "red", marginTop: "10px", fontSize: "13px" }}>
            {micError}
          </p>
        )}

        <div style={{ marginTop: "10px" }}>
          <audio
            ref={audioRef}
            style={{ marginTop: "8px", width: "100%" }}
            controls
          />
          <p style={{ fontSize: "12px", marginTop: "6px" }}>
            💡 On mobile you must allow microphone permissions and use HTTPS.
          </p>
        </div>
      </section>

      {/* Device Info */}
      <section style={sectionStyle}>
        <h2>📱 Device Information</h2>
        <div style={{ fontFamily: "monospace", fontSize: "14px" }}>
          <p>
            <strong>Mobile:</strong> {String(Device.isMobile)}
          </p>
          <p>
            <strong>Online:</strong> {String(online)}
          </p>
          <p>
            <strong>Platform:</strong> {Device.platform}
          </p>
          <p>
            <strong>User Agent:</strong> {Device.userAgent.substring(0, 50)}...
          </p>
          {Device.connection && (
            <>
              <p>
                <strong>Connection Type:</strong>{" "}
                {Device.connection.effectiveType || "unknown"}
              </p>
              <p>
                <strong>Downlink:</strong> {Device.connection.downlink} Mbps
              </p>
            </>
          )}
          {Device.orientation && (
            <p>
              <strong>Orientation (Device API):</strong> {Device.orientation}
            </p>
          )}
          {orientation && (
            <p>
              <strong>Orientation (Screen API):</strong> {orientation}
            </p>
          )}
          <p>
            <strong>PWA Platform:</strong> {Pwa.platform()}
          </p>
          <p>
            <strong>Standalone:</strong> {String(Pwa.isStandalone())}
          </p>
        </div>
      </section>

      {/* Location */}
      <section style={sectionStyle}>
        <h2>📍 Location</h2>
        <p style={{ fontSize: "14px" }}>
          Get the user&apos;s current location using the Geolocation API.
        </p>
        {!Geolocation.isSupported() && (
          <div
            style={{
              padding: "10px",
              backgroundColor: "#fff3cd",
              border: "1px solid #ffc107",
              borderRadius: "4px",
              marginBottom: "10px",
            }}
          >
            <strong>⚠️ Location not supported:</strong>
            <br />
            Your browser does not support the Geolocation API.
          </div>
        )}
        <div>
          <button
            style={buttonStyle}
            onClick={async () => {
              setLocationError("");
              try {
                const pos = await Geolocation.getCurrent({
                  enableHighAccuracy: true,
                  timeout: 10000,
                });
                setLocation(pos);
              } catch (e: any) {
                setLocationError(e?.message || "Failed to get location");
              }
            }}
            disabled={!Geolocation.isSupported()}
          >
            Get Current Location
          </button>
          <button
            style={buttonStyle}
            onClick={() => {
              if (!isWatchingLocation) {
                setLocationError("");
                try {
                  const stop = Geolocation.watch(
                    (pos) => {
                      setLocation(pos);
                    },
                    (err) => {
                      setLocationError(err.message);
                    },
                    { enableHighAccuracy: true }
                  );
                  locationStopRef.current = stop;
                  setIsWatchingLocation(true);
                } catch (e: any) {
                  setLocationError(e?.message || "Failed to watch location");
                }
              } else {
                if (locationStopRef.current) locationStopRef.current();
                locationStopRef.current = null;
                setIsWatchingLocation(false);
              }
            }}
            disabled={!Geolocation.isSupported()}
          >
            {isWatchingLocation ? "Stop Watching" : "Watch Location"}
          </button>
        </div>
        {locationError && (
          <p style={{ color: "red", marginTop: "10px", fontSize: "13px" }}>
            {locationError}
          </p>
        )}
        {location && (
          <div
            style={{
              marginTop: "10px",
              fontFamily: "monospace",
              fontSize: "14px",
            }}
          >
            <p>
              <strong>Latitude:</strong> {location.lat}
            </p>
            <p>
              <strong>Longitude:</strong> {location.lng}
            </p>
            {location.accuracy != null && (
              <p>
                <strong>Accuracy:</strong> {Math.round(location.accuracy)} m
              </p>
            )}
          </div>
        )}
      </section>

      {/* Wake Lock */}
      <section style={sectionStyle}>
        <h2>🔒 Wake Lock</h2>
        <p style={{ fontSize: "14px" }}>
          Keep the screen awake while the user is interacting with your app.
        </p>
        {!WakeLock.isSupported() && (
          <div
            style={{
              padding: "10px",
              backgroundColor: "#fff3cd",
              border: "1px solid #ffc107",
              borderRadius: "4px",
              marginBottom: "10px",
            }}
          >
            <strong>⚠️ Wake Lock not supported:</strong>
            <br />
            This browser does not support the Wake Lock API.
          </div>
        )}
        <div>
          <button
            style={buttonStyle}
            onClick={async () => {
              try {
                await WakeLock.request();
                setWakeLockActive(true);
              } catch (e: any) {
                alert(e?.message || "Failed to request wake lock");
              }
            }}
            disabled={!WakeLock.isSupported() || wakeLockActive}
          >
            Request Wake Lock
          </button>
          <button
            style={buttonStyle}
            onClick={async () => {
              await WakeLock.release();
              setWakeLockActive(false);
            }}
            disabled={!wakeLockActive}
          >
            Release Wake Lock
          </button>
        </div>
        <p style={{ fontSize: "14px", marginTop: "8px" }}>
          <strong>Status:</strong>{" "}
          {wakeLockActive ? "✅ Active" : "❌ Not active"}
        </p>
      </section>

      {/* Fullscreen */}
      <section style={sectionStyle}>
        <h2>⛶ Fullscreen</h2>
        <p style={{ fontSize: "14px" }}>
          Toggle fullscreen mode for the page (useful for games or videos).
        </p>
        {!Fullscreen.isSupported() && (
          <div
            style={{
              padding: "10px",
              backgroundColor: "#fff3cd",
              border: "1px solid #ffc107",
              borderRadius: "4px",
              marginBottom: "10px",
            }}
          >
            <strong>⚠️ Fullscreen not supported:</strong>
            <br />
            This browser does not support the Fullscreen API.
          </div>
        )}
        <div>
          <button
            style={buttonStyle}
            onClick={async () => {
              try {
                await Fullscreen.toggle();
                setIsFullscreen(Fullscreen.isFullscreen());
              } catch (e: any) {
                alert(e?.message || "Failed to toggle fullscreen");
              }
            }}
            disabled={!Fullscreen.isSupported()}
          >
            {isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          </button>
        </div>
        <p style={{ fontSize: "14px", marginTop: "8px" }}>
          <strong>Fullscreen:</strong> {String(isFullscreen)}
        </p>
      </section>

      {/* Storage */}
      <section style={sectionStyle}>
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
            style={buttonStyle}
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
            style={buttonStyle}
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
    </div>
  );
}