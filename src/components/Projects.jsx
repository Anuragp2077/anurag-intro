const projects = [
  {
    number: "01",
    title: "The Package",
    category: "Game Development",
    description:
      "A game development project built with Unity, focusing on gameplay and interactive systems.",
    technologies: ["Unity", "C#", "Game Development"],
    link: "https://dev-sharma.itch.io/the-package",
    linkLabel: "View on itch.io",
  },
  {
    number: "02",
    title: "Rock Paper Scissors",
    category: "Web Development",
    description:
      "A responsive Rock Paper Scissors game built for the web with an interactive interface.",
    technologies: ["React", "JavaScript", "CSS"],
    link: "https://github.com/Anuragp2077/rock-paper-scissors",
    linkLabel: "View on GitHub",
  },
  {
    number: "03",
    title: "Employee Management System",
    category: "Software",
    description:
      "A C++ based application for managing employee information and data through a structured system.",
    technologies: ["C++", "Programming", "Data Management"],
    link: "https://github.com/Anuragp2077/Employee-mgmt-sys",
    linkLabel: "View on GitHub",
  },
];

function Projects() {
  return (
    <section
      id="projects"
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
        05
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
            05
          </span>

          <span className="h-px w-7 bg-black/15 dark:bg-white/15 sm:w-10" />

          <span className="text-[9px] uppercase tracking-[0.25em] text-black/40 dark:text-white/35 sm:text-[10px]">
            Selected Projects
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
            Things I've
            <br />
            <span className="text-orange-500">
              built.
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
            A selection of projects from game development,
            web development and programming.
          </p>
        </div>

        {/* Projects */}
        <div className="mt-14 space-y-4 sm:mt-16 sm:space-y-5">
          {projects.map((project) => (
            <article
              key={project.number}
              className="
                group
                relative
                overflow-hidden
                border
                border-black/10
                bg-[#f8f8f6]
                transition-all
                duration-500
                hover:border-orange-500/30
                hover:bg-[#f5f5f3]
                dark:border-white/10
                dark:bg-[#0d0d0d]
                dark:hover:bg-[#111]
              "
            >
              {/* Orange edge */}
              <div
                className="
                  absolute
                  left-0
                  top-0
                  h-full
                  w-0.5
                  origin-top
                  scale-y-0
                  bg-orange-500
                  transition-transform
                  duration-500
                  group-hover:scale-y-100
                "
              />

              <div
                className="
                  grid
                  gap-8
                  p-5
                  sm:p-7
                  md:grid-cols-[80px_1fr_auto]
                  md:items-start
                  md:gap-8
                  lg:p-9
                "
              >
                {/* Number */}
                <div>
                  <span
                    className="
                      text-[9px]
                      uppercase
                      tracking-[0.2em]
                      text-black/30
                      dark:text-white/25
                    "
                  >
                    {project.number}
                  </span>
                </div>

                {/* Main content */}
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className="
                        text-[8px]
                        uppercase
                        tracking-[0.2em]
                        text-orange-500
                        sm:text-[9px]
                      "
                    >
                      {project.category}
                    </span>
                  </div>

                  <h3
                    className="
                      mt-3
                      text-3xl
                      font-medium
                      leading-none
                      tracking-[-0.05em]
                      transition-transform
                      duration-500
                      group-hover:translate-x-1
                      sm:text-4xl
                      md:text-5xl
                    "
                  >
                    {project.title}
                  </h3>

                  <p
                    className="
                      mt-5
                      max-w-2xl
                      text-xs
                      leading-6
                      text-black/50
                      dark:text-white/40
                      sm:text-sm
                      sm:leading-7
                    "
                  >
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="
                          rounded-full
                          border
                          border-black/10
                          px-3
                          py-1.5
                          text-[9px]
                          text-black/50
                          dark:border-white/10
                          dark:text-white/45
                          sm:text-[10px]
                        "
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Link */}
                <div className="md:pt-1">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      inline-flex
                      min-h-11
                      items-center
                      gap-3
                      rounded-full
                      border
                      border-black/10
                      px-5
                      text-[9px]
                      uppercase
                      tracking-[0.15em]
                      text-black/60
                      transition-all
                      duration-300
                      hover:border-orange-500
                      hover:text-orange-500
                      active:scale-95
                      dark:border-white/10
                      dark:text-white/55
                      dark:hover:border-orange-500
                      dark:hover:text-orange-400
                      sm:text-[10px]
                    "
                  >
                    {project.linkLabel}
                    <span className="text-sm">↗</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Footer */}
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
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <span className="text-[8px] uppercase tracking-[0.25em] text-black/30 dark:text-white/25 sm:text-[9px]">
              More to come
            </span>

            <span className="text-xs text-black/50 dark:text-white/40 sm:text-sm">
              Build • Learn • Repeat
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;