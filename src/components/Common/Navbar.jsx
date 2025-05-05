import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import logo from "../../assets/trace.svg";
import { useAuth } from "../../contexts/AuthContext";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    setMobileMenuOpen(false);
    logout();
  };

  const navLinks = [
    { path: "/", label: "Trang chủ" },
    { path: "/learn", label: "Học" },
    { path: "/vocabulary", label: "Từ vựng" },
    { path: "/dashboard", label: "Thống kê" },
    { path: "/test-history", label: "Kết quả KT" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm fixed top-0 w-full z-50 h-16 transition-colors">
      <div className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo & Menu Toggle */}
        <div className="flex items-center">
          <button
            className="md:hidden mr-2 text-gray-700 dark:text-gray-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="w-[100px] h-auto" />
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-4">
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive(path)
                  ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 font-semibold"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
              }`}
            >
              {label}
            </Link>
          ))}
          {user && (
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-md text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
            >
              Đăng xuất
            </button>
          )}
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 shadow-md transition-colors"
          >
            <div className="flex flex-col space-y-1 p-2">
              {navLinks.map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 text-sm rounded-md transition-colors ${
                    isActive(path)
                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 font-semibold"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                  }`}
                >
                  {label}
                </Link>
              ))}
              {user && (
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 text-left rounded-md transition-colors"
                >
                  Đăng xuất
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}
