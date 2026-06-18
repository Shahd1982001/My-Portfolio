import { useState } from "react";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

const skills = [
  { name: "Figma", icon: "🎨", color: "from-purple-400 to-pink-400", category: "Design" },
  { name: "Photoshop", icon: "🖼️", color: "from-blue-400 to-cyan-400", category: "Design" },
  { name: "VSCode", icon: "💻", color: "from-green-400 to-emerald-400", category: "Development" },
  { name: "Firebase", icon: "🔥", color: "from-orange-400 to-red-400", category: "Development" },
  { name: "Flutter", icon: "🎯", color: "from-cyan-400 to-blue-500", category: "Development" },
  { name: "HTML", icon: "📄", color: "from-orange-300 to-yellow-300", category: "Web" },
  { name: "CSS", icon: "🎨", color: "from-blue-300 to-indigo-300", category: "Web" },
];

const categories = ["All", "Design", "Development", "Web"];

export function Skills() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const filteredSkills = selectedCategory === "All" ? skills : skills.filter((skill) => skill.category === selectedCategory);

  return (
    <section className="py-20 px-8 bg-gradient-to-b from-white to-purple-50/20 relative overflow-hidden">
      <div className="absolute top-10 left-20 w-64 h-64 bg-purple-200/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 mb-12"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-purple-50 rounded-full border border-purple-100">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span className="text-sm tracking-wide text-purple-600 uppercase">Skills & Tools</span>
          </div>

          <h2 className="text-4xl font-light">
            Tools I <span className="bg-gradient-to-r from-purple-600 to-lavender-500 bg-clip-text text-transparent">Master</span>
          </h2>
        </motion.div>

        <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                selectedCategory === category
                  ? "bg-purple-700 text-white shadow-lg"
                  : "bg-white border border-purple-200 text-purple-700 hover:bg-purple-50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -8, scale: 1.05 }}
              className={`group p-6 rounded-2xl bg-gradient-to-br ${skill.color} bg-opacity-10 border border-purple-100/50 shadow-sm hover:shadow-lg transition-all cursor-default`}
            >
              <div className="text-5xl mb-3">{skill.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900">{skill.name}</h3>
              <p className="mt-2 text-sm text-slate-600 uppercase tracking-[0.18em]">{skill.category}</p>
              <div className="mt-4 h-1 w-8 bg-gradient-to-r from-purple-400 to-transparent rounded-full group-hover:w-16 transition-all duration-300"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
