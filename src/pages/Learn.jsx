import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import MCQTest from "../components/Test/MCQTest";
import EssayTest from "../components/Test/EssayTest";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import { generateMCQ, generateEssay, submitTest } from "../services/api";

const testTypes = {
  MCQ: { name: "Trắc nghiệm", component: MCQTest },
  ESSAY: { name: "Tự luận", component: EssayTest },
};

export default function Learn() {
  const [testType, setTestType] = useState(null);
  const [currentTest, setCurrentTest] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (testType) loadTest(testType);
  }, [testType]);

  const loadTest = async (type) => {
    try {
      setIsLoading(true);
      setErrorMessage("");
      const response = type === "MCQ" ? await generateMCQ() : await generateEssay();
      const questions = response.data.data;

      if (!questions || questions.length === 0) {
        setErrorMessage("Không có từ vựng để tạo bài kiểm tra. Hãy thêm từ trước.");
        setCurrentTest(null);
      } else {
        setCurrentTest({ id: Date.now(), questions });
      }
    } catch (err) {
      console.error("Error loading test:", err);
      setErrorMessage("Lỗi khi tải bài kiểm tra.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (answers) => {
    try {
      const response = await submitTest({ testType, answers });
      const testId = response?.data?.testId;
      navigate(testId ? `/test-detail/${testId}` : "/");
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  const renderTestOptions = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-12">
      {Object.entries(testTypes).map(([key, { name }]) => (
        <motion.div
          key={key}
          whileHover={{ scale: 1.05 }}
          onClick={() => setTestType(key)}
          className="cursor-pointer bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center hover:bg-green-100 dark:hover:bg-green-900 transition-all"
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{name}</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {key === "MCQ" ? "Chọn đáp án đúng cho nghĩa" : "Tự gõ chữ Hán chính xác"}
          </p>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-10">
      {isLoading && <LoadingSpinner fullScreen />}
      {!testType && !isLoading && renderTestOptions()}

      {errorMessage && (
        <p className="text-center text-red-500 mt-10 text-lg">{errorMessage}</p>
      )}

      <AnimatePresence mode="wait">
        {currentTest?.questions && (
          <motion.div
            key={currentTest.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-8"
          >
            {(() => {
              const TestComponent = testTypes[testType].component;
              return (
                <TestComponent data={currentTest.questions} onSubmit={handleSubmit} />
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
