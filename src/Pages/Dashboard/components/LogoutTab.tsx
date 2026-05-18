import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../../Provider/AuthProvider";
import { useLogoutUserMutation } from "../../../redux/Slices/authApi";

export const LogoutTab = () => {
  const navigate = useNavigate();
  const { logoutAction } = useAuth();

  const [logoutUser, { isLoading }] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      const response = await logoutUser().unwrap();

      console.log("Logout response:", response);

      logoutAction();

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      toast.success(response.message || "Logged out successfully.");

      navigate("/auth/login");
    } catch (error) {
      const err = error as {
        data?: {
          message?: string;
        };
      };

      const message = err.data?.message || "Logout failed.";

      toast.error(message);
    }
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
        disabled={isLoading}
        className="mt-7 h-10 cursor-pointer rounded-md bg-[#FFD700] px-6 text-sm font-bold text-[#080500] transition-all duration-300 hover:-translate-y-px hover:bg-[#f5d87a] hover:shadow-[0_8px_24px_rgba(255,215,0,0.22)] disabled:cursor-not-allowed disabled:opacity-70"
        style={{ fontFamily: "'Lora', serif" }}
      >
        {isLoading ? "Logging out..." : "Yes, Logout"}
      </button>
    </div>
  );
};