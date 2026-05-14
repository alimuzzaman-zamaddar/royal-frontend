import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";
import { Footer } from "../Pages/components/homepage/Footer";
import { Header } from "../Pages/components/homepage/Header";
import { ScrollToTop } from "../lib/ScrollToTop";

const MainLayout = () => {
  const [showGoTop, setShowGoTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowGoTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleGoTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      <ScrollToTop />
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />

      {/* Go To Top Button */}
      <button
        type="button"
        onClick={handleGoTop}
        aria-label="Go to top"
        className={`fixed bottom-6 right-6 z-[999] flex h-12 w-12 items-center justify-center rounded-full border border-[#FFD700]/40 bg-[#4A0E4E] text-[#FFD700] shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-[#FFD700] hover:bg-[#FFD700] hover:text-[#080500] hover:shadow-[0_12px_34px_rgba(255,215,0,0.28)] ${
          showGoTop
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-5 opacity-0 pointer-events-none"
        }`}
      >
        <FaArrowUp className="text-base" />
      </button>
    </div>
  );
};

export default MainLayout;
