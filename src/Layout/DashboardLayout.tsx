import { Outlet } from "react-router-dom";
import { Footer } from "../Pages/components/homepage/Footer";
import { HeaderDashboard } from "../Pages/Dashboard/components/HeaderDashboard";

const DashboardLayout = () => {
  return (
    <div className="bg-[#4A0E4E] ">
      <div className="h-32.5 bg-black flex items-center justify-center">
        <HeaderDashboard />
      </div>

      <main className="">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default DashboardLayout;
