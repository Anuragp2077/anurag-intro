import { useState } from "react";

import Reveal from "./Reveal";
import SnakeGame from "./SnakeGame";
import Piano from "./Piano";
import ReactionTest from "./ReactionTest";
import DrumPad from "./DrumPad";
import DoomGame from "./DoomGame/DoomGame";

const experiences = [
  {
    id: "snake",
    number: "01",
    title: "Snake",
    description: "A classic arcade game rebuilt from scratch.",
    component: SnakeGame,
  },
  {
    id: "piano",
    number: "02",
    title: "Piano",
    description: "A tiny browser piano powered by Web Audio.",
    component: Piano,
  },
  {
    id: "reaction",
    number: "03",
    title: "Reflex",
    description: "How fast can you react?",
    component: ReactionTest,
  },
  {
    id: "drum",
    number: "04",
    title: "Drum Pad",
    description: "Tap out a beat with synthesized sounds.",
    component: DrumPad,
  },
  {
    id: "doom",
    number: "05",
    title: "DOOM // FPS",
    description: "A tiny first-person raycasting experiment.",
    component: DoomGame,
  },
];

function Playground() {
  const [active, setActive] = useState(null);

  const ActiveExperience =
    experiences.find(
      (experience) =>
        experience.id === active
    )?.component;

  return (
    <section
      id="playground"
      className="
        relative
        overflow-hidden
        bg-white
        px-5
        py-24
        text-black
        transition-colors
        duration-500
        dark:bg-[#080808]
        dark:text-white
        sm:px-8
        lg:px-12
      "
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-12">
            <div className="mb-5 flex items-center gap-3">
              <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-orange-500">
                07
              </span>

              <span className="h-px w-8 bg-orange-500/40" />

              <span className="text-[9px] uppercase tracking-[0.2em] text-black/30 dark:text-white/25">
                Playground
              </span>
            </div>

            <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              A few things I built
              <br />
              <span className="text-black/30 dark:text-white/25">
                because I could.
              </span>
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-7 text-black/45 dark:text-white/40">
              Stay a while. Play something.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {experiences.map((experience) => {
            const isActive =
              active === experience.id;

            return (
              <Reveal
                key={experience.id}
                delay={0.05}
              >
                <button
                  type="button"
                  onClick={() =>
                    setActive(
                      isActive
                        ? null
                        : experience.id
                    )
                  }
                  className={`
                    group relative w-full overflow-hidden rounded-2xl border p-5 text-left
                    transition-all duration-300
                    ${
                      isActive
                        ? "border-orange-500/50 bg-orange-500/[0.06]"
                        : "border-black/10 bg-black/[0.02] hover:-translate-y-1 hover:border-orange-500/30 hover:bg-orange-500/[0.03] dark:border-white/10 dark:bg-white/[0.02] dark:hover:bg-orange-500/[0.04]"
                    }
                  `}
                >
                  <div className="mb-8 flex items-start justify-between">
                    <span className="text-[9px] font-medium tracking-[0.2em] text-orange-500">
                      {experience.number}
                    </span>

                    <span
                      className={`
                        text-xs transition-transform duration-300
                        ${
                          isActive
                            ? "rotate-45 text-orange-500"
                            : "text-black/20 group-hover:text-orange-500 dark:text-white/20"
                        }
                      `}
                    >
                      +
                    </span>
                  </div>

                  <h3 className="text-base font-medium tracking-tight">
                    {experience.title}
                  </h3>

                  <p className="mt-2 text-[10px] leading-5 text-black/40 dark:text-white/30">
                    {experience.description}
                  </p>

                  <div
                    className={`
                      absolute bottom-0 left-0 h-px bg-orange-500 transition-all duration-500
                      ${
                        isActive
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }
                    `}
                  />
                </button>
              </Reveal>
            );
          })}
        </div>

        {ActiveExperience && (
          <Reveal>
            <div className="relative mt-8 rounded-3xl border border-black/10 bg-black/[0.015] p-5 dark:border-white/10 dark:bg-white/[0.015] sm:p-8">
              <button
                type="button"
                onClick={() => setActive(null)}
                className="
                  absolute
                  right-4
                  top-4
                  z-20
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-black/10
                  text-sm
                  text-black/40
                  transition-all
                  hover:border-orange-500/40
                  hover:text-orange-500
                  dark:border-white/10
                  dark:text-white/40
                "
                aria-label="Close experience"
              >
                ×
              </button>

              <ActiveExperience />
            </div>
          </Reveal>
        )}

        <Reveal>
          <div className="mt-24 border-t border-black/10 pt-8 dark:border-white/10">
            <div className="flex flex-col justify-between gap-3 text-[9px] uppercase tracking-[0.18em] text-black/25 dark:text-white/20 sm:flex-row">
              <span>End of the page</span>
              <span>Thanks for exploring.</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default Playground;