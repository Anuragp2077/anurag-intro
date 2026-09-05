const skillGroups = [
  {
    number: "01",
    title: "Programming",
    skills: ["Python", "JavaScript", "C", "C++", "C#"],
  },
  {
    number: "02",
    title: "Web Development",
    skills: ["HTML", "CSS", "React", "Vite", "Tailwind CSS"],
  },
  {
    number: "03",
    title: "Game Development",
    skills: [
      "Unity",
      "C#",
      "Game Design",
      "Gameplay Programming",
    ],
  },
  {
    number: "04",
    title: "Tools & Workflow",
    skills: [
      "Git",
      "GitHub",
      "VS Code",
      "Vercel",
      "LocalStorage",
    ],
  },
];

function Skills() {
  return (
    <section
      id="skills"
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
          sm:text-[25vw]
        "
      >
        04
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
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="text-[10px] tracking-[0.2em] text-orange-500">
            04
          </span>

          <span className="h-px w-7 bg-black/15 dark:bg-white/15 sm:w-10" />

          <span className="text-[9px] uppercase tracking-[0.25em] text-black/40 dark:text-white/35 sm:text-[10px]">
            Skills
          </span>
        </div>

        {/* Heading */}
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
            Tools I use
            <br />
            <span className="text-orange-500">
              to build.
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
            A growing collection of languages, frameworks and
            tools I've worked with while building software,
            websites and games.
          </p>
        </div>

        {/* Skill groups */}
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
          {skillGroups.map((group) => (
            <article
              key={group.number}
              className="
                group
                relative
                min-h-[260px]
                bg-[#f5f5f3]
                p-5
                transition-all
                duration-500
                hover:bg-white
                dark:bg-[#0d0d0d]
                dark:hover:bg-[#111]
                sm:min-h-[280px]
                sm:p-6
                lg:min-h-[320px]
                lg:p-7
              "
            >
              {/* Hover line */}
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
              <span
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.2em]
                  text-black/30
                  dark:text-white/25
                "
              >
                {group.number}
              </span>

              {/* Group title */}
              <h3
                className="
                  mt-10
                  text-xl
                  font-medium
                  tracking-[-0.04em]
                  sm:text-2xl
                "
              >
                {group.title}
              </h3>

              {/* Skills */}
              <div className="mt-7 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="
                      rounded-full
                      border
                      border-black/10
                      px-3
                      py-1.5
                      text-[10px]
                      text-black/55
                      transition-all
                      duration-300
                      group-hover:border-orange-500/30
                      group-hover:text-black/80
                      dark:border-white/10
                      dark:text-white/50
                      dark:group-hover:border-orange-500/30
                      dark:group-hover:text-white/80
                      sm:text-[11px]
                    "
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Currently learning */}
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
              sm:gap-4
            "
          >
            <span className="text-[8px] uppercase tracking-[0.25em] text-black/30 dark:text-white/25 sm:text-[9px]">
              Currently learning
            </span>

            <span className="text-xs text-black/50 dark:text-white/40 sm:text-sm">
              Python • C++ • Unreal Engine • New technologies
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;