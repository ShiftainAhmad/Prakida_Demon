import { motion } from "framer-motion";

const Marquee = ({
  items = [],
  direction = "left",
  speed = 20,
  className = "",
}) => {
  return (
    <div
      className={`relative flex overflow-hidden whitespace-nowrap border-y border-prakida-flame/20 bg-black/50 backdrop-blur-sm py-3 ${className}`}
    >
      <motion.div
        className="flex gap-8 items-center"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {}
        {[...items, ...items, ...items, ...items].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 text-white/80 font-mono text-sm tracking-widest uppercase"
          >
            <span>{item}</span>
            <span className="w-2 h-2 rounded-full bg-prakida-flame/50 animate-pulse"></span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;
