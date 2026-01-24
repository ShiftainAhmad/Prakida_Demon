import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { buttonHover, buttonTap, sectionSlide } from "../utils/motion";

const Login = () => {
  const { signIn, signInWithGoogle } = useAuth();
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

          <motion.button
            whileHover={buttonHover}
            whileTap={buttonTap}
            onClick={async () => {
              setLoading(true);
              const { error } = await signInWithGoogle();
              if (error) {
                setError(error.message);
                setLoading(false);
              } else {
                navigate("/");
              }
            }}
            disabled={loading}
            type="button"
            className="w-full bg-white text-black font-bold py-3 flex items-center justify-center gap-3 tracking-widest hover:bg-gray-200 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 4.6c1.62 0 3.07.56 4.23 1.67l3.18-3.18C17.45 1.19 14.97 0 12 0 7.7 0 3.99 2.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            GOOGLE
          </motion.button>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px bg-white/10 flex-1"></div>
            <span className="text-xs text-gray-500 font-mono">OR</span>
            <div className="h-px bg-white/10 flex-1"></div>
          </div>

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
