import { motion } from 'framer-motion';

const ProgressChart = ({ data }) => {
  const maxValue = Math.max(...data.map(item => item.count)) || 1;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-2"
    >
      {data.map((item, index) => (
        <motion.div
          key={index}
          initial={{ width: 0 }}
          animate={{ width: `${(item.count / maxValue) * 100}%` }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
          className="h-4 bg-green-500 rounded-full relative"
        >
          <div className="absolute right-0 top-5 text-sm text-gray-600 dark:text-gray-300">
            {item.date} - {item.count} từ
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProgressChart;