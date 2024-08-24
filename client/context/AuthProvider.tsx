"use client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
interface DecodedUser {
  fullName: string;
  id: number;
  pfp: string;
}
interface AuthContextType {
  user: DecodedUser | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<DecodedUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const decodedUser = decodeToken(storedToken);
      setToken(storedToken);
      setUser(decodedUser ? decodedUser : null);
    }
  }, []);

  const decodeToken = (token: string) => {
    try {
      const decoded: DecodedUser = jwtDecode(token);
      return decoded;
    } catch (e) {
      console.error("Failed to decode token", e);
      return null;
    }
  };

  const login = (token: string) => {
    setToken(token);
    const decodedUser = decodeToken(token);
    setUser(decodedUser ? decodedUser : null);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    router.push("/auth/login");
    toast.success("Successfully logged out!");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
