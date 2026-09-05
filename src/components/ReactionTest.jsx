import { useEffect, useRef, useState } from "react";

function ReactionTest() {
  const [status, setStatus] = useState("idle");
  const [time, setTime] = useState(null);
  const [bestTime, setBestTime] = useState(() => {
    const saved = localStorage.getItem("reaction-best-time");
    return saved ? Number(saved) : null;
  });

  const startTimeRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const startTest = () => {
    clearTimeout(timeoutRef.current);

    setTime(null);
    setStatus("waiting");

    const delay =
      Math.floor(Math.random() * 3500) + 1500;

    timeoutRef.current = setTimeout(() => {
      startTimeRef.current = performance.now();
      setStatus("ready");
    }, delay);
  };

  const handleAreaClick = () => {
    if (status === "idle") {
      startTest();
      return;
    }

    if (status === "waiting") {
      clearTimeout(timeoutRef.current);
      setStatus("too-soon");
      return;
    }

    if (status === "ready") {
      const reactionTime =
        performance.now() - startTimeRef.current;

      const roundedTime = Math.round(reactionTime);

      setTime(roundedTime);
      setStatus("result");

      if (
        bestTime === null ||
        roundedTime < bestTime
      ) {
        setBestTime(roundedTime);

        localStorage.setItem(
          "reaction-best-time",
          String(roundedTime)
        );
      }
    }
  };

  const resetTest = () => {
    clearTimeout(timeoutRef.current);

    setStatus("idle");
    setTime(null);
    startTimeRef.current = null;
  };

  let title = "Reaction Test";
  let subtitle = "Click to start";

  if (status === "waiting") {
    title = "Wait...";
    subtitle = "Don't click yet";
  }

  if (status === "ready") {
    title = "CLICK!";
    subtitle = "React as fast as you can";
  }

  if (status === "too-soon") {
    title = "Too soon!";
    subtitle = "You clicked before the signal";
  }

  if (status === "result") {
    title = `${time} ms`;
    subtitle =
      bestTime === time
        ? "New best time!"
        : "Nice reaction";
  }

  return (
    <div className="mx-auto w-full max-w-md">
      {/* Header */}
      <div className="mb-4 flex items-end justify-between">
        <div>
          <p className="text-[9px] uppercase tracking-[0.2em] text-orange-500">
            Reflex Test
          </p>

          <p className="mt-1 text-[10px] text-black/40 dark:text-white/35">
            Test your reaction speed
          </p>
        </div>

        {bestTime !== null && (
          <div className="text-right">
            <p className="text-[8px] uppercase tracking-wider text-black/30 dark:text-white/25">
              Best
            </p>

            <p className="text-sm font-medium text-orange-500">
              {bestTime} ms
            </p>
          </div>
        )}
      </div>

      {/* Test Area */}
      <div
        role="button"
        tabIndex={0}
        onClick={handleAreaClick}
        onKeyDown={(event) => {
          if (
            event.key === "Enter" ||
            event.key === " "
          ) {
            event.preventDefault();
            handleAreaClick();
          }
        }}
        className={`
          relative
          flex
          min-h-56
          cursor-pointer
          select-none
          flex-col
          items-center
          justify-center
          overflow-hidden
          rounded-2xl
          border
          transition-all
          duration-200

          ${
            status === "ready"
              ? "border-orange-500 bg-orange-500 text-white"
              : status === "too-soon"
              ? "border-red-500/40 bg-red-500/10"
              : "border-black/10 bg-black/[0.025] hover:border-orange-500/40 hover:bg-orange-500/[0.04] dark:border-white/10 dark:bg-white/[0.025] dark:hover:bg-orange-500/[0.05]"
          }
        `}
      >
        {/* Decorative circles */}
        <div
          className={`
            pointer-events-none
            absolute
            h-40
            w-40
            rounded-full
            border
            transition-all
            duration-500
            ${
              status === "ready"
                ? "scale-150 border-white/20"
                : "scale-100 border-orange-500/10"
            }
          `}
        />

        <div
          className={`
            pointer-events-none
            absolute
            h-24
            w-24
            rounded-full
            border
            transition-all
            duration-500
            ${
              status === "ready"
                ? "scale-150 border-white/30"
                : "scale-100 border-orange-500/15"
            }
          `}
        />

        <div className="relative z-10 text-center">
          <p
            className={`
              text-2xl
              font-semibold
              tracking-tight
              ${
                status === "ready"
                  ? "text-white"
                  : "text-black dark:text-white"
              }
            `}
          >
            {title}
          </p>

          <p
            className={`
              mt-2
              text-[10px]
              uppercase
              tracking-[0.18em]
              ${
                status === "ready"
                  ? "text-white/70"
                  : status === "too-soon"
                  ? "text-red-500"
                  : "text-black/35 dark:text-white/30"
              }
            `}
          >
            {subtitle}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-3 flex justify-center">
        {status === "result" ||
        status === "too-soon" ? (
          <button
            type="button"
            onClick={resetTest}
            className="
              rounded-full
              border
              border-black/10
              px-4
              py-2
              text-[9px]
              font-medium
              uppercase
              tracking-[0.15em]
              text-black/50
              transition-all
              hover:border-orange-500/40
              hover:text-orange-500
              active:scale-95
              dark:border-white/10
              dark:text-white/40
            "
          >
            Try Again
          </button>
        ) : (
          <p className="text-[8px] uppercase tracking-[0.15em] text-black/20 dark:text-white/20">
            Click anywhere inside the box
          </p>
        )}
      </div>
    </div>
  );
}

export default ReactionTest;