import { useEffect, useState } from "react";

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;

      const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

      if (documentHeight <= 0) {
        setProgress(0);
        return;
      }

      const currentProgress =
        (scrollTop / documentHeight) * 100;

      setProgress(currentProgress);
    };

    updateProgress();

    window.addEventListener("scroll", updateProgress, {
      passive: true,
    });

    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener(
        "scroll",
        updateProgress
      );

      window.removeEventListener(
        "resize",
        updateProgress
      );
    };
  }, []);

  return (
    <div
      className="
        pointer-events-none
        fixed
        left-0
        top-0
        z-[60]
        h-[2px]
        bg-orange-500
        transition-[width]
        duration-100
      "
      style={{
        width: `${progress}%`,
      }}
    />
  );
}

export default ScrollProgress;