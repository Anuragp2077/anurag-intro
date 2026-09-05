import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";

import Hero from "./components/Hero";
import About from "./components/About";
import Interests from "./components/Interests";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

function App() {
  return (
    <div
      className="
        min-h-screen
        bg-white
        text-black
        transition-colors
        duration-500
        dark:bg-[#080808]
        dark:text-white
      "
    >
      <ScrollProgress />

      <Navbar />

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