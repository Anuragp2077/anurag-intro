import { useCallback, useEffect, useRef, useState } from "react";

const WHITE_KEYS = [
  { note: "C4", key: "a", frequency: 261.63 },
  { note: "D4", key: "s", frequency: 293.66 },
  { note: "E4", key: "d", frequency: 329.63 },
  { note: "F4", key: "f", frequency: 349.23 },
  { note: "G4", key: "g", frequency: 392.0 },
  { note: "A4", key: "h", frequency: 440.0 },
  { note: "B4", key: "j", frequency: 493.88 },
  { note: "C5", key: "k", frequency: 523.25 },
];

const BLACK_KEYS = [
  {
    note: "C#4",
    key: "w",
    frequency: 277.18,
    left: "12.5%",
  },
  {
    note: "D#4",
    key: "e",
    frequency: 311.13,
    left: "25%",
  },
  {
    note: "F#4",
    key: "t",
    frequency: 369.99,
    left: "50%",
  },
  {
    note: "G#4",
    key: "y",
    frequency: 415.3,
    left: "62.5%",
  },
  {
    note: "A#4",
    key: "u",
    frequency: 466.16,
    left: "75%",
  },
];

const ALL_KEYS = [
  ...WHITE_KEYS,
  ...BLACK_KEYS,
];

