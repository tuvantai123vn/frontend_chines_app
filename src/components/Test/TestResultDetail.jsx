import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getTestResultById } from "../../services/api";
import LoadingSpinner from "../Common/LoadingSpinner";

export default function TestResultDetail() {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await getTestResultById(id);
        setResult(res.data.data);
      } catch (err) {
        console.error("Failed to load result:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResult();
  }, [id]);

  if (loading) return <LoadingSpinner fullScreen />;
  if (!result) return <div className="text-center text-gray-600 mt-10">Không tìm thấy kết quả.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        Chi tiết kết quả kiểm tra
      </h1>
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        Ngày làm: {new Date(result.createdAt).toLocaleString()}
      </p>

      <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg text-center mb-6">
        <p className="text-3xl font-bold text-green-600 dark:text-green-300">{result.score}</p>
        <p className="text-gray-600 dark:text-gray-300">Số câu đúng</p>
      </div>

      <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Chi tiết từng câu</h3>
      <div className="space-y-4">
        {result.questions.map((q, index) => {
          const isCorrect = q.correct;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-4 rounded-lg border shadow ${
                isCorrect
                  ? "bg-green-50 border-green-400 dark:bg-green-900"
                  : "bg-red-50 border-red-400 dark:bg-red-900"
              }`}
            >
              <p className="font-semibold text-lg text-gray-800 dark:text-white">
                Nghĩa: {q.meaning || 'Không có'}
              </p>
              <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">
                Đáp án của bạn:{" "}
                <span className={isCorrect ? "text-green-600" : "text-red-600 font-semibold"}>
                  {q.answer || 'Không trả lời'}
                </span>
              </p>
              {!isCorrect && (
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Đáp án đúng: <span className="font-semibold text-green-600">{q.hanzi}</span>
                </p>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 text-center">
        <Link
          to="/learn"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full shadow"
        >
          ← Làm bài mới
        </Link>
      </div>
    </div>
  );
}
