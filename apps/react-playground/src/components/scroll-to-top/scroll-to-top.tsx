import { useScrollToTopFab } from "./scroll-to-top.hooks";

function ScrollToTop() {
  const { visible, scrollToTop } = useScrollToTopFab();

  return (
    <button
      type="button"
      className={visible ? "scroll-top-fab is-visible" : "scroll-top-fab"}
      onClick={scrollToTop}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
    >
      <svg
        className="scroll-top-fab-icon"
        viewBox="0 0 24 24"
        width="22"
        height="22"
        aria-hidden="true"
      >
        <path
          d="M6.5 14.5L12 9l5.5 5.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default ScrollToTop;
