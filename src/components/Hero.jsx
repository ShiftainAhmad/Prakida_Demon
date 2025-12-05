import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Hero = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

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

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-prakida-bg via-transparent to-prakida-bg z-10"></div>
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-prakida-water/10 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-prakida-flame/10 to-transparent"></div>

                {/* Animated Particles/Orbs */}
                <motion.div
                    animate={{ x: [0, 50, 0], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute top-1/4 right-1/4 w-96 h-96 bg-prakida-water/20 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{ x: [0, -50, 0], opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 8, repeat: Infinity, delay: 1 }}
                    className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-prakida-flame/20 rounded-full blur-[100px]"
                />
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-prakida-flame font-bold tracking-[0.3em] mb-4 text-sm md:text-base border-b border-prakida-flame/30 inline-block pb-2">
                        INTER-COLLEGE SPORTS FEST 2026
                    </h2>
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-black text-white mb-6 tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
                        PRAKIDA
                    </h1>
                    <p className="text-gray-400 text-lg md:text-2xl max-w-2xl mx-auto mb-10 font-light tracking-wide">
                        Unleash Your Inner <span className="text-prakida-water font-semibold">Hashira</span> on the Field.
                        <br />
                        Forged in Sportsmanship. Inspired by Legends.
                    </p>

                    <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16">
                        <a
                            href="#register"
                            className="group relative px-8 py-4 bg-prakida-flame text-white font-bold text-lg tracking-wider overflow-hidden clip-path-slant"
                        >
                            <span className="relative z-10">REGISTER NOW</span>
                            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                        </a>
                        <a
                            href="#schedule"
                            className="group px-8 py-4 border border-white/30 text-white font-bold text-lg tracking-wider hover:bg-white/5 transition-colors"
                        >
                            VIEW SCHEDULE
                        </a>
                    </div>

                    {/* Countdown */}
                    <div className="grid grid-cols-4 gap-4 md:gap-8 max-w-3xl mx-auto border-t border-white/10 pt-8">
                        {[
                            { label: 'DAYS', value: timeLeft.days },
                            { label: 'HOURS', value: timeLeft.hours },
                            { label: 'MINUTES', value: timeLeft.minutes },
                            { label: 'SECONDS', value: timeLeft.seconds }
                        ].map((item, idx) => (
                            <div key={idx} className="text-center">
                                <div className="text-3xl md:text-5xl font-display font-bold text-white mb-2">
                                    {String(item.value).padStart(2, '0')}
                                </div>
                                <div className="text-xs md:text-sm text-gray-500 tracking-widest">{item.label}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
