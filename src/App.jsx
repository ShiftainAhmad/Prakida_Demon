import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NoiseOverlay from './components/ui/NoiseOverlay';
import ScrollToTop from './components/ui/ScrollToTop';
import AshOverlay from './components/ui/AshOverlay';
import PageTransition from './components/ui/PageTransition';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Events = lazy(() => import('./pages/Events'));
const Merchandise = lazy(() => import('./pages/Merchandise'));
const Sports = lazy(() => import('./pages/Sports'));
const Contact = lazy(() => import('./pages/Contact'));
const RegisterSection = lazy(() => import('./pages/RegisterSection'));

// Separate component to use hook inside Router
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <>
      <AshOverlay />
      <AnimatePresence mode="wait">
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-black text-prakida-flame font-display text-2xl tracking-widest">LOADING...</div>}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/events" element={<PageTransition><Events /></PageTransition>} />
            <Route path="/merchandise" element={<PageTransition><Merchandise /></PageTransition>} />
            <Route path="/sports" element={<PageTransition><Sports /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="/register" element={<PageTransition><RegisterSection /></PageTransition>} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="bg-prakida-bg min-h-screen text-white overflow-x-hidden selection:bg-prakida-flame selection:text-white">
        <NoiseOverlay />
        <Navbar />
        <main>
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
