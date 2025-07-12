/**
 * User context for managing user authentication state
 * Provides user information across the application
 */

"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { UserInfo } from "@/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface UserContextType {
  user: UserInfo | null;
  setUser: (user: UserInfo | null) => void;
  isAuthenticated: boolean;
  clearUser: () => void;
  isLoading: boolean; // Add loading state to handle hydration
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [mounted, setMounted] = useState(false);
  const [user, setUser, clearUser] = useLocalStorage<UserInfo | null>(
    "user-info",
    null
  );

  // Prevent hydration mismatch by waiting for component to mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Only check authentication after component is mounted on client
  const isAuthenticated = mounted && Boolean(user?.username && user?.jobTitle);

  const contextValue: UserContextType = {
    user: mounted ? user : null, // Return null during SSR
    setUser,
    isAuthenticated,
    clearUser,
    isLoading: !mounted, // Loading while hydrating
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
