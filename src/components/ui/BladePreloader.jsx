import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BladePreloader = ({ onComplete }) => {
  const [stage, setStage] = useState("initial");

  useEffect(() => {
    const sequence = async () => {
      setTimeout(() => setStage("drawing"), 500);

      setTimeout(() => setStage("ready"), 2000);

      setTimeout(() => setStage("slashing"), 3500);

      setTimeout(() => {
        setStage("complete");
        setTimeout(onComplete, 500);
      }, 3800);
    };

    sequence();
  }, [onComplete]);

  return (
    <AnimatePresence>
      {stage !== "complete" && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {}
          <motion.div
            className="relative w-[300px] h-[40px] md:w-[600px] md:h-[60px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: stage === "ready" || stage === "slashing" ? 1.5 : 1,
              rotate: stage === "slashing" ? -45 : 0,
            }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-white to-gray-400 h-full rounded-r-full shadow-[0_0_30px_rgba(255,255,255,0.4)] overflow-hidden">
              {}
              <div
                className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-r from-gray-400 to-gray-500 opacity-50"
                style={{
                  clipPath:
                    "polygon(0% 100%, 5% 20%, 10% 80%, 15% 30%, 20% 90%, 25% 40%, 30% 80%, 35% 20%, 40% 90%, 45% 30%, 50% 80%, 55% 20%, 60% 90%, 65% 30%, 70% 80%, 75% 20%, 80% 90%, 85% 30%, 90% 80%, 95% 20%, 100% 100%)",
                }}
              ></div>
            </div>

            {}
            <div className="absolute left-[-20%] top-1/2 -translate-y-1/2 w-[25%] h-[140%] bg-gray-900 border-r-4 border-yellow-600 z-10">
              <div className="w-full h-full bg-pattern-diamond opacity-30"></div>
            </div>

            {}
            {stage === "slashing" && (
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{ duration: 0.3, ease: "linear" }}
              />
            )}
          </motion.div>

          {}
          {stage === "slashing" && (
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
              animate={{
                clipPath: [
                  "polygon(0 0, 100% 0, 100% 0, 0 0)",
                  "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                  "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
                ],
              }}
              transition={{ duration: 0.4 }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BladePreloader;
