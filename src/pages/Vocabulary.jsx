import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { listVocabulary, addVocabulary } from '../services/api';
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
  const [error, setError] = useState(null);

  const loadVocabulary = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await listVocabulary();

      let vocabularyData = [];

      // Xử lý linh hoạt các dạng phản hồi từ API
      if (Array.isArray(response.data)) {
        vocabularyData = response.data;
      } else if (Array.isArray(response.data?.data)) {
        vocabularyData = response.data.data;
      } else if (response.data && typeof response.data === 'object') {
        vocabularyData = Object.values(response.data);
      }

      setWords(vocabularyData);
    } catch (err) {
      console.error('Error loading vocabulary:', err);
      setError('Không thể tải dữ liệu từ vựng.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadVocabulary();
  }, [loadVocabulary]);

  const handleAddWord = async (newWord) => {
    try {
      await addVocabulary(newWord);
      await loadVocabulary();
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error adding word:', err);
      setError('Không thể thêm từ mới.');
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

        {/* Khi đang tải */}
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        )}

        {/* Khi lỗi */}
        {!isLoading && error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
            {error}
          </div>
        )}

        {/* Khi không có từ vựng */}
        {!isLoading && !error && words.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 py-12">
            Bạn chưa có từ vựng nào. Hãy thêm từ đầu tiên!
          </div>
        )}

        {/* Khi có từ vựng */}
        {!isLoading && !error && words.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {words.map((word, index) => {
              const wordKey = word?._id || word?.id || `word-${index}`;
              return (
                <motion.div key={wordKey} variants={itemVariants}>
                  <WordList word={word} />
                </motion.div>
              );
            })}
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
