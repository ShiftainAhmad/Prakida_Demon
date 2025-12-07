import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{
                opacity: 0,
                scale: 0.95,
                filter: 'blur(10px) brightness(0.5)',
                transition: { duration: 0.8, ease: "easeInOut" }
            }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="w-full h-full"
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
