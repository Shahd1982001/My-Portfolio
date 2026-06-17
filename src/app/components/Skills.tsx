import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

const skills = [
  { name: "Figma", icon: "🎨", color: "from-purple-400 to-pink-400" },
  { name: "Photoshop", icon: "🖼️", color: "from-blue-400 to-cyan-400" },
  { name: "VSCode", icon: "💻", color: "from-green-400 to-emerald-400" },
  { name: "Firebase", icon: "🔥", color: "from-orange-400 to-red-400" },
];

export function Skills() {
  return (
    <section className="py-20 px-8 bg-gradient-to-b from-white to-purple-50/20 relative overflow-hidden">
      <div className="absolute top-10 left-20 w-64 h-64 bg-purple-200/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-purple-50 rounded-full border border-purple-100">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span className="text-sm tracking-wide text-purple-600 uppercase">Skills & Tools</span>
          </div>

          <h2 className="text-4xl font-light">
            Tools I <span className="bg-gradient-to-r from-purple-600 to-lavender-500 bg-clip-text text-transparent">Master</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.05 }}
              className={`group p-6 rounded-2xl bg-gradient-to-br ${skill.color} bg-opacity-10 border border-purple-100/50 shadow-sm hover:shadow-lg transition-all cursor-default`}
            >
              <div className="text-5xl mb-3">{skill.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900">{skill.name}</h3>
              <div className="mt-3 h-1 w-8 bg-gradient-to-r from-purple-400 to-transparent rounded-full group-hover:w-16 transition-all duration-300"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
