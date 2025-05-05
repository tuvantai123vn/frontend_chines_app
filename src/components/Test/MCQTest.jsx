import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedButton from '../Common/AnimatedButton';

export default function MCQTest({ data, onSubmit }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});

  if (!data || data.length === 0) {
    return (
      <div className="text-center mt-10 text-red-500">
        Không có dữ liệu để làm bài trắc nghiệm.
      </div>
    );
  }

  const currentQuestion = data[currentQuestionIndex];
  const totalQuestions = data.length;

  const handleOptionSelect = (option) => {
    setSelectedOptions(prev => ({
      ...prev,
      [currentQuestionIndex]: option
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleFinalSubmit = () => {
    const answers = data.map((question, index) => ({
      testId: question.testId,
      questionId: question.question.index,
      answer: selectedOptions[index] || null,
      correctAnswer: question.correctAnswer,
      meaning: question.question.meaning,
    }));
    onSubmit(answers);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <div className="text-gray-500 dark:text-gray-400">
          Câu {currentQuestionIndex + 1}/{totalQuestions}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          {currentQuestion.question.meaning}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {currentQuestion.question.options.map((option, index) => {
          const isSelected = selectedOptions[currentQuestionIndex] === option;

          return (
            <motion.button
              key={index}
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleOptionSelect(option)}
              className={`w-full py-3 px-4 rounded-lg text-center transition-all duration-200 border-2
                ${isSelected
                  ? 'bg-green-500 border-green-600 text-white shadow-md'
                  : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'}
              `}
            >
              {option}
            </motion.button>
          );
        })}
      </div>

      <div className="flex justify-between mt-8 gap-4">
        <AnimatedButton
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
          className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 text-gray-800 dark:text-white"
        >
          Quay lại
        </AnimatedButton>

        {currentQuestionIndex < totalQuestions - 1 ? (
          <AnimatedButton
            onClick={handleNextQuestion}
            disabled={!selectedOptions[currentQuestionIndex]}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
          >
            Tiếp theo
          </AnimatedButton>
        ) : (
          <AnimatedButton
            onClick={handleFinalSubmit}
            disabled={!selectedOptions[currentQuestionIndex]}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white"
          >
            Nộp bài
          </AnimatedButton>
        )}
      </div>
    </motion.div>
  );
}
