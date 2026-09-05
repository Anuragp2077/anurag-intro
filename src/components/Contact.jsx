function Contact() {
  return (
    <section
      id="contact"
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
        06
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
            06
          </span>

          <span className="h-px w-7 bg-black/15 dark:bg-white/15 sm:w-10" />

          <span className="text-[9px] uppercase tracking-[0.25em] text-black/40 dark:text-white/35 sm:text-[10px]">
            Contact
          </span>
        </div>

        {/* Main heading */}
        <div className="mt-14 max-w-5xl sm:mt-16">
          <p
            className="
              text-[9px]
              uppercase
              tracking-[0.25em]
              text-black/35
              dark:text-white/30
              sm:text-[10px]
            "
          >
            Have an idea?
          </p>

          <h2
            className="
              mt-5
              text-[14vw]
              font-medium
              leading-[0.82]
              tracking-[-0.08em]
              sm:text-7xl
              md:text-8xl
              lg:text-[9vw]
            "
          >
            Let's make
            <br />
            <span className="text-orange-500">
              something.
            </span>
          </h2>
        </div>

        {/* Contact content */}
        <div
          className="
            mt-14
            grid
            gap-10
            border-t
            border-black/10
            pt-8
            dark:border-white/10
            sm:mt-16
            sm:pt-10
            md:grid-cols-[1fr_auto]
            md:items-end
            md:gap-16
          "
        >
          {/* Email */}
          <div>
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
              Email
            </span>

            <a
              href="mailto:anuragp2077@gmail.com"
              className="
                mt-3
                block
                w-fit
                max-w-full
                break-all
                text-[7.5vw]
                font-medium
                leading-none
                tracking-[-0.05em]
                text-black
                transition-colors
                hover:text-orange-500
                dark:text-white
                dark:hover:text-orange-400
                sm:text-4xl
                md:text-5xl
                lg:text-6xl
              "
            >
              anuragp2077@gmail.com
            </a>
          </div>

          {/* Social links */}
          <div
            className="
              grid
              grid-cols-2
              gap-2
              sm:grid-cols-3
              md:flex
              md:flex-col
              md:gap-1
            "
          >
            <a
              href="https://github.com/Anuragp2077"
              target="_blank"
              rel="noreferrer"
              className="
                flex
                min-h-11
                items-center
                justify-between
                rounded-full
                border
                border-black/10
                px-4
                text-[9px]
                uppercase
                tracking-[0.15em]
                text-black/55
                transition-all
                duration-300
                hover:border-orange-500
                hover:text-orange-500
                active:scale-95
                dark:border-white/10
                dark:text-white/50
                dark:hover:border-orange-500
                dark:hover:text-orange-400
                sm:px-5
              "
            >
              GitHub
              <span>↗</span>
            </a>

            <a
              href="https://www.linkedin.com/in/anurag-pandey-48523b348/"
              target="_blank"
              rel="noreferrer"
              className="
                flex
                min-h-11
                items-center
                justify-between
                rounded-full
                border
                border-black/10
                px-4
                text-[9px]
                uppercase
                tracking-[0.15em]
                text-black/55
                transition-all
                duration-300
                hover:border-orange-500
                hover:text-orange-500
                active:scale-95
                dark:border-white/10
                dark:text-white/50
                dark:hover:border-orange-500
                dark:hover:text-orange-400
                sm:px-5
              "
            >
              LinkedIn
              <span>↗</span>
            </a>

            <a
              href="https://www.instagram.com/anuragp2077/"
              target="_blank"
              rel="noreferrer"
              className="
                col-span-2
                flex
                min-h-11
                items-center
                justify-between
                rounded-full
                border
                border-black/10
                px-4
                text-[9px]
                uppercase
                tracking-[0.15em]
                text-black/55
                transition-all
                duration-300
                hover:border-orange-500
                hover:text-orange-500
                active:scale-95
                dark:border-white/10
                dark:text-white/50
                dark:hover:border-orange-500
                dark:hover:text-orange-400
                sm:col-span-1
                sm:px-5
              "
            >
              Instagram
              <span>↗</span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer
          className="
            mt-20
            border-t
            border-black/10
            pt-6
            dark:border-white/10
            sm:mt-24
            md:mt-32
          "
        >
          <div
            className="
              flex
              flex-col
              gap-4
              text-[8px]
              uppercase
              tracking-[0.2em]
              text-black/30
              dark:text-white/25
              sm:flex-row
              sm:items-center
              sm:justify-between
              sm:text-[9px]
            "
          >
            <span>
              © 2026 Anurag Pandey
            </span>

            <span>
              Built with React • Tailwind • Vite
            </span>

            <span>
              06 / 06
            </span>
          </div>
        </footer>
      </div>
    </section>
  );
}

export default Contact;