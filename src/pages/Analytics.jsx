// src/pages/Analytics.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAnalytics } from '../services/analytics';
import StatsCard from '../components/Dashboard/StatsCard';
import LoadingSpinner from '../components/Common/LoadingSpinner';

export default function Analytics() {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAnalytics();
        setAnalyticsData(response.data);
      } catch (err) {
        setError('Không thể tải dữ liệu phân tích');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <LoadingSpinner fullScreen />;

  if (error || !analyticsData) {
    return (
      <div className="text-center py-12 text-red-500 dark:text-red-400">
        {error || 'Không tìm thấy dữ liệu phân tích'}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-800 dark:text-white mb-8"
        >
          Phân tích học tập
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard 
            title="Độ chính xác"
            value={analyticsData.accuracy}
            icon="🎯"
          />
          <StatsCard 
            title="Tổng bài kiểm tra"
            value={analyticsData.totalTests}
            icon="📝"
          />
          <StatsCard 
            title="Chuỗi ngày học"
            value={analyticsData.streak}
            icon="🔥"
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm mb-8"
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Mục tiêu học tập
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="text-sm text-gray-600 dark:text-gray-300">Mục tiêu hàng ngày</h3>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {analyticsData.goals.dailyTarget} từ
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="text-sm text-gray-600 dark:text-gray-300">Mục tiêu tuần</h3>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {analyticsData.goals.weeklyTarget} từ
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Gợi ý học tập
          </h2>
          <div className="space-y-3">
            {analyticsData.suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="flex items-start p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <span className="mr-3 text-lg">{index + 1}.</span>
                <p className="text-gray-700 dark:text-gray-300">{suggestion}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}