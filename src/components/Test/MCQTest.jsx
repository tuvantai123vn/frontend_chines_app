import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedButton from '../Common/AnimatedButton';

export default function MCQTest({ data, onSubmit }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSubmit = () => {
    if (!selectedOption) return;
    onSubmit(selectedOption);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          {data.question || "Câu hỏi trắc nghiệm"}
        </h2>
        {data.word && (
          <p className="text-4xl font-semibold text-center mb-6 text-gray-900 dark:text-gray-100">
            {data.word}
          </p>
        )}
      </div>

      <div className="space-y-3">
        {data.options.map((option, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            className={`p-4 rounded-lg cursor-pointer border-2 transition-colors
              ${selectedOption === option 
                ? 'border-green-500 bg-green-50 dark:bg-green-900' 
                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'}
            `}
            onClick={() => setSelectedOption(option)}
          >
            <span className="text-gray-700 dark:text-gray-200">{option}</span>
          </motion.div>
        ))}
      </div>

      <AnimatedButton
        onClick={handleSubmit}
        disabled={!selectedOption}
        className={`w-full mt-6 py-3 text-lg ${
          selectedOption 
            ? 'bg-green-500 hover:bg-green-600' 
            : 'bg-gray-400 cursor-not-allowed'
        } text-white rounded-lg`}
      >
        Kiểm tra đáp án
      </AnimatedButton>
    </motion.div>
  );
}