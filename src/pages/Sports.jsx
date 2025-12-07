import HashiraShowcase from '../components/HashiraShowcase';

const Sports = () => {
    return (
        <div className="bg-black min-h-screen pt-24">
            <div className="container mx-auto px-4 pb-8">
                <p className="text-center text-gray-400 max-w-2xl mx-auto">
                    Meet the elite warriors representing each sport. The Pillars of Prakida.
                </p>
            </div>
            {/* Show ALL items on Team page */}
            <HashiraShowcase />
        </div>
    );
};

export default Sports;
