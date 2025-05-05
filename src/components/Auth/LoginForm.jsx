import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { loginAPI } from "../../services/api";
import { toastHelper } from "../../utils/ToastContainer";
import { useAuth } from "../../contexts/AuthContext";
import AnimatedButton from "../Common/AnimatedButton";

const loginVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let finalEmail = email.trim();
    if (!finalEmail.includes("@")) {
      finalEmail += "@gmail.com";
    }

    setLoading(true);
    try {
      const res = await loginAPI({ email: finalEmail, password });

      if (res.data?.status === 200) {
        login({ user: res.data.user, token: res.data.token });
        toastHelper.success("Đăng nhập thành công!");
        navigate("/");
      } else {
        toastHelper.error(res.data?.message || "Sai email hoặc mật khẩu!");
      }
    } catch (error) {
      console.error("Login error:", error);
      const status = error.response?.status;
      const message =
        error.response?.data?.message || "Lỗi kết nối tới máy chủ!";

      if (status === 401) {
        toastHelper.error(message || "Sai email hoặc mật khẩu!");
      } else {
        toastHelper.error(message);
      }
    } finally {
      setLoading(false);
    }
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
        <InputField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Nhập email (ví dụ: username hoặc username@gmail.com)"
        />
        <InputField
          label="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />

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
          className={`w-full py-2 px-4 ${
            loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
          } text-white rounded-lg transition-colors`}
        >
          {loading ? "Đang xử lý..." : "Đăng nhập"}
        </AnimatedButton>
        <p className="text-center text-gray-600 dark:text-gray-400">
          Chưa có tài khoản?{" "}
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

function InputField({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <input
        required
        {...props}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
      />
    </div>
  );
}
