import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getOverview } from '../services/dashboard';
import ProgressChart from '../components/Dashboard/ProgressChart';
import StatsCard from '../components/Dashboard/StatsCard';
import StreakCalendar from '../components/Dashboard/StreakCalendar';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import ProgressBar from '../components/Dashboard/ProgressBar';
import GoalSetting from '../components/Dashboard/GoalSetting';

const statsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOverview();
        if (response.status === 200) {
          setData(response.data);
        } else {
          setError('Lỗi tải dữ liệu từ server');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (isLoading) return <LoadingSpinner fullScreen />;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="text-red-500 text-center py-8">{error}</div>
      </div>
    );
  }

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
        </motion.div>

        <motion.div
          variants={statsContainerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <StatsCard 
            title="Tổng từ vựng"
            value={data.totalWords}
            icon="📚"
            trend={{
              direction: data.wordsTrend >= 0 ? 'up' : 'down',
              value: Math.abs(data.wordsTrend)
            }}
          />
          <StatsCard 
            title="Chuỗi ngày học"
            value={data.streakDays}
            icon="🔥"
            trend={{
              direction: data.streakTrend >= 0 ? 'up' : 'down',
              value: Math.abs(data.streakTrend)
            }}
          />
          <StatsCard 
            title="Độ chính xác"
            value={`${data.accuracy}%`}
            icon="🎯"
            trend={{
              direction: data.accuracyTrend >= 0 ? 'up' : 'down',
              value: Math.abs(data.accuracyTrend)
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
                progress={(data.learnedToday / data.dailyGoal) * 100}
                label="Hoàn thành mục tiêu ngày"
                color="bg-gradient-to-r from-blue-400 to-blue-600"
              />
              <ProgressBar 
                progress={data.masteryLevel}
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
              currentGoal={data.dailyGoal}
              onSetGoal={(newGoal) => console.log('New goal:', newGoal)}
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
            <ProgressChart data={data.progress} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Lịch học tập
            </h2>
            <StreakCalendar streakData={data.calendar} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}