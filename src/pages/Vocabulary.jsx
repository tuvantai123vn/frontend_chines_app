import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {listVocabulary, addVocabulary } from '../services/vocabulary';
import WordList from '../components/Vocabulary/WordList';
import AddWordModal from '../components/Vocabulary/AddWordModal';
import LoadingSpinner from '../components/Common/LoadingSpinner';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export default function Vocabulary() {
  const [words, setWords] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadVocabulary();
  }, []);

  const loadVocabulary = async () => {
    try {
      const { data } = await listVocabulary();
      setWords(data);
    } catch (error) {
      console.error('Failed to load vocabulary:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddWord = async (newWord) => {
    try {
      await addVocabulary(newWord);
      await loadVocabulary();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to add word:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Từ vựng của tôi
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full"
          >
            + Thêm từ mới
          </button>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : words.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-12">
            Bạn chưa có từ vựng nào. Hãy thêm từ đầu tiên!
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {words.map((word) => (
              <motion.div key={word.id} variants={itemVariants}>
                <WordList word={word} />
              </motion.div>
            ))}
          </motion.div>
        )}

        <AddWordModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddWord}
        />
      </div>
    </div>
  );
}