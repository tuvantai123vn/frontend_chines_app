import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { registerAPI, loginAPI } from "../../services/api";
import { AppToastContainer } from "../../utils/ToastContainer";
import { useAuth } from "../../contexts/AuthContext";
import AnimatedButton from "../Common/AnimatedButton";

const registerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

export default function RegisterForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      AppToastContainer("Mật khẩu không khớp!", 3000, "error");
      return;
    }

    let email = form.email.trim();
    if (!email.includes("@")) {
      email += "@gmail.com";
    }

    try {
      setLoading(true);
      const res = await registerAPI({
        name: form.name,
        email,
        password: form.password,
      });

      if (res.data?.status === 201) {
        AppToastContainer("Đăng ký thành công!", 3000, "success");

        const loginRes = await loginAPI({ email, password: form.password });
        const { user, token } = loginRes.data;
        login({ user, token });
        navigate("/");
      } else {
        AppToastContainer(res.data?.message || "Đăng ký thất bại!", 3000, "error");
      }
    } catch (err) {
      AppToastContainer("Lỗi đăng ký!", 3000, "error");
      console.error("Register error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      variants={registerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-md w-full mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        Đăng ký tài khoản
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField label="Họ và tên" name="name" value={form.name} onChange={handleChange} />
        <InputField label="Email" name="email" value={form.email} onChange={handleChange} />
        <InputField label="Mật khẩu" name="password" type="password" value={form.password} onChange={handleChange} />
        <InputField label="Nhập lại mật khẩu" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} />

        <AnimatedButton
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 ${loading ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'} text-white rounded-lg transition-colors`}
        >
          {loading ? 'Đang xử lý...' : 'Đăng ký'}
        </AnimatedButton>

        <p className="text-center text-gray-600 dark:text-gray-400">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-green-600 hover:text-green-700 dark:text-green-400">
            Đăng nhập ngay
          </Link>
        </p>
      </form>
    </motion.div>
  );
}

function InputField({ label, name, type = "text", ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required
        {...props}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
      />
    </div>
  );
}
