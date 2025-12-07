import Schedule from '../components/Schedule';

const Events = () => {
    return (
        <div className="pt-24 min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl md:text-5xl font-russ mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-prakida-flame to-orange-600">
                    Tournament Arc
                </h1>
                <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
                    Prepare for the ultimate battles. The schedule is set, but are you ready to face the demons?
                </p>
                <Schedule />
            </div>
        </div>
    );
};

export default Events;
