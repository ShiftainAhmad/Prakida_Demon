import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParallaxElement from './ui/ParallaxElement';
import MatchModal from './ui/MatchModal';

const Schedule = () => {
    const [activeDay, setActiveDay] = useState(1);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const scheduleData = {
        1: [
            { time: "09:00 AM", sport: "Cricket", match: "Round 1: Team A vs Team B", venue: "Main Ground", tag: "Water" },
            { time: "10:00 AM", sport: "Carrom", match: "Doubles Round 1", venue: "Student Lounge", tag: "Mist" },
            { time: "10:30 AM", sport: "Badminton", match: "Qualifiers", venue: "Indoor Court A", tag: "Insect" },
            { time: "02:00 PM", sport: "Basketball", match: "League Match 1", venue: "Court 1", tag: "Sound" },
            { time: "04:30 PM", sport: "Football", match: "League Match A", venue: "Football Field", tag: "Flame" },
        ],
        2: [
            { time: "09:00 AM", sport: "Volleyball", match: "Semi-Finals", venue: "Court 2", tag: "Wind" },
            { time: "10:00 AM", sport: "Chess", match: "Rapid Tournament", venue: "Library Hall", tag: "Serpent" },
            { time: "11:00 AM", sport: "Table Tennis", match: "Quarter Finals", venue: "Indoor Hall", tag: "Thunder" },
            { time: "02:00 PM", sport: "Football", match: "Semi-Finals", venue: "Football Field", tag: "Flame" },
            { time: "03:00 PM", sport: "Cricket", match: "Semi-Finals", venue: "Main Ground", tag: "Water" },
        ],
        3: [
            { time: "09:00 AM", sport: "Carrom", match: "FINALS", venue: "Student Lounge", tag: "Mist", type: "final" },
            { time: "10:00 AM", sport: "Badminton", match: "FINALS", venue: "Indoor Court A", tag: "Insect", type: "final" },
            { time: "11:00 AM", sport: "Chess", match: "GRAND FINALS", venue: "Library Hall", tag: "Serpent", type: "final" },
            { time: "01:00 PM", sport: "Football", match: "FINALS", venue: "Football Field", tag: "Flame", type: "final" },
            { time: "06:00 PM", sport: "Cricket", match: "GRAND FINALE", venue: "Main Ground", tag: "Water", type: "final" },
        ]
    };

    return (
        <section id="schedule" className="py-24 bg-prakida-bg relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16 relative">
                    <ParallaxElement speed={-0.1} direction="up">
                        <h2 className="text-prakida-water font-bold tracking-[0.2em] mb-4">TIMELINE</h2>
                    </ParallaxElement>
                    <ParallaxElement speed={0.1} direction="down">
                        <h3 className="text-4xl md:text-5xl font-display font-bold text-white">EVENTS SCHEDULE</h3>
                    </ParallaxElement>
                </div>

                {/* Day Tabs */}
                <div className="relative flex justify-center gap-4 mb-12">
                    {/* Connecting Line */}
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -z-10"></div>

                    {[
                        { id: 1, label: 'JAN 13', sub: 'Day 1' },
                        { id: 2, label: 'JAN 14', sub: 'Day 2' },
                        { id: 3, label: 'JAN 15', sub: 'Day 3' }
                    ].map((day) => (
                        <button
                            key={day.id}
                            onClick={() => setActiveDay(day.id)}
                            className={`px-4 py-2 md:px-8 md:py-3 font-display font-bold text-sm md:text-lg tracking-wider transition-all duration-300 border-b-2 group relative z-10 bg-prakida-bg ${activeDay === day.id
                                ? 'text-white border-prakida-flame'
                                : 'text-gray-500 border-transparent hover:text-gray-300'
                                }`}
                        >
                            <span className="block">{day.label}</span>
                            <span className={`text-[10px] md:text-xs block mt-1 tracking-widest ${activeDay === day.id ? 'text-prakida-flame' : 'text-gray-600 group-hover:text-gray-500'}`}>{day.sub}</span>
                        </button>
                    ))}
                </div>

                {/* Schedule List */}
                <div className="max-w-4xl mx-auto min-h-[400px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeDay}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="grid gap-4"
                        >
                            {scheduleData[activeDay].map((item, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setSelectedEvent(item)}
                                    className={`cursor-pointer flex flex-col md:flex-row items-center p-6 bg-white/5 border ${item.type === 'final' ? 'border-prakida-flame/50 bg-prakida-flame/5' : 'border-white/5'} hover:bg-white/10 transition-colors rounded-sm group`}
                                >
                                    <div className="md:w-32 font-mono text-prakida-water text-lg font-bold mb-2 md:mb-0">
                                        {item.time}
                                    </div>
                                    <div className="flex-1 text-center md:text-left">
                                        <h4 className="text-xl font-bold text-white font-display group-hover:text-prakida-flame transition-colors">{item.sport}</h4>
                                        <div className="text-gray-400 text-sm">{item.match} @ <span className="text-gray-500">{item.venue}</span></div>
                                    </div>
                                    <div className="mt-4 md:mt-0">
                                        <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${item.tag === 'Water' ? 'bg-blue-900/50 text-blue-300' :
                                            item.tag === 'Flame' ? 'bg-red-900/50 text-red-300' :
                                                item.tag === 'Sound' ? 'bg-purple-900/50 text-purple-300' :
                                                    item.tag === 'Insect' ? 'bg-emerald-900/50 text-emerald-300' :
                                                        item.tag === 'Mist' ? 'bg-cyan-900/50 text-cyan-300' :
                                                            item.tag === 'Wind' ? 'bg-lime-900/50 text-lime-300' :
                                                                item.tag === 'Serpent' ? 'bg-indigo-900/50 text-indigo-300' :
                                                                    item.tag === 'Stone' ? 'bg-stone-700/50 text-stone-300' :
                                                                        item.tag === 'Thunder' ? 'bg-yellow-900/50 text-yellow-300' :
                                                                            'bg-pink-900/50 text-pink-300'
                                            }`}>
                                            {item.tag} Pillar
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Match Detail Modal using AnimatePresence */}
            <AnimatePresence>
                {selectedEvent && (
                    <MatchModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
                )}
            </AnimatePresence>
        </section>
    );
};

export default Schedule;
