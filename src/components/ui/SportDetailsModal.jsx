import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Camera, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { SPORTS_CONFIG } from "../../lib/sportsConfig";
import { formatRegistrationFee } from "../../lib/pricing";
import { useAuth } from "../../context/AuthContext";

const SportDetailsModal = ({ sport, onClose }) => {
    const { user } = useAuth();
    const [currentThumb, setCurrentThumb] = useState(0);
    const detailsScrollRef = useRef(null);

    const sportConfig = sport?.configSport ? SPORTS_CONFIG[sport.configSport] : null;
    const eventCategories = sportConfig?.categories || [];
    const focusedCategories = sport?.focusCategoryId
        ? eventCategories.filter((c) => c.id === sport.focusCategoryId)
        : eventCategories;

    useEffect(() => {
        if (!sport || !sport.images || sport.images.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentThumb((prev) => (prev + 1) % sport.images.length);
        }, 2500);

        return () => clearInterval(interval);
    }, [sport]);

    useEffect(() => {
        const scrollY = window.scrollY || 0;
        const prevHtmlOverflow = document.documentElement.style.overflow;
        const prevBodyStyle = {
            overflow: document.body.style.overflow,
            position: document.body.style.position,
            top: document.body.style.top,
            width: document.body.style.width,
        };

        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = "100%";

        return () => {
            document.documentElement.style.overflow = prevHtmlOverflow;
            document.body.style.overflow = prevBodyStyle.overflow;
            document.body.style.position = prevBodyStyle.position;
            document.body.style.top = prevBodyStyle.top;
            document.body.style.width = prevBodyStyle.width;
            window.scrollTo(0, scrollY);
        };
    }, []);

    if (!sport) return null;

    const scrollDetailsPanel = (deltaY) => {
        const el = detailsScrollRef.current;
        if (!el) return;
        if (el.scrollHeight <= el.clientHeight) return;
        el.scrollTop += deltaY;
    };

    const handleModalWheel = (e) => {
        // Route mouse wheel scrolling to the right panel (image side has no scroll)
        scrollDetailsPanel(e.deltaY);
        e.stopPropagation();
    };

    const registerTo = (() => {
        const params = new URLSearchParams();
        if (sport?.configSport) params.set("sport", sport.configSport);
        if (sport?.focusCategoryId) params.set("category", sport.focusCategoryId);
        const qs = params.toString();
        return qs ? `/register?${qs}` : "/register";
    })();

    const modalContent = (
        <div className="fixed inset-0 z-[9999] flex justify-center items-center overflow-hidden p-4 md:p-6 lg:p-8">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            {/* Modal Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onWheel={handleModalWheel}
                className="relative bg-prakida-bg border border-white/10 w-full max-w-6xl h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-[0_0_100px_rgba(239,68,68,0.15)] rounded-sm my-auto"
            >
                {/* Accents */}
                <div className="absolute top-0 left-0 w-32 h-[2px] bg-prakida-flame z-20" />
                <div className="absolute bottom-0 right-0 w-32 h-[2px] bg-prakida-flame z-20" />
                <div className="absolute top-0 right-0 w-[2px] h-32 bg-prakida-flame z-20 hidden md:block" />
                <div className="absolute bottom-0 left-0 w-[2px] h-32 bg-prakida-flame z-20 hidden md:block" />

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 bg-black/50 text-white hover:text-prakida-flame transition-colors rounded-full border border-white/10 hover:border-prakida-flame/50"
                >
                    <X size={24} />
                </button>

                {/* Left Side: Photo Slideshow */}
                <div className="w-full md:w-1/2 aspect-video md:aspect-square relative overflow-hidden bg-white/5 group shrink-0">
                    <AnimatePresence mode="wait">
                        {sport.images && sport.images.length > 0 ? (
                            <motion.img
                                key={currentThumb}
                                src={sport.images[currentThumb]}
                                alt={`${sport.title} Action`}
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 0.6, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.8, ease: "circOut" }}
                                className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                            />
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                                <Camera size={48} className="mb-2 opacity-20" />
                                <span className="text-xs font-mono tracking-widest uppercase opacity-40">Memorial Image Missing</span>
                            </div>
                        )}
                    </AnimatePresence>

                    {/* Slideshow HUD */}
                    <div className="absolute bottom-6 left-6 z-20">
                        <div className="flex gap-2">
                            {sport.images?.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`h-1 transition-all duration-500 rounded-full ${idx === currentThumb ? "w-8 bg-prakida-flame" : "w-2 bg-white/20"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
                        <h4 className="text-[6rem] md:text-[10rem] font-display font-black text-white/5 whitespace-nowrap overflow-hidden select-none">
                            {sport.title}
                        </h4>
                    </div>
                </div>

                {/* Right Side: Brief & Registration */}
                <div className="w-full md:w-1/2 flex-1 min-h-0 h-full p-4 md:p-10 lg:p-12 flex flex-col relative bg-gradient-to-br from-black/80 to-transparent md:bg-gradient-to-br md:from-black md:to-transparent overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="h-full min-h-0 flex flex-col"
                    >
                        <div className="flex items-center gap-3 text-prakida-flame mb-2">
                            <div className="w-8 h-[1px] bg-prakida-flame" />
                            <span className="text-xs font-mono font-bold tracking-[0.3em] uppercase">Tournament Intel</span>
                        </div>

                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-white mb-3 md:mb-5 uppercase italic tracking-tighter">
                            {sport.title}
                        </h2>

                        <div className="shrink-0 flex flex-col sm:flex-row gap-2 md:gap-3 mb-4 md:mb-6">
                            <Link
                                to={user ? registerTo : "/login"}
                                className="flex-1 px-5 md:px-6 py-3 md:py-4 bg-prakida-flame text-white font-black text-xs md:text-lg tracking-[0.22em] md:tracking-widest hover:bg-orange-600 transition-all duration-300 transform skew-x-[-12deg] flex items-center justify-center gap-2 group/btn"
                            >
                                <span className="skew-x-[12deg] flex items-center gap-2">
                                    {user ? "JOIN THE CORPS" : "LOGIN TO REGISTER"}{" "}
                                    {user ? (
                                        <ArrowRight
                                            size={18}
                                            className="group-hover/btn:translate-x-2 transition-transform"
                                        />
                                    ) : (
                                        <LogIn
                                            size={18}
                                            className="group-hover/btn:translate-x-2 transition-transform"
                                        />
                                    )}
                                </span>
                            </Link>

                            <a
                                href={sport.rulebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-5 md:px-6 py-3 md:py-4 border border-white/20 text-white font-bold tracking-[0.2em] md:tracking-wider hover:bg-white/10 transition-all duration-300 skew-x-[-12deg] text-center text-xs md:text-base"
                            >
                                <span className="block skew-x-[12deg]">RULEBOOK</span>
                            </a>
                        </div>

                        <div
                            ref={detailsScrollRef}
                            className="flex-1 min-h-0 overflow-y-auto overscroll-contain space-y-4 md:space-y-6 pr-1"
                            style={{ WebkitOverflowScrolling: "touch" }}
                        >
                            <p className="text-gray-400 text-sm md:text-lg leading-relaxed font-light">
                                {sport.detailedDesc || sport.desc}
                            </p>

                            <div className="grid grid-cols-2 gap-3 md:gap-4">
                                <div className="p-3 md:p-4 bg-white/5 border border-white/10 rounded-sm">
                                    <span className="block text-[8px] md:text-[10px] text-gray-500 font-mono tracking-widest uppercase mb-1">Combat Format</span>
                                    <span className="text-xs md:text-base text-white font-bold">{sport.players}</span>
                                </div>
                                <div className="p-3 md:p-4 bg-white/5 border border-white/10 rounded-sm">
                                    <span className="block text-[8px] md:text-[10px] text-gray-500 font-mono tracking-widest uppercase mb-1">Legion Category</span>
                                    <span className="text-xs md:text-base text-white font-bold">{sport.category}</span>
                                </div>
                            </div>

                            {focusedCategories.length > 0 && (
                                <div className="p-3 md:p-4 bg-white/5 border border-white/10 rounded-sm">
                                    <span className="block text-[8px] md:text-[10px] text-gray-500 font-mono tracking-widest uppercase mb-3">
                                        Pricing
                                    </span>
                                    <div className="space-y-2">
                                        {focusedCategories.map((c) => (
                                            <div
                                                key={`${sport.configSport}-${c.id}-pricing`}
                                                className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-3 bg-black/30 border border-white/10 rounded px-3 py-2"
                                            >
                                                <span className="text-xs text-white font-bold">
                                                    {c.label}
                                                </span>
                                                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] md:text-[11px] font-mono text-gray-300">
                                                    <span className="whitespace-nowrap">
                                                        Fee: {formatRegistrationFee(c) || "—"}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );

    return createPortal(modalContent, document.body);
};

export default SportDetailsModal;
