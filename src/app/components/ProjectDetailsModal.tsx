// import { useEffect, useState } from "react";
// import { AnimatePresence, motion } from "motion/react";
// import { Project } from "../data/projectsData";
// import { ImageModal } from "./ImageModal";

// interface ProjectDetailsModalProps {
//   isOpen: boolean;
//   project: Project;
//   onClose: () => void;
// }

// export function ProjectDetailsModal({ isOpen, project, onClose }: ProjectDetailsModalProps) {
//   const [imageOpen, setImageOpen] = useState(false);

//   useEffect(() => {
//     if (!isOpen) return;

//     const originalOverflow = document.body.style.overflow;
//     document.body.style.overflow = "hidden";

//     const footer = document.querySelector("footer") as HTMLElement | null;
//     const originalFooterVisibility = footer?.style.visibility;
//     if (footer) {
//       footer.style.visibility = "hidden";
//     }

//     return () => {
//       document.body.style.overflow = originalOverflow || "";
//       if (footer) {
//         footer.style.visibility = originalFooterVisibility || "";
//       }
//     };
//   }, [isOpen]);

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.2 }}
//             className="fixed inset-0 z-40 bg-white/65 backdrop-blur-sm"
//           />

//           <motion.div
//             initial={{ opacity: 0, y: 20, scale: 0.96 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 10, scale: 0.96 }}
//             transition={{ duration: 0.3, ease: "easeOut" }}
//             className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
//             onClick={onClose}
//           >
//             <motion.div
//               onClick={(event) => event.stopPropagation()}
//               className="relative w-full max-w-6xl overflow-hidden rounded-[2.5rem] border border-purple-100/70 bg-white/95 shadow-2xl shadow-purple-100/30"
//             >
//               <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(167,139,250,0.16),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(192,132,252,0.14),_transparent_22%)]" />
//               <div className="pointer-events-none absolute -left-20 top-14 h-40 w-40 rounded-full bg-purple-200/30 blur-3xl" />
//               <div className="pointer-events-none absolute -right-24 bottom-20 h-52 w-52 rounded-full bg-lavender-200/30 blur-3xl" />

//               <div className="relative grid gap-6 lg:grid-cols-[1.2fr_0.95fr] p-6 sm:p-8">
//                 {project.imageSrc ? (
//                   <div className="relative overflow-hidden rounded-[2rem] border border-purple-100/40 bg-purple-50/70 shadow-lg shadow-purple-100/20">
//                     <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-purple-200/70 via-transparent to-transparent" />
//                     <button
//                       type="button"
//                       onClick={() => setImageOpen(true)}
//                       className="group block w-full cursor-pointer"
//                       aria-label="Open image fullscreen"
//                     >
//                       <img
//                         src={project.imageSrc}
//                         alt={project.imageAlt ?? project.title}
//                         className="h-full w-full max-h-[560px] object-cover transition duration-300 group-hover:scale-[1.02]"
//                       />
//                     </button>
//                   </div>
//                 ) : null}

//                 <div className="space-y-6 text-slate-900">
//                   <div className="space-y-4">
//                     <p className="inline-flex rounded-full border border-purple-200/70 bg-purple-100/80 px-4 py-2 text-xs uppercase tracking-[0.24em] text-purple-700">
//                       {project.category}
//                     </p>
//                     <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
//                       {project.title}
//                     </h2>
//                   </div>

//                   {project.tools && project.tools.length > 0 ? (
//                     <div className="flex flex-wrap gap-2">
//                       {project.tools.map((tool) => (
//                         <span
//                           key={tool}
//                           className="inline-flex items-center rounded-full border border-purple-200/60 bg-purple-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-purple-700"
//                         >
//                           {tool}
//                         </span>
//                       ))}
//                     </div>
//                   ) : null}

//                   <div className="space-y-5">
//                     <div className="rounded-[2rem] border border-purple-100/70 bg-white p-6 shadow-sm shadow-purple-100/20">
//                       <p className="text-base leading-7 text-slate-700">{project.description}</p>
//                     </div>

//                     {project.details?.en ? (
//                       <div className="space-y-3 rounded-[2rem] border border-purple-100/70 bg-purple-50/80 p-6 shadow-sm shadow-purple-100/20">
//                         <h3 className="text-lg font-semibold text-slate-950">English Summary</h3>
//                         <p className="leading-7 text-slate-700">{project.details.en}</p>
//                       </div>
//                     ) : null}

//                     {project.details?.ar ? (
//                       <div className="space-y-3 rounded-[2rem] border border-purple-100/70 bg-purple-50/80 p-6 shadow-sm shadow-purple-100/20">
//                         <h3 className="text-lg font-semibold text-slate-950">الشرح بالعربية</h3>
//                         <p dir="rtl" className="leading-7 text-slate-700">{project.details.ar}</p>
//                       </div>
//                     ) : null}
//                   </div>

