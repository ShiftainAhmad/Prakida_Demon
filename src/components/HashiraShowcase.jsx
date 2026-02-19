import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import ParallaxElement from "./ui/ParallaxElement";
import {
  heroPunchIn,
  buttonHover,
  buttonTap,
  sectionSlide,
  gridStagger,
  cardSnap,
  cardHover,
} from "../utils/motion";

const sportsData = [
  {
    sport: "Cricket",
    hashira: "Water Hashira",
    name: "Giyu Tomioka",
    desc: "Calm, strategic, flowing. Adapt to the game and strike with fluid precision.",
    color: "from-blue-600 to-cyan-400",
    accent: "border-blue-500",
    kanji: "水",
    tags: ["Strategy", "Flow"],
  },
  {
    sport: "Volleyball",
    hashira: "Wind Hashira",
    name: "Sanemi Shinazugawa",
    desc: "Aggressive stamina and gale-force momentum. Cut through the defense like a storm.",
    color: "from-lime-500 to-green-700",
    accent: "border-lime-400",
    kanji: "風",
    tags: ["Stamina", "Aggression"],
  },
  {
    sport: "Badminton",
    hashira: "Insect Hashira",
    name: "Shinobu Kocho",
    desc: "Agility, finesse, and deadly precision. Float like a butterfly, sting like a bee.",
    color: "from-purple-600 to-emerald-400",
    accent: "border-purple-500",
    kanji: "蟲",
    tags: ["Agility", "Precision"],
  },
  {
    sport: "Basketball",
    hashira: "Sound Hashira",
    name: "Tengen Uzui",
    desc: "Flashy, stylish, and high tempo. Dominate the court with flamboyant moves.",
    color: "from-fuchsia-600 to-purple-400",
    accent: "border-fuchsia-500",
    kanji: "音",
    tags: ["Speed", "Flashy"],
  },
  {
    sport: "Football",
    hashira: "Flame Hashira",
    name: "Kyojuro Rengoku",
    desc: "Burning passion and explosive offense. Set your heart ablaze and dominate the field.",
    color: "from-orange-500 to-red-600",
    accent: "border-orange-400",
    kanji: "炎",
    tags: ["Passion", "Offense"],
  },
  {
    sport: "Chess",
    hashira: "Serpent Hashira",
    name: "Obanai Iguro",
    desc: "Twisting strategies and calculated strikes. Corner your opponent with precision.",
    color: "from-slate-700 to-indigo-900",
    accent: "border-indigo-400",
    kanji: "蛇",
    tags: ["Strategy", "Intellect"],
  },
  {
    sport: "Carrom",
    hashira: "Mist Hashira",
    name: "Muichiro Tokito",
    desc: "Obscured strikes and mental clarity. Cloud the opponent's judgement.",
    color: "from-cyan-200 to-blue-300",
    accent: "border-cyan-200",
    kanji: "霞",
    tags: ["Clarity", "Focus"],
  },
  {
    sport: "Lawn Tennis",
    hashira: "Love Hashira",
    name: "Mitsuri Kanroji",
    desc: "Flexibility and whipping power. Play with grace and overwhelming strength.",
    color: "from-pink-500 to-green-300",
    accent: "border-pink-400",
    kanji: "恋",
    tags: ["Power", "Flexibility"],
  },
  {
    sport: "Table Tennis",
    hashira: "Thunder Hashira",
    name: "Zenitsu Agatsuma",
    desc: "Godspeed reflexes. Strike faster than the eye can see.",
    color: "from-yellow-400 to-orange-500",
    accent: "border-yellow-400",
    kanji: "雷",
    tags: ["Speed", "Reflexes"],
  },
];

