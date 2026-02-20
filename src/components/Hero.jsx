import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { heroPunchIn, buttonHover, buttonTap } from "../utils/motion";
import ParallaxElement from "./ui/ParallaxElement";
import GradientText from "./ui/GradientText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const bgRef = useRef(null);

  useEffect(() => {
    if (!bgRef.current) return;

    gsap.fromTo(
      bgRef.current,
      { scale: 1 },
      {
        scale: 1.2,
        ease: "none",
        scrollTrigger: {
          trigger: bgRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      },
    );
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20 perspective-1000">
      {}
      <div className="absolute inset-0 z-0 bg-black">
        {/* Background images removed
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.6, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={images[currentImageIndex]}
              alt="Background"
              className="w-full h-full object-cover opacity-80"
            />
          </motion.div>
        </AnimatePresence>
        */}

        <div
          ref={bgRef}
          className="absolute inset-0 h-screen bg-[url('/bg.png')] bg-cover bg-center z-10"
        />
        <div className="absolute inset-0 z-10 mix-blend-overlay" />
      </div>

      <div className=" mt-[100px] container mx-auto px-6 relative z-10 w-[100vw] text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-5">
            <span className="px-4 py-1.5 border border-prakida-flame/50 text-prakida-flame text-[14px] md:text-lg font-bold tracking-widest md:tracking-[0.3em] uppercase backdrop-blur-sm inline-block">
              BIT PATNA PRESENTS
            </span>
          </motion.div>

          <div className="relative z-20 mix-blend-overlay opacity-90 w-full h-full pt-2">
            <ParallaxElement speed={0.5} direction="down">
              <motion.div
                variants={heroPunchIn}
                initial="hidden"
                animate="visible"
              >
                <h1
                  className="hero-font text-[clamp(40px,9vw,900px)] font-display font-black tracking-wide leading-[1]"
                  style={{
                    textShadow: "0 0 40px rgba(255,255,255,0.1)",
                  }}
                >
                  <GradientText>PRAKRIDA</GradientText>
                </h1>
              </motion.div>
            </ParallaxElement>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="
  flex flex-col md:flex-row
  items-center md:items-end
  justify-center md:justify-center
  gap-6 md:gap-3
  max-w-screen
  mx-auto
  relative z-30
  transform -translate-y-10 md:-translate-y-28 h-[85%]
"
          >
            {/* IMAGE (TOP ON MOBILE, CENTER ON DESKTOP) */}
            <motion.img
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="
      order-1 md:order-2
      w-[140px]
      sm:w-[190px]
      md:w-[200px]
      lg:w-[210px]
      xl:w-[290px]
      drop-shadow-[0_30px_70px_rgba(0,0,0,0.8)]
      pointer-events-none
      select-none
      flex-shrink-0
    "
              src="/fg.png"
              alt="Hero Character"
            />

            {/* LEFT BUTTON */}
            <motion.div
              whileHover={buttonHover}
              whileTap={buttonTap}
              className="
      order-2 md:order-1
      flex justify-center
      w-full md:w-auto
    "
            >
              <Link
                to="/sports"
                className="
        group relative
        w-full sm:w-[260px] md:w-auto
        px-4 py-4 md:px-6 md:py-5
        bg-prakida-flame text-white
        font-bold text-base md:text-lg
        tracking-widest
        overflow-hidden
        clip-path-slant
        shadow-lg shadow-prakida-flame/50
        text-center
      "
              >
                <span className="relative z-10 inline-block transition-transform duration-300 group-hover:scale-[1.05]">
                  ENTER ARENA
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-white/20 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              </Link>
            </motion.div>

            {/* RIGHT BUTTON */}
            <motion.div
              whileHover={buttonHover}
              whileTap={buttonTap}
              className="
      order-3
      flex justify-center
      w-full md:w-auto
    "
            >
              <Link
                to="/register"
                className="
        w-full sm:w-[260px] md:w-auto
        px-4 py-4 md:px-6 md:py-5
        border border-white/40
        bg-black/40 text-white
        font-bold text-base md:text-md
        tracking-widest
        backdrop-blur-sm
        transition-all
        text-center
      "
              >
                REGISTER NOW
              </Link>
            </motion.div>
          </motion.div>

          <motion.p
            variants={heroPunchIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="text-gray-200 text-md md:text-[23px] max-w-5xl mx-auto mb-12 font-light tracking-wide leading-relaxed drop-shadow-md"
          >
            The arena awaits. Unleash your inner{" "}
            <span className="text-prakida-flame font-bold drop-shadow-glow">
              HASHIRA
            </span>
            .
            <span className="text-white/80 text-md md:text-[26px]">
              Victory is not given. It is taken.
            </span>
          </motion.p>
        </motion.div>
        <br />
        <br />
        <br />
      </div>
    </section>
  );
};

export default Hero;
