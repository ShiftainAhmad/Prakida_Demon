
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import ParallaxElement from './ui/ParallaxElement';

const Hero = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Mouse parallax effect
    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const moveX = clientX - window.innerWidth / 2;
        const moveY = clientY - window.innerHeight / 2;
        setMousePosition({ x: moveX, y: moveY });
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        // Set target date to January 13, 2026
        const targetDate = new Date('2026-01-13T09:00:00');

        const interval = setInterval(() => {
            const now = new Date();
            const difference = targetDate - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        }
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 perspective-1000">
            {/* Dynamic Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-prakida-bg via-transparent to-prakida-bg z-10" />
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay animate-pulse" />

                {/* Parallax Orbs */}
                <motion.div
                    animate={{
                        x: mousePosition.x * -0.05,
                        y: mousePosition.y * -0.05,
                    }}
                    transition={{ type: "spring", damping: 30, stiffness: 200 }}
                    className="absolute top-0 right-0 w-full h-full"
                >
                    <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-prakida-water/30 rounded-full blur-[120px] mix-blend-screen" />
                </motion.div>

                <motion.div
                    animate={{
                        x: mousePosition.x * 0.05,
                        y: mousePosition.y * 0.05,
                    }}
                    transition={{ type: "spring", damping: 30, stiffness: 200 }}
                    className="absolute bottom-0 left-0 w-full h-full"
                >
                    <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-prakida-flame/20 rounded-full blur-[150px] mix-blend-screen" />
                </motion.div>
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={itemVariants} className="mb-4">
                        <span className="px-4 py-1 border border-prakida-flame/50 text-prakida-flame text-xs md:text-sm font-bold tracking-[0.3em] uppercase backdrop-blur-sm">
                            Inter-College Sports Fest 2026
                        </span>
                    </motion.div>


                    <div className="relative z-20 mix-blend-overlay opacity-90 mb-2">
                        <ParallaxElement speed={0.5} direction="down">
                            <h1
                                className="text-5xl md:text-9xl lg:text-[12rem] font-display font-black text-white tracking-tighter leading-[0.8]"
                                style={{ textShadow: '0 0 40px rgba(255,255,255,0.1)', fontFamily: "'Nosifer', cursive" }}
                            >
                                PRAKIDA
                            </h1>
                        </ParallaxElement>
                    </div>

                    <ParallaxElement speed={0.2} direction="up">
                        <motion.p
                            variants={itemVariants}
                            className="text-gray-300 text-xl md:text-[26px] max-w-3xl mx-auto mt-8 mb-12 font-light tracking-wide leading-relaxed"
                        >
                            The arena awaits. Unleash your inner <span className="text-prakida-water font-bold drop-shadow-glow">Hashira</span>.<br />
                            <span className="text-white/60 text-lg">Victory is not given. It is taken.</span>
                        </motion.p>
                    </ParallaxElement>

                    <ParallaxElement speed={0.3} direction="up">
                        <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-6 justify-center items-center mb-20">
                            <Link
                                to="/sports"
                                className="group relative px-10 py-5 bg-prakida-flame text-white font-bold text-xl tracking-widest overflow-hidden clip-path-slant shadow-lg shadow-prakida-flame/50 hover:shadow-prakida-flame/80 transition-all active:scale-95"
                            >
                                <span className="relative z-10 group-hover:tracking-[0.2em] transition-all duration-300">ENTER ARENA</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                            </Link>
                            <Link
                                to="/events"
                                className="group px-8 py-5 border border-white/20 text-white font-bold text-lg tracking-widest hover:bg-white/5 transition-all hover:border-white/50 backdrop-blur-sm active:scale-95"
                            >
                                VIEW SCHEDULE
                            </Link>
                        </motion.div>
                    </ParallaxElement>

                    {/* Countdown */}
                    <motion.div
                        variants={itemVariants}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-12 max-w-4xl mx-auto border-t border-white/10 pt-10"
                    >
                        {[
                            { label: 'DAYS', value: timeLeft.days },
                            { label: 'HOURS', value: timeLeft.hours },
                            { label: 'MINUTES', value: timeLeft.minutes },
                            { label: 'SECONDS', value: timeLeft.seconds }
                        ].map((item, idx) => (
                            <div key={idx} className="text-center group cursor-default">
                                <div className="text-4xl md:text-6xl font-display font-black text-white mb-2 group-hover:text-prakida-flame transition-colors duration-300">
                                    {String(item.value).padStart(2, '0')}
                                </div>
                                <div className="text-xs md:text-sm text-gray-500 tracking-[0.3em] font-medium group-hover:text-white transition-colors duration-300">{item.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}

        </section>
    );
};

export default Hero;
