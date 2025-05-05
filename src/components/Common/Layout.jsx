import Navbar from './Navbar';
import { useAuth } from '../../contexts/AuthContext';

export default function Layout({ children }) {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      {user && <Navbar />}

      <main className={`${user ? 'pt-16' : ''}`}>
        <div className="max-w-6xl mx-auto px-6 py-6">
          {children}
        </div>
      </main>
    </div>
  );
}
