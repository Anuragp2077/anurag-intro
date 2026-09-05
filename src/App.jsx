import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";

import Hero from "./components/Hero";
import About from "./components/About";
import Interests from "./components/Interests";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

function App() {
  const [dark, setDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
      return false;
    }

    return true;
  });

  useEffect(() => {
    const root = document.documentElement;

    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const toggleTheme = () => {
    setDark((current) => !current);
  };

  return (
    <div className="min-h-screen bg-white text-black transition-colors duration-500 dark:bg-[#080808] dark:text-white">
      <ScrollProgress />

      <Navbar
        dark={dark}
        onToggleTheme={toggleTheme}
      />

      <main>
        <Hero />
        <About />
        <Interests />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

export default App;