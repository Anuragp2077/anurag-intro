import { useEffect, useRef, useState } from "react";

const pads = [
  { key: "1", name: "Kick", type: "kick" },
  { key: "2", name: "Snare", type: "snare" },
  { key: "3", name: "Hi-Hat", type: "hihat" },
  { key: "4", name: "Tom", type: "tom" },
  { key: "5", name: "Clap", type: "clap" },
  { key: "6", name: "Rim", type: "rim" },
  { key: "7", name: "Open Hat", type: "openhat" },
  { key: "8", name: "Crash", type: "crash" },
  { key: "9", name: "Cowbell", type: "cowbell" },
];

function DrumPad() {
  const audioContextRef = useRef(null);
  const [volume, setVolume] = useState(0.45);
  const [activePad, setActivePad] = useState(null);

  const getAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current =
        new (window.AudioContext ||
          window.webkitAudioContext)();
    }

    return audioContextRef.current;
  };

  const playSound = (type) => {
    const ctx = getAudioContext();

    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const now = ctx.currentTime;

    const gain = ctx.createGain();
    gain.connect(ctx.destination);

    gain.gain.setValueAtTime(volume, now);

    if (type === "kick") {
      const oscillator = ctx.createOscillator();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(150, now);
      oscillator.frequency.exponentialRampToValueAtTime(
        45,
        now + 0.15
      );

      gain.gain.exponentialRampToValueAtTime(
        0.001,
        now + 0.2
      );

      oscillator.connect(gain);
      oscillator.start(now);
      oscillator.stop(now + 0.2);
    }

    if (type === "snare") {
      const oscillator = ctx.createOscillator();
      const noise = ctx.createBufferSource();

      const buffer = ctx.createBuffer(
        1,
        ctx.sampleRate * 0.15,
        ctx.sampleRate
      );

      const data = buffer.getChannelData(0);

      for (let i = 0; i < data.length; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      noise.buffer = buffer;

      oscillator.type = "triangle";
      oscillator.frequency.value = 180;

      gain.gain.exponentialRampToValueAtTime(
        0.001,
        now + 0.15
      );

      oscillator.connect(gain);
      noise.connect(gain);

      oscillator.start(now);
      noise.start(now);

      oscillator.stop(now + 0.15);
      noise.stop(now + 0.15);
    }

    if (type === "hihat" || type === "openhat") {
      const noise = ctx.createBufferSource();

      const duration =
        type === "openhat" ? 0.35 : 0.08;

      const buffer = ctx.createBuffer(
        1,
        ctx.sampleRate * duration,
        ctx.sampleRate
      );

      const data = buffer.getChannelData(0);

      for (let i = 0; i < data.length; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      noise.buffer = buffer;

      gain.gain.exponentialRampToValueAtTime(
        0.001,
        now + duration
      );

      noise.connect(gain);
      noise.start(now);
      noise.stop(now + duration);
    }

    if (type === "tom") {
      const oscillator = ctx.createOscillator();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(180, now);
      oscillator.frequency.exponentialRampToValueAtTime(
        90,
        now + 0.2
      );

      gain.gain.exponentialRampToValueAtTime(
        0.001,
        now + 0.25
      );

      oscillator.connect(gain);
      oscillator.start(now);
      oscillator.stop(now + 0.25);
    }

    if (type === "clap" || type === "rim") {
      const oscillator = ctx.createOscillator();

      oscillator.type =
        type === "clap" ? "square" : "triangle";

      oscillator.frequency.value =
        type === "clap" ? 900 : 700;

      gain.gain.exponentialRampToValueAtTime(
        0.001,
        now + 0.08
      );

      oscillator.connect(gain);
      oscillator.start(now);
      oscillator.stop(now + 0.08);
    }

    if (type === "crash") {
      const noise = ctx.createBufferSource();

      const duration = 0.6;

      const buffer = ctx.createBuffer(
        1,
        ctx.sampleRate * duration,
        ctx.sampleRate
      );

      const data = buffer.getChannelData(0);

      for (let i = 0; i < data.length; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      noise.buffer = buffer;

      gain.gain.exponentialRampToValueAtTime(
        0.001,
        now + duration
      );

      noise.connect(gain);
      noise.start(now);
      noise.stop(now + duration);
    }

    if (type === "cowbell") {
      const oscillator = ctx.createOscillator();

      oscillator.type = "square";
      oscillator.frequency.value = 540;

      gain.gain.exponentialRampToValueAtTime(
        0.001,
        now + 0.12
      );

      oscillator.connect(gain);
      oscillator.start(now);
      oscillator.stop(now + 0.12);
    }
  };

  const hitPad = (pad) => {
    playSound(pad.type);

    setActivePad(pad.key);

    setTimeout(() => {
      setActivePad(null);
    }, 100);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const pad = pads.find(
        (item) => item.key === event.key
      );

      if (pad) {
        event.preventDefault();
        hitPad(pad);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  });

  return (
    <div className="mx-auto w-full max-w-sm">
      {/* Header */}
      <div className="mb-3 flex items-end justify-between">
        <div>
          <p className="text-[9px] uppercase tracking-[0.2em] text-orange-500">
            Beat Machine
          </p>

          <p className="mt-1 text-[10px] text-black/40 dark:text-white/35">
            Press 1–9 or tap
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[9px] uppercase tracking-wider text-black/35 dark:text-white/30">
            Vol
          </span>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(event) =>
              setVolume(Number(event.target.value))
            }
            className="w-16 accent-orange-500"
            aria-label="Drum volume"
          />
        </div>
      </div>

      {/* Pads */}
      <div className="grid grid-cols-3 gap-1.5">
        {pads.map((pad) => (
          <button
            key={pad.key}
            type="button"
            onPointerDown={() => hitPad(pad)}
            className={`
              group
              relative
              aspect-square
              min-h-0
              overflow-hidden
              rounded-xl
              border
              border-black/10
              bg-black/[0.035]
              transition-all
              duration-100
              hover:-translate-y-0.5
              hover:border-orange-500/40
              hover:bg-orange-500/[0.06]
              active:scale-95
              dark:border-white/10
              dark:bg-white/[0.035]
              dark:hover:bg-orange-500/[0.08]
              ${
                activePad === pad.key
                  ? "scale-95 border-orange-500 bg-orange-500/15"
                  : ""
              }
            `}
          >
            <span
              className="
                absolute
                left-2
                top-2
                text-[8px]
                font-medium
                text-orange-500/70
              "
            >
              {pad.key}
            </span>

            <span
              className="
                flex
                h-full
                items-center
                justify-center
                pt-1
                text-[10px]
                font-medium
                text-black/60
                transition-colors
                group-hover:text-orange-500
                dark:text-white/55
              "
            >
              {pad.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default DrumPad;