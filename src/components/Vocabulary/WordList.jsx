import { motion } from 'framer-motion';
import WordCard from './WordCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export default function WordList({ word }) {
     // Kiểm tra nếu word không tồn tại
  if (!word) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <p>Dữ liệu từ không hợp lệ</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-lg text-gray-800 dark:text-white">
          {word.hanzi || 'Không có từ'}
        </h3>
        <span className="text-sm text-gray-500">{word.pinyin}</span>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 mt-2">
        <span className="font-semibold">Nghĩa:</span> {word.meaning || 'Không có định nghĩa'}
      </p>
      
      <div className="mt-3 text-sm text-gray-500">
        <p><span className="font-semibold">Độ khó:</span> {word.efactor || 0}</p>
      </div>

      {/* Nếu bạn có trường examples trong dữ liệu */}
      {word.examples?.length > 0 && (
        <div className="mt-3">
          <h4 className="font-semibold text-gray-700 dark:text-gray-200">Ví dụ:</h4>
          <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400">
            {word.examples.map((example, index) => (
              <li key={index}>{example}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}