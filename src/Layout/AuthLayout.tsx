import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">React Template</h1>
          <p className="mt-2 text-sm text-gray-600">Please sign in to your account</p>
        </div>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;
