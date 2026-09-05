import { useState } from "react";

import Reveal from "./Reveal";
import SnakeGame from "./SnakeGame";
import Piano from "./Piano";
import ReactionTest from "./ReactionTest";
import DrumPad from "./DrumPad";

const PLAYGROUNDS = [
  {
    id: "game",
    number: "01",
    icon: "🎮",
    type: "Interactive Game",
    title: "Snake",
    description: "Eat. Grow. Don't crash.",
  },
  {
    id: "piano",
    number: "02",
    icon: "🎹",
    type: "Interactive Instrument",
    title: "Piano",
    description: "Play a few notes.",
  },
  {
    id: "reaction",
    number: "03",
    icon: "🎯",
    type: "Reaction Test",
    title: "Reflex",
    description: "How fast are you?",
  },
  {
    id: "drums",
    number: "04",
    icon: "🥁",
    type: "Interactive Instrument",
    title: "Drum Pad",
    description: "Make some noise.",
  },
];

function Playground() {
  const [activeTab, setActiveTab] =
    useState(null);

  return (
    <section
      id="playground"
      className="
        relative
        overflow-hidden
        bg-white
        py-24
        text-black
        transition-colors
        duration-500
        dark:bg-[#080808]
        dark:text-white
        sm:py-28
        md:py-40
      "
    >
      {/* Background number */}
      <div
        className="
          pointer-events-none
          absolute
          -right-4
          top-8
          select-none
          text-[30vw]
          font-semibold
          leading-none
          tracking-[-0.08em]
          text-black/[0.025]
          dark:text-white/[0.025]
          sm:text-[25vw]
        "
      >
        07
      </div>

      <div
        className="
          relative
          mx-auto
          max-w-7xl
          px-5
          sm:px-6
          md:px-8
        "
      >
        {/* Section label */}
        <Reveal>
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-[10px] tracking-[0.2em] text-orange-500">
              07
            </span>

            <span className="h-px w-7 bg-black/15 dark:bg-white/15 sm:w-10" />

            <span
              className="
                text-[9px]
                uppercase
                tracking-[0.25em]
                text-black/40
                dark:text-white/35
                sm:text-[10px]
              "
            >
              Playground
            </span>
          </div>
        </Reveal>

        {/* Header */}
        <Reveal delay={100}>
          <div className="mt-12 max-w-4xl sm:mt-16">
            <p
              className="
                mb-5
                text-[9px]
                uppercase
                tracking-[0.25em]
                text-orange-500
              "
            >
              A few things I built because I could.
            </p>

            <h2
              className="
                text-[13vw]
                font-medium
                leading-[0.88]
                tracking-[-0.07em]
                sm:text-6xl
                md:text-7xl
                lg:text-8xl
              "
            >
              Stay a while.
              <br />

              <span className="text-orange-500">
                Play something.
              </span>
            </h2>

            <p
              className="
                mt-7
                max-w-xl
                text-sm
                leading-7
                text-black/50
                dark:text-white/45
                sm:mt-8
                sm:text-base
              "
            >
              You made it to the end. Instead of
              another contact form, here's a little
              playground.
            </p>
          </div>
        </Reveal>

        {/* Playground cards */}
        <Reveal delay={200}>
          <div
            className="
              mt-14
              grid
              grid-cols-1
              gap-4
              sm:mt-16
              sm:grid-cols-2
            "
          >
            {PLAYGROUNDS.map(
              (playground) => (
                <button
                  key={playground.id}
                  type="button"
                  onClick={() =>
                    setActiveTab(
                      playground.id
                    )
                  }
                  className="
                    group
                    relative
                    min-h-[260px]
                    overflow-hidden
                    border
                    border-black/10
                    bg-[#f5f5f3]
                    p-6
                    text-left
                    transition-all
                    duration-500
                    hover:-translate-y-1
                    hover:border-orange-500/40
                    hover:shadow-xl
                    dark:border-white/10
                    dark:bg-[#0d0d0d]
                    dark:hover:bg-[#111]
                    sm:min-h-[300px]
                    sm:p-8
                  "
                >
                  {/* Hover line */}
                  <span
                    className="
                      absolute
                      left-0
                      top-0
                      h-1
                      w-0
                      bg-orange-500
                      transition-all
                      duration-500
                      group-hover:w-full
                    "
                  />

                  {/* Top */}
                  <div className="flex items-start justify-between">
                    <span
                      className="
                        text-[9px]
                        uppercase
                        tracking-[0.2em]
                        text-black/30
                        dark:text-white/25
                      "
                    >
                      {playground.number}
                    </span>

                    <span className="text-3xl transition-transform duration-500 group-hover:scale-110">
                      {playground.icon}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="mt-20 sm:mt-24">
                    <p
                      className="
                        text-[8px]
                        uppercase
                        tracking-[0.2em]
                        text-orange-500
                        sm:text-[9px]
                      "
                    >
                      {playground.type}
                    </p>

                    <h3
                      className="
                        mt-3
                        text-4xl
                        font-medium
                        tracking-[-0.06em]
                        sm:text-5xl
                      "
                    >
                      {playground.title}
                    </h3>

                    <div
                      className="
                        mt-5
                        flex
                        items-center
                        gap-3
                        text-[9px]
                        uppercase
                        tracking-[0.15em]
                        text-black/40
                        dark:text-white/35
                      "
                    >
                      <span>
                        {activeTab ===
                        playground.id
                          ? "Playing"
                          : "Play now"}
                      </span>

                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </div>
                </button>
              )
            )}
          </div>
        </Reveal>

        {/* Active playground */}
        {activeTab && (
          <Reveal delay={50}>
            <div
              className="
                relative
                mt-6
                overflow-hidden
                border
                border-black/10
                bg-[#f5f5f3]
                dark:border-white/10
                dark:bg-[#0d0d0d]
              "
            >
              {/* Active header */}
              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-black/10
                  px-5
                  py-4
                  dark:border-white/10
                  sm:px-7
                  sm:py-5
                "
              >
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-orange-500" />

                  <span
                    className="
                      text-[9px]
                      uppercase
                      tracking-[0.2em]
                      text-black/45
                      dark:text-white/40
                    "
                  >
                    {
                      PLAYGROUNDS.find(
                        (item) =>
                          item.id ===
                          activeTab
                      )?.title
                    }
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setActiveTab(null)
                  }
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-black/10
                    text-sm
                    text-black/40
                    transition-all
                    hover:border-orange-500
                    hover:text-orange-500
                    dark:border-white/10
                    dark:text-white/40
                  "
                  aria-label="Close playground"
                >
                  ×
                </button>
              </div>

              {/* Active experience */}
              {activeTab === "game" && (
                <SnakeGame />
              )}

              {activeTab === "piano" && (
                <Piano />
              )}

              {activeTab === "reaction" && (
                <ReactionTest />
              )}

              {activeTab === "drums" && (
                <DrumPad />
              )}
            </div>
          </Reveal>
        )}

        {/* Footer */}
        <Reveal delay={250}>
          <div
            className="
              mt-16
              border-t
              border-black/10
              pt-5
              dark:border-white/10
              sm:mt-20
              sm:pt-6
            "
          >
            <div
              className="
                flex
                flex-col
                gap-3
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <span
                className="
                  text-[8px]
                  uppercase
                  tracking-[0.25em]
                  text-black/30
                  dark:text-white/25
                  sm:text-[9px]
                "
              >
                End of the page
              </span>

              <span
                className="
                  text-xs
                  text-black/50
                  dark:text-white/40
                  sm:text-sm
                "
              >
                Thanks for exploring.
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default Playground;