function ThemeToggle({ dark, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
      className="
        relative
        flex h-9 w-16
        items-center
        rounded-full
        border border-black/10
        bg-black/5
        p-1
        transition-all
        duration-300
        active:scale-95
        dark:border-white/10
        dark:bg-white/10
      "
    >
      <span
        className={`
          flex h-7 w-7
          items-center
          justify-center
          rounded-full
          bg-black
          text-sm
          text-white
          shadow-md
          transition-transform
          duration-300
          dark:bg-white
          dark:text-black
          ${dark ? "translate-x-0" : "translate-x-7"}
        `}
      >
        {dark ? "☾" : "☀"}
      </span>
    </button>
  );
}

export default ThemeToggle;