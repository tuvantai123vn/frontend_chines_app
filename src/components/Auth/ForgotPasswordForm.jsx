import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import AnimatedButton from "../Common/AnimatedButton";
import { useState } from "react";

const forgotPasswordVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
};

export default function ForgotPasswordForm() {
  const { forgotPassword, loading } = useAuth();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
  };

  return (
    <motion.div
      variants={forgotPasswordVariants}
      initial="hidden"
      animate="visible"
      className="max-w-md w-full mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        Khôi phục mật khẩu
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email đăng ký
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>

        <AnimatedButton
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 ${loading ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'} text-white rounded-lg transition-colors`}
        >
          {loading ? 'Đang gửi...' : 'Gửi yêu cầu'}
        </AnimatedButton>

        <p className="text-center text-gray-600 dark:text-gray-400">
          Nhớ mật khẩu?{' '}
          <Link
            to="/login"
            className="text-green-600 hover:text-green-700 dark:text-green-400"
          >
            Quay lại đăng nhập
          </Link>
        </p>
      </form>
    </motion.div>
  );
}