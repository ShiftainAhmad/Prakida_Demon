import { motion } from 'framer-motion';

const KatanaButton = ({ children, onClick, className = "", variant = "primary" }) => {
    const baseClasses = "relative overflow-hidden font-display font-bold uppercase tracking-widest px-8 py-4 transition-all duration-300 group";

    // Variants for different contexts (e.g., Flame vs Water)
    const variants = {
        primary: "bg-gradient-to-r from-prakida-flame to-prakida-flameDark text-white hover:shadow-[0_0_20px_rgba(244,140,6,0.5)]",
        outline: "border border-white/20 hover:border-white/50 text-white hover:bg-white/5",
        water: "bg-gradient-to-r from-prakida-water to-blue-600 text-white hover:shadow-[0_0_20px_rgba(0,180,216,0.5)]"
    };

    return (
        <button
            onClick={onClick}
            className={`${baseClasses} ${variants[variant] || variants.primary} ${className}`}
        >
            <span className="relative z-10">{children}</span>

            {/* The Slash Effect */}
            <div className="absolute inset-0 bg-white/20 translate-x-[-150%] skew-x-[-20deg] group-hover:animate-slash"></div>
        </button>
    );
};

export default KatanaButton;
