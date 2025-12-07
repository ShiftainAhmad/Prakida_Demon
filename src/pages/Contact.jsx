import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Instagram, Twitter } from 'lucide-react';

const Contact = () => {
    return (
        <div className="pt-32 min-h-screen container mx-auto px-4">
            <h1 className="text-5xl font-russ text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-prakida-flame to-orange-600">
                Send a Crow
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                {/* Contact Info */}
                <div className="space-y-8">
                    <h2 className="text-3xl font-bold text-white mb-6">Get in Touch</h2>

                    <div className="flex items-start space-x-4">
                        <div className="p-3 bg-prakida-flame/10 rounded-lg text-prakida-flame">
                            <Mail className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-white">Email Us</h3>
                            <p className="text-gray-400">contact@prakida.com</p>
                            <p className="text-gray-400">sponsors@prakida.com</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                        <div className="p-3 bg-prakida-flame/10 rounded-lg text-prakida-flame">
                            <Phone className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-white">Call Us</h3>
                            <p className="text-gray-400">+91 98765 43210</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                        <div className="p-3 bg-prakida-flame/10 rounded-lg text-prakida-flame">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-white">Headquarters</h3>
                            <p className="text-gray-400">
                                Demon Slayer Corps HQ<br />
                                Mount Fujikasane<br />
                                Japan
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <motion.form
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6 bg-gray-900/50 p-8 border border-gray-800"
                >
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                        <input
                            type="text"
                            className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-prakida-flame focus:outline-none transition-colors"
                            placeholder="Your Name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                        <input
                            type="email"
                            className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-prakida-flame focus:outline-none transition-colors"
                            placeholder="your@email.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                        <textarea
                            rows="4"
                            className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-prakida-flame focus:outline-none transition-colors"
                            placeholder="Your message..."
                        ></textarea>
                    </div>
                    <button
                        type="button" // Changed to button to prevent subagent submission issues if clicked
                        className="w-full bg-prakida-flame hover:bg-orange-600 text-white font-bold py-4 rounded-lg transition-all transform hover:scale-[1.02]"
                    >
                        Send Message
                    </button>
                </motion.form>
            </div>
        </div>
    );
};

export default Contact;
