import { motion } from 'framer-motion';

const images = [
    { src: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=600&auto=format&fit=crop", alt: "Victory Moment", span: "md:col-span-2 md:row-span-2" },
    { src: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600&auto=format&fit=crop", alt: "Intense Match", span: "md:col-span-1 md:row-span-1" },
    { src: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=600&auto=format&fit=crop", alt: "Crowd Cheering", span: "md:col-span-1 md:row-span-1" },
    { src: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=600&auto=format&fit=crop", alt: "Trophy Lift", span: "md:col-span-1 md:row-span-2" },
    { src: "https://images.unsplash.com/photo-1519861531473-920026393112?q=80&w=600&auto=format&fit=crop", alt: "Basketball Dunk", span: "md:col-span-1 md:row-span-1" },
    { src: "https://images.unsplash.com/photo-1628779238951-be2c9f2faf2f?q=80&w=600&auto=format&fit=crop", alt: "Cricket Shot", span: "md:col-span-2 md:row-span-1" },
];

const Gallery = () => {
    return (
        <section id="gallery" className="py-24 bg-prakida-bg relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-prakida-mist/10 via-transparent to-transparent pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-prakida-flame font-bold tracking-[0.2em] mb-4 text-sm md:text-base">ARCHIVES</h2>
                    <h3 className="text-4xl md:text-5xl font-display font-bold text-white">HEROIC MOMENTS</h3>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gray-500 to-transparent mx-auto mt-6"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
                    {images.map((img, idx) => (
                        <motion.div
                            key={idx}
                            className={`relative group overflow-hidden rounded-sm border border-white/10 bg-white/5 ${img.span}`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                        >
                            <img
                                src={img.src}
                                alt={img.alt}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <p className="text-white font-display uppercase tracking-wider text-lg font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    {img.alt}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
