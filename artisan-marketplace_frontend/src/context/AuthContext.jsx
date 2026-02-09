import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  // 🔥 Restore auth on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      setIsAuthenticated(true);
      setUserRole(role.toLowerCase()); // ✅ CRITICAL FIX
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
    }

    setAuthReady(true);
  }, []);

  const login = (role, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role.toLowerCase()); // ✅ normalize

    setIsAuthenticated(true);
    setUserRole(role.toLowerCase());
  };

  const logout = () => {
    localStorage.clear(); // ✅ safest
    setIsAuthenticated(false);
    setUserRole(null);
  };

  if (!authReady) return null;

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userRole,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
