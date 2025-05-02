import { motion } from 'framer-motion';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

export default function ProgressBar({ 
  progress, 
  label, 
  tooltip,
  color = 'bg-gradient-to-r from-green-400 to-green-600',
  duration = 1.5
}) {
  return (
    <div className="w-full space-y-2 group relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {label}
          </span>
          {tooltip && (
            <InformationCircleIcon 
              className="h-4 w-4 text-gray-400 cursor-help"
              title={tooltip}
            />
          )}
        </div>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {Math.round(progress)}%
        </span>
      </div>

      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ 
            duration: duration,
            ease: "easeOut",
            type: "spring", 
            stiffness: 100
          }}
          className={`h-full rounded-full ${color}
            transition-all duration-300
          `}
        />
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div className="absolute hidden group-hover:block top-0 left-0 mt-8 p-2 bg-white dark:bg-gray-800 shadow-lg rounded-lg text-sm w-64 z-10">
          {tooltip}
        </div>
      )}
    </div>
  );
}