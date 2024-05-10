import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  createContext,
  useContext,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { validUrl } from "../lib/validUrl";
const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {}, []);

  const logout = useCallback(() => {
    localStorage.clear();
    setToken(null);
    navigate("/auth/login");
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      if (location.pathname === "/") {
        navigate("/news");
        return;
      }
      if (!validUrl(location.pathname)) {
        navigate("/not-found");
      }
      return;
    }
    navigate("/auth/login");
  }, []);

  const value = useMemo(
    () => ({
      token,
      logout,
    }),
    [token, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Must be used within a context provider");
  }
  return context;
}
