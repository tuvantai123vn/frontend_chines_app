// src/components/Common/LoadingSpinner.jsx
import { motion } from 'framer-motion';

export default function LoadingSpinner({ fullScreen = false }) {
  return (
    <div className={`flex items-center justify-center ${fullScreen ? 'min-h-screen' : 'py-8'}`}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full"
      />
    </div>
  );
}