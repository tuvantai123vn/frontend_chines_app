import { motion } from 'framer-motion';
import WordCard from './WordCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export default function WordList({ words }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {words.map((word) => (
        <motion.div key={word._id} variants={itemVariants}>
          <WordCard word={word} />
        </motion.div>
      ))}
      
      {words.length === 0 && (
        <div className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400">
          Không có từ vựng nào được tìm thấy
        </div>
      )}
    </motion.div>
  );
}