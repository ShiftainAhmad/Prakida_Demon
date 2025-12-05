import { useState } from 'react';

const Registration = () => {
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

        // Save to LocalStorage
        const existingRegistrations = JSON.parse(localStorage.getItem('prakida_registrations') || '[]');
        existingRegistrations.push({ ...formData, timestamp: new Date().toISOString() });
        localStorage.setItem('prakida_registrations', JSON.stringify(existingRegistrations));

        // Feedback
        alert(`Request Sent! The ${formData.sport} corps awaits you, ${formData.name}.`);

        // Reset Form
        setFormData({
            name: '',
            college: '',
            email: '',
            phone: '',
            sport: 'Cricket',
            role: 'Player'
        });
    };

    return (
        <section id="register" className="py-24 bg-black relative border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16">

                    {/* Form Section */}
                    <div className="lg:w-2/3">
                        <div className="mb-10">
                            <h2 className="text-prakida-flame font-bold tracking-[0.2em] mb-4">JOIN THE CORPS</h2>
                            <h3 className="text-4xl font-display font-bold text-white mb-6">REGISTER YOUR TEAM</h3>
                            <p className="text-gray-400">Slots are limited. Total Concentration Breathing recommended for quick sign-ups.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-500 tracking-wider">FULL NAME</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-sm p-4 text-white focus:outline-none focus:border-prakida-water transition-colors"
                                    placeholder="Aditya Kumar"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-500 tracking-wider">COLLEGE / INSTITUTION</label>
                                <input
                                    type="text"
                                    name="college"
                                    value={formData.college}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-sm p-4 text-white focus:outline-none focus:border-prakida-water transition-colors"
                                    placeholder="IIT Delhi"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-500 tracking-wider">EMAIL ADDRESS</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-sm p-4 text-white focus:outline-none focus:border-prakida-water transition-colors"
                                    placeholder="aditya@example.com"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-500 tracking-wider">PHONE NUMBER</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-sm p-4 text-white focus:outline-none focus:border-prakida-water transition-colors"
                                    placeholder="+91 98765 43210"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-500 tracking-wider">SELECT SPORT</label>
                                <select
                                    name="sport"
                                    value={formData.sport}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-sm p-4 text-white focus:outline-none focus:border-prakida-water transition-colors appearance-none"
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
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-500 tracking-wider">ROLE</label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-sm p-4 text-white focus:outline-none focus:border-prakida-water transition-colors appearance-none"
                                >
                                    <option className="bg-gray-900">Player</option>
                                    <option className="bg-gray-900">Captain</option>
                                    <option className="bg-gray-900">Manager</option>
                                </select>
                            </div>

                            <div className="md:col-span-2 mt-6">
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-prakida-flame to-prakida-flameDark text-white font-bold py-4 tracking-widest hover:brightness-110 transition-all transform active:scale-95"
                                >
                                    SUBMIT REGISTRATION
                                </button>
                            </div>
                        </form>
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
                                <a href="mailto:support@prakida.com" className="text-prakida-water hover:text-white transition-colors">support@prakida.com</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Registration;
