import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { AllProjectsPage } from "./components/AllProjectsPage";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  const [showAllProjects, setShowAllProjects] = useState(false);

  // Auto scroll to top when navigating between pages
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [showAllProjects]);

  return (
    <div className="min-h-screen bg-white">
      {!showAllProjects && <Navigation />}
      <AnimatePresence mode="wait">
        {showAllProjects ? (
          <motion.div
            key="all-projects"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AllProjectsPage onBack={() => setShowAllProjects(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Hero />
            <About />
            <Projects onViewMore={() => setShowAllProjects(true)} />
            <Skills />
            <Contact />
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
}