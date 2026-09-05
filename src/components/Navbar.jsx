import { useState } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });

    setMenuOpen(false);
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full">
      <nav
        className="
          mx-auto flex max-w-7xl
          items-center justify-between
          px-5 py-4
          sm:px-6 sm:py-5
          md:px-8
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
            text-sm font-semibold
            tracking-[0.25em]
            text-black
            transition-opacity
            hover:opacity-60
            dark:text-white
          "
        >
          AP<span className="text-orange-500">.</span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex lg:gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className="
                whitespace-nowrap
                px-1 py-2
                text-[10px]
                uppercase
                tracking-[0.15em]
                text-black/60
                transition-colors
                hover:text-orange-500
                dark:text-white/60
                dark:hover:text-orange-400
                lg:text-xs
              "
            >
              {item.name}
            </button>
          ))}

          <ThemeToggle
            dark={dark}
            onToggle={onToggleTheme}
          />
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 sm:gap-3 md:hidden">
          <ThemeToggle
            dark={dark}
            onToggle={onToggleTheme}
          />

          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-full
              border border-black/10
              bg-white/70
              text-black
              backdrop-blur-md
              transition-all
              duration-300
              active:scale-90
              dark:border-white/10
              dark:bg-black/50
              dark:text-white
            "
            aria-label={
              menuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={menuOpen}
          >
            <span
              className="
                text-lg leading-none
                transition-transform duration-300
              "
            >
              {menuOpen ? "×" : "☰"}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`
          px-4
          transition-all
          duration-300
          md:hidden
          ${
            menuOpen
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-3 opacity-0"
          }
        `}
      >
        <div
          className="
            mx-auto
            max-w-lg
            overflow-hidden
            rounded-2xl
            border border-black/10
            bg-white/90
            p-3
            shadow-2xl
            backdrop-blur-2xl
            dark:border-white/10
            dark:bg-[#111]/90
          "
        >
          <div className="flex flex-col gap-1">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="
                  flex min-h-12
                  items-center
                  justify-between
                  rounded-xl
                  px-4
                  text-left
                  text-[10px]
                  uppercase
                  tracking-[0.18em]
                  text-black/65
                  transition-all
                  duration-200
                  hover:bg-black/5
                  hover:text-orange-500
                  active:scale-[0.98]
                  dark:text-white/65
                  dark:hover:bg-white/5
                  dark:hover:text-orange-400
                "
              >
                <span>{item.name}</span>

                <span
                  className="
                    text-[9px]
                    text-black/20
                    dark:text-white/20
                  "
                >
                  0{index + 2}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;