import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const AshOverlay = () => {
    const canvasRef = useRef(null);
    const location = useLocation();
    const particlesRef = useRef([]);
    const animationFrameRef = useRef();
    const isActiveRef = useRef(false);

    // Unified effect to handle canvas and animation loop
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Animation loop
        const animate = () => {
            if (!isActiveRef.current && particlesRef.current.length === 0) {
                // Stop loop if no activity
                animationFrameId = null;
                return;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Spawn continuous few particles if active
            if (isActiveRef.current && Math.random() > 0.5) {
                spawnAsh(2);
            }

            particlesRef.current.forEach((p, index) => {
                p.y -= p.speedY;
                p.x += Math.sin(p.y * 0.01) * 0.5;
                p.alpha -= 0.005;
                p.rotation += p.rotationSpeed;

                if (p.alpha <= 0) {
                    particlesRef.current.splice(index, 1);
                } else {
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.rotation);
                    ctx.globalAlpha = p.alpha;
                    ctx.fillStyle = p.color;
                    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                    ctx.restore();
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        // Trigger burst and start loop
        isActiveRef.current = true;
        spawnAsh(150);

        // Timer to stop spawning
        const timer = setTimeout(() => {
            isActiveRef.current = false;
        }, 1000);

        if (!animationFrameId) {
            animate();
        }

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
            clearTimeout(timer);
        };
    }, [location]); // Re-run effect on location change (simple and robust)

    const spawnAsh = (count) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        for (let i = 0; i < count; i++) {
            particlesRef.current.push({
                x: Math.random() * canvas.width,
                y: canvas.height + Math.random() * 100, // Start below or near bottom
                size: Math.random() * 8 + 2, // 2px to 10px
                speedY: Math.random() * 3 + 1,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.1,
                alpha: 1,
                color: Math.random() > 0.8 ? '#F48C06' : Math.random() > 0.5 ? '#333' : '#111' // Mix of flame orange, dark grey, black
            });
        }
    };

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[60]" // z-60 to be above navbar (z-50) if we want full immersion
        />
    );
};

export default AshOverlay;
