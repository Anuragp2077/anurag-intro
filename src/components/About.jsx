import { useState } from "react";
import profileImage from "../assets/profile.png";
import Reveal from "./Reveal";

function About() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section
      id="about"
      className="
        relative overflow-hidden
        bg-[#f5f5f3]
        py-24
        text-black
        transition-colors duration-500
        dark:bg-[#0d0d0d]
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
          sm:-right-2
          sm:text-[25vw]
        "
      >
        02
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
        {/* Section heading */}
        <Reveal>
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-[10px] tracking-[0.2em] text-orange-500">
              02
            </span>

            <span className="h-px w-7 bg-black/15 dark:bg-white/15 sm:w-10" />

            <span className="text-[9px] uppercase tracking-[0.25em] text-black/40 dark:text-white/35 sm:text-[10px]">
              About Me
            </span>
          </div>
        </Reveal>

        {/* Main content */}
        <div
          className="
            mt-14
            grid
            gap-14
            sm:mt-16
            sm:gap-16
            lg:grid-cols-[0.8fr_1.2fr]
            lg:items-center
            lg:gap-20
            xl:gap-24
          "
        >
          {/* Profile image */}
          <Reveal direction="left">
            <div
              className="
                relative
                mx-auto
                w-[82%]
                max-w-sm
                sm:w-[75%]
                md:max-w-md
                lg:mx-0
                lg:w-full
              "
            >
              {/* Orange frame */}
              <div
                className="
                  absolute
                  -bottom-3
                  -right-3
                  h-full
                  w-full
                  border
                  border-orange-500/60
                  sm:-bottom-4
                  sm:-right-4
                "
              />

              {/* Image container */}
              <div className="relative overflow-hidden bg-black">
                {!imageLoaded && (
                  <div
                    className="
                      absolute
                      inset-0
                      animate-pulse
                      bg-black/10
                      dark:bg-white/5
                    "
                  />
                )}

                <img
                  src={profileImage}
                  alt="Anurag Pandey"
                  onLoad={() => setImageLoaded(true)}
                  className="
                    aspect-[4/5]
                    w-full
                    object-cover
                    grayscale
                    transition-all
                    duration-700
                    hover:scale-[1.02]
                    hover:grayscale-0
                  "
                />

                {/* Image gradient */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/45
                    via-transparent
                    to-transparent
                  "
                />

                {/* Image label */}
                <div
                  className="
                    absolute
                    bottom-4
                    left-4
                    text-[8px]
                    uppercase
                    tracking-[0.2em]
                    text-white/70
                    sm:bottom-5
                    sm:left-5
                    sm:text-[9px]
                  "
                >
                  ANURAG / 2026
                </div>
              </div>
            </div>
          </Reveal>

          {/* About text */}
          <Reveal direction="right" delay={150}>
            <div>
              <h2
                className="
                  text-[12vw]
                  font-medium
                  leading-[0.9]
                  tracking-[-0.06em]
                  sm:text-6xl
                  md:text-7xl
                  lg:text-6xl
                  xl:text-7xl
                "
              >
                More than
                <br />
                <span className="text-orange-500">
                  just code.
                </span>
              </h2>

              <div
                className="
                  mt-8
                  max-w-2xl
                  space-y-5
                  text-sm
                  leading-7
                  text-black/55
                  dark:text-white/50
                  sm:mt-10
                  sm:text-base
                "
              >
                <p>
                  I'm Anurag, a computer science student who
                  enjoys understanding how things work and
                  then trying to build something with that
                  knowledge.
                </p>

                <p>
                  I've spent time experimenting with game
                  development using Unity, while also exploring
                  web development and different programming
                  languages. I enjoy the technical side of
                  things, but I also like leaving room for
                  creativity.
                </p>

                <p>
                  Right now I'm learning, experimenting and
                  building projects while figuring out which
                  areas of technology I want to explore
                  further.
                </p>
              </div>

              {/* Stats */}
              <div
                className="
                  mt-10
                  grid
                  grid-cols-2
                  border-t
                  border-black/10
                  dark:border-white/10
                  sm:mt-12
                  sm:grid-cols-3
                "
              >
                <div
                  className="
                    border-r
                    border-black/10
                    py-5
                    pr-4
                    dark:border-white/10
                    sm:pr-5
                  "
                >
                  <span className="block text-[8px] uppercase tracking-[0.2em] text-black/35 dark:text-white/30 sm:text-[9px]">
                    Year
                  </span>

                  <span className="mt-2 block text-xs sm:text-sm">
                    2026 — 2030
                  </span>
                </div>

                <div
                  className="
                    border-r
                    border-black/10
                    px-4
                    py-5
                    dark:border-white/10
                    sm:px-5
                  "
                >
                  <span className="block text-[8px] uppercase tracking-[0.2em] text-black/35 dark:text-white/30 sm:text-[9px]">
                    Course
                  </span>

                  <span className="mt-2 block text-xs sm:text-sm">
                    B.Tech CSE
                  </span>
                </div>

                <div
                  className="
                    col-span-2
                    py-5
                    pl-4
                    sm:col-span-1
                    sm:pl-5
                  "
                >
                  <span className="block text-[8px] uppercase tracking-[0.2em] text-black/35 dark:text-white/30 sm:text-[9px]">
                    Focus
                  </span>

                  <span className="mt-2 block text-xs sm:text-sm">
                    Building & Learning
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Currently */}
        <Reveal delay={250}>
          <div
            className="
              mt-20
              border-t
              border-black/10
              pt-5
              dark:border-white/10
              sm:mt-24
              sm:pt-6
              md:mt-32
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
                sm:gap-4
              "
            >
              <span className="text-[8px] uppercase tracking-[0.25em] text-black/30 dark:text-white/25 sm:text-[9px]">
                Currently
              </span>

              <span className="text-xs text-black/50 dark:text-white/40 sm:text-sm">
                Learning • Building • Experimenting
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default About;