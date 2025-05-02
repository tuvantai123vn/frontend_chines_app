import { motion } from 'framer-motion';

const SRS_LEVELS = {
  0: { label: 'Mới', color: 'bg-gray-200 text-gray-700' },
  1: { label: '1 Ngày', color: 'bg-green-100 text-green-800' },
  2: { label: '3 Ngày', color: 'bg-blue-100 text-blue-800' },
  3: { label: '1 Tuần', color: 'bg-purple-100 text-purple-800' },
  4: { label: '1 Tháng', color: 'bg-yellow-100 text-yellow-800' },
  5: { label: 'Thành thạo', color: 'bg-green-500 text-white' }
};

export default function SRSBadge({ level = 0 }) {
  const { label, color } = SRS_LEVELS[level] || SRS_LEVELS[0];

  return (
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      className={`px-3 py-1 rounded-full text-sm font-medium ${color}`}
    >
      {label}
    </motion.div>
  );
}