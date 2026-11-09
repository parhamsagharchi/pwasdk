import { useEffect, useRef, useState } from "react";

const SHOW_AFTER_PX = 320;
const DIRECTION_DELTA = 14;
const IDLE_SHOW_MS = 240;

/**
 * Soft Telegram-like FAB:
 * - hide near top
 * - fade out while scrolling down
 * - fade in while scrolling up
 * - gently reappear after scroll settles (if still past threshold)
 */
export function useScrollToTopFab() {
  const [visible, setVisible] = useState(false);
  const lastYRef = useRef(0);
  const tickingRef = useRef(false);
  const idleTimerRef = useRef<number | null>(null);

  useEffect(() => {
    lastYRef.current = window.scrollY;

    const clearIdle = () => {
      if (idleTimerRef.current != null) {
        window.clearTimeout(idleTimerRef.current);
        idleTimerRef.current = null;
      }
    };

    const scheduleIdleShow = () => {
      clearIdle();
      idleTimerRef.current = window.setTimeout(() => {
        if (window.scrollY > SHOW_AFTER_PX) {
          setVisible(true);
        }
      }, IDLE_SHOW_MS);
    };

    const update = () => {
      tickingRef.current = false;
      const y = window.scrollY;
      const prev = lastYRef.current;
      const delta = y - prev;
      lastYRef.current = y;

      if (y <= SHOW_AFTER_PX) {
        clearIdle();
        setVisible(false);
        return;
      }

      if (delta > DIRECTION_DELTA) {
        setVisible(false);
        scheduleIdleShow();
        return;
      }

      if (delta < -DIRECTION_DELTA) {
        setVisible(true);
        clearIdle();
        return;
      }

      scheduleIdleShow();
    };

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearIdle();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return { visible, scrollToTop };
}
