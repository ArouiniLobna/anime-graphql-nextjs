"use client";

import { ReactNode } from "react";
import { useUser } from "@/contexts/UserContext";
import { UserInfoModal } from "./UserInfoModel";

interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated } = useUser();

  if (!isAuthenticated) {
    return <UserInfoModal isOpen={true} onClose={() => {}} />;
  }

  return <>{children}</>;
}
