/**
 * Home page component with authentication guard and navigation
 * Provides welcome screen and redirects to information page
 */

"use client";

import { AuthGuard } from "./components/AuthGard";
import HomePage from "./components/HomePage";

export default function Page() {
  return (
    <AuthGuard>
      <HomePage />
    </AuthGuard>
  );
}
