import { useEffect, useRef, useState } from "react";

function DesktopNotice() {
  const [visible, setVisible] = useState(false);
  const [dragY, setDragY] = useState(0);

  const startYRef = useRef(null);
  const draggingRef = useRef(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(
      "desktop-notice-dismissed"
    );

    if (!dismissed) {
      const timer = setTimeout(() => {
        setVisible(true);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, []);

  const dismissNotice = () => {
    setVisible(false);
    setDragY(0);

    localStorage.setItem(
      "desktop-notice-dismissed",
      "true"
    );
  };

  const handlePointerDown = (event) => {
    if (event.target.closest("button")) {
      return;
    }

    startYRef.current = event.clientY;
    draggingRef.current = true;

    event.currentTarget.setPointerCapture(
      event.pointerId
    );
  };

  const handlePointerMove = (event) => {
    if (
      !draggingRef.current ||
      startYRef.current === null
    ) {
      return;
    }

    const distance =
      event.clientY - startYRef.current;

    // Only allow downward movement.
    if (distance > 0) {
      setDragY(Math.min(distance, 120));
    }
  };

  const handlePointerUp = (event) => {
    if (!draggingRef.current) {
      return;
    }

    const distance =
      event.clientY - (startYRef.current ?? event.clientY);

    draggingRef.current = false;
    startYRef.current = null;

    event.currentTarget.releasePointerCapture(
      event.pointerId
    );

    if (distance > 60) {
      dismissNotice();
    } else {
      setDragY(0);
    }
  };

  const handlePointerCancel = () => {
    draggingRef.current = false;
    startYRef.current = null;
    setDragY(0);
  };

  if (!visible) {
    return null;
  }

  return (
    <div
      className="
        fixed
        bottom-4
        left-4
        right-4
        z-[55]
        md:hidden
      "
      style={{
        transform: `translateY(${dragY}px)`,
        opacity: Math.max(
          0.25,
          1 - dragY / 100
        ),
        transition:
          draggingRef.current
            ? "none"
            : "transform 300ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms ease",
      }}
    >
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        className="
          relative
          flex
          min-h-14
          touch-none
          select-none
          items-center
          gap-3
          overflow-hidden
          rounded-2xl
          border
          border-black/10
          bg-white/90
          px-4
          py-3
          shadow-[0_12px_40px_rgba(0,0,0,0.12)]
          backdrop-blur-xl
          dark:border-white/10
          dark:bg-[#111]/90
          dark:shadow-[0_12px_40px_rgba(0,0,0,0.35)]
        "
      >
        {/* Orange indicator */}
        <span
          className="
            absolute
            bottom-0
            left-0
            h-[2px]
            w-1/3
            bg-orange-500
          "
        />

        {/* Icon */}
        <div
          className="
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-orange-500/10
            text-sm
            text-orange-500
          "
        >
          ↗
        </div>

        {/* Text */}
        <div className="min-w-0 flex-1">
          <p
            className="
              truncate
              text-[9px]
              font-medium
              uppercase
              tracking-[0.16em]
              text-orange-500
            "
          >
            Best experienced on desktop
          </p>

          <p
            className="
              mt-0.5
              truncate
              text-[10px]
              text-black/45
              dark:text-white/40
            "
          >
            Some interactive features are better
            on a larger screen.
          </p>
        </div>

        {/* Close */}
        <button
          type="button"
          onClick={dismissNotice}
          className="
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-full
            text-lg
            leading-none
            text-black/35
            transition-all
            hover:bg-black/5
            hover:text-orange-500
            active:scale-90
            dark:text-white/35
            dark:hover:bg-white/5
          "
          aria-label="Dismiss desktop recommendation"
        >
          ×
        </button>
      </div>

      {/* Swipe hint */}
      <div
        className="
          pointer-events-none
          mt-1
          text-center
          text-[7px]
          uppercase
          tracking-[0.2em]
          text-black/20
          dark:text-white/20
        "
      >
        Swipe down to dismiss
      </div>
    </div>
  );
}

export default DesktopNotice;