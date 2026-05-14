import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const LogoutTab = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    /*
      Add your real logout logic here if needed.

      Example:
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      sessionStorage.clear();
      dispatch(logout());
    */

    console.log("User logged out");

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    toast.success("Logged out successfully.");

    navigate("/auth/login");
  };

  return (
    <div className="w-full">
      <h2
        className="text-[32px] font-bold leading-[120%] text-[#FFFAF0]"
        style={{ fontFamily: "'Lora', serif" }}
      >
        Logout
      </h2>

      <p
        className="mt-4 text-base font-normal leading-[150%] text-[#FFFAF0]"
        style={{ fontFamily: "'Lora', serif" }}
      >
        Are you sure you want to logout
      </p>

      <button
        type="button"
        onClick={handleLogout}
        className="mt-7 h-10 cursor-pointer rounded-md bg-[#FFD700] px-6 text-sm font-bold text-[#080500] transition-all duration-300 hover:-translate-y-px hover:bg-[#f5d87a] hover:shadow-[0_8px_24px_rgba(255,215,0,0.22)]"
        style={{ fontFamily: "'Lora', serif" }}
      >
        Yes, Logout
      </button>
    </div>
  );
};