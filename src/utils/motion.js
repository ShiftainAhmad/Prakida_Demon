
// High-Energy Sports Fest Motion System
// Direction: Impact, Momentum, Power, Aggression

// 1. Hero Section (Primary Load Motion)
export const heroPunchIn = {
    hidden: {
        y: 60,
        opacity: 0,
        scale: 0.95
    },
    visible: {
        y: 0,
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.45,
            ease: [0.16, 1, 0.3, 1], // Strong ease-out cubic-bezier
        }
    }
};

// 2. Section Reveal (Slide Left -> Right with Rotation Correction)
export const sectionSlide = {
    hidden: {
        x: -100,
        opacity: 0,
        rotate: -2
    },
    visible: {
        x: 0,
        opacity: 1,
        rotate: 0,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

// 7. Stagger System (Grid Container)
export const gridStagger = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08, // Fast, aggressive stagger
            delayChildren: 0.1
        }
    }
};

// 3. Sports Events / Cards Grid (Snap into place)
export const cardSnap = {
    hidden: {
        scale: 0.9,
        opacity: 0,
        y: 20
    },
    visible: {
        scale: 1,
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 20,
            mass: 0.8
        }
    }
};

// 4. Hover Interactions
export const cardHover = {
    scale: 1.06,
    rotate: 0.6,
    transition: { duration: 0.2, ease: "circOut" }
};

export const buttonHover = {
    scale: 1.08,
    boxShadow: "0px 0px 20px rgba(244,140,6,0.6)",
    transition: { type: "spring", stiffness: 400, damping: 10 }
};

export const buttonTap = {
    scale: 0.92,
    transition: { duration: 0.1 }
};

// 5. Scroll Momentum (Text Lag - helper function for useScroll)
// Note: This needs to be used with useScroll + useTransform in components
export const scrollLagConfig = {
    damping: 15,
    stiffness: 150,
    mass: 0.1
};

// 6. Page Transition (Hard Match-Cut)
export const pageTransition = {
    initial: {
        opacity: 0,
        scale: 0.98,
        filter: "blur(5px)"
    },
    animate: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: {
            duration: 0.25,
            ease: "circOut"
        }
    },
    exit: {
        opacity: 0,
        scale: 1.02,
        filter: "blur(5px)",
        transition: {
            duration: 0.25,
            ease: "circIn"
        }
    }
};
