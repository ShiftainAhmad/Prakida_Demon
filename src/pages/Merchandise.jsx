import { motion } from "framer-motion";

const Merchandise = () => {
  return (
    <div className="pt-32 min-h-screen container mx-auto px-4">
      <h1 className="text-5xl font-russ text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-prakida-flame to-orange-600">
        Demon Slayer Shop
      </h1>

      <div className="flex flex-col items-center justify-center min-h-[40vh] text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 border border-prakida-flame/30 rounded-lg bg-black/50 backdrop-blur-sm"
        >
          <h2 className="text-2xl font-bold mb-4 text-prakida-flame">
            Coming Soon
          </h2>
          <p className="text-gray-300">
            Official Prakrida Demon Slayer merchandise is currently being forged
            by the swordsmiths.
            <br />
            Check back later for exclusive hoodies, katanas, and more.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Merchandise;
