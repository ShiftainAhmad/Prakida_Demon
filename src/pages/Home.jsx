import Hero from "../components/Hero";
import About from "../components/About";
import HashiraShowcase from "../components/HashiraShowcase";
import Gallery from "../components/Gallery";
import Sponsors from "../components/Sponsors";
import Marquee from "../components/ui/Marquee";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

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

const Home = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2026-03-12T09:00:00");

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Hero />
      <Marquee
        items={[
          "Registration Open Now",
          "Prove Your Strength",
          "Blood Sweat & Glory",
          "March 12-15 2026",
          "Become a Hashira",
        ]}
        speed={30}
      />
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-12 max-w-4xl mx-auto mb-6 pt-10"
      >
        {[
          { label: "DAYS", value: timeLeft.days },
          { label: "HOURS", value: timeLeft.hours },
          { label: "MINUTES", value: timeLeft.minutes },
          { label: "SECONDS", value: timeLeft.seconds },
        ].map((item, idx) => (
          <div key={idx} className="text-center group cursor-default">
            <div className="text-4xl md:text-6xl font-display font-black text-white mb-2 group-hover:text-prakida-flame transition-colors duration-300 drop-shadow-md">
              {String(item.value).padStart(2, "0")}
            </div>
            <div className="text-xs md:text-sm text-gray-400 tracking-[0.3em] font-medium group-hover:text-white transition-colors duration-300">
              {item.label}
            </div>
          </div>
        ))}
      </motion.div>
      <About />
      {}
      <HashiraShowcase limit={3} />
      <Gallery />

      {}
      <section className="py-24 bg-prakida-bg relative overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-8">
            READY TO JOIN THE CORPS?
          </h2>
          <Link
            to="/sports"
            className="inline-block px-10 py-4 bg-prakida-flame text-white font-bold text-xl tracking-widest hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 skew-x-[-12deg]"
          >
            <span className="block skew-x-[12deg]">VIEW SPORTS</span>
          </Link>
        </div>
      </section>

      {/** Sponsors scrolling disabled on Home page **/}
      {/**<Sponsors />**/}
    </>
  );
};

export default Home;
