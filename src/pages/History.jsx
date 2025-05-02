// src/pages/History.jsx
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getTestHistory } from '../services/history';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import { format } from 'date-fns';

const HistoryItem = ({ history }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-4 overflow-hidden"
    >
      <div className="p-4 flex justify-between items-center cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {history.testType === 'essay' ? 'Tự luận' : 'Trắc nghiệm'}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {format(new Date(history.createdAt), 'HH:mm dd/MM/yyyy')}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className={`px-3 py-1 rounded-full ${history.score >= 80 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {history.score}%
          </span>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="text-gray-600 dark:text-gray-400"
          >
            ▼
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gray-100 dark:border-gray-700"
          >
            <div className="p-4 space-y-3">
              {history.questions.map((question, index) => (
                <div 
                  key={index}
                  className={`p-3 rounded-lg ${question.correct ? 'bg-green-50 dark:bg-green-900' : 'bg-red-50 dark:bg-red-900'}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white text-lg mb-1">
                        {question.hanzi}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Câu trả lời của bạn: {question.answer}
                      </p>
                    </div>
                    <span className={`text-xl ${question.correct ? 'text-green-500' : 'text-red-500'}`}>
                      {question.correct ? '✓' : '✗'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await getTestHistory();
        setHistory(response.data);
      } catch (err) {
        setError('Không thể tải lịch sử bài kiểm tra');
      } finally {
        setLoading(false);
      }
    };
    
    fetchHistory();
  }, []);

  if (loading) return <LoadingSpinner fullScreen />;

  if (error) {
    return (
      <div className="text-center py-12 text-red-500 dark:text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
          Lịch sử bài kiểm tra
        </h1>

        {history.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            Chưa có bài kiểm tra nào được ghi lại
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {history.map((item, index) => (
              <HistoryItem key={item._id} history={item} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}