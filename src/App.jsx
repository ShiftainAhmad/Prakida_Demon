import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import HashiraShowcase from './components/HashiraShowcase';
import Gallery from './components/Gallery';
import Schedule from './components/Schedule';
import Registration from './components/Registration';
import Sponsors from './components/Sponsors';
import Footer from './components/Footer';
import NoiseOverlay from './components/ui/NoiseOverlay';

function App() {
  return (
    <div className="bg-prakida-bg min-h-screen text-white overflow-x-hidden selection:bg-prakida-flame selection:text-white">
      <NoiseOverlay />
      <Navbar />
      <main>
        <Hero />
        <About />
        <HashiraShowcase />
        <Gallery />
        <Schedule />
        <Registration />
        <Sponsors />
      </main>
      <Footer />
    </div>
  );
}

export default App;
