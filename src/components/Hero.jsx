import { useEffect, useState } from "react";

function Hero() {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x =
        (event.clientX / window.innerWidth - 0.5) * 2;

      const y =
        (event.clientY / window.innerHeight - 0.5) * 2;

      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
    };
  }, []);

  const currentDate = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

  const formattedDate = currentDate.replaceAll("-", ".");

  const systems = ["CODE", "GAMES", "CINEMA", "IDEAS"];

  return (
    <section
      id="home"
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-white
        text-black
        transition-colors
        duration-500
        dark:bg-[#080808]
        dark:text-white
      "
    >
      {/* Background grid */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-50
          dark:opacity-30
        "
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              rgba(0,0,0,0.055) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(0,0,0,0.055) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "80px 80px",
          transform: `
            translate(
              ${mousePosition.x * -8}px,
              ${mousePosition.y * -8}px
            )
          `,
          transition: "transform 0.7s ease-out",
        }}
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          hidden
          opacity-30
          dark:block
        "
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              rgba(255,255,255,0.07) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(255,255,255,0.07) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "80px 80px",
          transform: `
            translate(
              ${mousePosition.x * -8}px,
              ${mousePosition.y * -8}px
            )
          `,
          transition: "transform 0.7s ease-out",
        }}
      />

      {/* Ambient glow */}

      <div
        className="
          pointer-events-none
          absolute
          left-[55%]
          top-[45%]
          h-[500px]
          w-[500px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-orange-500/10
          blur-[120px]
          dark:bg-orange-500/15
        "
      />

      {/* Main hero layout */}

      <div
        className="
          relative
          z-10
          mx-auto
          grid
          min-h-screen
          w-full
          max-w-7xl
          items-center
          gap-12
          px-5
          pb-24
          pt-32
          md:px-8
          lg:grid-cols-[1.1fr_0.9fr]
          lg:gap-16
          lg:pt-28
        "
      >
        {/* =================================
            LEFT — INTRO
        ================================== */}

        <div>
          {/* Label */}

          <div className="reveal flex items-center gap-4">
            <span className="h-px w-10 bg-orange-500" />

            <p
              className="
                text-[10px]
                font-medium
                uppercase
                tracking-[0.3em]
                text-black/50
                dark:text-white/50
              "
            >
              Personal Introduction
            </p>
          </div>

          {/* Name */}

          <div
            className="
              relative
              mt-8
              reveal
              reveal-delay-1
            "
            style={{
              transform: `
                translate(
                  ${mousePosition.x * 5}px,
                  ${mousePosition.y * 5}px
                )
              `,
              transition: "transform 0.5s ease-out",
            }}
          >
            <h1
              className="
                max-w-6xl
                text-[18vw]
                font-medium
                leading-[0.78]
                tracking-[-0.08em]
                sm:text-[14vw]
                md:text-[12vw]
                lg:text-[8.7vw]
              "
            >
              Anurag
              <br />

              <span className="text-orange-500">
                Pandey
                <span className="text-black dark:text-white">
                  .
                </span>
              </span>
            </h1>

            <span
              className="
                pointer-events-none
                absolute
                right-0
                top-1/2
                hidden
                -translate-y-1/2
                text-[8px]
                uppercase
                tracking-[0.25em]
                text-black/25
                dark:text-white/20
                xl:block
              "
            >
              13.08° / 80.27°
            </span>
          </div>

          {/* Description */}

          <div
            className="
              mt-10
              max-w-xl
              reveal
              reveal-delay-2
            "
          >
            <p
              className="
                text-sm
                leading-7
                text-black/55
                dark:text-white/50
                md:text-base
              "
            >
              I'm a computer science student and an
              aspiring developer interested in the
              technical side of things — from building
              games and websites to experimenting with
              new technologies.
            </p>

            <p
              className="
                mt-4
                text-sm
                leading-7
                text-black/40
                dark:text-white/35
              "
            >
              Currently learning, building and figuring
              out what comes next.
            </p>
          </div>

          {/* Course / Batch */}

          <div
            className="
              mt-10
              flex
              gap-10
              border-t
              border-black/10
              pt-5
              reveal
              reveal-delay-3
              dark:border-white/10
            "
          >
            <div>
              <p
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.2em]
                  text-black/40
                  dark:text-white/35
                "
              >
                Course
              </p>

              <p className="mt-2 text-sm">
                B.Tech CSE Core
              </p>
            </div>

            <div>
              <p
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.2em]
                  text-black/40
                  dark:text-white/35
                "
              >
                Batch
              </p>

              <p className="mt-2 text-sm">
                2026 — 2030
              </p>
            </div>
          </div>
        </div>

        {/* =================================
            RIGHT — CREATIVE CONTROL ROOM
        ================================== */}

        <div
          className="
            hidden
            lg:block
            reveal
            reveal-delay-2
          "
        >
          <div
            className="
              relative
              mx-auto
              w-full
              max-w-[430px]
            "
            style={{
              transform: `
                translate(
                  ${mousePosition.x * -12}px,
                  ${mousePosition.y * -12}px
                )
              `,
              transition:
                "transform 0.8s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            {/* Control room */}

            <div
              className="
                relative
                overflow-hidden
                border
                border-black/10
                bg-white/70
                p-6
                shadow-[0_30px_100px_rgba(0,0,0,0.08)]
                backdrop-blur-xl
                dark:border-white/10
                dark:bg-[#0c0c0c]/80
                dark:shadow-[0_30px_100px_rgba(0,0,0,0.45)]
                xl:p-7
              "
            >
              {/* Scanlines */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  opacity-20
                  dark:opacity-30
                "
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to bottom, transparent 0px, transparent 5px, rgba(255,255,255,0.035) 6px)",
                }}
              />

              {/* Corner accents */}

              <span className="absolute left-0 top-0 h-px w-16 bg-orange-500" />

              <span className="absolute left-0 top-0 h-16 w-px bg-orange-500" />

              <span className="absolute bottom-0 right-0 h-px w-16 bg-orange-500/50" />

              <span className="absolute bottom-0 right-0 h-16 w-px bg-orange-500/50" />

              <div className="relative">
                {/* Header */}

                <div className="flex items-start justify-between">
                  <div>
                    <p
                      className="
                        text-[8px]
                        uppercase
                        tracking-[0.3em]
                        text-black/35
                        dark:text-white/30
                      "
                    >
                      Personal System
                    </p>

                    <p
                      className="
                        mt-2
                        text-[10px]
                        font-medium
                        uppercase
                        tracking-[0.2em]
                        text-orange-500
                      "
                    >
                      Creative Control Room
                    </p>
                  </div>

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      border
                      border-orange-500/20
                      px-2.5
                      py-1.5
                      text-[7px]
                      uppercase
                      tracking-[0.2em]
                      text-orange-500
                    "
                  >
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-500" />
                    Live
                  </div>
                </div>

                {/* Current mode */}

                <div
                  className="
                    mt-9
                    border-y
                    border-black/10
                    py-6
                    dark:border-white/10
                  "
                >
                  <p
                    className="
                      text-[8px]
                      uppercase
                      tracking-[0.28em]
                      text-black/30
                      dark:text-white/25
                    "
                  >
                    Current Mode
                  </p>

                  <div className="mt-2 flex items-end justify-between gap-4">
                    <h2
                      className="
                        text-5xl
                        font-medium
                        leading-none
                        tracking-[-0.07em]
                        text-black
                        dark:text-white
                        xl:text-6xl
                      "
                    >
                      BUILDING
                      <span className="text-orange-500">
                        .
                      </span>
                    </h2>

                    <span
                      className="
                        pb-1
                        text-[8px]
                        uppercase
                        tracking-[0.2em]
                        text-black/25
                        dark:text-white/20
                      "
                    >
                      01
                    </span>
                  </div>
                </div>

                {/* Systems */}

                <div className="mt-6">
                  <div className="mb-3 flex items-center justify-between">
                    <p
                      className="
                        text-[8px]
                        uppercase
                        tracking-[0.28em]
                        text-black/30
                        dark:text-white/25
                      "
                    >
                      Active Systems
                    </p>

                    <p
                      className="
                        text-[7px]
                        uppercase
                        tracking-[0.18em]
                        text-orange-500
                      "
                    >
                      04 / 04
                    </p>
                  </div>

                  <div className="space-y-1">
                    {systems.map((system, index) => (
                      <div
                        key={system}
                        className="
                          group
                          flex
                          items-center
                          justify-between
                          border-b
                          border-black/5
                          py-3
                          dark:border-white/5
                        "
                      >
                        <div className="flex items-center gap-4">
                          <span
                            className="
                              font-mono
                              text-[8px]
                              text-black/20
                              dark:text-white/20
                            "
                          >
                            0{index + 1}
                          </span>

                          <span
                            className="
                              text-[10px]
                              font-medium
                              uppercase
                              tracking-[0.18em]
                              text-black/60
                              transition-colors
                              duration-300
                              group-hover:text-orange-500
                              dark:text-white/60
                              dark:group-hover:text-orange-400
                            "
                          >
                            {system}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className="
                              text-[7px]
                              uppercase
                              tracking-[0.15em]
                              text-black/25
                              dark:text-white/20
                            "
                          >
                            Active
                          </span>

                          <span
                            className="
                              h-1.5
                              w-1.5
                              rounded-full
                              bg-orange-500
                              shadow-[0_0_10px_rgba(249,115,22,0.7)]
                            "
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status */}

                <div
                  className="
                    mt-6
                    flex
                    items-end
                    justify-between
                    border-t
                    border-black/10
                    pt-5
                    dark:border-white/10
                  "
                >
                  <div>
                    <p
                      className="
                        text-[7px]
                        uppercase
                        tracking-[0.22em]
                        text-black/25
                        dark:text-white/20
                      "
                    >
                      Status
                    </p>

                    <p
                      className="
                        mt-1
                        text-[9px]
                        font-medium
                        uppercase
                        tracking-[0.16em]
                        text-black/60
                        dark:text-white/55
                      "
                    >
                      Systems Online
                    </p>
                  </div>

                  <div className="text-right">
                    <p
                      className="
                        text-[7px]
                        uppercase
                        tracking-[0.22em]
                        text-black/25
                        dark:text-white/20
                      "
                    >
                      Session Date
                    </p>

                    <p
                      className="
                        mt-1
                        font-mono
                        text-[10px]
                        tracking-[0.12em]
                        text-orange-500
                      "
                    >
                      {formattedDate}
                    </p>
                  </div>
                </div>

                {/* Bottom detail */}

                <div className="mt-5 flex items-center gap-3">
                  <span className="h-px flex-1 bg-black/10 dark:bg-white/10" />

                  <span
                    className="
                      text-[6px]
                      uppercase
                      tracking-[0.3em]
                      text-black/20
                      dark:text-white/15
                    "
                  >
                    CODE • CREATE • EXPLORE
                  </span>

                  <span className="h-px flex-1 bg-black/10 dark:bg-white/10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}

      <div
        className="
          absolute
          bottom-7
          left-5
          hidden
          items-center
          gap-4
          md:flex
          md:px-3
        "
      >
        <span
          className="
            text-[9px]
            uppercase
            tracking-[0.25em]
            text-black/35
            dark:text-white/30
          "
        >
          Scroll to explore
        </span>

        <span className="h-px w-12 bg-black/15 dark:bg-white/15" />
      </div>

      {/* Page indicator */}

      <div
        className="
          absolute
          bottom-7
          right-5
          hidden
          text-[9px]
          tracking-[0.25em]
          text-black/30
          dark:text-white/25
          md:block
          md:px-3
        "
      >
        01 / 06
      </div>
    </section>
  );
}

export default Hero;