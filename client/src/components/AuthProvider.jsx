import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  createContext,
  useContext,
} from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const logout = useCallback(() => {
    localStorage.clear();
    setToken(null);
    navigate("/auth/login");
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      return;
    }
    console.log(storedToken);
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
