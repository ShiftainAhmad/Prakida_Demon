import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { buttonHover, buttonTap, sectionSlide } from "../utils/motion";

const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await signIn(email, password);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate("/");
    }
  };

  return (
    <section className="min-h-screen pt-24 pb-12 bg-black relative flex items-center justify-center overflow-hidden">
      {}
      <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-5 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-transparent to-black pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10 w-full max-w-md">
        <motion.div
          variants={sectionSlide}
          initial="hidden"
          animate="visible"
          className="bg-white/5 border border-white/10 p-8 backdrop-blur-sm relative"
        >
          {}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-prakida-flame"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-prakida-flame"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-prakida-flame"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-prakida-flame"></div>

          <h2 className="text-3xl font-display font-bold text-white mb-2 text-center">
            WELCOME BACK
          </h2>
          <p className="text-gray-400 text-center mb-8 text-sm tracking-widest">
            CONTINUE YOUR JOURNEY
          </p>

          {error && (
            <div className="mb-6 p-4 rounded border bg-red-900/20 border-red-500/50 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 block">
            <div className="space-y-2 group">
              <label className="text-xs font-bold text-gray-500 tracking-[0.2em] uppercase">
                EMAIL
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 p-4 text-white focus:outline-none focus:border-prakida-water transition-all duration-300 placeholder:text-gray-700 font-mono"
                  placeholder="ENTER EMAIL..."
                  required
                />
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-prakida-water group-focus-within:w-full transition-all duration-500"></div>
              </div>
            </div>

            <div className="space-y-2 group">
              <label className="text-xs font-bold text-gray-500 tracking-[0.2em] uppercase">
                PASSWORD
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 p-4 text-white focus:outline-none focus:border-prakida-water transition-all duration-300 placeholder:text-gray-700 font-mono"
                  placeholder="ENTER PASSWORD..."
                  required
                />
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-prakida-water group-focus-within:w-full transition-all duration-500"></div>
              </div>
            </div>

            <motion.button
              whileHover={buttonHover}
              whileTap={buttonTap}
              type="submit"
              disabled={loading}
              className="relative w-full overflow-hidden group bg-prakida-flame text-white font-bold py-4 tracking-[0.3em] transition-all hover:bg-prakida-flameDark disabled:opacity-50 disabled:cursor-not-allowed mt-4 block"
            >
              <span className="relative z-10">
                {loading ? "AUTHENTICATING..." : "LOGIN"}
              </span>
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500 pointer-events-none"></div>
            </motion.button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-prakida-water hover:text-white transition-colors font-bold"
              >
                REGISTER NOW
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Login;