//                   {(project.prototypeLink || project.designFileLink || project.websiteLink) ? (
//                     <>
//                       <div className="grid gap-3 sm:grid-cols-2">
//                         {project.websiteLink ? (
//                           <a
//                             href={project.websiteLink}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="inline-flex items-center justify-center rounded-full border border-purple-200/70 bg-purple-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-800"
//                           >
//                             VIEW WEBSITE
//                           </a>
//                         ) : null}

//                         {project.prototypeLink ? (
//                           <a
//                             href={project.prototypeLink}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="inline-flex items-center justify-center rounded-full border border-purple-200/70 bg-white px-5 py-3 text-sm font-semibold text-purple-700 shadow-sm transition hover:bg-purple-50"
//                           >
//                             Live Preview
//                           </a>
//                         ) : null}

//                         {project.designFileLink ? (
//                           <a
//                             href={project.designFileLink}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="inline-flex items-center justify-center rounded-full border border-purple-200/70 bg-white px-5 py-3 text-sm font-semibold text-purple-700 shadow-sm transition hover:bg-purple-50"
//                           >
//                             View Design File
//                           </a>
//                         ) : null}
//                       </div>
//                       <p className="mt-3 text-center text-xs text-slate-500">
//                         اضغط خارج النافذة لإغلاقه, Click outside the window to close it.
//                       </p>
//                     </>
//                   ) : null}
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//           <ImageModal
//             isOpen={imageOpen}
//             imageSrc={project.imageSrc ?? ""}
//             imageAlt={project.imageAlt ?? project.title}
//             onClose={() => setImageOpen(false)}
//           />
//         </>
//       )}
//     </AnimatePresence>
//   );
// }


import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { Project } from "../data/projectsData";
import { ImageModal } from "./ImageModal";

interface ProjectDetailsModalProps {
  isOpen: boolean;
  project: Project;
  onClose: () => void;
}

