import { motion } from 'framer-motion';

const trendColors = {
  up: 'text-green-500',
  down: 'text-red-500',
  neutral: 'text-gray-500'
};

export default function StatsCard({ title, value, icon, trend }) {
  const getTrendIcon = () => {
    if (trend?.direction === 'up') return '↑';
    if (trend?.direction === 'down') return '↓';
    return '→';
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300">{title}</h3>
          <p className="text-3xl font-bold mt-2 text-gray-800 dark:text-white">{value}</p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
      
      {trend && (
        <div className={`mt-4 flex items-center ${trendColors[trend.direction]}`}>
          <span className="text-sm mr-2">
            {getTrendIcon()} {trend.value}%
          </span>
          <span className="text-sm">so với tuần trước</span>
        </div>
      )}
    </motion.div>
  );
}