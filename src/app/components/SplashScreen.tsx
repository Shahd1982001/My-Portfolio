import { useEffect, useState } from "react";
import { motion } from "motion/react";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const exitTimer = window.setTimeout(() => setIsExiting(true), 3200);
    const completeTimer = window.setTimeout(onComplete, 3900);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const finishSplash = () => {
    if (isExiting) return;
    setIsExiting(true);
    window.setTimeout(onComplete, 650);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.65, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#faf7ff] via-[#f2eaff] to-[#e8dcff]"
      aria-label="Welcome splash screen"
      role="status"
    >
      <div className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-purple-300/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-96 w-96 rounded-full bg-fuchsia-200/25 blur-3xl" />

      <div className="relative flex w-full max-w-5xl flex-col items-center px-6 text-center">
        <div className="pointer-events-none absolute inset-x-0 top-1/2 h-40 -translate-y-1/2">
          {[0, 1, 2].map((line) => (
            <motion.svg
              key={line}
              viewBox="0 0 900 160"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: [0, 0.8, 0], x: [80, 0, -80] }}
              transition={{
                duration: 2.4 + line * 0.35,
                delay: line * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <path
                d={`M-20 ${75 + line * 18} C180 ${10 + line * 12}, 290 ${145 - line * 10}, 470 ${75 + line * 4} S720 ${15 + line * 20}, 920 ${80 - line * 7}`}
                fill="none"
                stroke={line === 1 ? "#a855f7" : "#c084fc"}
                strokeWidth={line === 1 ? 3 : 1.5}
                strokeLinecap="round"
                opacity={line === 1 ? 0.55 : 0.35}
              />
            </motion.svg>
          ))}
        </div>

        <motion.div
          initial={{ x: "-68vw", y: 18, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{ duration: 1.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <motion.div
              animate={{ rotate: [-3, 3, -3] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
              className="relative h-24 w-24 rounded-[2rem] border-2 border-purple-300/80 bg-white/90 shadow-xl shadow-purple-300/40"
            >
              <div className="absolute -top-3 left-1/2 h-4 w-1 -translate-x-1/2 rounded-full bg-purple-400" />
              <div className="absolute -top-5 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-fuchsia-400 shadow-[0_0_12px_#e879f9]" />
              <div className="absolute left-1/2 top-7 flex h-8 w-14 -translate-x-1/2 items-center justify-center gap-2 rounded-xl bg-purple-950">
                <motion.span
                  animate={{ opacity: [1, 0.45, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                  className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#67e8f9]"
                />
                <motion.span
                  animate={{ opacity: [0.45, 1, 0.45] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                  className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#67e8f9]"
                />
              </div>
              <div className="absolute -bottom-3 left-4 h-5 w-1.5 rounded-full bg-purple-400" />
              <div className="absolute -bottom-3 right-4 h-5 w-1.5 rounded-full bg-purple-400" />
              <motion.div
                animate={{ rotate: [-15, 15, -15] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-5 bottom-5 h-2 w-7 origin-left rounded-full bg-purple-400"
              />
            </motion.div>
            <div className="absolute -bottom-8 left-1/2 h-3 w-32 -translate-x-1/2 rounded-full bg-purple-400/20 blur-md" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isExiting ? 0 : 1, y: isExiting ? -10 : 0 }}
          transition={{ delay: 1.55, duration: 0.7 }}
          className="relative z-10 mt-12"
        >
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-purple-500">
            Welcome to my portfolio
          </p>
          <h1 className="mt-3 text-3xl font-light text-purple-950 sm:text-5xl">
            مرحبًا بكم
          </h1>
          <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-purple-400 to-fuchsia-400" />
        </motion.div>
      </div>

      <button
        type="button"
        onClick={finishSplash}
        className="absolute bottom-8 right-6 rounded-full border border-purple-200/80 bg-white/60 px-4 py-2 text-xs font-medium text-purple-700 backdrop-blur-sm transition hover:bg-white sm:right-10"
      >
        Skip
      </button>
    </motion.div>
  );
}
