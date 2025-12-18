import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { buttonHover, buttonTap, sectionSlide } from '../utils/motion';

const Registration = () => {
    const form = useRef();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    const [formData, setFormData] = useState({
        name: '',
        college: '',
        email: '',
        phone: '',
        sport: 'Cricket',
        role: 'Player'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("handleSubmit triggered"); // Debug Log
        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        // EmailJS Configuration
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
        console.log("Env Vars:", { serviceId, templateId, publicKey }); // Debug Log

        if (!serviceId || !templateId || !publicKey) {
            // Fallback for demo/offline mode if keys aren't set
            console.warn("EmailJS keys are missing. Falling back to LocalStorage for demo purposes.");
            const existingRegistrations = JSON.parse(localStorage.getItem('prakida_registrations') || '[]');
            existingRegistrations.push({ ...formData, timestamp: new Date().toISOString() });
            localStorage.setItem('prakida_registrations', JSON.stringify(existingRegistrations));

            setTimeout(() => {
                setIsSubmitting(false);
                setStatus({ type: 'success', message: `Request Sent (Local Mode)! The ${formData.sport} corps awaits you, ${formData.name}.` });
                setFormData({
                    name: '',
                    college: '',
                    email: '',
                    phone: '',
                    sport: 'Cricket',
                    role: 'Player'
                });
            }, 1000);
            return;
        }

        emailjs.sendForm(serviceId, templateId, form.current, publicKey)
            .then((result) => {
                console.log(result.text);
                setStatus({ type: 'success', message: `Request Sent! Check your email, ${formData.name}.` });
                setFormData({
                    name: '',
                    college: '',
                    email: '',
                    phone: '',
                    sport: 'Cricket',
                    role: 'Player'
                });
            }, (error) => {
                console.log("EmailJS Error:", error); // Debug Log
                console.log(error.text);
                setStatus({ type: 'error', message: 'Failed to send registration. Please try again or contact support.' });
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return (
        <section id="register" className="py-24 bg-black relative border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16">

                    {/* Form Section */}
                    <div className="lg:w-2/3">
                        <motion.div variants={sectionSlide} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
                            <h2 className="text-prakida-flame font-bold tracking-[0.2em] mb-4">JOIN THE CORPS</h2>
                            <h3 className="text-4xl font-display font-bold text-white mb-6">REGISTER YOUR TEAM</h3>
                            <p className="text-gray-400">Slots are limited. Total Concentration Breathing recommended for quick sign-ups.</p>
                        </motion.div>

                        {status.message && (
                            <div className={`mb-6 p-4 rounded border ${status.type === 'success' ? 'bg-green-900/20 border-green-500/50 text-green-400' : 'bg-red-900/20 border-red-500/50 text-red-400'}`}>
                                {status.message}
                            </div>
                        )}

                        <div className="relative p-8 border border-white/10 bg-white/5 overflow-hidden">
                            {/* Decorative HUD Elements */}
                            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-prakida-flame"></div>
                            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-prakida-flame"></div>
                            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-prakida-flame"></div>
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-prakida-flame"></div>

                            <form ref={form} onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                                {['name', 'college', 'email', 'phone'].map((field) => (
                                    <div key={field} className="space-y-2 group">
                                        <label className="text-xs font-bold text-gray-500 tracking-[0.2em] uppercase">{field}</label>
                                        <div className="relative">
                                            <input
                                                type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                                                name={field}
                                                value={formData[field]}
                                                onChange={handleChange}
                                                className="w-full bg-black/50 border border-white/10 p-4 text-white focus:outline-none focus:border-prakida-water transition-all duration-300 placeholder:text-gray-700 font-mono"
                                                placeholder={`ENTER ${field.toUpperCase()}...`}
                                                required
                                            />
                                            {/* Input Focus Brackets */}
                                            <div className="absolute inset-0 border border-transparent group-hover:border-white/20 pointer-events-none transition-colors duration-300"></div>
                                            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-prakida-water group-focus-within:w-full transition-all duration-500"></div>
                                        </div>
                                    </div>
                                ))}

                                <div className="space-y-2 group">
                                    <label className="text-xs font-bold text-gray-500 tracking-[0.2em] uppercase">SELECT SPORT</label>
                                    <div className="relative">
                                        <select
                                            name="sport"
                                            value={formData.sport}
                                            onChange={handleChange}
                                            className="w-full bg-black/50 border border-white/10 p-4 text-white focus:outline-none focus:border-prakida-water transition-all duration-300 appearance-none font-mono"
                                        >
                                            <option className="bg-gray-900">Cricket (Water)</option>
                                            <option className="bg-gray-900">Volleyball (Wind)</option>
                                            <option className="bg-gray-900">Badminton (Insect)</option>
                                            <option className="bg-gray-900">Basketball (Sound)</option>
                                            <option className="bg-gray-900">Football (Flame)</option>
                                            <option className="bg-gray-900">Chess (Serpent)</option>
                                            <option className="bg-gray-900">Carrom (Mist)</option>
                                            <option className="bg-gray-900">Lawn Tennis (Love)</option>
                                            <option className="bg-gray-900">Table Tennis (Thunder)</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-prakida-flame font-bold">▼</div>
                                    </div>
                                </div>

                                <div className="space-y-2 group">
                                    <label className="text-xs font-bold text-gray-500 tracking-[0.2em] uppercase">ROLE</label>
                                    <div className="relative">
                                        <select
                                            name="role"
                                            value={formData.role}
                                            onChange={handleChange}
                                            className="w-full bg-black/50 border border-white/10 p-4 text-white focus:outline-none focus:border-prakida-water transition-all duration-300 appearance-none font-mono"
                                        >
                                            <option className="bg-gray-900">Player</option>
                                            <option className="bg-gray-900">Captain</option>
                                            <option className="bg-gray-900">Manager</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-prakida-flame font-bold">▼</div>
                                    </div>
                                </div>

                                <div className="md:col-span-2 mt-6">
                                    <motion.button
                                        whileHover={buttonHover}
                                        whileTap={buttonTap}
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="relative w-full overflow-hidden group bg-prakida-flame text-white font-bold py-3 md:py-5 tracking-[0.3em] transition-all hover:bg-prakida-flameDark disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <span className="relative z-10">{isSubmitting ? 'INITIALIZING...' : 'INITIATE REGISTRATION'}</span>
                                        <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500 pointer-events-none"></div>
                                    </motion.button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Rules Side Panel */}
                    <div className="lg:w-1/3 mt-10 lg:mt-0">
                        <div className="bg-white/5 border border-white/10 p-8 rounded-sm">
                            <h4 className="text-xl font-display font-bold text-white mb-6 border-b border-white/10 pb-4">
                                RULES OF ENGAGEMENT
                            </h4>
                            <ul className="space-y-4 text-gray-400">
                                <li className="flex gap-3">
                                    <span className="text-prakida-water font-bold">01.</span>
                                    <span>Respect the opponent. Sportsmanship is the highest honor.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-prakida-water font-bold">02.</span>
                                    <span>All teams must arrive 30 mins before scheduled time.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-prakida-water font-bold">03.</span>
                                    <span>Referees decision is final. No arguments will be tolerated.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-prakida-water font-bold">04.</span>
                                    <span>Valid College ID is mandatory for all participants.</span>
                                </li>
                            </ul>
                            <div className="mt-8 pt-6 border-t border-white/10 text-center">
                                <p className="text-sm text-gray-500">Need help?</p>
                                <a href="mailto:ahmadsiftain0007@gmail.com" className="text-prakida-water hover:text-white transition-colors">prakida@bitmesra.ac.in</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Registration;

