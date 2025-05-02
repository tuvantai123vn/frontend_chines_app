import { motion } from 'framer-motion';
import SRSBadge from './SRSBadge';
import { useAuth } from '../../contexts/AuthContext';

export default function WordCard({ word, onUpdate }) {
  const { user } = useAuth();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm mb-4"
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            {word.simplified}
            {word.traditional && (
              <span className="ml-2 text-gray-500">({word.traditional})</span>
            )}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">{word.pinyin}</p>
        </div>
        <SRSBadge level={word.srsLevel} />
      </div>
      
      <p className="text-gray-700 dark:text-gray-400 mb-4">{word.definition}</p>
      
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
        <span className="mr-4">Thêm bởi: {user?.username}</span>
        <span>{new Date(word.createdAt).toLocaleDateString()}</span>
      </div>
    </motion.div>
  );
}