function Piano() {
  const [activeKeys, setActiveKeys] = useState([]);
  const [volume, setVolume] = useState(0.45);

  const audioContextRef = useRef(null);
  const masterGainRef = useRef(null);
  const activeVoicesRef = useRef(new Map());

  const createAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      const AudioContext =
        window.AudioContext ||
        window.webkitAudioContext;

      if (!AudioContext) {
        return null;
      }

      const context = new AudioContext();

      const masterGain =
        context.createGain();

      masterGain.gain.value = volume;

      masterGain.connect(
        context.destination
      );

      audioContextRef.current = context;
      masterGainRef.current = masterGain;
    }

    if (
      audioContextRef.current.state ===
      "suspended"
    ) {
      audioContextRef.current.resume();
    }

    return audioContextRef.current;
  }, [volume]);

  useEffect(() => {
    if (masterGainRef.current) {
      masterGainRef.current.gain.value =
        volume;
    }
  }, [volume]);

  const playNote = useCallback(
    (pianoKey) => {
      if (
        activeVoicesRef.current.has(
          pianoKey.note
        )
      ) {
        return;
      }

      const context =
        createAudioContext();

      if (!context) {
        return;
      }

      const oscillator =
        context.createOscillator();

      const gain =
        context.createGain();

      oscillator.type = "triangle";
      oscillator.frequency.value =
        pianoKey.frequency;

      const now = context.currentTime;

      gain.gain.setValueAtTime(
        0.001,
        now
      );

      gain.gain.exponentialRampToValueAtTime(
        0.75,
        now + 0.02
      );

      gain.gain.exponentialRampToValueAtTime(
        0.3,
        now + 0.15
      );

      oscillator.connect(gain);
      gain.connect(masterGainRef.current);

      oscillator.start(now);

      activeVoicesRef.current.set(
        pianoKey.note,
        {
          oscillator,
          gain,
        }
      );

      setActiveKeys((current) => [
        ...new Set([
          ...current,
          pianoKey.note,
        ]),
      ]);
    },
    [createAudioContext]
  );

  const stopNote = useCallback(
    (pianoKey) => {
      const voice =
        activeVoicesRef.current.get(
          pianoKey.note
        );

      if (!voice) {
        return;
      }

      const context =
        audioContextRef.current;

      if (!context) {
        return;
      }

      const now = context.currentTime;

      voice.gain.gain.cancelScheduledValues(
        now
      );

      voice.gain.gain.setValueAtTime(
        Math.max(
          voice.gain.gain.value,
          0.001
        ),
        now
      );

      voice.gain.gain.exponentialRampToValueAtTime(
        0.001,
        now + 0.25
      );

      voice.oscillator.stop(
        now + 0.28
      );

      activeVoicesRef.current.delete(
        pianoKey.note
      );

      setActiveKeys((current) =>
        current.filter(
          (note) =>
            note !== pianoKey.note
        )
      );
    },
    []
  );

  const handleKeyDown = useCallback(
    (event) => {
      if (event.repeat) {
        return;
      }

      const pianoKey =
        ALL_KEYS.find(
          (item) =>
            item.key === event.key
        );

      if (!pianoKey) {
        return;
      }

      event.preventDefault();

      playNote(pianoKey);
    },
    [playNote]
  );

  const handleKeyUp = useCallback(
    (event) => {
      const pianoKey =
        ALL_KEYS.find(
          (item) =>
            item.key === event.key
        );

      if (!pianoKey) {
        return;
      }

      event.preventDefault();

      stopNote(pianoKey);
    },
    [stopNote]
  );

  useEffect(() => {
    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    window.addEventListener(
      "keyup",
      handleKeyUp
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

      window.removeEventListener(
        "keyup",
        handleKeyUp
      );
    };
  }, [handleKeyDown, handleKeyUp]);

  useEffect(() => {
    return () => {
      activeVoicesRef.current.forEach(
        ({ oscillator }) => {
          try {
            oscillator.stop();
          } catch {
            // Already stopped.
          }
        }
      );

      activeVoicesRef.current.clear();

      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const isActive = (note) =>
    activeKeys.includes(note);

  const handlePointerDown = (
    event,
    pianoKey
  ) => {
    event.preventDefault();
    playNote(pianoKey);
  };

  const handlePointerUp = (
    event,
    pianoKey
  ) => {
    event.preventDefault();
    stopNote(pianoKey);
  };

  const handlePointerLeave = (
    event,
    pianoKey
  ) => {
    if (event.buttons === 1) {
      stopNote(pianoKey);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div
        className="
          flex
          flex-col
          gap-4
          border-b
          border-black/10
          p-5
          dark:border-white/10
          sm:flex-row
          sm:items-center
          sm:justify-between
          sm:px-7
          sm:py-5
        "
      >
        <div>
          <p
            className="
              text-[8px]
              uppercase
              tracking-[0.25em]
              text-black/35
              dark:text-white/30
            "
          >
            Mini Piano
          </p>

          <h3
            className="
              mt-1
              text-xl
              font-medium
              tracking-[-0.04em]
            "
          >
            Play a few notes.
          </h3>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-3">
          <span
            className="
              text-[8px]
              uppercase
              tracking-[0.2em]
              text-black/30
              dark:text-white/25
            "
          >
            Volume
          </span>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(event) =>
              setVolume(
                Number(event.target.value)
              )
            }
            className="
              h-1
              w-24
              cursor-pointer
              accent-orange-500
            "
            aria-label="Piano volume"
          />

          <span
            className="
              w-8
              text-right
              text-[9px]
              tabular-nums
              text-black/40
              dark:text-white/35
            "
          >
            {Math.round(volume * 100)}
          </span>
        </div>
      </div>

      {/* Piano wrapper */}
      <div
        className="
          px-4
          py-8
          sm:px-8
          sm:py-10
          md:px-10
          md:py-12
        "
      >
        <div
          className="
            relative
            mx-auto
            w-full
            max-w-5xl
          "
        >
          {/* Piano body */}
          <div
            className="
              relative
              overflow-hidden
              rounded-b-xl
              bg-black
              p-1
              shadow-2xl
              dark:bg-[#151515]
            "
          >
            {/* White keys */}
            <div
              className="
                relative
                flex
                h-[230px]
                w-full
                sm:h-[280px]
              "
            >
              {WHITE_KEYS.map(
                (pianoKey) => (
                  <button
                    key={pianoKey.note}
                    type="button"
                    onPointerDown={(event) =>
                      handlePointerDown(
                        event,
                        pianoKey
                      )
                    }
                    onPointerUp={(event) =>
                      handlePointerUp(
                        event,
                        pianoKey
                      )
                    }
                    onPointerCancel={(event) =>
                      handlePointerUp(
                        event,
                        pianoKey
                      )
                    }
                    onPointerLeave={(event) =>
                      handlePointerLeave(
                        event,
                        pianoKey
                      )
                    }
                    className={`
                      relative
                      h-full
                      min-w-0
                      flex-1
                      rounded-b-md
                      border
                      border-black/10
                      bg-white
                      text-black
                      shadow-[inset_0_-5px_0_rgba(0,0,0,0.08)]
                      transition-all
                      duration-75
                      ${
                        isActive(
                          pianoKey.note
                        )
                          ? "translate-y-1 bg-orange-100 shadow-[inset_0_-2px_0_rgba(0,0,0,0.08)]"
                          : "hover:bg-orange-50"
                      }
                    `}
                    aria-label={`Play ${pianoKey.note}`}
                  >
                    {/* Keyboard shortcut */}
                    <span
                      className="
                        absolute
                        bottom-5
                        left-1/2
                        -translate-x-1/2
                        text-[9px]
                        font-medium
                        uppercase
                        text-black/35
                      "
                    >
                      {pianoKey.key}
                    </span>

                    {/* Note */}
                    <span
                      className="
                        absolute
                        bottom-2
                        left-1/2
                        -translate-x-1/2
                        text-[7px]
                        text-black/20
                      "
                    >
                      {pianoKey.note}
                    </span>
                  </button>
                )
              )}

              {/* Black keys */}
              {BLACK_KEYS.map(
                (pianoKey) => (
                  <button
                    key={pianoKey.note}
                    type="button"
                    onPointerDown={(event) =>
                      handlePointerDown(
                        event,
                        pianoKey
                      )
                    }
                    onPointerUp={(event) =>
                      handlePointerUp(
                        event,
                        pianoKey
                      )
                    }
                    onPointerCancel={(event) =>
                      handlePointerUp(
                        event,
                        pianoKey
                      )
                    }
                    onPointerLeave={(event) =>
                      handlePointerLeave(
                        event,
                        pianoKey
                      )
                    }
                    className={`
                      absolute
                      top-0
                      z-20
                      h-[145px]
                      w-[9%]
                      -translate-x-1/2
                      rounded-b-md
                      border
                      border-black
                      text-white
                      shadow-[0_5px_0_rgba(0,0,0,0.5)]
                      transition-all
                      duration-75
                      sm:h-[175px]
                      ${
                        isActive(
                          pianoKey.note
                        )
                          ? "translate-x-[-50%] translate-y-1 bg-orange-500 shadow-[0_2px_0_rgba(0,0,0,0.5)]"
                          : "bg-[#171717] hover:bg-[#252525]"
                      }
                    `}
                    style={{
                      left: pianoKey.left,
                    }}
                    aria-label={`Play ${pianoKey.note}`}
                  >
                    <span
                      className="
                        absolute
                        bottom-4
                        left-1/2
                        -translate-x-1/2
                        text-[8px]
                        uppercase
                        text-white/45
                      "
                    >
                      {pianoKey.key}
                    </span>
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div
        className="
          flex
          flex-col
          gap-3
          border-t
          border-black/10
          px-5
          py-5
          dark:border-white/10
          sm:flex-row
          sm:items-center
          sm:justify-between
          sm:px-7
        "
      >
        <span
          className="
            text-[8px]
            uppercase
            tracking-[0.2em]
            text-black/30
            dark:text-white/25
          "
        >
          Keyboard
        </span>

        <span
          className="
            text-xs
            text-black/45
            dark:text-white/35
          "
        >
          White keys: A S D F G H J K
          <span className="mx-2 text-orange-500">
            •
          </span>
          Black keys: W E T Y U
        </span>
      </div>
    </div>
  );
}

export default Piano;