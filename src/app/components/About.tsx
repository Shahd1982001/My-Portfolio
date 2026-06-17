import { motion } from "motion/react";

export function About() {
  return (
    <section id="about" className="py-24 px-8 bg-white relative overflow-hidden">
      {/* Decorative botanical element */}
      <svg className="absolute top-10 left-20 w-32 h-40 opacity-20" viewBox="0 0 100 150" fill="none">
        <path d="M50 10 Q60 30, 70 50 Q80 70, 75 90 Q70 110, 60 130" stroke="#9333ea" strokeWidth="2" fill="none" opacity="0.3"/>
        <ellipse cx="70" cy="30" rx="8" ry="15" fill="none" stroke="#a855f7" strokeWidth="1.5" opacity="0.3"/>
        <ellipse cx="75" cy="55" rx="6" ry="12" fill="none" stroke="#a855f7" strokeWidth="1.5" opacity="0.3"/>
      </svg>

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6"
        >
          <div className="inline-block px-5 py-2 bg-purple-50 rounded-full border border-purple-100">
            <span className="text-sm tracking-wide text-purple-600 uppercase">About Me</span>
          </div>

          <h2 className="text-5xl font-light">
            <span className="bg-gradient-to-r from-purple-600 to-lavender-500 bg-clip-text text-transparent">About</span> Shahd Albasha
          </h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto p-12 bg-gradient-to-br from-purple-50 to-lavender-50 rounded-3xl border border-purple-100/50 backdrop-blur-sm shadow-xl shadow-purple-100/50"
          >
            <p className="text-lg text-gray-700 leading-relaxed">
              I am an IT graduate who blends visual artistry with clean code. I design intuitive experiences and build scalable, full-stack mobile apps using Flutter.
            </p>
          </motion.div>

          {/* Decorative element */}
          <div className="flex justify-center pt-8">
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-purple-300 to-transparent rounded-full"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
