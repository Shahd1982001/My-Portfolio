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

  // كشف الجوال
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleChange = () => setIsMobile(mediaQuery.matches);
    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

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

    const nav = document.querySelector("nav") as HTMLElement | null;
    const originalNavVisibility = nav?.style.visibility;
    if (nav) {
      nav.style.visibility = "hidden";
    }

    return () => {
      document.body.style.overflow = originalOverflow || "";
      if (footer) {
        footer.style.visibility = originalFooterVisibility || "";
      }
      if (nav) {
        nav.style.visibility = originalNavVisibility || "";
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
          {/* الخلفية (backdrop) - تختفي عند فتح الصورة */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: imageOpen ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white/80 backdrop-blur-sm"
          />

          {/* النافذة المنبثقة - تختفي تماماً عند فتح الصورة */}
          <motion.div
            initial={isMobile ? { opacity: 0, y: 50 } : { opacity: 0, y: 20, scale: 0.96 }}
            animate={
              isMobile
                ? { opacity: imageOpen ? 0 : 1, y: imageOpen ? 30 : 0 }
                : { opacity: imageOpen ? 0 : 1, y: 0, scale: imageOpen ? 0.96 : 1 }
            }
            exit={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, y: 10, scale: 0.96 }}
            transition={
              isMobile
                ? { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
                : { duration: 0.3, ease: "easeOut" }
            }
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto overflow-x-hidden"
            onClick={onClose}
            style={{ pointerEvents: imageOpen ? "none" : "auto" }}
          >
            <motion.div
              onClick={(event) => event.stopPropagation()}
              className={`relative w-full border border-purple-100/70 bg-white/95 shadow-2xl shadow-purple-100/30 ${
                isMobile
                  ? "max-w-[95%] rounded-[1.5rem] max-h-[90vh] overflow-y-auto mx-auto"
                  : "max-w-8xl rounded-[2.5rem] overflow-hidden"
              }`}
            >
              {/* الزينة الثابتة */}
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

              {/* الشبكة الداخلية */}
              <div
                className={`relative grid ${
                  isMobile
                    ? "grid-cols-1 gap-2 p-3"
                    : "grid gap-3 p-4 lg:grid-cols-[1.2fr_0.95fr]"
                } sm:p-5`}
                style={{ maxHeight: isMobile ? "none" : "85vh" }}
              >
                {/* قسم الصورة */}
                {hasVisualPreview ? (
                  <div className="relative overflow-hidden rounded-[2rem] border border-purple-100/40 bg-purple-50/70 shadow-lg shadow-purple-100/20">
                    <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-r from-purple-200/70 via-transparent to-transparent" />
                    <button
                      type="button"
                      onClick={() => openImage(mainPreviewImage)}
                      className="group block w-full cursor-pointer"
                      aria-label="Open image fullscreen"
                    >
                      <img
                        src={mainPreviewImage}
                        alt={project.imageAlt ?? project.title}
                        className={`h-full w-full object-cover transition duration-300 group-hover:scale-[1.02] ${
                          isMobile ? "max-h-[30vh]" : "max-h-[280px]"
                        }`}
                      />
                    </button>

                    {previewThumbnails.length > 0 ? (
                      <div className="grid grid-cols-3 gap-2 p-3">
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
                              className="h-16 w-full object-cover transition duration-300 group-hover:scale-105"
                            />
                          </button>
                        ))}
                      </div>
                    ) : null}

                    {isUiUxProject ? (
                      <div className="border-t border-purple-100/70 bg-white/75 p-2 text-xs leading-5 text-slate-600">
                        <p>
                          Quick preview: these images give a fast visual overview. Use Live Preview or View Design File to explore the complete screens and interaction flow.
                        </p>
                        <p dir="rtl" className="mt-1 text-right">
                          معاينة سريعة: الصور تعطي لمحة مختصرة عن الواجهات. لعرض الشاشات كاملة وتجربة طريقة التفاعل، استخدم أزرار Live Preview أو View Design File.
                        </p>
                      </div>
                    ) : null}
                  </div>
                ) : null}

                {/* قسم النصوص والأزرار */}
                <div className="space-y-2 text-slate-900">
                  <div className="space-y-1">
                    <p className="inline-flex rounded-full border border-purple-200/70 bg-purple-100/80 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-purple-700">
                      {project.category}
                    </p>
                    <h2 className="text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
                      {project.title}
                    </h2>
                  </div>

                  {project.tools && project.tools.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {project.tools.map((tool) => (
                        <span
                          key={tool}
                          className="inline-flex items-center rounded-full border border-purple-200/60 bg-purple-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-purple-700"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <div className="space-y-2">
                    <div className="rounded-[1.5rem] border border-purple-100/70 bg-white p-3 shadow-sm shadow-purple-100/20">
                      <p className="text-xs leading-6 text-slate-700">{project.description}</p>
                    </div>

                    {project.details?.en ? (
                      <div className="space-y-2 rounded-[1.5rem] border border-purple-100/70 bg-purple-50/80 p-3 shadow-sm shadow-purple-100/20">
                        <h3 className="text-xs font-semibold text-slate-950">English Summary</h3>
                        <p className="text-xs leading-6 text-slate-700">{project.details.en}</p>
                      </div>
                    ) : null}

                    {project.details?.ar ? (
                      <div className="space-y-2 rounded-[1.5rem] border border-purple-100/70 bg-purple-50/80 p-3 shadow-sm shadow-purple-100/20">
                        <h3 className="text-xs font-semibold text-slate-950">الشرح بالعربية</h3>
                        <p dir="rtl" className="text-xs leading-6 text-slate-700">{project.details.ar}</p>
                      </div>
                    ) : null}
                  </div>

                  {(project.prototypeLink || project.designFileLink || project.websiteLink) ? (
                    <>
                      <div className="grid gap-1 sm:grid-cols-2">
                        {project.websiteLink ? (
                          <a
                            href={project.websiteLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-full border border-purple-200/70 bg-purple-700 px-3 py-1.5 text-[10px] font-semibold text-white shadow-sm transition hover:bg-purple-800"
                          >
                            VIEW WEBSITE
                          </a>
                        ) : null}

                        {project.prototypeLink ? (
                          <a
                            href={project.prototypeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-full border border-purple-200/70 bg-white px-3 py-1.5 text-[10px] font-semibold text-purple-700 shadow-sm transition hover:bg-purple-50"
                          >
                            Live Preview
                          </a>
                        ) : null}

                        {project.designFileLink ? (
                          <a
                            href={project.designFileLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-full border border-purple-200/70 bg-white px-3 py-1.5 text-[10px] font-semibold text-purple-700 shadow-sm transition hover:bg-purple-50"
                          >
                            View Design File
                          </a>
                        ) : null}
                      </div>

                      {isUiUxProject && !hasVisualPreview ? (
                        <div className="rounded-[1.5rem] border border-purple-100/70 bg-purple-50/80 p-2 text-[10px] leading-5 text-slate-600">
                          <p>
                            Quick preview images will be added here for faster browsing. Use Live Preview or View Design File to explore the complete screens and interaction flow.
                          </p>
                          <p dir="rtl" className="mt-1 text-right">
                            ستتم إضافة صور معاينة سريعة هنا لتصفح أسرع. لعرض الشاشات كاملة وتجربة طريقة التفاعل، استخدم أزرار Live Preview أو View Design File.
                          </p>
                        </div>
                      ) : null}

                      <p className="mt-1 text-center text-[10px] text-slate-500">
                        اضغط خارج النافذة لإغلاقه, Click outside the window to close it.
                      </p>
                    </>
                  ) : null}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ImageModal - يظهر فوق الكل */}
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




// import { useEffect, useState } from "react";
// import { AnimatePresence, motion } from "motion/react";
// import { Sparkles } from "lucide-react";
// import { Project } from "../data/projectsData";
// import { ImageModal } from "./ImageModal";

// interface ProjectDetailsModalProps {
//   isOpen: boolean;
//   project: Project;
//   onClose: () => void;
// }

// export function ProjectDetailsModal({ isOpen, project, onClose }: ProjectDetailsModalProps) {
//   const [imageOpen, setImageOpen] = useState(false);
//   const previewImages = project.gallery ?? [];
//   const mainPreviewImage = project.imageSrc ?? previewImages[0] ?? "";
//   const allPreviewImages = Array.from(new Set([mainPreviewImage, ...previewImages].filter(Boolean)));
//   const previewThumbnails = allPreviewImages.filter((imageSrc) => imageSrc !== mainPreviewImage);
//   const [selectedImage, setSelectedImage] = useState(mainPreviewImage);
//   const hasVisualPreview = Boolean(mainPreviewImage);
//   const isUiUxProject = project.category.toLowerCase().includes("ui/ux");

//   // كشف الجوال
//   const [isMobile, setIsMobile] = useState(false);
//   useEffect(() => {
//     const mediaQuery = window.matchMedia("(max-width: 768px)");
//     const handleChange = () => setIsMobile(mediaQuery.matches);
//     handleChange();
//     mediaQuery.addEventListener("change", handleChange);
//     return () => mediaQuery.removeEventListener("change", handleChange);
//   }, []);

//   const openImage = (imageSrc: string) => {
//     setSelectedImage(imageSrc);
//     setImageOpen(true);
//   };

//   useEffect(() => {
//     if (!isOpen) return;

//     const originalOverflow = document.body.style.overflow;
//     document.body.style.overflow = "hidden";

//     const footer = document.querySelector("footer") as HTMLElement | null;
//     const originalFooterVisibility = footer?.style.visibility;
//     if (footer) {
//       footer.style.visibility = "hidden";
//     }

//     const nav = document.querySelector("nav") as HTMLElement | null;
//     const originalNavVisibility = nav?.style.visibility;
//     if (nav) {
//       nav.style.visibility = "hidden";
//     }

//     return () => {
//       document.body.style.overflow = originalOverflow || "";
//       if (footer) {
//         footer.style.visibility = originalFooterVisibility || "";
//       }
//       if (nav) {
//         nav.style.visibility = originalNavVisibility || "";
//       }
//     };
//   }, [isOpen]);

//   useEffect(() => {
//     setSelectedImage(mainPreviewImage);
//     setImageOpen(false);
//   }, [mainPreviewImage, project.id]);

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           {/* الخلفية (backdrop) - تختفي عند فتح الصورة */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: imageOpen ? 0 : 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.2 }}
//             className="fixed inset-0 z-40 bg-white/80 backdrop-blur-sm"
//           />

//           {/* النافذة المنبثقة - تختفي تماماً عند فتح الصورة */}
//           <motion.div
//             initial={isMobile ? { opacity: 0, y: 50 } : { opacity: 0, y: 20, scale: 0.96 }}
//             animate={
//               isMobile
//                 ? { opacity: imageOpen ? 0 : 1, y: imageOpen ? 30 : 0 }
//                 : { opacity: imageOpen ? 0 : 1, y: 0, scale: imageOpen ? 0.96 : 1 }
//             }
//             exit={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, y: 10, scale: 0.96 }}
//             transition={
//               isMobile
//                 ? { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
//                 : { duration: 0.3, ease: "easeOut" }
//             }
//             className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
//             onClick={onClose}
//             style={{ pointerEvents: imageOpen ? "none" : "auto" }}
//           >
//             <motion.div
//               onClick={(event) => event.stopPropagation()}
//               className={`relative w-full border border-purple-100/70 bg-white/95 shadow-2xl shadow-purple-100/30 ${
//                 isMobile
//                   ? "max-w-[92%] rounded-[1.5rem] max-h-[90vh] overflow-y-auto"
//                   : "max-w-8xl rounded-[2.5rem] overflow-hidden"
//               }`}
//             >
//               {/* الزينة الثابتة */}
//               <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(167,139,250,0.16),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(192,132,252,0.14),_transparent_22%)]" />
//               <div className="pointer-events-none absolute -left-20 top-14 h-40 w-40 rounded-full bg-purple-200/30 blur-3xl" />
//               <div className="pointer-events-none absolute -right-24 bottom-20 h-52 w-52 rounded-full bg-lavender-200/30 blur-3xl" />
//               <Sparkles className="pointer-events-none absolute left-8 top-8 h-5 w-5 text-purple-300" />
//               <motion.div
//                 animate={{ rotate: [0, 180, 360], y: [0, -5, 0] }}
//                 transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
//                 className="pointer-events-none absolute right-10 top-12 text-lavender-400"
//               >
//                 <Sparkles className="h-8 w-8" />
//               </motion.div>
//               <motion.div
//                 animate={{ rotate: [360, 180, 0], y: [0, 6, 0] }}
//                 transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
//                 className="pointer-events-none absolute bottom-8 left-10 text-purple-300"
//               >
//                 <Sparkles className="h-6 w-6" />
//               </motion.div>

//               {/* الشبكة الداخلية */}
//               <div
//                 className={`relative grid ${
//                   isMobile
//                     ? "grid-cols-1 gap-2 p-3"
//                     : "grid gap-3 p-4 lg:grid-cols-[1.2fr_0.95fr]"
//                 } sm:p-5`}
//                 style={{ maxHeight: isMobile ? "none" : "85vh" }}
//               >
//                 {/* قسم الصورة */}
//                 {hasVisualPreview ? (
//                   <div className="relative overflow-hidden rounded-[2rem] border border-purple-100/40 bg-purple-50/70 shadow-lg shadow-purple-100/20">
//                     <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-r from-purple-200/70 via-transparent to-transparent" />
//                     <button
//                       type="button"
//                       onClick={() => openImage(mainPreviewImage)}
//                       className="group block w-full cursor-pointer"
//                       aria-label="Open image fullscreen"
//                     >
//                       <img
//                         src={mainPreviewImage}
//                         alt={project.imageAlt ?? project.title}
//                         className={`h-full w-full object-cover transition duration-300 group-hover:scale-[1.02] ${
//                           isMobile ? "max-h-[30vh]" : "max-h-[280px]"
//                         }`}
//                       />
//                     </button>

//                     {previewThumbnails.length > 0 ? (
//                       <div className="grid grid-cols-3 gap-2 p-3">
//                         {previewThumbnails.map((imageSrc, index) => (
//                           <button
//                             key={`${imageSrc}-${index}`}
//                             type="button"
//                             onClick={() => openImage(imageSrc)}
//                             className="group overflow-hidden rounded-xl border border-white/70 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
//                             aria-label={`Open ${project.title} preview ${index + 1}`}
//                           >
//                             <img
//                               src={imageSrc}
//                               alt={`${project.title} preview ${index + 1}`}
//                               className="h-16 w-full object-cover transition duration-300 group-hover:scale-105"
//                             />
//                           </button>
//                         ))}
//                       </div>
//                     ) : null}

//                     {isUiUxProject ? (
//                       <div className="border-t border-purple-100/70 bg-white/75 p-2 text-xs leading-5 text-slate-600">
//                         <p>
//                           Quick preview: these images give a fast visual overview. Use Live Preview or View Design File to explore the complete screens and interaction flow.
//                         </p>
//                         <p dir="rtl" className="mt-1 text-right">
//                           معاينة سريعة: الصور تعطي لمحة مختصرة عن الواجهات. لعرض الشاشات كاملة وتجربة طريقة التفاعل، استخدم أزرار Live Preview أو View Design File.
//                         </p>
//                       </div>
//                     ) : null}
//                   </div>
//                 ) : null}

//                 {/* قسم النصوص والأزرار */}
//                 <div className="space-y-2 text-slate-900">
//                   <div className="space-y-1">
//                     <p className="inline-flex rounded-full border border-purple-200/70 bg-purple-100/80 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-purple-700">
//                       {project.category}
//                     </p>
//                     <h2 className="text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
//                       {project.title}
//                     </h2>
//                   </div>

//                   {project.tools && project.tools.length > 0 ? (
//                     <div className="flex flex-wrap gap-1">
//                       {project.tools.map((tool) => (
//                         <span
//                           key={tool}
//                           className="inline-flex items-center rounded-full border border-purple-200/60 bg-purple-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-purple-700"
//                         >
//                           {tool}
//                         </span>
//                       ))}
//                     </div>
//                   ) : null}

//                   <div className="space-y-2">
//                     <div className="rounded-[1.5rem] border border-purple-100/70 bg-white p-3 shadow-sm shadow-purple-100/20">
//                       <p className="text-xs leading-6 text-slate-700">{project.description}</p>
//                     </div>

//                     {project.details?.en ? (
//                       <div className="space-y-2 rounded-[1.5rem] border border-purple-100/70 bg-purple-50/80 p-3 shadow-sm shadow-purple-100/20">
//                         <h3 className="text-xs font-semibold text-slate-950">English Summary</h3>
//                         <p className="text-xs leading-6 text-slate-700">{project.details.en}</p>
//                       </div>
//                     ) : null}

//                     {project.details?.ar ? (
//                       <div className="space-y-2 rounded-[1.5rem] border border-purple-100/70 bg-purple-50/80 p-3 shadow-sm shadow-purple-100/20">
//                         <h3 className="text-xs font-semibold text-slate-950">الشرح بالعربية</h3>
//                         <p dir="rtl" className="text-xs leading-6 text-slate-700">{project.details.ar}</p>
//                       </div>
//                     ) : null}
//                   </div>

//                   {(project.prototypeLink || project.designFileLink || project.websiteLink) ? (
//                     <>
//                       <div className="grid gap-1 sm:grid-cols-2">
//                         {project.websiteLink ? (
//                           <a
//                             href={project.websiteLink}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="inline-flex items-center justify-center rounded-full border border-purple-200/70 bg-purple-700 px-3 py-1.5 text-[10px] font-semibold text-white shadow-sm transition hover:bg-purple-800"
//                           >
//                             VIEW WEBSITE
//                           </a>
//                         ) : null}

//                         {project.prototypeLink ? (
//                           <a
//                             href={project.prototypeLink}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="inline-flex items-center justify-center rounded-full border border-purple-200/70 bg-white px-3 py-1.5 text-[10px] font-semibold text-purple-700 shadow-sm transition hover:bg-purple-50"
//                           >
//                             Live Preview
//                           </a>
//                         ) : null}

//                         {project.designFileLink ? (
//                           <a
//                             href={project.designFileLink}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="inline-flex items-center justify-center rounded-full border border-purple-200/70 bg-white px-3 py-1.5 text-[10px] font-semibold text-purple-700 shadow-sm transition hover:bg-purple-50"
//                           >
//                             View Design File
//                           </a>
//                         ) : null}
//                       </div>

//                       {isUiUxProject && !hasVisualPreview ? (
//                         <div className="rounded-[1.5rem] border border-purple-100/70 bg-purple-50/80 p-2 text-[10px] leading-5 text-slate-600">
//                           <p>
//                             Quick preview images will be added here for faster browsing. Use Live Preview or View Design File to explore the complete screens and interaction flow.
//                           </p>
//                           <p dir="rtl" className="mt-1 text-right">
//                             ستتم إضافة صور معاينة سريعة هنا لتصفح أسرع. لعرض الشاشات كاملة وتجربة طريقة التفاعل، استخدم أزرار Live Preview أو View Design File.
//                           </p>
//                         </div>
//                       ) : null}

//                       <p className="mt-1 text-center text-[10px] text-slate-500">
//                         اضغط خارج النافذة لإغلاقه, Click outside the window to close it.
//                       </p>
//                     </>
//                   ) : null}
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>

//           {/* ImageModal - يظهر فوق الكل */}
//           <ImageModal
//             isOpen={imageOpen}
//             imageSrc={selectedImage}
//             imageAlt={project.imageAlt ?? project.title}
//             images={allPreviewImages}
//             onClose={() => setImageOpen(false)}
//           />
//         </>
//       )}
//     </AnimatePresence>
//   );
// }





// import { useEffect, useState } from "react";
// import { AnimatePresence, motion } from "motion/react";
// import { Sparkles } from "lucide-react";
// import { Project } from "../data/projectsData";
// import { ImageModal } from "./ImageModal";

// interface ProjectDetailsModalProps {
//   isOpen: boolean;
//   project: Project;
//   onClose: () => void;
// }

// export function ProjectDetailsModal({ isOpen, project, onClose }: ProjectDetailsModalProps) {
//   const [imageOpen, setImageOpen] = useState(false);
//   const previewImages = project.gallery ?? [];
//   const mainPreviewImage = project.imageSrc ?? previewImages[0] ?? "";
//   const allPreviewImages = Array.from(new Set([mainPreviewImage, ...previewImages].filter(Boolean)));
//   const previewThumbnails = allPreviewImages.filter((imageSrc) => imageSrc !== mainPreviewImage);
//   const [selectedImage, setSelectedImage] = useState(mainPreviewImage);
//   const hasVisualPreview = Boolean(mainPreviewImage);
//   const isUiUxProject = project.category.toLowerCase().includes("ui/ux");

//   // كشف الجوال
//   const [isMobile, setIsMobile] = useState(false);
//   useEffect(() => {
//     const mediaQuery = window.matchMedia("(max-width: 768px)");
//     const handleChange = () => setIsMobile(mediaQuery.matches);
//     handleChange();
//     mediaQuery.addEventListener("change", handleChange);
//     return () => mediaQuery.removeEventListener("change", handleChange);
//   }, []);

//   const openImage = (imageSrc: string) => {
//     setSelectedImage(imageSrc);
//     setImageOpen(true);
//   };

//   useEffect(() => {
//     if (!isOpen) return;

//     const originalOverflow = document.body.style.overflow;
//     document.body.style.overflow = "hidden";

//     const footer = document.querySelector("footer") as HTMLElement | null;
//     const originalFooterVisibility = footer?.style.visibility;
//     if (footer) {
//       footer.style.visibility = "hidden";
//     }

//     const nav = document.querySelector("nav") as HTMLElement | null;
//     const originalNavVisibility = nav?.style.visibility;
//     if (nav) {
//       nav.style.visibility = "hidden";
//     }

//     return () => {
//       document.body.style.overflow = originalOverflow || "";
//       if (footer) {
//         footer.style.visibility = originalFooterVisibility || "";
//       }
//       if (nav) {
//         nav.style.visibility = originalNavVisibility || "";
//       }
//     };
//   }, [isOpen]);

//   useEffect(() => {
//     setSelectedImage(mainPreviewImage);
//     setImageOpen(false);
//   }, [mainPreviewImage, project.id]);

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.2 }}
//             className="fixed inset-0 z-40 bg-white/80 backdrop-blur-sm"
//           />

//           <motion.div
//             initial={isMobile ? { opacity: 0, y: 50 } : { opacity: 0, y: 20, scale: 0.96 }}
//             animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, scale: 1 }}
//             exit={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, y: 10, scale: 0.96 }}
//             transition={
//               isMobile
//                 ? { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
//                 : { duration: 0.3, ease: "easeOut" }
//             }
//             className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
//             onClick={onClose}
//           >
//             <motion.div
//               onClick={(event) => event.stopPropagation()}
//               className={`relative w-full border border-purple-100/70 bg-white/95 shadow-2xl shadow-purple-100/30 ${
//                 isMobile
//                   ? "max-w-[92%] rounded-[1.5rem] max-h-[90vh] overflow-y-auto"
//                   : "max-w-6xl rounded-[2.5rem] overflow-hidden" // عرض كبير (6xl)
//               }`}
//             >
//               {/* الزينة الثابتة */}
//               <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(167,139,250,0.16),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(192,132,252,0.14),_transparent_22%)]" />
//               <div className="pointer-events-none absolute -left-20 top-14 h-40 w-40 rounded-full bg-purple-200/30 blur-3xl" />
//               <div className="pointer-events-none absolute -right-24 bottom-20 h-52 w-52 rounded-full bg-lavender-200/30 blur-3xl" />
//               <Sparkles className="pointer-events-none absolute left-8 top-8 h-5 w-5 text-purple-300" />
//               <motion.div
//                 animate={{ rotate: [0, 180, 360], y: [0, -5, 0] }}
//                 transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
//                 className="pointer-events-none absolute right-10 top-12 text-lavender-400"
//               >
//                 <Sparkles className="h-8 w-8" />
//               </motion.div>
//               <motion.div
//                 animate={{ rotate: [360, 180, 0], y: [0, 6, 0] }}
//                 transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
//                 className="pointer-events-none absolute bottom-8 left-10 text-purple-300"
//               >
//                 <Sparkles className="h-6 w-6" />
//               </motion.div>

//               {/* الشبكة الداخلية - ارتفاع محدود ومسافات صغيرة جداً */}
//               <div
//                 className={`relative grid ${
//                   isMobile
//                     ? "grid-cols-1 gap-2 p-3"
//                     : "grid gap-3 p-4 lg:grid-cols-[1.2fr_0.95fr]" // 🔥 مسافات صغيرة جداً
//                 } sm:p-5`} // 🔥 sm:p-5 بدلاً من sm:p-8
//                 style={{ maxHeight: isMobile ? "none" : "75vh" }} // 🔥 ارتفاع أقصى 75% من الشاشة
//               >
//                 {/* قسم الصورة */}
//                 {hasVisualPreview ? (
//                   <div className="relative overflow-hidden rounded-[2rem] border border-purple-100/40 bg-purple-50/70 shadow-lg shadow-purple-100/20">
//                     <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-r from-purple-200/70 via-transparent to-transparent" /> {/* 🔥 h-24 → h-16 */}
//                     <button
//                       type="button"
//                       onClick={() => openImage(mainPreviewImage)}
//                       className="group block w-full cursor-pointer"
//                       aria-label="Open image fullscreen"
//                     >
//                       <img
//                         src={mainPreviewImage}
//                         alt={project.imageAlt ?? project.title}
//                         className={`h-full w-full object-cover transition duration-300 group-hover:scale-[1.02] ${
//                           isMobile ? "max-h-[30vh]" : "max-h-[280px]" // 🔥 400px → 280px (أصغر)
//                         }`}
//                       />
//                     </button>

//                     {previewThumbnails.length > 0 ? (
//                       <div className="grid grid-cols-3 gap-2 p-3"> {/* 🔥 grid-cols-2 → 3, gap-3 → 2, p-4 → p-3 */}
//                         {previewThumbnails.map((imageSrc, index) => (
//                           <button
//                             key={`${imageSrc}-${index}`}
//                             type="button"
//                             onClick={() => openImage(imageSrc)}
//                             className="group overflow-hidden rounded-xl border border-white/70 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
//                             aria-label={`Open ${project.title} preview ${index + 1}`}
//                           >
//                             <img
//                               src={imageSrc}
//                               alt={`${project.title} preview ${index + 1}`}
//                               className="h-16 w-full object-cover transition duration-300 group-hover:scale-105" // 🔥 h-24 → h-16
//                             />
//                           </button>
//                         ))}
//                       </div>
//                     ) : null}

//                     {isUiUxProject ? (
//                       <div className="border-t border-purple-100/70 bg-white/75 p-2 text-xs leading-5 text-slate-600"> {/* 🔥 p-4 text-sm → p-2 text-xs */}
//                         <p>
//                           Quick preview: these images give a fast visual overview. Use Live Preview or View Design File to explore the complete screens and interaction flow.
//                         </p>
//                         <p dir="rtl" className="mt-1 text-right"> {/* 🔥 mt-2 → mt-1 */}
//                           معاينة سريعة: الصور تعطي لمحة مختصرة عن الواجهات. لعرض الشاشات كاملة وتجربة طريقة التفاعل، استخدم أزرار Live Preview أو View Design File.
//                         </p>
//                       </div>
//                     ) : null}
//                   </div>
//                 ) : null}

//                 {/* قسم النصوص والأزرار - تصغير كل شيء */}
//                 <div className="space-y-2 text-slate-900"> {/* 🔥 space-y-4 → space-y-2 */}
//                   <div className="space-y-1"> {/* 🔥 space-y-3 → space-y-1 */}
//                     <p className="inline-flex rounded-full border border-purple-200/70 bg-purple-100/80 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-purple-700"> {/* 🔥 px-4 py-2 text-xs → px-3 py-1 text-[10px] */}
//                       {project.category}
//                     </p>
//                     <h2 className="text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl"> {/* 🔥 text-2xl/sm:text-3xl → text-xl/sm:text-2xl */}
//                       {project.title}
//                     </h2>
//                   </div>

//                   {project.tools && project.tools.length > 0 ? (
//                     <div className="flex flex-wrap gap-1"> {/* 🔥 gap-2 → gap-1 */}
//                       {project.tools.map((tool) => (
//                         <span
//                           key={tool}
//                           className="inline-flex items-center rounded-full border border-purple-200/60 bg-purple-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-purple-700" // 🔥 px-3 py-1 text-xs → px-2 py-0.5 text-[10px]
//                         >
//                           {tool}
//                         </span>
//                       ))}
//                     </div>
//                   ) : null}

//                   <div className="space-y-2"> {/* 🔥 space-y-4 → space-y-2 */}
//                     <div className="rounded-[1.5rem] border border-purple-100/70 bg-white p-3 shadow-sm shadow-purple-100/20"> {/* 🔥 rounded-[2rem] p-4 → rounded-[1.5rem] p-3 */}
//                       <p className="text-xs leading-6 text-slate-700">{project.description}</p> {/* 🔥 text-sm → text-xs */}
//                     </div>

//                     {project.details?.en ? (
//                       <div className="space-y-2 rounded-[1.5rem] border border-purple-100/70 bg-purple-50/80 p-3 shadow-sm shadow-purple-100/20"> {/* 🔥 p-4 → p-3 */}
//                         <h3 className="text-xs font-semibold text-slate-950">English Summary</h3> {/* 🔥 text-base → text-xs */}
//                         <p className="text-xs leading-6 text-slate-700">{project.details.en}</p> {/* 🔥 text-sm → text-xs */}
//                       </div>
//                     ) : null}

//                     {project.details?.ar ? (
//                       <div className="space-y-2 rounded-[1.5rem] border border-purple-100/70 bg-purple-50/80 p-3 shadow-sm shadow-purple-100/20"> {/* 🔥 p-4 → p-3 */}
//                         <h3 className="text-xs font-semibold text-slate-950">الشرح بالعربية</h3> {/* 🔥 text-base → text-xs */}
//                         <p dir="rtl" className="text-xs leading-6 text-slate-700">{project.details.ar}</p> {/* 🔥 text-sm → text-xs */}
//                       </div>
//                     ) : null}
//                   </div>

//                   {(project.prototypeLink || project.designFileLink || project.websiteLink) ? (
//                     <>
//                       <div className="grid gap-1 sm:grid-cols-2"> {/* 🔥 gap-2 → gap-1 */}
//                         {project.websiteLink ? (
//                           <a
//                             href={project.websiteLink}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="inline-flex items-center justify-center rounded-full border border-purple-200/70 bg-purple-700 px-3 py-1.5 text-[10px] font-semibold text-white shadow-sm transition hover:bg-purple-800" // 🔥 px-4 py-2 text-xs → px-3 py-1.5 text-[10px]
//                           >
//                             VIEW WEBSITE
//                           </a>
//                         ) : null}

//                         {project.prototypeLink ? (
//                           <a
//                             href={project.prototypeLink}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="inline-flex items-center justify-center rounded-full border border-purple-200/70 bg-white px-3 py-1.5 text-[10px] font-semibold text-purple-700 shadow-sm transition hover:bg-purple-50" // 🔥 px-4 py-2 text-xs → px-3 py-1.5 text-[10px]
//                           >
//                             Live Preview
//                           </a>
//                         ) : null}

//                         {project.designFileLink ? (
//                           <a
//                             href={project.designFileLink}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="inline-flex items-center justify-center rounded-full border border-purple-200/70 bg-white px-3 py-1.5 text-[10px] font-semibold text-purple-700 shadow-sm transition hover:bg-purple-50" // 🔥 px-4 py-2 text-xs → px-3 py-1.5 text-[10px]
//                           >
//                             View Design File
//                           </a>
//                         ) : null}
//                       </div>

//                       {isUiUxProject && !hasVisualPreview ? (
//                         <div className="rounded-[1.5rem] border border-purple-100/70 bg-purple-50/80 p-2 text-[10px] leading-5 text-slate-600"> {/* 🔥 p-3 text-sm → p-2 text-[10px] */}
//                           <p>
//                             Quick preview images will be added here for faster browsing. Use Live Preview or View Design File to explore the complete screens and interaction flow.
//                           </p>
//                           <p dir="rtl" className="mt-1 text-right"> {/* 🔥 mt-2 → mt-1 */}
//                             ستتم إضافة صور معاينة سريعة هنا لتصفح أسرع. لعرض الشاشات كاملة وتجربة طريقة التفاعل، استخدم أزرار Live Preview أو View Design File.
//                           </p>
//                         </div>
//                       ) : null}

//                       <p className="mt-1 text-center text-[10px] text-slate-500"> {/* 🔥 mt-2 text-xs → mt-1 text-[10px] */}
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
//             imageSrc={selectedImage}
//             imageAlt={project.imageAlt ?? project.title}
//             images={allPreviewImages}
//             onClose={() => setImageOpen(false)}
//           />
//         </>
//       )}
//     </AnimatePresence>
//   );
// }




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


// import { useEffect, useState } from "react";
// import { AnimatePresence, motion } from "motion/react";
// import { Sparkles } from "lucide-react";
// import { Project } from "../data/projectsData";
// import { ImageModal } from "./ImageModal";

// interface ProjectDetailsModalProps {
//   isOpen: boolean;
//   project: Project;
//   onClose: () => void;
// }

// export function ProjectDetailsModal({ isOpen, project, onClose }: ProjectDetailsModalProps) {
//   const [imageOpen, setImageOpen] = useState(false);
//   const previewImages = project.gallery ?? [];
//   const mainPreviewImage = project.imageSrc ?? previewImages[0] ?? "";
//   const allPreviewImages = Array.from(new Set([mainPreviewImage, ...previewImages].filter(Boolean)));
//   const previewThumbnails = allPreviewImages.filter((imageSrc) => imageSrc !== mainPreviewImage);
//   const [selectedImage, setSelectedImage] = useState(mainPreviewImage);
//   const hasVisualPreview = Boolean(mainPreviewImage);
//   const isUiUxProject = project.category.toLowerCase().includes("ui/ux");

//   const openImage = (imageSrc: string) => {
//     setSelectedImage(imageSrc);
//     setImageOpen(true);
//   };

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

//   useEffect(() => {
//     setSelectedImage(mainPreviewImage);
//     setImageOpen(false);
//   }, [mainPreviewImage, project.id]);

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
//               <Sparkles className="pointer-events-none absolute left-8 top-8 h-5 w-5 text-purple-300" />
//               <motion.div
//                 animate={{ rotate: [0, 180, 360], y: [0, -5, 0] }}
//                 transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
//                 className="pointer-events-none absolute right-10 top-12 text-lavender-400"
//               >
//                 <Sparkles className="h-8 w-8" />
//               </motion.div>
//               <motion.div
//                 animate={{ rotate: [360, 180, 0], y: [0, 6, 0] }}
//                 transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
//                 className="pointer-events-none absolute bottom-8 left-10 text-purple-300"
//               >
//                 <Sparkles className="h-6 w-6" />
//               </motion.div>

//               <div className="relative grid gap-6 lg:grid-cols-[1.2fr_0.95fr] p-6 sm:p-8">

//                 {hasVisualPreview ? (
//                   <div className="relative overflow-hidden rounded-[2rem] border border-purple-100/40 bg-purple-50/70 shadow-lg shadow-purple-100/20">

//                     <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-purple-200/70 via-transparent to-transparent" />

//                     <button
//                       type="button"
//                       onClick={() => openImage(mainPreviewImage)}
//                       className="group block w-full cursor-pointer"
//                       aria-label="Open image fullscreen"
//                     >
//                       <img
//                         src={mainPreviewImage}
//                         alt={project.imageAlt ?? project.title}
//                         className="h-full w-full max-h-[560px] object-cover transition duration-300 group-hover:scale-[1.02]"
//                       />
//                     </button>

//                     {previewThumbnails.length > 0 ? (
//                       <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3">
//                         {previewThumbnails.map((imageSrc, index) => (
//                           <button
//                             key={`${imageSrc}-${index}`}
//                             type="button"
//                             onClick={() => openImage(imageSrc)}
//                             className="group overflow-hidden rounded-xl border border-white/70 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
//                             aria-label={`Open ${project.title} preview ${index + 1}`}
//                           >
//                             <img
//                               src={imageSrc}
//                               alt={`${project.title} preview ${index + 1}`}
//                               className="h-24 w-full object-cover transition duration-300 group-hover:scale-105"
//                             />
//                           </button>
//                         ))}
//                       </div>
//                     ) : null}

//                     {isUiUxProject ? (
//                       <div className="border-t border-purple-100/70 bg-white/75 p-4 text-sm leading-6 text-slate-600">
//                         <p>
//                           Quick preview: these images give a fast visual overview. Use Live Preview or View Design File to explore the complete screens and interaction flow.
//                         </p>
//                         <p dir="rtl" className="mt-2 text-right">
//                           معاينة سريعة: الصور تعطي لمحة مختصرة عن الواجهات. لعرض الشاشات كاملة وتجربة طريقة التفاعل، استخدم أزرار Live Preview أو View Design File.
//                         </p>
//                       </div>
//                     ) : null}

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

//                       {isUiUxProject && !hasVisualPreview ? (
//                         <div className="rounded-[1.5rem] border border-purple-100/70 bg-purple-50/80 p-4 text-sm leading-6 text-slate-600">
//                           <p>
//                             Quick preview images will be added here for faster browsing. Use Live Preview or View Design File to explore the complete screens and interaction flow.
//                           </p>
//                           <p dir="rtl" className="mt-2 text-right">
//                             ستتم إضافة صور معاينة سريعة هنا لتصفح أسرع. لعرض الشاشات كاملة وتجربة طريقة التفاعل، استخدم أزرار Live Preview أو View Design File.
//                           </p>
//                         </div>
//                       ) : null}

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
//             imageSrc={selectedImage}
//             imageAlt={project.imageAlt ?? project.title}
//             images={allPreviewImages}
//             onClose={() => setImageOpen(false)}
//           />
//         </>
//       )}
//     </AnimatePresence>
//   );
// }




// import { useEffect, useState } from "react";
// import { AnimatePresence, motion } from "motion/react";
// import { Sparkles } from "lucide-react";
// import { Project } from "../data/projectsData";
// import { ImageModal } from "./ImageModal";

// interface ProjectDetailsModalProps {
//   isOpen: boolean;
//   project: Project;
//   onClose: () => void;
// }

// export function ProjectDetailsModal({ isOpen, project, onClose }: ProjectDetailsModalProps) {
//   const [imageOpen, setImageOpen] = useState(false);
//   const previewImages = project.gallery ?? [];
//   const mainPreviewImage = project.imageSrc ?? previewImages[0] ?? "";
//   const allPreviewImages = Array.from(new Set([mainPreviewImage, ...previewImages].filter(Boolean)));
//   const previewThumbnails = allPreviewImages.filter((imageSrc) => imageSrc !== mainPreviewImage);
//   const [selectedImage, setSelectedImage] = useState(mainPreviewImage);
//   const hasVisualPreview = Boolean(mainPreviewImage);
//   const isUiUxProject = project.category.toLowerCase().includes("ui/ux");

//   // 👇 كشف حجم الشاشة (جوال أو كمبيوتر)
//   const [isMobile, setIsMobile] = useState(false);
//   useEffect(() => {
//     const mediaQuery = window.matchMedia("(max-width: 768px)");
//     const handleChange = () => setIsMobile(mediaQuery.matches);
//     handleChange();
//     mediaQuery.addEventListener("change", handleChange);
//     return () => mediaQuery.removeEventListener("change", handleChange);
//   }, []);

//   const openImage = (imageSrc: string) => {
//     setSelectedImage(imageSrc);
//     setImageOpen(true);
//   };

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

//   useEffect(() => {
//     setSelectedImage(mainPreviewImage);
//     setImageOpen(false);
//   }, [mainPreviewImage, project.id]);

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

//           {/* 👇 حركة الظهور المعدلة (سمووث للجوال) */}
//           <motion.div
//             initial={isMobile ? { opacity: 0, y: 50 } : { opacity: 0, y: 20, scale: 0.96 }}
//             animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, scale: 1 }}
//             exit={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, y: 10, scale: 0.96 }}
//             transition={
//               isMobile
//                 ? { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } // حركة ناعمة جداً
//                 : { duration: 0.3, ease: "easeOut" }
//             }
//             className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
//             onClick={onClose}
//           >
//             {/* 👇 النافذة الداخلية (عرض وحواف وتمرير حسب الجهاز) */}
//             <motion.div
//               onClick={(event) => event.stopPropagation()}
//               className={`relative w-full border border-purple-100/70 bg-white/95 shadow-2xl shadow-purple-100/30 ${
//                 isMobile
//                   ? "max-w-[95%] rounded-[1.5rem] max-h-[90vh] overflow-y-auto"
//                   : "max-w-6xl rounded-[2.5rem] overflow-hidden"
//               }`}
//             >
//               {/* الزينة الثابتة (التدرجات و Sparkles) */}
//               <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(167,139,250,0.16),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(192,132,252,0.14),_transparent_22%)]" />
//               <div className="pointer-events-none absolute -left-20 top-14 h-40 w-40 rounded-full bg-purple-200/30 blur-3xl" />
//               <div className="pointer-events-none absolute -right-24 bottom-20 h-52 w-52 rounded-full bg-lavender-200/30 blur-3xl" />
//               <Sparkles className="pointer-events-none absolute left-8 top-8 h-5 w-5 text-purple-300" />
//               <motion.div
//                 animate={{ rotate: [0, 180, 360], y: [0, -5, 0] }}
//                 transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
//                 className="pointer-events-none absolute right-10 top-12 text-lavender-400"
//               >
//                 <Sparkles className="h-8 w-8" />
//               </motion.div>
//               <motion.div
//                 animate={{ rotate: [360, 180, 0], y: [0, 6, 0] }}
//                 transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
//                 className="pointer-events-none absolute bottom-8 left-10 text-purple-300"
//               >
//                 <Sparkles className="h-6 w-6" />
//               </motion.div>

//               {/* 👇 الشبكة الداخلية (ترتيب الأعمدة والمسافات) */}
//               <div
//                 className={`relative grid ${
//                   isMobile
//                     ? "grid-cols-1 gap-4 p-4"
//                     : "grid gap-6 p-6 lg:grid-cols-[1.2fr_0.95fr]"
//                 } sm:p-8`}
//               >
//                 {/* قسم الصورة والمعرض */}
//                 {hasVisualPreview ? (
//                   <div className="relative overflow-hidden rounded-[2rem] border border-purple-100/40 bg-purple-50/70 shadow-lg shadow-purple-100/20">
//                     <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-purple-200/70 via-transparent to-transparent" />

//                     <button
//                       type="button"
//                       onClick={() => openImage(mainPreviewImage)}
//                       className="group block w-full cursor-pointer"
//                       aria-label="Open image fullscreen"
//                     >
//                       <img
//                         src={mainPreviewImage}
//                         alt={project.imageAlt ?? project.title}
//                         className={`h-full w-full object-cover transition duration-300 group-hover:scale-[1.02] ${
//                           isMobile ? "max-h-[40vh]" : "max-h-[560px]"
//                         }`}
//                       />
//                     </button>

//                     {previewThumbnails.length > 0 ? (
//                       <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3">
//                         {previewThumbnails.map((imageSrc, index) => (
//                           <button
//                             key={`${imageSrc}-${index}`}
//                             type="button"
//                             onClick={() => openImage(imageSrc)}
//                             className="group overflow-hidden rounded-xl border border-white/70 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
//                             aria-label={`Open ${project.title} preview ${index + 1}`}
//                           >
//                             <img
//                               src={imageSrc}
//                               alt={`${project.title} preview ${index + 1}`}
//                               className="h-24 w-full object-cover transition duration-300 group-hover:scale-105"
//                             />
//                           </button>
//                         ))}
//                       </div>
//                     ) : null}

//                     {isUiUxProject ? (
//                       <div className="border-t border-purple-100/70 bg-white/75 p-4 text-sm leading-6 text-slate-600">
//                         <p>
//                           Quick preview: these images give a fast visual overview. Use Live Preview or View Design File to explore the complete screens and interaction flow.
//                         </p>
//                         <p dir="rtl" className="mt-2 text-right">
//                           معاينة سريعة: الصور تعطي لمحة مختصرة عن الواجهات. لعرض الشاشات كاملة وتجربة طريقة التفاعل، استخدم أزرار Live Preview أو View Design File.
//                         </p>
//                       </div>
//                     ) : null}
//                   </div>
//                 ) : null}

//                 {/* 👇 قسم المحتوى النصي والأزرار (لم يتغير نهائياً) */}
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

//                       {isUiUxProject && !hasVisualPreview ? (
//                         <div className="rounded-[1.5rem] border border-purple-100/70 bg-purple-50/80 p-4 text-sm leading-6 text-slate-600">
//                           <p>
//                             Quick preview images will be added here for faster browsing. Use Live Preview or View Design File to explore the complete screens and interaction flow.
//                           </p>
//                           <p dir="rtl" className="mt-2 text-right">
//                             ستتم إضافة صور معاينة سريعة هنا لتصفح أسرع. لعرض الشاشات كاملة وتجربة طريقة التفاعل، استخدم أزرار Live Preview أو View Design File.
//                           </p>
//                         </div>
//                       ) : null}

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
//             imageSrc={selectedImage}
//             imageAlt={project.imageAlt ?? project.title}
//             images={allPreviewImages}
//             onClose={() => setImageOpen(false)}
//           />
//         </>
//       )}
//     </AnimatePresence>
//   );
// }




// import { useEffect, useState } from "react";
// import { AnimatePresence, motion } from "motion/react";
// import { Sparkles } from "lucide-react";
// import { Project } from "../data/projectsData";
// import { ImageModal } from "./ImageModal";

// interface ProjectDetailsModalProps {
//   isOpen: boolean;
//   project: Project;
//   onClose: () => void;
// }

// export function ProjectDetailsModal({ isOpen, project, onClose }: ProjectDetailsModalProps) {
//   const [imageOpen, setImageOpen] = useState(false);
//   const previewImages = project.gallery ?? [];
//   const mainPreviewImage = project.imageSrc ?? previewImages[0] ?? "";
//   const allPreviewImages = Array.from(new Set([mainPreviewImage, ...previewImages].filter(Boolean)));
//   const previewThumbnails = allPreviewImages.filter((imageSrc) => imageSrc !== mainPreviewImage);
//   const [selectedImage, setSelectedImage] = useState(mainPreviewImage);
//   const hasVisualPreview = Boolean(mainPreviewImage);
//   const isUiUxProject = project.category.toLowerCase().includes("ui/ux");

//   // كشف الجوال
//   const [isMobile, setIsMobile] = useState(false);
//   useEffect(() => {
//     const mediaQuery = window.matchMedia("(max-width: 768px)");
//     const handleChange = () => setIsMobile(mediaQuery.matches);
//     handleChange();
//     mediaQuery.addEventListener("change", handleChange);
//     return () => mediaQuery.removeEventListener("change", handleChange);
//   }, []);

//   const openImage = (imageSrc: string) => {
//     setSelectedImage(imageSrc);
//     setImageOpen(true);
//   };

//   useEffect(() => {
//     if (!isOpen) return;

//     // منع التمرير في الخلفية
//     const originalOverflow = document.body.style.overflow;
//     document.body.style.overflow = "hidden";

//     // إخفاء الفوتر
//     const footer = document.querySelector("footer") as HTMLElement | null;
//     const originalFooterVisibility = footer?.style.visibility;
//     if (footer) {
//       footer.style.visibility = "hidden";
//     }

//     // إخفاء شريط التنقل (Navigation)
//     const nav = document.querySelector("nav") as HTMLElement | null;
//     const originalNavVisibility = nav?.style.visibility;
//     if (nav) {
//       nav.style.visibility = "hidden";
//     }

//     return () => {
//       document.body.style.overflow = originalOverflow || "";
//       if (footer) {
//         footer.style.visibility = originalFooterVisibility || "";
//       }
//       if (nav) {
//         nav.style.visibility = originalNavVisibility || "";
//       }
//     };
//   }, [isOpen]);

//   useEffect(() => {
//     setSelectedImage(mainPreviewImage);
//     setImageOpen(false);
//   }, [mainPreviewImage, project.id]);

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.2 }}
//             className="fixed inset-0 z-40 bg-white/80 backdrop-blur-sm"
//           />

//           <motion.div
//             initial={isMobile ? { opacity: 0, y: 50 } : { opacity: 0, y: 20, scale: 0.96 }}
//             animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, scale: 1 }}
//             exit={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, y: 10, scale: 0.96 }}
//             transition={
//               isMobile
//                 ? { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
//                 : { duration: 0.3, ease: "easeOut" }
//             }
//             className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
//             onClick={onClose}
//           >
//             <motion.div
//               onClick={(event) => event.stopPropagation()}
//               className={`relative w-full border border-purple-100/70 bg-white/95 shadow-2xl shadow-purple-100/30 ${
//                 isMobile
//                   ? "max-w-[92%] rounded-[1.5rem] max-h-[90vh] overflow-y-auto"
//                   : "max-w-5xl rounded-[2.5rem] overflow-hidden" // تم التغيير من max-w-6xl إلى max-w-5xl
//               }`}
//             >
//               {/* الزينة الثابتة */}
//               <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(167,139,250,0.16),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(192,132,252,0.14),_transparent_22%)]" />
//               <div className="pointer-events-none absolute -left-20 top-14 h-40 w-40 rounded-full bg-purple-200/30 blur-3xl" />
//               <div className="pointer-events-none absolute -right-24 bottom-20 h-52 w-52 rounded-full bg-lavender-200/30 blur-3xl" />
//               <Sparkles className="pointer-events-none absolute left-8 top-8 h-5 w-5 text-purple-300" />
//               <motion.div
//                 animate={{ rotate: [0, 180, 360], y: [0, -5, 0] }}
//                 transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
//                 className="pointer-events-none absolute right-10 top-12 text-lavender-400"
//               >
//                 <Sparkles className="h-8 w-8" />
//               </motion.div>
//               <motion.div
//                 animate={{ rotate: [360, 180, 0], y: [0, 6, 0] }}
//                 transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
//                 className="pointer-events-none absolute bottom-8 left-10 text-purple-300"
//               >
//                 <Sparkles className="h-6 w-6" />
//               </motion.div>

//               {/* الشبكة الداخلية (تصغير المسافات على الجوال والكمبيوتر قليلاً) */}
//               <div
//                 className={`relative grid ${
//                   isMobile
//                     ? "grid-cols-1 gap-3 p-3"
//                     : "grid gap-5 p-5 lg:grid-cols-[1.2fr_0.95fr]" // تم تغيير p-6 إلى p-5 و gap-6 إلى gap-5
//                 } sm:p-8`}
//               >
//                 {/* قسم الصورة */}
//                 {hasVisualPreview ? (
//                   <div className="relative overflow-hidden rounded-[2rem] border border-purple-100/40 bg-purple-50/70 shadow-lg shadow-purple-100/20">
//                     <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-purple-200/70 via-transparent to-transparent" />
//                     <button
//                       type="button"
//                       onClick={() => openImage(mainPreviewImage)}
//                       className="group block w-full cursor-pointer"
//                       aria-label="Open image fullscreen"
//                     >
//                       <img
//                         src={mainPreviewImage}
//                         alt={project.imageAlt ?? project.title}
//                         className={`h-full w-full object-cover transition duration-300 group-hover:scale-[1.02] ${
//                           isMobile ? "max-h-[35vh]" : "max-h-[560px]"
//                         }`}
//                       />
//                     </button>

//                     {previewThumbnails.length > 0 ? (
//                       <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3">
//                         {previewThumbnails.map((imageSrc, index) => (
//                           <button
//                             key={`${imageSrc}-${index}`}
//                             type="button"
//                             onClick={() => openImage(imageSrc)}
//                             className="group overflow-hidden rounded-xl border border-white/70 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
//                             aria-label={`Open ${project.title} preview ${index + 1}`}
//                           >
//                             <img
//                               src={imageSrc}
//                               alt={`${project.title} preview ${index + 1}`}
//                               className="h-24 w-full object-cover transition duration-300 group-hover:scale-105"
//                             />
//                           </button>
//                         ))}
//                       </div>
//                     ) : null}

//                     {isUiUxProject ? (
//                       <div className="border-t border-purple-100/70 bg-white/75 p-4 text-sm leading-6 text-slate-600">
//                         <p>
//                           Quick preview: these images give a fast visual overview. Use Live Preview or View Design File to explore the complete screens and interaction flow.
//                         </p>
//                         <p dir="rtl" className="mt-2 text-right">
//                           معاينة سريعة: الصور تعطي لمحة مختصرة عن الواجهات. لعرض الشاشات كاملة وتجربة طريقة التفاعل، استخدم أزرار Live Preview أو View Design File.
//                         </p>
//                       </div>
//                     ) : null}
//                   </div>
//                 ) : null}

//                 {/* قسم النصوص والأزرار */}
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

//                       {isUiUxProject && !hasVisualPreview ? (
//                         <div className="rounded-[1.5rem] border border-purple-100/70 bg-purple-50/80 p-4 text-sm leading-6 text-slate-600">
//                           <p>
//                             Quick preview images will be added here for faster browsing. Use Live Preview or View Design File to explore the complete screens and interaction flow.
//                           </p>
//                           <p dir="rtl" className="mt-2 text-right">
//                             ستتم إضافة صور معاينة سريعة هنا لتصفح أسرع. لعرض الشاشات كاملة وتجربة طريقة التفاعل، استخدم أزرار Live Preview أو View Design File.
//                           </p>
//                         </div>
//                       ) : null}

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
//             imageSrc={selectedImage}
//             imageAlt={project.imageAlt ?? project.title}
//             images={allPreviewImages}
//             onClose={() => setImageOpen(false)}
//           />
//         </>
//       )}
//     </AnimatePresence>
//   );
// }