export function ProjectDetailsModal({ isOpen, project, onClose }: ProjectDetailsModalProps) {
  const [imageOpen, setImageOpen] = useState(false);
  const previewImages = project.gallery ?? [];
  const mainPreviewImage = project.imageSrc ?? previewImages[0] ?? "";
  const allPreviewImages = Array.from(new Set([mainPreviewImage, ...previewImages].filter(Boolean)));
  const previewThumbnails = allPreviewImages.filter((imageSrc) => imageSrc !== mainPreviewImage);
  const [selectedImage, setSelectedImage] = useState(mainPreviewImage);
  const hasVisualPreview = Boolean(mainPreviewImage);
  const isUiUxProject = project.category.toLowerCase().includes("ui/ux");

  const openImage = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setImageOpen(true);
  };

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const footer = document.querySelector("footer") as HTMLElement | null;
    const originalFooterVisibility = footer?.style.visibility;
    if (footer) {
      footer.style.visibility = "hidden";
    }

    return () => {
      document.body.style.overflow = originalOverflow || "";
      if (footer) {
        footer.style.visibility = originalFooterVisibility || "";
      }
    };
  }, [isOpen]);

  useEffect(() => {
    setSelectedImage(mainPreviewImage);
    setImageOpen(false);
  }, [mainPreviewImage, project.id]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white/65 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={onClose}
          >
            <motion.div
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-6xl overflow-hidden rounded-[2.5rem] border border-purple-100/70 bg-white/95 shadow-2xl shadow-purple-100/30"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(167,139,250,0.16),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(192,132,252,0.14),_transparent_22%)]" />
              <div className="pointer-events-none absolute -left-20 top-14 h-40 w-40 rounded-full bg-purple-200/30 blur-3xl" />
              <div className="pointer-events-none absolute -right-24 bottom-20 h-52 w-52 rounded-full bg-lavender-200/30 blur-3xl" />
              <Sparkles className="pointer-events-none absolute left-8 top-8 h-5 w-5 text-purple-300" />
              <motion.div
                animate={{ rotate: [0, 180, 360], y: [0, -5, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="pointer-events-none absolute right-10 top-12 text-lavender-400"
              >
                <Sparkles className="h-8 w-8" />
              </motion.div>
              <motion.div
                animate={{ rotate: [360, 180, 0], y: [0, 6, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                className="pointer-events-none absolute bottom-8 left-10 text-purple-300"
              >
                <Sparkles className="h-6 w-6" />
              </motion.div>

              <div className="relative grid gap-6 lg:grid-cols-[1.2fr_0.95fr] p-6 sm:p-8">

                {hasVisualPreview ? (
                  <div className="relative overflow-hidden rounded-[2rem] border border-purple-100/40 bg-purple-50/70 shadow-lg shadow-purple-100/20">

                    <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-purple-200/70 via-transparent to-transparent" />

                    <button
                      type="button"
                      onClick={() => openImage(mainPreviewImage)}
                      className="group block w-full cursor-pointer"
                      aria-label="Open image fullscreen"
                    >
                      <img
                        src={mainPreviewImage}
                        alt={project.imageAlt ?? project.title}
                        className="h-full w-full max-h-[560px] object-cover transition duration-300 group-hover:scale-[1.02]"
                      />
                    </button>

                    {previewThumbnails.length > 0 ? (
                      <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3">
                        {previewThumbnails.map((imageSrc, index) => (
                          <button
                            key={`${imageSrc}-${index}`}
                            type="button"
                            onClick={() => openImage(imageSrc)}
                            className="group overflow-hidden rounded-xl border border-white/70 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                            aria-label={`Open ${project.title} preview ${index + 1}`}
                          >
                            <img
                              src={imageSrc}
                              alt={`${project.title} preview ${index + 1}`}
                              className="h-24 w-full object-cover transition duration-300 group-hover:scale-105"
                            />
                          </button>
                        ))}
                      </div>
                    ) : null}

                    {isUiUxProject ? (
                      <div className="border-t border-purple-100/70 bg-white/75 p-4 text-sm leading-6 text-slate-600">
                        <p>
                          Quick preview: these images give a fast visual overview. Use Live Preview or View Design File to explore the complete screens and interaction flow.
                        </p>
                        <p dir="rtl" className="mt-2 text-right">
                          معاينة سريعة: الصور تعطي لمحة مختصرة عن الواجهات. لعرض الشاشات كاملة وتجربة طريقة التفاعل، استخدم أزرار Live Preview أو View Design File.
                        </p>
                      </div>
                    ) : null}

                  </div>
                ) : null}

                <div className="space-y-6 text-slate-900">
                  <div className="space-y-4">
                    <p className="inline-flex rounded-full border border-purple-200/70 bg-purple-100/80 px-4 py-2 text-xs uppercase tracking-[0.24em] text-purple-700">
                      {project.category}
                    </p>
                    <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                      {project.title}
                    </h2>
                  </div>

                  {project.tools && project.tools.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {project.tools.map((tool) => (
                        <span
                          key={tool}
                          className="inline-flex items-center rounded-full border border-purple-200/60 bg-purple-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-purple-700"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <div className="space-y-5">
                    <div className="rounded-[2rem] border border-purple-100/70 bg-white p-6 shadow-sm shadow-purple-100/20">
                      <p className="text-base leading-7 text-slate-700">{project.description}</p>
                    </div>

                    {project.details?.en ? (
                      <div className="space-y-3 rounded-[2rem] border border-purple-100/70 bg-purple-50/80 p-6 shadow-sm shadow-purple-100/20">
                        <h3 className="text-lg font-semibold text-slate-950">English Summary</h3>
                        <p className="leading-7 text-slate-700">{project.details.en}</p>
                      </div>
                    ) : null}

                    {project.details?.ar ? (
                      <div className="space-y-3 rounded-[2rem] border border-purple-100/70 bg-purple-50/80 p-6 shadow-sm shadow-purple-100/20">
                        <h3 className="text-lg font-semibold text-slate-950">الشرح بالعربية</h3>
                        <p dir="rtl" className="leading-7 text-slate-700">{project.details.ar}</p>
                      </div>
                    ) : null}
                  </div>

                  {(project.prototypeLink || project.designFileLink || project.websiteLink) ? (
                    <>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {project.websiteLink ? (
                          <a
                            href={project.websiteLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-full border border-purple-200/70 bg-purple-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-800"
                          >
                            VIEW WEBSITE
                          </a>
                        ) : null}

                        {project.prototypeLink ? (
                          <a
                            href={project.prototypeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-full border border-purple-200/70 bg-white px-5 py-3 text-sm font-semibold text-purple-700 shadow-sm transition hover:bg-purple-50"
                          >
                            Live Preview
                          </a>
                        ) : null}

                        {project.designFileLink ? (
                          <a
                            href={project.designFileLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-full border border-purple-200/70 bg-white px-5 py-3 text-sm font-semibold text-purple-700 shadow-sm transition hover:bg-purple-50"
                          >
                            View Design File
                          </a>
                        ) : null}
                      </div>

                      {isUiUxProject && !hasVisualPreview ? (
                        <div className="rounded-[1.5rem] border border-purple-100/70 bg-purple-50/80 p-4 text-sm leading-6 text-slate-600">
                          <p>
                            Quick preview images will be added here for faster browsing. Use Live Preview or View Design File to explore the complete screens and interaction flow.
                          </p>
                          <p dir="rtl" className="mt-2 text-right">
                            ستتم إضافة صور معاينة سريعة هنا لتصفح أسرع. لعرض الشاشات كاملة وتجربة طريقة التفاعل، استخدم أزرار Live Preview أو View Design File.
                          </p>
                        </div>
                      ) : null}

                      <p className="mt-3 text-center text-xs text-slate-500">
                        اضغط خارج النافذة لإغلاقه, Click outside the window to close it.
                      </p>
                    </>
                  ) : null}
                </div>
              </div>
            </motion.div>
          </motion.div>

          <ImageModal
            isOpen={imageOpen}
            imageSrc={selectedImage}
            imageAlt={project.imageAlt ?? project.title}
            images={allPreviewImages}
            onClose={() => setImageOpen(false)}
          />
        </>
      )}
    </AnimatePresence>
  );
}