const TiltCard = ({ item }) => {
  const ref = useRef(null);
  const rectRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseEnter = () => {
    rectRef.current = ref.current.getBoundingClientRect();
  };

  const handleMouseMove = (e) => {
    if (!rectRef.current) return;

    const width = rectRef.current.width;
    const height = rectRef.current.height;

    const mouseX = e.clientX - rectRef.current.left;
    const mouseY = e.clientY - rectRef.current.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      variants={cardSnap}
      whileHover={cardHover}
      viewport={{ once: true }}
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={`group relative h-[400px] border border-white/10 bg-white/5 rounded-sm overflow-hidden`}
    >
      { }
      <div
        className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
      ></div>

      { }
      <motion.div
        style={{
          opacity: useTransform(x, [-0.5, 0, 0.5], [0, 0.3, 0]),
          background:
            "linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 100%)",
          transform: useTransform(x, (range) => `translateX(${range * 100}%)`),
        }}
        className="absolute inset-0 w-full h-full z-20 pointer-events-none"
      />

      { }
      <div
        className="absolute -bottom-10 -right-10 text-9xl font-black text-white/5 group-hover:text-white/10 transition-colors duration-500 select-none font-display"
        style={{ transform: "translateZ(20px)" }}
      >
        {item.kanji}
      </div>

      <div
        className="p-8 h-full flex flex-col relative z-10"
        style={{ transform: "translateZ(50px)" }}
      >
        { }
        <div className="flex justify-between items-start mb-6">
          <div>
            <h4 className="text-prakida-text/60 text-sm font-bold tracking-wider mb-1 uppercase">
              {item.hashira}
            </h4>
            <h3 className="text-3xl font-display font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-300">
              {item.sport}
            </h3>
          </div>
          <div
            className={`w-3 h-3 rounded-full bg-gradient-to-br ${item.color} shadow-[0_0_10px_rgba(255,255,255,0.5)]`}
          ></div>
        </div>

        { }
        <p className="text-gray-400 mb-8 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
          {item.desc}
        </p>

        <div className="mt-auto">
          <div className="text-sm font-bold text-white/80 mb-2">
            {item.name}
          </div>
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 bg-white/10 border border-white/10 rounded text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      { }
      <div
        className={`absolute inset-0 border-2 ${item.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
      ></div>
    </motion.div>
  );
};

const HashiraShowcase = ({ limit }) => {
  const displayedData = limit ? sportsData.slice(0, limit) : sportsData;

  return (
    <section id="hashira" className="py-24 bg-black relative perspective-1000">
      <div className="container mx-auto px-6">
        <motion.div
          variants={sectionSlide}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-prakida-flame font-bold tracking-[0.2em] mb-4 text-sm md:text-base">
            THE ARENA
          </h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-white">
            HASHIRA x SPORTS
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gray-500 to-transparent mx-auto mt-6"></div>
        </motion.div>

        <motion.div
          variants={gridStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {displayedData.map((item, idx) => (
            <Link key={idx} to={`/register?sport=${item.sport}`}>
              <TiltCard item={item} />
            </Link>
          ))}
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center mt-16 gap-6 md:gap-10">

          <motion.div
            whileHover={buttonHover}
            whileTap={buttonTap}
            className="relative w-full sm:w-[90%] md:w-auto"
          >
            <div className="absolute inset-0 bg-prakida-flame blur-2xl opacity-50 translate-y-4 -z-10" />

            <Link
              to="/sports"
              className="position: relative inline-block w-full md:w-[320px] px-6 py-3 md:px-10 md:py-5 bg-prakida-flame text-white font-bold text-base sm:text-lg md:text-xl tracking-widest clip-path-slant text-center overflow-hidden"
            >
              <span className="glass-shine-effect relative z-10 group-hover:tracking-[0.2em] transition-all duration-300">
                VIEW ALL SPORTS
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
            </Link>
          </motion.div>

          <motion.div
            whileHover={buttonHover}
            whileTap={buttonTap}
            className="relative w-full sm:w-[90%] md:w-auto"
          >
            <div className="absolute inset-0 bg-black/60 blur-2xl opacity-40 translate-y-4 -z-10" />

            <a
              href="/brochure.pdf"
              download
              className="inline-block w-full md:w-[320px] text-center px-6 py-3 md:px-8 md:py-5 border border-white/40 bg-black/30 text-white font-bold text-base sm:text-lg md:text-lg tracking-widest hover:border-white/80 backdrop-blur-sm transition-all">
              BROCHURE
            </a>
          </motion.div>

        </div>


      </div>
    </section>
  );
};

export default HashiraShowcase;
