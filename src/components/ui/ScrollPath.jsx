import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

const ScrollPath = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Generate a wavy path
    // We'll create a vertical path that snakes down
    const width = 40;
    const height = 600; // Fixed height in pixels for the SVG
    const amplitude = 15;
    const frequency = 0.05;

    // Construct path data
    // M center,0
    // Q control_point, mid_point end_point ...
    // To make it simpler, let's just use string concatenation for a sine-like cubic bezier
    // M 20 0 Q 35 50 20 100 T 20 200 T 20 300 ...

    const pathString = `
        M 20 5
        Q 35 50 20 100
        T 20 200
        T 20 300
        T 20 400
        T 20 500
        T 20 600
    `;

    // Map scroll progress (0-1) to percentage string (0%-100%)
    const offsetDistance = useTransform(scaleX, [0, 1], ["0%", "100%"]);

    return (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:block h-[600px] w-[40px] pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 40 605" className="overflow-visible">
                {/* The Track (Faint Line) */}
                <path
                    d={pathString}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth="2"
                    strokeLinecap="round"
                />

                {/* The Progress Line (Fills up) */}
                <motion.path
                    d={pathString}
                    fill="none"
                    stroke="#FF5722" // prakida-flame
                    strokeWidth="2"
                    strokeLinecap="round"
                    style={{ pathLength: scaleX }}
                />

                {/* The Dot (Follows the path) */}
                {/* 
                    Using CSS offset-path (motion-path).
                    Note: 'offset-path' support is good in modern browsers (Chrome/Edge/FF).
                    We need to apply the same path data to the style 'offsetPath'.
                */}
                <motion.div
                    className="w-3 h-3 bg-prakida-flame rounded-full shadow-[0_0_10px_#FF5722]"
                    style={{
                        offsetPath: `path('${pathString.replace(/\s+/g, ' ').trim()}')`, // Cleanup newlines for CSS
                        offsetDistance: offsetDistance
                    }}
                />
            </svg>
        </div>
    );
};

export default ScrollPath;
