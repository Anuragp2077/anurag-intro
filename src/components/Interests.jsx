import Reveal from "./Reveal";

const interests = [
  {
    number: "01",
    title: "Cinema",
    description:
      "I enjoy films for both the stories they tell and the way they are made — direction, editing, visuals and sound.",
  },
  {
    number: "02",
    title: "Games",
    description:
      "From playing games to understanding how they work, game development is one of the areas I enjoy exploring most.",
  },
  {
    number: "03",
    title: "Technology",
    description:
      "I'm curious about how technology works and enjoy experimenting with different tools, languages and ideas.",
  },
  {
    number: "04",
    title: "Sports",
    description:
      "Cricket, football and other sports are some of my favourite ways to switch off and have fun.",
  },
  {
    number: "05",
    title: "Formula 1",
    description:
      "The combination of engineering, strategy, competition and storytelling makes F1 especially interesting to me.",
  },
  {
    number: "06",
    title: "TV & Stories",
    description:
      "I enjoy shows and stories with strong characters, interesting worlds and ideas that stay with you.",
  },
  {
    number: "07",
    title: "Cooking",
    description:
      "Cooking is one of my hobbies and another way I like experimenting and creating something from scratch.",
  },
  {
    number: "08",
    title: "Music",
    description:
      "I enjoy music and playing a few instruments when I want a break from screens and code.",
  },
];

function Interests() {
  return (
    <section
      id="interests"
      className="
        relative overflow-hidden
        bg-white
        py-24
        text-black
        transition-colors duration-500
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
        03
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
              03
            </span>

            <span className="h-px w-7 bg-black/15 dark:bg-white/15 sm:w-10" />

            <span className="text-[9px] uppercase tracking-[0.25em] text-black/40 dark:text-white/35 sm:text-[10px]">
              Interests & Hobbies
            </span>
          </div>
        </Reveal>

        {/* Heading */}
        <Reveal delay={100}>
          <div className="mt-12 max-w-3xl sm:mt-16">
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
              Things I
              <br />
              <span className="text-orange-500">
                care about.
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
              Beyond programming, I'm interested in a mix of
              creative work, entertainment, technology, sports
              and the things that keep me curious.
            </p>
          </div>
        </Reveal>

        {/* Interest cards */}
        <div
          className="
            mt-14
            grid
            grid-cols-1
            gap-px
            overflow-hidden
            border
            border-black/10
            bg-black/10
            dark:border-white/10
            dark:bg-white/10
            sm:mt-16
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          {interests.map((interest, index) => (
            <Reveal
              key={interest.number}
              delay={Math.min(index * 60, 420)}
            >
              <article
                className="
                  group
                  relative
                  flex
                  min-h-[210px]
                  flex-col
                  justify-between
                  bg-white
                  p-5
                  transition-all
                  duration-500
                  hover:bg-[#f7f7f5]
                  dark:bg-[#0b0b0b]
                  dark:hover:bg-[#111]
                  sm:min-h-[230px]
                  sm:p-6
                  lg:min-h-[250px]
                  lg:p-7
                "
              >
                {/* Orange hover line */}
                <span
                  className="
                    absolute
                    left-0
                    top-0
                    h-px
                    w-0
                    bg-orange-500
                    transition-all
                    duration-500
                    group-hover:w-full
                  "
                />

                {/* Number */}
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
                    {interest.number}
                  </span>

                  <span
                    className="
                      text-orange-500/0
                      transition-all
                      duration-500
                      group-hover:text-orange-500
                    "
                  >
                    ↗
                  </span>
                </div>

                {/* Content */}
                <div className="mt-10">
                  <h3
                    className="
                      text-2xl
                      font-medium
                      tracking-[-0.04em]
                      transition-transform
                      duration-500
                      group-hover:translate-x-1
                      sm:text-3xl
                    "
                  >
                    {interest.title}
                  </h3>

                  <p
                    className="
                      mt-3
                      max-w-sm
                      text-xs
                      leading-6
                      text-black/45
                      dark:text-white/40
                      sm:text-sm
                    "
                  >
                    {interest.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Footer line */}
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
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-[8px] uppercase tracking-[0.25em] text-black/30 dark:text-white/25 sm:text-[9px]">
                Outside the screen
              </span>

              <span className="text-xs text-black/50 dark:text-white/40 sm:text-sm">
                Watch • Play • Create • Explore
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default Interests;