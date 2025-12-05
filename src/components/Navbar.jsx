import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/prakida-logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Hashira', href: '#hashira' },
        { name: 'Schedule', href: '#schedule' },
        { name: 'Register', href: '#register' },
        { name: 'Contact', href: '#footer' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <a href="#" className="flex items-center gap-2 group">
                    <img
                        src={logo}
                        alt="PRAKIDA Logo"
                        className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-gray-300 hover:text-white font-medium tracking-wide text-sm relative group overflow-hidden"
                        >
                            {link.name}
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-prakida-water transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                        </a>
                    ))}
                    <a
                        href="#register"
                        className="px-6 py-2 bg-transparent border border-prakida-flame text-prakida-flame hover:bg-prakida-flame hover:text-white font-bold transition-all duration-300 rounded-sm skew-x-[-12deg] hover:skew-x-0 hover:shadow-[0_0_15px_rgba(244,140,6,0.5)]"
                    >
                        <span className="block skew-x-[12deg] hover:skew-x-0">JOIN NOW</span>
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={32} /> : <Menu size={32} />}
                </button>
            </div>

            {/* Mobile Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 w-full bg-black/95 border-b border-gray-800 md:hidden"
                    >
                        <div className="flex flex-col items-center py-8 gap-6">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-xl text-gray-300 hover:text-prakida-flame font-display tracking-widest"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <a
                                href="#register"
                                onClick={() => setIsOpen(false)}
                                className="mt-4 px-8 py-3 bg-prakida-flame text-white font-bold tracking-wider"
                            >
                                JOIN NOW
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
