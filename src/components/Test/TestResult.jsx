import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedButton from "../Common/AnimatedButton";

export default function TestResult() {
  const location = useLocation();
  const result = location.state;

  if (!result) {
    return <div className="text-center mt-20 text-red-500">Không có kết quả để hiển thị.</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-2xl mx-auto mt-10"
    >
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        Kết quả bài kiểm tra
      </h2>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg text-center">
          <p className="text-2xl font-bold text-green-600 dark:text-green-300">
            {result.correctAnswers}
          </p>
          <p className="text-gray-600 dark:text-gray-300">Câu đúng</p>
        </div>

        <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg text-center">
          <p className="text-2xl font-bold text-red-600 dark:text-red-300">
            {result.totalQuestions - result.correctAnswers}
          </p>
          <p className="text-gray-600 dark:text-gray-300">Câu sai</p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          Chi tiết kết quả
        </h3>
        <div className="space-y-2">
          {result.questions.map((q, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${
                q.correct ? 'bg-green-50 dark:bg-green-900' : 'bg-red-50 dark:bg-red-900'
              }`}
            >
              <p className="font-medium">{q.word}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Đáp án của bạn: {q.userAnswer || '—'}
              </p>
              {!q.correct && (
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Đáp án đúng: {q.correctAnswer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <AnimatedButton
          as={Link}
          to="/learn"
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2"
        >
          Làm bài mới
        </AnimatedButton>

        <AnimatedButton
          as={Link}
          to="/vocabulary"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2"
        >
          Xem từ vựng
        </AnimatedButton>
      </div>
    </motion.div>
  );
}
