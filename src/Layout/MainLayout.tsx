import { Outlet } from "react-router-dom";
import { Footer } from "../Pages/components/homepage/Footer";

const MainLayout = () => {
  return (
    <div className="">

      <main className="">
        <Outlet />
      </main>

<Footer />
    </div>
  );
};

export default MainLayout;
