import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AnimatedButton = ({ children, onClick, className, to }) => {
  // Shared motion props
  const motionProps = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    className: `px-6 py-3 rounded-xl font-medium ${className}`,
    onClick
  };

  // Nếu có `to`, render dưới dạng Link
  if (to) {
    return (
      <motion.div
        whileHover={motionProps.whileHover}
        whileTap={motionProps.whileTap}
        className={motionProps.className}
      >
        <Link to={to}>
          {children}
        </Link>
      </motion.div>
    );
  }

  // Nếu không có `to`, render dưới dạng button
  return (
    <motion.button
      whileHover={motionProps.whileHover}
      whileTap={motionProps.whileTap}
      className={motionProps.className}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;
