import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import AnimatedButton from "../Common/AnimatedButton";
import { useState } from "react";

const loginVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function LoginForm() {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password)
    await login(email, password);
  };

  return (
    <motion.div
      variants={loginVariants}
      initial="hidden"
      animate="visible"
      className="max-w-md w-full mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        Đăng nhập
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Mật khẩu
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="flex items-center justify-between">
          <Link
            to="/forgot-password"
            className="text-sm text-green-600 hover:text-green-700 dark:text-green-400"
          >
            Quên mật khẩu?
          </Link>
        </div>

        <AnimatedButton
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 ${loading ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'} text-white rounded-lg transition-colors`}
        >
          {loading ? 'Đang xử lý...' : 'Đăng nhập'}
        </AnimatedButton>

        <p className="text-center text-gray-600 dark:text-gray-400">
          Chưa có tài khoản?{' '}
          <Link
            to="/register"
            className="text-green-600 hover:text-green-700 dark:text-green-400"
          >
            Đăng ký ngay
          </Link>
        </p>
      </form>
    </motion.div>
  );
}