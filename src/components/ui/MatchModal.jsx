import { motion } from "framer-motion";
import { X } from "lucide-react";

const MatchModal = ({ event, onClose }) => {
  if (!event) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative bg-prakida-bg border border-white/20 p-8 w-full max-w-lg shadow-[0_0_50px_rgba(244,140,6,0.2)] rounded-sm overflow-hidden"
      >
        {}
        <div className="absolute top-0 left-0 w-20 h-1 bg-prakida-flame"></div>
        <div className="absolute bottom-0 right-0 w-20 h-1 bg-prakida-water"></div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-prakida-flame font-bold tracking-widest text-sm mb-2 uppercase">
          {event.sport} / {event.tag} PILLAR
        </h2>
        <h3 className="text-3xl font-display font-bold text-white mb-6">
          {event.match}
        </h3>

        <div className="space-y-6 text-gray-300">
          <div className="flex justify-between border-b border-white/10 pb-4">
            <div>
              <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">
                Venue
              </span>
              <span className="font-bold text-white">{event.venue}</span>
            </div>
            <div className="text-right">
              <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">
                Time
              </span>
              <span className="font-mono text-prakida-water">{event.time}</span>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-2">Rules & Format</h4>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-400">
              <li>Official {event.sport} Federation Rules apply.</li>
              <li>Teams must report 30 minutes prior to the start.</li>
              <li>Format: Knockout stages unless specified otherwise.</li>
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={onClose}
            className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-bold tracking-widest transition-colors uppercase border border-white/10"
          >
            Close Details
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default MatchModal;
