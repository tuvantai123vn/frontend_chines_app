import { useState } from 'react';
import { Link } from 'react-router-dom'; // Thêm import Link
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion'; // Thêm import motion
import logo from "../../assets/chines_learning_blue.svg"; 

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm fixed w-full z-10 h-16">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex items-center">
          <button 
            className="md:hidden mr-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="h-8" />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/learn" className="px-3 py-1 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
            Học
          </Link>
          <Link to="/vocabulary" className="px-3 py-1 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
            Từ vựng
          </Link>
          <Link to="/dashboard" className="px-3 py-1 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
            Thống kê
          </Link>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-16 left-0 right-0 bg-white shadow-md md:hidden"
          >
            <div className="flex flex-col space-y-2 p-4">
              <Link to="/learn" className="px-3 py-1 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
                Học
              </Link>
              <Link to="/vocabulary" className="px-3 py-1 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
                Từ vựng
              </Link>
              <Link to="/dashboard" className="px-3 py-1 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
                Thống kê
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}