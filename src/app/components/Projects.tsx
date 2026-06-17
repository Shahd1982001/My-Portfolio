import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { projectsData } from "../data/projectsData";
import { ProjectCard } from "./ProjectCard";

interface ProjectsProps {
  onViewMore: () => void;
}

export function Projects({ onViewMore }: ProjectsProps) {
  const featuredProjects = projectsData.slice(0, 3);

  return (
    <section id="projects" className="py-24 px-8 bg-gradient-to-b from-white via-purple-50/30 to-lavender-50/50 relative overflow-hidden">
      {/* Background decorative shapes */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-20 w-96 h-96 bg-lavender-200/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-purple-50 rounded-full border border-purple-100">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span className="text-sm tracking-wide text-purple-600 uppercase">My Portfolio</span>
          </div>

          <h2 className="text-5xl font-light">
            Featured <span className="bg-gradient-to-r from-purple-600 to-lavender-500 bg-clip-text text-transparent">Projects</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {projectsData.length > 3 ? (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={onViewMore}
              className="inline-flex items-center justify-center rounded-full bg-purple-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-200/50 transition hover:bg-purple-700"
            >
              View All Projects
            </button>
          </div>
        ) : null}
      </div>

      {/* Bottom decorative wave */}
      <svg className="absolute bottom-0 left-0 w-full h-24 opacity-10" viewBox="0 0 1200 100" preserveAspectRatio="none">
        <path d="M0,50 Q300,80 600,50 T1200,50 L1200,100 L0,100 Z" fill="#9333ea" />
      </svg>
    </section>
  );
}
