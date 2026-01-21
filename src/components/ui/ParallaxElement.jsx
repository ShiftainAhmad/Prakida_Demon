import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { scrollLagConfig } from "../../utils/motion";

const ParallaxElement = ({
  children,
  speed = 1,
  className = "",
  direction = "up",
  enableMobile = false,
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const offset = 100 * speed;
  const yRange = direction === "up" ? [offset, -offset] : [-offset, offset];

  const y = useTransform(scrollYProgress, [0, 1], yRange);

  const smoothY = useSpring(y, scrollLagConfig);

  const isMobile =
    !enableMobile && typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={{ y: isMobile ? 0 : smoothY }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ParallaxElement;
