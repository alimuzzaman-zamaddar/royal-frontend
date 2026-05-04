import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";

const DashboardLayout = () => {
  const { logoutAction } = useAuth();

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="h-16 flex items-center justify-center border-b border-gray-800">
          <h2 className="text-xl font-bold">Dashboard</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/dashboard" className="block px-4 py-2 rounded bg-gray-800 hover:bg-gray-700 transition">
            Overview
          </Link>
          <Link to="/" className="block px-4 py-2 rounded hover:bg-gray-800 transition">
            Back to Home
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={logoutAction}
            className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white shadow-sm flex items-center px-8">
          <h3 className="text-lg font-semibold text-gray-700">Welcome Back!</h3>
        </header>
        <main className="flex-1 p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
