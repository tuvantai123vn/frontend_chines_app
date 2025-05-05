// src/pages/Auth/Login.jsx
import { motion } from "framer-motion";
import LoginForm from "../components/Auth/LoginForm";
import logo from "../assets/trace.svg";

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
      className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 flex items-center justify-center p-4"
    >
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Phần giới thiệu */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
          <img 
            src={logo} 
            alt="Logo" 
            className="w-full max-w-[300px] h-auto mx-auto md:mx-0 mb-4"
          />
          <h1 className="text-4xl font-bold">
            Học tiếng Trung thật dễ dàng
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Hệ thống học từ vựng thông minh với SRS và bài kiểm tra tương tác
          </p>
        </div>

        {/* Form đăng nhập */}
        <div className="w-full md:w-1/2">
          <LoginForm />
        </div>
      </div>
    </motion.div>
  );
}
