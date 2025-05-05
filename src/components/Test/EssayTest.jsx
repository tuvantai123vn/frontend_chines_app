import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedButton from "../Common/AnimatedButton";

export default function EssayTest({ data, onSubmit }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [answer, setAnswer] = useState('');

  if (!data || data.length === 0) {
    return (
      <div className="text-center mt-10 text-red-500">
        Không có dữ liệu để làm bài tự luận.
      </div>
    );
  }

  const currentQuestion = data[currentIndex];
  const { meaning } = currentQuestion.question;
  const isLastQuestion = currentIndex === data.length - 1;

  const handleNext = () => {
    if (!answer.trim()) return;
    const userAnswer = {
      testId: currentQuestion.testId,
      questionId: currentQuestion.questionId,
      hanzi: currentQuestion.correctAnswer,
      answer: answer.trim(),
      correct: answer.trim() === currentQuestion.correctAnswer,
      meaning: meaning
    };
    setAnswers(prev => [...prev, userAnswer]);
    setAnswer('');
    setCurrentIndex(prev => prev + 1);
  };

  const handleFinalSubmit = () => {
    if (!answer.trim()) return;
    const userAnswer = {
      testId: currentQuestion.testId,
      questionId: currentQuestion.questionId,
      hanzi: currentQuestion.correctAnswer,
      answer: answer.trim(),
      correct: answer.trim() === currentQuestion.correctAnswer,
      meaning: meaning
    };
    onSubmit([...answers, userAnswer]);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Nhập chữ Hán đúng cho nghĩa:
        </h2>
        <p className="text-xl text-center mb-6 text-gray-900 dark:text-gray-100">
          {meaning}
        </p>
      </div>

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Nhập chữ Hán bạn nghĩ là đúng..."
        className="w-full h-32 p-4 rounded-lg border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
      />

      <AnimatedButton
        onClick={isLastQuestion ? handleFinalSubmit : handleNext}
        disabled={!answer.trim()}
        className={`w-full mt-6 py-3 text-lg ${
          answer.trim()
            ? 'bg-green-500 hover:bg-green-600' 
            : 'bg-gray-400 cursor-not-allowed'
        } text-white rounded-lg`}
      >
        {isLastQuestion ? "Nộp bài" : "Tiếp tục"}
      </AnimatedButton>
    </motion.div>
  );
}
