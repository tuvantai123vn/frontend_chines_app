// components/Layout.jsx
import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16"> {/* Padding top bằng chiều cao Navbar */}
        {children}
      </main>
    </div>
  );
}