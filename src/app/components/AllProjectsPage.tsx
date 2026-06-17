import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Sparkles } from "lucide-react";
import { projectsData, Project } from "../data/projectsData";
import { ProjectCard } from "./ProjectCard";

interface AllProjectsPageProps {
  onBack: () => void;
}

const groupProjectsByCategory = (projects: Project[]) => {
  return projects.reduce<Record<string, Project[]>>((groups, project) => {
    if (!groups[project.category]) {
      groups[project.category] = [];
    }

    groups[project.category].push(project);
    return groups;
  }, {});
};

export function AllProjectsPage({ onBack }: AllProjectsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("UI/UX Design");
  const groupedProjects = groupProjectsByCategory(projectsData);
  const categories = Object.keys(groupedProjects);

  return (
    <section className="min-h-screen py-24 px-8 bg-gradient-to-b from-white via-purple-50/30 to-lavender-50/50 relative overflow-hidden">
      <div className="absolute top-20 right-10 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-20 w-96 h-96 bg-lavender-200/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 mb-10 rounded-full border border-purple-200 bg-white/90 px-5 py-3 text-sm font-medium text-purple-700 shadow-sm transition hover:bg-purple-50"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        {/* Category Filter Buttons */}
        <div className="mb-12 flex items-center gap-3 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium text-sm transition ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-purple-600 to-lavender-500 text-white shadow-lg"
                  : "bg-white border border-purple-200 text-purple-600 hover:bg-purple-50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-purple-50 rounded-full border border-purple-100">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span className="text-sm tracking-wide text-purple-600 uppercase">{selectedCategory}</span>
          </div>

          <h2 className="text-5xl font-light">
            {selectedCategory} <span className="bg-gradient-to-r from-purple-600 to-lavender-500 bg-clip-text text-transparent">Projects</span>
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Showcasing all my {selectedCategory.toLowerCase()} work.
          </p>
        </motion.div>

        {/* Projects Grid for Selected Category */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <span className="rounded-full bg-purple-100/80 px-4 py-2 text-sm text-purple-700">
              {groupedProjects[selectedCategory].length} project{groupedProjects[selectedCategory].length > 1 ? "s" : ""}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {groupedProjects[selectedCategory].map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
