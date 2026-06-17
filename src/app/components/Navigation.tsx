import { motion } from "motion/react";

export function Navigation() {
  const navItems = ["Home", "Projects", "About", "Contact"];

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
              key={item}
              href={`#${item.toLowerCase()}`}
              whileHover={{ scale: 1.05 }}
              className="text-sm text-gray-700 hover:text-purple-600 transition-colors cursor-pointer"
            >
              {item}
            </motion.a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
