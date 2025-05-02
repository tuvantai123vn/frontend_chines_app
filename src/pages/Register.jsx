// src/pages/Auth/Register.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import RegisterForm from "../components/Auth/RegisterForm";
import logo from "../assets/react.svg";

const registerPageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function Register() {
  return (
    <motion.div
      variants={registerPageVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4"
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
            Bắt đầu hành trình học tập
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Đăng ký ngay để trải nghiệm hệ thống học tập thông minh
          </p>
          <div className="hidden md:block mt-8">
            <img 
              src="/images/register-illustration.png"
              alt="Đăng ký"
              className="max-w-full h-auto"
            />
          </div>
        </div>

        {/* Form đăng ký */}
        <div className="w-full md:w-1/2">
          <RegisterForm />
          
          <div className="mt-6 text-center md:hidden">
            <p className="text-gray-600 dark:text-gray-400">
              Đã có tài khoản?{" "}
              <Link
                to="/login"
                className="text-green-600 hover:text-green-700 dark:text-green-400 font-medium"
              >
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}