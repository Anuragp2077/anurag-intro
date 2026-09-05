import { useEffect, useState } from "react";

function Hero() {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    // Mouse parallax is unnecessary on touch devices.
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleMouseMove = (event) => {
      const x =
        (event.clientX / window.innerWidth - 0.5) * 2;

      const y =
        (event.clientY / window.innerHeight - 0.5) * 2;

      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      id="home"
      className="
        relative flex min-h-screen
        items-center overflow-hidden
        bg-white text-black
        transition-colors duration-500
        dark:bg-[#080808]
        dark:text-white
      "
    >
      {/* Background grid */}
      <div
        className="
          pointer-events-none
          absolute inset-0
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

      {/* Dark mode grid */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          hidden opacity-30
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

      {/* Orange glow */}
      <div
        className="
          pointer-events-none
          absolute
          left-[55%]
          top-[40%]
          h-[280px]
          w-[280px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-orange-500/10
          blur-[100px]
          transition-transform
          duration-700
          dark:bg-orange-500/15
          sm:h-[380px]
          sm:w-[380px]
          md:h-[500px]
          md:w-[500px]
        "
        style={{
          transform: `
            translate(
              ${mousePosition.x * 30}px,
              ${mousePosition.y * 30}px
            )
          `,
        }}
      />

      {/* Decorative orbital circle */}
      <div
        className="
          pointer-events-none
          absolute
          right-[-120px]
          top-[20%]
          hidden
          h-[360px]
          w-[360px]
          rounded-full
          border
          border-black/10
          dark:border-white/10
          sm:block
          md:right-[3%]
          md:h-[440px]
          md:w-[440px]
          lg:right-[8%]
          lg:top-[22%]
          lg:h-[420px]
          lg:w-[420px]
        "
        style={{
          transform: `
            translate(
              ${mousePosition.x * -18}px,
              ${mousePosition.y * -18}px
            )
            rotate(${mousePosition.x * 4}deg)
          `,
          transition: "transform 0.8s ease-out",
        }}
      >
        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-[230px]
            w-[230px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            border
            border-black/10
            dark:border-white/10
            md:h-[300px]
            md:w-[300px]
          "
        />

        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-2
            w-2
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-orange-500
            shadow-[0_0_25px_rgba(249,115,22,0.7)]
          "
        />

        <div
          className="
            absolute
            left-1/2
            top-[-4px]
            h-2
            w-2
            -translate-x-1/2
            rounded-full
            bg-orange-500
          "
        />
      </div>

      {/* Main content */}
      <div
        className="
          relative z-10
          mx-auto w-full max-w-7xl
          px-5
          pb-20 pt-28
          sm:px-6
          sm:pb-24 sm:pt-32
          md:px-8
          md:pb-28 md:pt-36
        "
      >
        {/* Section label */}
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="h-px w-7 bg-orange-500 sm:w-10" />

          <p
            className="
              text-[9px]
              font-medium
              uppercase
              tracking-[0.25em]
              text-black/50
              dark:text-white/50
              sm:text-[10px]
              sm:tracking-[0.3em]
            "
          >
            Personal Introduction
          </p>
        </div>

        {/* Name */}
        <div
          className="
            relative mt-7
            sm:mt-8
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
              max-w-full
              text-[18vw]
              font-medium
              leading-[0.8]
              tracking-[-0.08em]
              sm:text-[15vw]
              md:text-[12vw]
              lg:max-w-6xl
              lg:text-[10vw]
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

          {/* Coordinates */}
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
              lg:block
            "
          >
            13.08° / 80.27°
          </span>
        </div>

        {/* Description + metadata */}
        <div
          className="
            mt-10
            grid gap-8
            md:mt-12
            md:grid-cols-[1fr_auto]
            md:items-end
            md:gap-10
          "
        >
          {/* Description */}
          <div className="max-w-xl">
            <p
              className="
                text-sm
                leading-7
                text-black/55
                dark:text-white/50
                sm:text-base
              "
            >
              I'm a computer science student and an aspiring
              developer interested in the technical side of
              things — from building games and websites to
              experimenting with new technologies.
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
              Currently learning, building and figuring out
              what comes next.
            </p>
          </div>

          {/* Course + Batch */}
          <div
            className="
              flex
              gap-8
              border-t
              border-black/10
              pt-5
              dark:border-white/10
              sm:gap-12
              md:border-l
              md:border-t-0
              md:pl-8
              md:pt-0
            "
          >
            <div>
              <p className="text-[9px] uppercase tracking-[0.2em] text-black/40 dark:text-white/35">
                Course
              </p>

              <p className="mt-2 text-xs sm:text-sm">
                B.Tech CSE Core
              </p>
            </div>

            <div>
              <p className="text-[9px] uppercase tracking-[0.2em] text-black/40 dark:text-white/35">
                Batch
              </p>

              <p className="mt-2 text-xs sm:text-sm">
                2026 — 2030
              </p>
            </div>
          </div>
        </div>

        {/* Mobile scroll indicator */}
        <div
          className="
            mt-14
            flex
            items-center
            gap-4
            md:hidden
          "
        >
          <span className="text-[9px] uppercase tracking-[0.25em] text-black/35 dark:text-white/30">
            Scroll to explore
          </span>

          <span className="h-px w-12 bg-black/15 dark:bg-white/15" />
        </div>
      </div>

      {/* Desktop scroll indicator */}
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
        <span className="text-[9px] uppercase tracking-[0.25em] text-black/35 dark:text-white/30">
          Scroll to explore
        </span>

        <span className="h-px w-12 bg-black/15 dark:bg-white/15" />
      </div>

      {/* Section number */}
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