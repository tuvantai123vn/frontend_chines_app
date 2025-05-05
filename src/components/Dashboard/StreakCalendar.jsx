import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';
import { motion } from 'framer-motion';

const calendarVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const dayVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1 }
};

export default function StreakCalendar({ streakData = [] }) {
  const currentDate = new Date();
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Sửa hàm getDayStatus để xử lý dữ liệu không hợp lệ
  const getDayStatus = (date) => {
    try {
      const dateString = format(date, 'yyyy-MM-dd');
      
      // Kiểm tra nếu streakData không phải array
      if (!Array.isArray(streakData)) {
        console.error('streakData phải là mảng');
        return isToday(date) ? 'today' : 'default';
      }
      
      return streakData.includes(dateString) ? 'completed' : 
             isToday(date) ? 'today' : 
             'default';
    } catch (error) {
      console.error('Lỗi xử lý ngày:', error);
      return 'default';
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300">
        {format(currentDate, 'MMMM yyyy')}
      </h3>
      
      <motion.div
        variants={calendarVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-7 gap-2"
      >
        {daysInMonth.map((date, index) => {
          const status = getDayStatus(date);
          const isCurrentMonth = isSameMonth(date, currentDate);

          return (
            <motion.div
              key={index}
              variants={dayVariants}
              className={`text-center p-2 rounded-lg text-sm cursor-pointer
                ${!isCurrentMonth ? 'opacity-50' : ''}
                ${status === 'completed' 
                  ? 'bg-green-500 text-white hover:bg-green-600' 
                  : status === 'today' 
                  ? 'bg-green-100 dark:bg-green-900 hover:bg-green-200' 
                  : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200'}
              `}
              title={format(date, 'yyyy-MM-dd')}
            >
              {format(date, 'd')}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}