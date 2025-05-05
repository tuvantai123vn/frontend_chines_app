import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getOverview } from "../services/api";
import ProgressChart from "../components/Dashboard/ProgressChart";
import StatsCard from "../components/Dashboard/StatsCard";
import StreakCalendar from "../components/Dashboard/StreakCalendar";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import ProgressBar from "../components/Dashboard/ProgressBar";
import GoalSetting from "../components/Dashboard/GoalSetting";

// Thêm dữ liệu mặc định
const DEFAULT_DATA = {
  totalWords: 0,
  wordsTrend: 0,
  streakDays: 0,
  streakTrend: 0,
  accuracy: 0,
  accuracyTrend: 0,
  learnedToday: 0,
  dailyGoal: 10,
  masteryLevel: 0,
  progress: [],
  calendar: {}
};

const statsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
      setData(DEFAULT_DATA); // Sử dụng dữ liệu mặc định khi timeout
      controller.abort();
    }, 5000);

    const fetchData = async () => {
      try {
        const response = await getOverview({ signal: controller.signal });
        clearTimeout(timeoutId);
        if (response.status === 200) {
          setData(response.data);
        } else {
          setData(DEFAULT_DATA); // Sử dụng dữ liệu mặc định khi có lỗi
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          setData(DEFAULT_DATA); // Sử dụng dữ liệu mặc định khi có lỗi
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

  if (isLoading) return <LoadingSpinner fullScreen />;

  // Sử dụng data hoặc DEFAULT_DATA
  const displayData = data || DEFAULT_DATA;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
            Bảng điều khiển
          </h1>
          {error && (
            <div className="text-yellow-500 mb-4 text-sm">
              ⚠️ {error}
            </div>
          )}
        </motion.div>

        <motion.div
          variants={statsContainerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <StatsCard
            title="Tổng từ vựng"
            value={displayData.totalWords}
            icon="📚"
            trend={{
              direction: displayData.wordsTrend >= 0 ? "up" : "down",
              value: Math.abs(displayData.wordsTrend),
            }}
          />
          <StatsCard
            title="Chuỗi ngày học"
            value={displayData.streakDays}
            icon="🔥"
            trend={{
              direction: displayData.streakTrend >= 0 ? "up" : "down",
              value: Math.abs(displayData.streakTrend),
            }}
          />
          <StatsCard
            title="Độ chính xác"
            value={`${displayData.accuracy}%`}
            icon="🎯"
            trend={{
              direction: displayData.accuracyTrend >= 0 ? "up" : "down",
              value: Math.abs(displayData.accuracyTrend),
            }}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Thống kê học tập
            </h2>
            <div className="space-y-6">
              <ProgressBar
                progress={(displayData.learnedToday / displayData.dailyGoal) * 100 || 0}
                label="Hoàn thành mục tiêu ngày"
                color="bg-gradient-to-r from-blue-400 to-blue-600"
              />
              <ProgressBar
                progress={displayData.masteryLevel}
                label="Cấp độ thành thạo"
                color="bg-gradient-to-r from-purple-400 to-purple-600"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
          >
            <GoalSetting
              currentGoal={displayData.dailyGoal}
              onSetGoal={(newGoal) => console.log("New goal:", newGoal)}
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Tiến độ học tập
            </h2>
            <ProgressChart data={displayData.progress || []} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Lịch học tập
            </h2>
            <StreakCalendar streakData={displayData.calendar || {}} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}