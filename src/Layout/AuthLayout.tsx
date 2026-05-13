import { Outlet } from "react-router-dom";
import authBg from "../assets/lineage/authbg.png";

const AuthLayout = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#020202]">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${authBg})`,
        }}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(7, 6, 3, 0.40) 106.85%, rgba(2, 2, 2, 0.20) 206.85%)",
        }}
      />

      {/* Optional Dark Layer for better form readability */}
      <div className="absolute inset-0 z-20 bg-black/20" />

      {/* Auth Content */}
      <main className="relative z-30 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;