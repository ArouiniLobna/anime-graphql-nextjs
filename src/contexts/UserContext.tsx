/**
 * User context for managing user authentication state
 * Provides user information across the application
 */

"use client";

import { createContext, useContext, ReactNode } from "react";
import { UserInfo } from "@/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface UserContextType {
  user: UserInfo | null;
  setUser: (user: UserInfo | null) => void;
  isAuthenticated: boolean;
  clearUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser, clearUser] = useLocalStorage<UserInfo | null>(
    "user-info",
    null
  );

  const isAuthenticated = Boolean(user?.username && user?.jobTitle);

  const contextValue: UserContextType = {
    user,
    setUser,
    isAuthenticated,
    clearUser,
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
