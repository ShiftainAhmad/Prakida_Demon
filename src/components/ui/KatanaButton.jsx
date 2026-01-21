import { motion } from "framer-motion";
import { buttonHover, buttonTap } from "../../utils/motion";

const KatanaButton = ({
  children,
  onClick,
  className = "",
  variant = "primary",
}) => {
  const baseClasses =
    "relative overflow-hidden font-display font-bold uppercase tracking-widest px-6 py-3 md:px-8 md:py-4 transition-all duration-300 group";

  const variants = {
    primary:
      "bg-gradient-to-r from-prakida-flame to-prakida-flameDark text-white hover:shadow-[0_0_20px_rgba(244,140,6,0.5)]",
    outline:
      "border border-white/20 hover:border-white/50 text-white hover:bg-white/5",
    water:
      "bg-gradient-to-r from-prakida-water to-blue-600 text-white hover:shadow-[0_0_20px_rgba(0,180,216,0.5)]",
  };

  return (
    <motion.button
      whileHover={buttonHover}
      whileTap={buttonTap}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant] || variants.primary} ${className}`}
    >
      <span className="relative z-10">{children}</span>

      {}
      <div className="absolute inset-0 bg-white/20 translate-x-[-150%] skew-x-[-20deg] group-hover:animate-slash"></div>
    </motion.button>
  );
};

export default KatanaButton;
