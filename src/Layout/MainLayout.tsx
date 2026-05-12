import { Outlet } from "react-router-dom";
import { Footer } from "../Pages/components/homepage/Footer";
import { Header } from "../Pages/components/homepage/Header";

const MainLayout = () => {
  return (
    <div className="">
      <Header />

      <main className="">
        <Outlet />
      </main>

<Footer />
    </div>
  );
};

export default MainLayout;
