import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Project } from "../data/projectsData";
import { ProjectDetailsModal } from "./ProjectDetailsModal";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <>
      <ProjectDetailsModal
        isOpen={detailsOpen}
        project={project}
        onClose={() => setDetailsOpen(false)}
      />
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -8 }}
      onClick={() => setDetailsOpen(true)}
      className="group relative p-8 bg-white/80 backdrop-blur-sm rounded-3xl border border-purple-100/50 shadow-lg shadow-purple-100/50 hover:shadow-2xl hover:shadow-purple-200/50 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Gradient overlay */}
      <div
        className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${project.gradient} opacity-10 group-hover:opacity-20 rounded-full blur-2xl transition-opacity duration-300 -mr-10 -mt-10`}
      ></div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div
            className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${project.gradient} flex items-center justify-center shadow-lg`}
          >
            <Sparkles className="w-6 h-6 text-white" />
          </div>

          <motion.div className="opacity-0 group-hover:opacity-100 transition-opacity" whileHover={{ x: 5 }}>
            <ArrowRight className="w-5 h-5 text-purple-500" />
          </motion.div>
        </div>

        {project.imageSrc ? (
          <div className="mb-6 w-full overflow-hidden rounded-3xl border border-purple-100/50 bg-slate-100 shadow-sm transition group-hover:shadow-lg">
            <img
              src={project.imageSrc}
              alt={project.imageAlt ?? project.title}
              className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
            />
          </div>
        ) : null}

        <h3 className="text-2xl mb-3 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          {project.title}
        </h3>

        <p className="text-sm uppercase tracking-[0.2em] text-purple-600 mb-3">{project.category}</p>

        {project.tools && project.tools.length > 0 && (
          <div className="mb-4 flex gap-2 flex-wrap">
            {project.tools.map((tool) => (
              <span
                key={tool}
                className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100/60 text-xs font-medium text-purple-700 border border-purple-200/50"
              >
                {tool}
              </span>
            ))}
          </div>
        )}

        <p className="text-gray-600 leading-relaxed">{project.description}</p>


        {/* Decorative line */}
        <div className="mt-6 w-16 h-0.5 bg-gradient-to-r from-purple-400 to-transparent rounded-full group-hover:w-24 transition-all duration-300"></div>
      </div>
    </motion.div>
    </>
  );
}
