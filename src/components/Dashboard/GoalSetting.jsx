import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedButton from '../Common/AnimatedButton';
import { setGoal } from '../../services/api';

export default function GoalSetting({ currentGoal = 10, currentTest = 2, onUpdate }) {
  const [dailyTarget, setDailyTarget] = useState(currentGoal);
  const [testTarget, setTestTarget] = useState(currentTest);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log({ dailyTarget, testTarget })
      await setGoal({ dailyTarget, testTarget });
      setIsEditing(false);
      if (onUpdate) onUpdate({ dailyTarget, testTarget });
    } catch (err) {
      console.error('Lỗi khi lưu mục tiêu:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        🎯 Mục tiêu học tập hàng ngày
      </h2>

      {isEditing ? (
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Số từ cần học mỗi ngày
            </label>
            <input
              type="number"
              min={1}
              value={dailyTarget}
              onChange={(e) => setDailyTarget(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Số lần kiểm tra mỗi ngày
            </label>
            <input
              type="number"
              min={1}
              value={testTarget}
              onChange={(e) => setTestTarget(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <AnimatedButton
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700"
            >
              Hủy
            </AnimatedButton>
            <AnimatedButton
              type="submit"
              disabled={loading}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
            </AnimatedButton>
          </div>
        </form>
      ) : (
        <div className="space-y-2">
          <p className="text-gray-700 dark:text-gray-300">
            ✅ <strong>{dailyTarget}</strong> từ mỗi ngày
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            🧪 <strong>{testTarget}</strong> lần kiểm tra/ngày
          </p>

          <div className="flex justify-end mt-3">
            <AnimatedButton
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Thay đổi mục tiêu
            </AnimatedButton>
          </div>
        </div>
      )}
    </motion.div>
  );
}
