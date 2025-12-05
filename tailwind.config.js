/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                prakida: {
                    bg: '#0a0a0a',
                    text: '#e5e5e5',
                    water: '#00B4D8',
                    flame: '#F48C06',
                    flameDark: '#D00000',
                    sound: '#C77DFF',
                    insect: '#9D4EDD',
                    insectMint: '#80FFDB',
                    mist: '#ADE8F4',
                    mistDark: '#90E0EF',
                    love: '#FFCCD5',
                    loveGreen: '#B7E4C7',
                    // New additions
                    wind: '#A3E635', // Lime green
                    windDark: '#3F6212',
                    serpent: '#1E293B', // Navy/Dark Slate
                    serpentLight: '#94A3B8',
                    stone: '#78716C', // Stone Grey
                    stoneDark: '#44403C',
                    thunder: '#FACC15', // Yellow
                    thunderDark: '#A16207',
                }
            },
            fontFamily: {
                display: ['"Khand"', 'sans-serif'],
                sans: ['"Inter"', 'sans-serif'],
                serif: ['"Noto Serif JP"', 'serif'],
            },
            backgroundImage: {
                'hero-pattern': "url('/assets/hero-bg.jpg')", // Placeholder
            },
            keyframes: {
                slash: {
                    '0%': { transform: 'translateX(-150%) skewX(-20deg)' },
                    '100%': { transform: 'translateX(150%) skewX(-20deg)' },
                },
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-50%)' },
                }
            },
            animation: {
                'slash': 'slash 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                'marquee': 'marquee 25s linear infinite',
            }
        },
    },
    plugins: [],
}
