// import { useEffect, useMemo, useState } from "react";
// import { motion, AnimatePresence } from "motion/react";
// import { ChevronLeft, ChevronRight, X } from "lucide-react";

// interface ImageModalProps {
//   isOpen: boolean;
//   imageSrc: string;
//   imageAlt: string;
//   images?: string[];
//   onClose: () => void;
// }

// export function ImageModal({ isOpen, imageSrc, imageAlt, images = [], onClose }: ImageModalProps) {
//   const carouselImages = useMemo(() => {
//     return Array.from(new Set([imageSrc, ...images].filter(Boolean)));
//   }, [imageSrc, images]);

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const currentImage = carouselImages[currentIndex] ?? imageSrc;
//   const canNavigate = carouselImages.length > 1;

//   useEffect(() => {
//     if (!isOpen) return;

//     const imageIndex = carouselImages.indexOf(imageSrc);
//     setCurrentIndex(imageIndex >= 0 ? imageIndex : 0);
//   }, [carouselImages, imageSrc, isOpen]);

//   const showPreviousImage = () => {
//     setCurrentIndex((index) => (index - 1 + carouselImages.length) % carouselImages.length);
//   };

//   const showNextImage = () => {
//     setCurrentIndex((index) => (index + 1) % carouselImages.length);
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           {/* Backdrop */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//             className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
//           />

//           {/* Modal */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.9 }}
//             transition={{ duration: 0.3 }}
//             className="fixed inset-0 z-50 flex items-center justify-center p-4"
//             onClick={onClose}
//           >
//             {/* Close button */}
//             <button
//               type="button"
//               onClick={onClose}
//               className="absolute top-6 right-6 z-50 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition hover:bg-white/30"
//               aria-label="Close"
//             >
//               <X className="w-6 h-6" />
//             </button>

//             {canNavigate ? (
//               <>
//                 <button
//                   type="button"
//                   onClick={(event) => {
//                     event.stopPropagation();
//                     showPreviousImage();
//                   }}
//                   className="absolute left-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition hover:bg-white/30 sm:left-8"
//                   aria-label="Previous image"
//                 >
//                   <ChevronLeft className="h-6 w-6" />
//                 </button>

//                 <button
//                   type="button"
//                   onClick={(event) => {
//                     event.stopPropagation();
//                     showNextImage();
//                   }}
//                   className="absolute right-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition hover:bg-white/30 sm:right-8"
//                   aria-label="Next image"
//                 >
//                   <ChevronRight className="h-6 w-6" />
//                 </button>
//               </>
//             ) : null}

//             {/* Image container */}
//             <motion.div
//               onClick={(e) => e.stopPropagation()}
//               className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-3xl shadow-2xl"
//             >
//               <img
//                 src={currentImage}
//                 alt={imageAlt}
//                 className="h-auto w-auto max-h-[85vh] max-w-[85vw] object-contain"
//               />
//             </motion.div>

//             {canNavigate ? (
//               <div
//                 className="absolute bottom-5 left-1/2 z-50 flex -translate-x-1/2 gap-2 rounded-full bg-black/30 px-3 py-2 backdrop-blur-sm"
//                 onClick={(event) => event.stopPropagation()}
//               >
//                 {carouselImages.map((image, index) => (
//                   <button
//                     key={`${image}-${index}`}
//                     type="button"
//                     onClick={() => setCurrentIndex(index)}
//                     className={`h-2.5 w-2.5 rounded-full transition ${
//                       index === currentIndex ? "bg-white" : "bg-white/40 hover:bg-white/70"
//                     }`}
//                     aria-label={`Show image ${index + 1}`}
//                   />
//                 ))}
//               </div>
//             ) : null}
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// }




import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageModalProps {
  isOpen: boolean;
  imageSrc: string;
  imageAlt: string;
  images?: string[];
  onClose: () => void;
}

export function ImageModal({ isOpen, imageSrc, imageAlt, images = [], onClose }: ImageModalProps) {
  const carouselImages = useMemo(() => {
    return Array.from(new Set([imageSrc, ...images].filter(Boolean)));
  }, [imageSrc, images]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentImage = carouselImages[currentIndex] ?? imageSrc;
  const canNavigate = carouselImages.length > 1;

  useEffect(() => {
    if (!isOpen) return;

    const imageIndex = carouselImages.indexOf(imageSrc);
    setCurrentIndex(imageIndex >= 0 ? imageIndex : 0);
  }, [carouselImages, imageSrc, isOpen]);

  const showPreviousImage = () => {
    setCurrentIndex((index) => (index - 1 + carouselImages.length) % carouselImages.length);
  };

  const showNextImage = () => {
    setCurrentIndex((index) => (index + 1) % carouselImages.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop مع blur قوي وخلفية داكنة */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/90 backdrop-blur-lg"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4"
            onClick={onClose}
          >
            {/* تم إزالة زر الإغلاق (X) */}

            {canNavigate ? (
              <>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    showPreviousImage();
                  }}
                  className="absolute left-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition hover:bg-white/30 sm:left-8"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    showNextImage();
                  }}
                  className="absolute right-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition hover:bg-white/30 sm:right-8"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            ) : null}

            {/* حاوية الصورة */}
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] max-w-[90vw] overflow-hidden rounded-3xl shadow-2xl"
            >
              <img
                src={currentImage}
                alt={imageAlt}
                className="h-auto w-auto max-h-[80vh] max-w-[85vw] object-contain"
              />
            </motion.div>

            {/* الملاحظة الجديدة تحت الصورة */}
            <p
              onClick={(e) => e.stopPropagation()}
              className="mt-4 text-center text-sm text-white/80 drop-shadow-lg"
            >
              اضغط خارج النافذة لإغلاقه, Click outside the window to close it.
            </p>

            {canNavigate ? (
              <div
                className="absolute bottom-20 left-1/2 z-50 flex -translate-x-1/2 gap-2 rounded-full bg-black/30 px-3 py-2 backdrop-blur-sm"
                onClick={(event) => event.stopPropagation()}
              >
                {carouselImages.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2.5 w-2.5 rounded-full transition ${
                      index === currentIndex ? "bg-white" : "bg-white/40 hover:bg-white/70"
                    }`}
                    aria-label={`Show image ${index + 1}`}
                  />
                ))}
              </div>
            ) : null}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}