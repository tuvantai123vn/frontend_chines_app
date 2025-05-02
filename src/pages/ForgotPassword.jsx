// src/pages/Auth/ForgotPassword.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ForgotPasswordForm from "../components/Auth/ForgotPasswordForm";
import logo from "../assets/react.svg";

const forgotPasswordVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
};

export default function ForgotPassword() {
  return (
    <motion.div
      variants={forgotPasswordVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-4"
    >
      <div className="w-full max-w-md space-y-8">
        {/* Logo và tiêu đề */}
        <div className="text-center space-y-4">
          <img 
            src={logo} 
            alt="Logo" 
            className="h-16 mx-auto mb-4"
          />
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Khôi phục mật khẩu
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Nhập email đã đăng ký để nhận hướng dẫn đặt lại mật khẩu
          </p>
        </div>

        {/* Form */}
        <ForgotPasswordForm />

        {/* Liên kết phụ */}
        <div className="text-center">
          <Link
            to="/login"
            className="text-green-600 hover:text-green-700 dark:text-green-400 text-sm"
          >
            ← Quay lại trang đăng nhập
          </Link>
        </div>
      </div>
    </motion.div>
  );
}