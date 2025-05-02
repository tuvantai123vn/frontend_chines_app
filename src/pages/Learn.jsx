import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import MCQTest from "../components/Test/MCQTest";
import EssayTest from "../components/Test/EssayTest";
import AnswerFeedback from "../components/Test/AnswerFeedback";
import LoadingSpinner from "../components/Common/LoadingSpinner";

const testTypes = {
  MCQ: { name: "Trắc nghiệm", component: MCQTest },
  ESSAY: { name: "Tự luận", component: EssayTest },
};

export default function Learn() {
  const [currentTest, setCurrentTest] = useState(null);
  const [testType, setTestType] = useState("MCQ");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadTest();
  }, [testType]);

  const loadTest = async () => {
    try {
      setIsLoading(true);
      const { data } =
        testType === "MCQ" ? await generateMCQ() : await generateEssay();
      setCurrentTest(data);
    } catch (error) {
      console.error("Error loading test:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (userAnswer) => {
    try {
      const { data } = await submitTest({
        testId: currentTest.id,
        answers: [userAnswer],
      });

      setIsCorrect(data.isCorrect);
      setShowFeedback(true);

      if (data.isCorrect) {
        setTimeout(() => {
          setShowFeedback(false);
          loadTest();
        }, 1500);
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  if (isLoading) return <LoadingSpinner fullScreen />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 py-20">
        <div className="flex gap-4 mb-8 justify-center">
          {Object.entries(testTypes).map(([key, { name }]) => (
            <button
              key={key}
              onClick={() => setTestType(key)}
              className={`px-6 py-2 rounded-full ${
                testType === key
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentTest?.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentTest &&
              (() => {
                const TestComponent = testTypes[testType].component;
                return (
                  <TestComponent data={currentTest} onSubmit={handleSubmit} />
                );
              })()}
          </motion.div>
        </AnimatePresence>

        <AnswerFeedback
          isOpen={showFeedback}
          isCorrect={isCorrect}
          onContinue={() => {
            setShowFeedback(false);
            loadTest();
          }}
        />
      </div>
    </div>
  );
}
