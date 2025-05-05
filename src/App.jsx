// src/AppRoutes.jsx
import { Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Navbar from './components/Common/Navbar';

import Home from './pages/Home';
import Learn from './pages/Learn';
import Vocabulary from './pages/Vocabulary';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Analytics from './pages/Analytics';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import TestHistoryList from './pages/TestHistoryList';
import TestResultDetail from './components/Test/TestResultDetail';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  return <Outlet />;
};

const PublicRoute = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (user) return <Navigate to={location.state?.from?.pathname || "/"} replace />;
  return <Outlet />;
};

export default function AppRoutes() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      {user && <Navbar />}

      <main className={user ? 'pt-16' : ''}>
        <div className="max-w-6xl mx-auto px-6 py-6">
          <Routes>
            {/* Public routes */}
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Route>

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/vocabulary" element={<Vocabulary />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/history" element={<History />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/test-history" element={<TestHistoryList />} />
              <Route path="/test-detail/:id" element={<TestResultDetail />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
