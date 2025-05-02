import { motion, AnimatePresence } from 'framer-motion';
import AnimatedButton from '../Common/AnimatedButton';

export default function AnswerFeedback({ isOpen, isCorrect, onContinue }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`p-8 rounded-xl text-center ${
              isCorrect 
                ? 'bg-green-100 dark:bg-green-900' 
                : 'bg-red-100 dark:bg-red-900'
            }`}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              className="text-6xl mb-4"
            >
              {isCorrect ? '🎉' : '😞'}
            </motion.div>
            <h2 className="text-2xl font-bold mb-4">
              {isCorrect ? 'Chính xác!' : 'Cần cố gắng hơn!'}
            </h2>
            <AnimatedButton
              onClick={onContinue}
              className={`${
                isCorrect 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'bg-red-500 hover:bg-red-600'
              } text-white`}
            >
              Tiếp tục
            </AnimatedButton>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}