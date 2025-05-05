// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AnimatedButton from '../components/Common/AnimatedButton';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import { getOverview } from '../services/dashboard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export default function Home() {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const response = await getOverview();
          setDashboardData(response.data);
        } catch (error) {
          console.error('Error loading dashboard data:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [user]);

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Hero Section */}
          <motion.div variants={itemVariants} className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              {user ? `Chào mừng trở lại, ${user.name}!` : "Học tiếng Trung thông minh"}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {user ? "Hôm nay bạn muốn học gì?" : "Hệ thống học tập tích hợp SRS và AI"}
            </p>
          </motion.div>

          {user ? (
            /* Dashboard Preview */
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">Chuỗi ngày học</h3>
                  <p className="text-4xl font-bold text-green-500">
                    {dashboardData?.streakDays || 0} 🔥
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">Từ vựng đã học</h3>
                  <p className="text-4xl font-bold text-blue-500">
                    {dashboardData?.totalWords || 0} 📚
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">Độ chính xác</h3>
                  <p className="text-4xl font-bold text-purple-500">
                    {dashboardData?.accuracy || 0}% 🎯
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <AnimatedButton
                  as={Link}
                  to="/learn"
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg"
                >
                  Bắt đầu học ngay
                </AnimatedButton>
                <AnimatedButton
                  as={Link}
                  to="/vocabulary"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 text-lg"
                >
                  Xem từ vựng
                </AnimatedButton>
              </div>
            </motion.div>
          ) : (
            /* Guest Content */
            <motion.div variants={itemVariants} className="space-y-8 text-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">Học thông minh</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Hệ thống SRS tự động điều chỉnh lộ trình học
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">Đa dạng bài tập</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Trắc nghiệm, tự luận và kiểm tra phát âm
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">Theo dõi tiến độ</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Bảng thống kê chi tiết và biểu đồ trực quan
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <AnimatedButton
                  as={Link}
                  to="/register"
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg"
                >
                  Đăng ký miễn phí
                </AnimatedButton>
                <AnimatedButton
                  as={Link}
                  to="/login"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 text-lg"
                >
                  Đăng nhập
                </AnimatedButton>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}