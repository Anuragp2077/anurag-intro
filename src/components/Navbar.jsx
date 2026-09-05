import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { name: "About", id: "about" },
  { name: "Interests", id: "interests" },
  { name: "Skills", id: "skills" },
  { name: "Projects", id: "projects" },
  { name: "Contact", id: "contact" },
  { name: "Playground", id: "playground" },
];

function Navbar({ dark, onToggleTheme }) {
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show navbar near the top.
      if (currentScrollY < 80) {
        setHidden(false);
        lastScrollY = currentScrollY;
        return;
      }

      // Hide when scrolling down.
      if (currentScrollY > lastScrollY + 4) {
        setHidden(true);
        setMobileOpen(false);
      }

      // Show when scrolling up.
      if (currentScrollY < lastScrollY - 4) {
        setHidden(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  const handleNavigation = (id) => {
    setMobileOpen(false);

    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <header
      className={`
        fixed
        left-0
        right-0
        top-0
        z-[100]
        transition-transform
        duration-500
        ease-[cubic-bezier(0.22,1,0.36,1)]
        ${
          hidden
            ? "-translate-y-full"
            : "translate-y-0"
        }
      `}
    >
      <div className="mx-auto max-w-7xl px-5 pt-4 sm:px-6 md:px-8">
        <nav
          className="
            relative
            flex
            h-12
            items-center
            justify-between
            rounded-full
            border
            border-black/10
            bg-white/75
            px-4
            shadow-[0_8px_30px_rgba(0,0,0,0.04)]
            backdrop-blur-xl
            transition-colors
            duration-500
            dark:border-white/10
            dark:bg-[#0b0b0b]/75
            dark:shadow-[0_8px_30px_rgba(0,0,0,0.25)]
            sm:h-14
            sm:px-5
          "
        >
          {/* Logo */}

          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="
              group
              flex
              items-center
              gap-1
              text-sm
              font-semibold
              tracking-[0.15em]
              text-black
              dark:text-white
            "
            aria-label="Back to top"
          >
            AP
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-orange-500
                transition-transform
                duration-300
                group-hover:scale-125
              "
            />
          </button>

          {/* Desktop navigation */}

          <div className="hidden items-center gap-7 md:flex lg:gap-9">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  handleNavigation(item.id)
                }
                className="
                  relative
                  text-[10px]
                  uppercase
                  tracking-[0.16em]
                  text-black/50
                  transition-colors
                  duration-300
                  hover:text-orange-500
                  dark:text-white/45
                  dark:hover:text-orange-400
                  after:absolute
                  after:-bottom-1
                  after:left-0
                  after:h-px
                  after:w-0
                  after:bg-orange-500
                  after:transition-all
                  after:duration-300
                  hover:after:w-full
                "
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Desktop theme toggle */}

          <div className="hidden md:block">
            <ThemeToggle
              dark={dark}
              onToggle={onToggleTheme}
            />
          </div>

          {/* Mobile controls */}

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle
              dark={dark}
              onToggle={onToggleTheme}
            />

            <button
              type="button"
              onClick={() =>
                setMobileOpen((current) => !current)
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
                text-black/60
                transition-all
                duration-300
                hover:border-orange-500/40
                hover:text-orange-500
                dark:border-white/10
                dark:text-white/60
              "
              aria-label={
                mobileOpen
                  ? "Close navigation"
                  : "Open navigation"
              }
              aria-expanded={mobileOpen}
            >
              <span className="relative h-3.5 w-4">
                <span
                  className={`
                    absolute
                    left-0
                    top-0
                    h-px
                    w-4
                    bg-current
                    transition-all
                    duration-300
                    ${
                      mobileOpen
                        ? "translate-y-[6px] rotate-45"
                        : ""
                    }
                  `}
                />

                <span
                  className={`
                    absolute
                    left-0
                    top-[6px]
                    h-px
                    w-4
                    bg-current
                    transition-all
                    duration-300
                    ${
                      mobileOpen
                        ? "opacity-0"
                        : "opacity-100"
                    }
                  `}
                />

                <span
                  className={`
                    absolute
                    left-0
                    top-3
                    h-px
                    w-4
                    bg-current
                    transition-all
                    duration-300
                    ${
                      mobileOpen
                        ? "-translate-y-[6px] -rotate-45"
                        : ""
                    }
                  `}
                />
              </span>
            </button>
          </div>

          {/* Mobile menu */}

          {mobileOpen && (
            <div
              className="
                absolute
                left-0
                right-0
                top-[calc(100%+8px)]
                overflow-hidden
                rounded-2xl
                border
                border-black/10
                bg-white/95
                p-2
                shadow-[0_20px_60px_rgba(0,0,0,0.12)]
                backdrop-blur-xl
                dark:border-white/10
                dark:bg-[#0b0b0b]/95
                dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)]
              "
            >
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    handleNavigation(item.id)
                  }
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    rounded-xl
                    px-4
                    py-3
                    text-left
                    text-[10px]
                    uppercase
                    tracking-[0.18em]
                    text-black/55
                    transition-colors
                    duration-200
                    hover:bg-orange-500/5
                    hover:text-orange-500
                    dark:text-white/50
                    dark:hover:bg-orange-500/5
                    dark:hover:text-orange-400
                  "
                >
                  <span>{item.name}</span>

                  <span className="font-mono text-[8px] text-black/20 dark:text-white/15">
                    0{index + 1}
                  </span>
                </button>
              ))}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;