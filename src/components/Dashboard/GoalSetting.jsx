import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedButton from '../Common/AnimatedButton';

export default function GoalSetting({ currentGoal = 20, onSetGoal }) {
  const [goal, setGoal] = useState(currentGoal);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSetGoal(goal);
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        Mục tiêu hàng ngày
      </h2>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="number"
            min="1"
            max="100"
            value={goal}
            onChange={(e) => setGoal(parseInt(e.target.value))}
            className="w-20 px-3 py-1 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          />
          <AnimatedButton
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1"
          >
            Lưu
          </AnimatedButton>
          <AnimatedButton
            type="button"
            onClick={() => setIsEditing(false)}
            className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 px-3 py-1"
          >
            Hủy
          </AnimatedButton>
        </form>
      ) : (
        <div className="flex items-center gap-4">
          <span className="text-2xl font-bold text-green-500">{currentGoal}</span>
          <span className="text-gray-600 dark:text-gray-400">từ/ngày</span>
          <AnimatedButton
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1"
          >
            Thay đổi
          </AnimatedButton>
        </div>
      )}
    </motion.div>
  );
}