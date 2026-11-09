import { useEffect, useRef } from "react";

/**
 * Run `start` when the demo mounts; always run `stop` on unmount
 * (module tab change / leaving `?module=`).
 */
export function useDemoAutorun(
  start: () => void | Promise<void>,
  stop?: () => void,
) {
  const startRef = useRef(start);
  const stopRef = useRef(stop);
  startRef.current = start;
  stopRef.current = stop;

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      await startRef.current();
      if (cancelled) stopRef.current?.();
    })();
    return () => {
      cancelled = true;
      stopRef.current?.();
    };
  }, []);
}
