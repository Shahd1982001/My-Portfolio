import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

const siteSparkles = [
  { position: "top-[8vh] left-[8vw]", size: 14, color: "text-purple-300", animated: false },
  { position: "top-[14vh] right-[18vw]", size: 34, color: "text-purple-400", animated: true, duration: 9, rotation: [0, 180, 360] },
  { position: "top-[28vh] left-[4vw]", size: 22, color: "text-lavender-300", animated: true, duration: 13, rotation: [360, 180, 0] },
  { position: "top-[38vh] right-[7vw]", size: 16, color: "text-purple-300", animated: false },
  { position: "top-[52vh] left-[17vw]", size: 42, color: "text-purple-200", animated: true, duration: 16, rotation: [0, -180, -360] },
  { position: "top-[64vh] right-[24vw]", size: 18, color: "text-lavender-400", animated: false },
  { position: "top-[76vh] left-[36vw]", size: 26, color: "text-purple-300", animated: true, duration: 11, rotation: [360, 180, 0] },
  { position: "top-[84vh] right-[9vw]", size: 12, color: "text-purple-400", animated: false },
];

export function SiteSparkles() {
  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {siteSparkles.map((sparkle, index) => (
        <motion.div
          key={`${sparkle.position}-${index}`}
          animate={sparkle.animated ? { rotate: sparkle.rotation, y: [0, -8, 0] } : undefined}
          transition={
            sparkle.animated
              ? { duration: sparkle.duration, repeat: Infinity, ease: "linear" }
              : undefined
          }
          className={`absolute ${sparkle.position} ${sparkle.color} opacity-60`}
        >
          <Sparkles style={{ width: sparkle.size, height: sparkle.size }} />
        </motion.div>
      ))}
    </div>
  );
}
