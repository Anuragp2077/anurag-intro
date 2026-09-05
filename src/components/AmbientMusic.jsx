import { useEffect, useRef, useState } from "react";

import ambience from "../assets/ambience.mp3";

function AmbientMusic() {
  const audioRef = useRef(null);

  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(ambience);

    audio.loop = true;
    audio.volume = 0.18;

    audioRef.current = audio;

    const savedState =
      localStorage.getItem("ambient-music");

    if (savedState === "on") {
      setPlaying(false);
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (playing) {
      audio.pause();

      setPlaying(false);

      localStorage.setItem(
        "ambient-music",
        "off"
      );

      return;
    }

    try {
      await audio.play();

      setPlaying(true);

      localStorage.setItem(
        "ambient-music",
        "on"
      );
    } catch (error) {
      console.error(
        "Unable to play ambient music:",
        error
      );
    }
  };

  return (
    <button
      type="button"
      onClick={toggleMusic}
      aria-label={
        playing
          ? "Turn ambient music off"
          : "Turn ambient music on"
      }
      aria-pressed={playing}
      className="
        fixed
        bottom-5
        right-5
        z-[50]

        flex
        h-11
        w-11
        items-center
        justify-center

        rounded-full
        border
        border-black/10
        bg-white/80

        text-sm
        text-black/60

        shadow-[0_8px_30px_rgba(0,0,0,0.10)]
        backdrop-blur-xl

        transition-all
        duration-300

        hover:scale-105
        hover:border-orange-500/40
        hover:text-orange-500

        active:scale-90

        dark:border-white/10
        dark:bg-[#111]/80
        dark:text-white/60

        dark:hover:text-orange-400
      "
    >
      <span
        className={`
          transition-transform
          duration-300
          ${
            playing
              ? "scale-110"
              : "scale-100"
          }
        `}
      >
        {playing ? "♫" : "♪"}
      </span>

      {playing && (
        <span
          className="
            absolute
            inset-0
            -z-10
            rounded-full
            bg-orange-500/10
            animate-pulse
          "
        />
      )}
    </button>
  );
}

export default AmbientMusic;