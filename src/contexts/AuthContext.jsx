import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Sử dụng useNavigate thay vì useHistory
import { AppToastContainer } from '../utils/ToastContainer'; // Import AppToastContainer
import STATUS from '../utils/status'; // Import status từ file utils

const AuthContext = createContext();

// Đảm bảo rằng AuthContextProvider sẽ bao phủ toàn bộ ứng dụng
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();  // Sử dụng useNavigate thay vì useHistory

  useEffect(() => {
    if (token) {
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      fetchUserData();
    }
  }, [token]);

  const fetchUserData = async () => {
    try {
      const res = await axios.get('/auth/me');
      setUser(res.data);
    } catch (error) {
      console.error('Error fetching user data', error);
      logout();
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5001/api/auth/login', { email, password });

      const { status, message, user, token } = res.data;
      if (status === STATUS.OK.code) {
        setToken(token);
        setUser(user);
        localStorage.setItem('token', token);
        AppToastContainer(message || 'Đăng nhập thành công!', 3000, 'success');
        navigate('/');  // Dùng navigate thay vì history.push
      } else {
        AppToastContainer(message || 'Đăng nhập thất bại!', 3000, 'error');
      }
    } catch (error) {
      AppToastContainer('Lỗi đăng nhập! Kiểm tra lại email và mật khẩu.', 3000, 'error');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    AppToastContainer('Đăng xuất thành công!', 3000, 'info');
    navigate('/login');  // Dùng navigate thay vì history.push
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const res = await axios.post('/auth/register', { name, email, password });

      const { status, message } = res.data;
      if (status === STATUS.CREATED.code) {
        AppToastContainer(message || 'Đăng ký thành công!', 3000, 'success');
        login(email, password); // Tự động đăng nhập sau khi đăng ký thành công
      } else {
        AppToastContainer(message || 'Đăng ký thất bại!', 3000, 'error');
      }
    } catch (error) {
      AppToastContainer('Lỗi khi đăng ký!', 3000, 'error');
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email) => {
    try {
      const res = await axios.post('/auth/forgot-password', { email });
      const { status, message } = res.data;
      if (status === STATUS.OK.code) {
        AppToastContainer(message || 'Email hướng dẫn đổi mật khẩu đã được gửi!', 3000, 'info');
      } else {
        AppToastContainer(message || 'Lỗi khi gửi email!', 3000, 'error');
      }
    } catch (error) {
      AppToastContainer('Lỗi khi gửi email!', 3000, 'error');
    }
  };

  const resetPassword = async (token, newPassword) => {
    try {
      const res = await axios.post('/auth/reset-password', { token, newPassword });
      const { status, message } = res.data;
      if (status === STATUS.OK.code) {
        AppToastContainer(message || 'Mật khẩu đã được thay đổi!', 3000, 'success');
        navigate('/login');
      } else {
        AppToastContainer(message || 'Lỗi khi thay đổi mật khẩu!', 3000, 'error');
      }
    } catch (error) {
      AppToastContainer('Lỗi khi thay đổi mật khẩu!', 3000, 'error');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        forgotPassword,
        resetPassword,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
