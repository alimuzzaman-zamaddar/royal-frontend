import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { setUser, logout } from "../redux/Slices/userSlice";

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: Record<string, unknown>) => void;
  logoutAction: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.user.token);

  const isAuthenticated = !!token;

  const login = (newToken: string, user: Record<string, unknown>) => {
    dispatch(setUser({ token: newToken, user }));
  };

  const logoutAction = () => {
    dispatch(logout());
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logoutAction }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
