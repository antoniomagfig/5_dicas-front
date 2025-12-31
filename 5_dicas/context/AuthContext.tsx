"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import api from "@/services/axios";

/* =======================
   TYPES
======================= */

export type User = {
  id: number;
  username: string;
  vitorias: number;
  derrotas: number;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;

  setUserById: (id: number) => Promise<void>;
  refreshUser: () => Promise<void>;
  logout: () => void;
};

/* =======================
   CONTEXT
======================= */

const AuthContext = createContext<AuthContextType | null>(null);

/* =======================
   PROVIDER
======================= */

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /* =======================
     CARREGAR USER SALVO
  ======================= */

  useEffect(() => {
    const idSalvo = localStorage.getItem("jogadorId");
    if (!idSalvo) {
      setLoading(false);
      return;
    }

    setUserById(Number(idSalvo)).finally(() => setLoading(false));
  }, []);

  /* =======================
     ACTIONS
  ======================= */

  async function setUserById(id: number) {
    const res = await api.get<User>(`/jogador/${id}`);
    setUser(res.data);
    localStorage.setItem("jogadorId", String(id));
  }

  async function refreshUser() {
    if (!user) return;
    await setUserById(user.id);
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("jogadorId");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        setUserById,
        refreshUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* =======================
   HOOK
======================= */

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}