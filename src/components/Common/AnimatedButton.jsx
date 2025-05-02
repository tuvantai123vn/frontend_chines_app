import { motion } from 'framer-motion';

const AnimatedButton = ({ children, onClick, className }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-6 py-3 rounded-xl font-medium ${className}`}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;