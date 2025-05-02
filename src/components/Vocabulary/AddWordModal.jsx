import { useState } from 'react';
import { motion } from 'framer-motion';
import { addVocabulary } from '../../services/api';
import AnimatedButton from '../Common/AnimatedButton';

export default function AddWordModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    simplified: '',
    traditional: '',
    pinyin: '',
    definition: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addVocabulary(formData);
      onSubmit();
      onClose();
    } catch (error) {
      console.error('Error adding word:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Thêm từ mới</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Chữ giản thể
            </label>
            <input
              type="text"
              required
              value={formData.simplified}
              onChange={(e) => setFormData({...formData, simplified: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Chữ phồn thể (tùy chọn)
            </label>
            <input
              type="text"
              value={formData.traditional}
              onChange={(e) => setFormData({...formData, traditional: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Pinyin
            </label>
            <input
              type="text"
              required
              value={formData.pinyin}
              onChange={(e) => setFormData({...formData, pinyin: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Nghĩa
            </label>
            <textarea
              required
              value={formData.definition}
              onChange={(e) => setFormData({...formData, definition: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg h-24 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div className="flex justify-end gap-3">
            <AnimatedButton
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700"
            >
              Hủy
            </AnimatedButton>
            <AnimatedButton
              type="submit"
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white"
            >
              Thêm từ
            </AnimatedButton>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}