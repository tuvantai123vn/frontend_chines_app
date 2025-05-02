import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedButton from '../Common/AnimatedButton';

export default function EssayTest({ data, onSubmit }) {
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    if (!answer.trim()) return;
    onSubmit(answer);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Nhập nghĩa của từ
        </h2>
        <p className="text-4xl font-semibold text-center mb-6 text-gray-900 dark:text-gray-100">
          {data.word}
        </p>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
          Pinyin: {data.pinyin}
        </p>
      </div>

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Nhập câu trả lời của bạn..."
        className="w-full h-32 p-4 rounded-lg border-2 border-gray-200 dark:border-gray-600 
          dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500 
          focus:border-transparent resize-none"
      />

      <AnimatedButton
        onClick={handleSubmit}
        disabled={!answer.trim()}
        className={`w-full mt-6 py-3 text-lg ${
          answer.trim()
            ? 'bg-green-500 hover:bg-green-600' 
            : 'bg-gray-400 cursor-not-allowed'
        } text-white rounded-lg`}
      >
        Kiểm tra đáp án
      </AnimatedButton>
    </motion.div>
  );
}