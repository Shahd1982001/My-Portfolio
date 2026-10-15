import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function Navigation() {
  const navItems = [
    { label: "Home", id: "home" },
    { label: "Projects", id: "projects" },
    { label: "About", id: "about" },
    { label: "Tools", id: "skills" },
    { label: "Contact", id: "contact" },
  ];
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = navItems
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio);

        if (visibleSections[0]) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0.1, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 px-8 py-6"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        {/* Navigation items */}
        <div className="flex items-center gap-8 px-8 py-3 bg-white/70 backdrop-blur-md rounded-full border border-purple-100/50 shadow-lg shadow-purple-100/30">
          {navItems.map((item) => (
            <motion.a
              key={item.id}
              href={`#${item.id}`}
              whileHover={{ scale: 1.05 }}
              className={`relative rounded-full px-3 py-1.5 text-sm transition-colors cursor-pointer ${
                activeSection === item.id ? "text-purple-700" : "text-gray-700 hover:text-purple-600"
              }`}
            >
              {activeSection === item.id ? (
                <motion.span
                  layoutId="active-navigation-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-purple-100"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              ) : null}
              <span className="relative">{item.label}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
