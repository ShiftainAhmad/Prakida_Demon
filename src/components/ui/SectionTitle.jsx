import { motion } from "framer-motion";

const SectionTitle = ({ title, kanji, centered = true }) => {
  return (
    <div className={`mb-12 ${centered ? "text-center" : "text-left"}`}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {kanji && (
          <span className="block text-prakida-flame/80 font-display text-sm md:text-base tracking-[0.5em] mb-2 uppercase select-none">
            {kanji}
          </span>
        )}
        <h2 className="text-3xl md:text-5xl font-bold font-display uppercase tracking-wider text-white relative inline-block">
          {title}
          <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-prakida-flame to-transparent opacity-80"></span>
        </h2>
      </motion.div>
    </div>
  );
};

export default SectionTitle;
