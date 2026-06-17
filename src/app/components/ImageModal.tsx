import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

interface ImageModalProps {
  isOpen: boolean;
  imageSrc: string;
  imageAlt: string;
  onClose: () => void;
}

export function ImageModal({ isOpen, imageSrc, imageAlt, onClose }: ImageModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-6 right-6 z-50 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition hover:bg-white/30"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image container */}
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-3xl shadow-2xl"
            >
              <img
                src={imageSrc}
                alt={imageAlt}
                className="h-auto w-auto max-h-[85vh] max-w-[85vw] object-contain"
              />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
