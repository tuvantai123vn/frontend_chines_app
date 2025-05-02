// src/pages/Auth/Login.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import LoginForm from "../components/Auth/LoginForm";
import logo from "../assets/chines_learning_blue.svg"; // Thay bằng đường dẫn logo thực tế

const loginPageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

export default function Login() {
  return (
    <motion.div
      variants={loginPageVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4"
    >
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Phần giới thiệu */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
          <img 
            src={logo} 
            alt="Logo" 
            className="h-16 mx-auto md:mx-0 mb-4"
          />
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            Học tiếng Trung thật dễ dàng
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Hệ thống học từ vựng thông minh với SRS và bài kiểm tra tương tác
          </p>
          <div className="hidden md:block mt-8">
            <img 
              src="/images/auth-illustration.png" // Thay bằng hình ảnh thực tế
              alt="Học tập"
              className="max-w-full h-auto"
            />
          </div>
        </div>

        {/* Form đăng nhập */}
        <div className="w-full md:w-1/2">
          <LoginForm />
          
          <div className="mt-6 text-center md:hidden">
            <p className="text-gray-600 dark:text-gray-400">
              Chưa có tài khoản?{" "}
              <Link
                to="/register"
                className="text-green-600 hover:text-green-700 dark:text-green-400 font-medium"
              >
                Tạo tài khoản mới
              </Link>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}