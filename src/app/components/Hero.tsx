import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-50 via-lavender-50 to-purple-100">
      {/* Decorative organic shapes */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-lavender-200/20 rounded-full blur-3xl"></div>

      {/* Glassmorphism arch frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[600px] bg-gradient-to-b from-purple-200/40 to-lavender-300/50 rounded-l-full backdrop-blur-md border border-white/30"
      >
        {/* Botanical line art inside arch */}
        <svg className="absolute bottom-20 left-10 w-24 h-32 opacity-60" viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 10 Q40 30, 30 50 Q20 70, 25 90 Q30 110, 40 130" stroke="#9333ea" strokeWidth="2" fill="none" opacity="0.5"/>
          <ellipse cx="30" cy="30" rx="8" ry="15" fill="none" stroke="#a855f7" strokeWidth="1.5" opacity="0.4"/>
          <ellipse cx="25" cy="55" rx="6" ry="12" fill="none" stroke="#a855f7" strokeWidth="1.5" opacity="0.4"/>
          <ellipse cx="28" cy="75" rx="7" ry="14" fill="none" stroke="#a855f7" strokeWidth="1.5" opacity="0.4"/>
          <ellipse cx="35" cy="100" rx="8" ry="13" fill="none" stroke="#a855f7" strokeWidth="1.5" opacity="0.4"/>
        </svg>
      </motion.div>

      {/* Sparkle decorations */}
      <motion.div
        animate={{ rotate: [0, 180, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute top-32 right-1/3"
      >
        <Sparkles className="w-8 h-8 text-purple-400" />
      </motion.div>

      <motion.div
        animate={{ rotate: [360, 180, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-40 right-1/4"
      >
        <Sparkles className="w-6 h-6 text-lavender-400" />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="inline-block px-4 py-1.5 bg-purple-100/50 backdrop-blur-sm rounded-full border border-purple-200/50">
            <span className="text-sm tracking-wide text-purple-600 uppercase">UI/UX DESIGNER & FULL-STACK DEVELOPER</span>
          </div>

          <h1 className="space-y-2">
            <span className="block text-3xl font-light text-gray-600">Hello, I'm</span>
            <span className="block text-6xl font-bold text-black">Shahd Albasha</span>
            <span className="block text-4xl text-purple-400 font-light italic mt-2">creative</span>
          </h1>

          <h2 className="text-xl text-gray-700">UI/UX Designer & Full-Stack Developer</h2>

          <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
            I design and build clean, modern, and user-friendly mobile experiences from frontend to backend.
          </p>

          <div className="flex gap-4 pt-4">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors shadow-lg shadow-purple-200"
            >
              View My Work
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-purple-600 rounded-full hover:bg-purple-50 transition-colors border border-purple-200"
            >
              Contact Me
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Decorative curved lines */}
      <svg className="absolute bottom-0 left-0 w-full h-32 opacity-20" viewBox="0 0 1200 100" preserveAspectRatio="none">
        <path d="M0,50 Q300,20 600,50 T1200,50 L1200,100 L0,100 Z" fill="#c084fc" />
      </svg>
    </section>
  );
}
