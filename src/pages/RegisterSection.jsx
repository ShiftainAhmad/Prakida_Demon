import { Lock } from "lucide-react";
import { motion } from "framer-motion";
import Registration from "../components/Registration";

// ─── Kill-switch: set to false to re-enable registrations ──────────────────
const REGISTRATIONS_CLOSED = true;
// ────────────────────────────────────────────────────────────────────────────

const RegisterSection = () => {
  if (REGISTRATIONS_CLOSED) {
    return (
      <div className="pt-24 min-h-screen bg-black flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center max-w-lg"
        >
          <div className="mb-8 p-6 rounded-full border border-prakida-flame/30 bg-prakida-flame/5">
            <Lock size={48} className="text-prakida-flame" />
          </div>
          <h1 className="text-4xl md:text-5xl font-russ mb-4 text-transparent bg-clip-text bg-gradient-to-r from-prakida-flame to-orange-600 uppercase">
            Registrations Closed
          </h1>
          <p className="text-gray-400 font-mono text-sm leading-relaxed">
            Sports registrations for Prakida are now closed. Thank you to
            everyone who registered. Stay tuned for updates.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen">
      <div className="container mx-auto px-4 py-8 mb-12">
        <h1 className="text-4xl md:text-5xl font-russ mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-prakida-flame to-orange-600">
          Join the Corps
        </h1>
        <p className="text-center text-gray-300 max-w-2xl mx-auto">
          The Final Selection is approaching. Register your team and prove your
          worth.
        </p>
      </div>
      <Registration />
    </div>
  );
};

export default RegisterSection;
