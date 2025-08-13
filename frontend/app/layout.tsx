"use client";

import "./globals.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import { AuthContext, AuthInfo } from "./auth-context";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState<AuthInfo | null>(null);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const role = typeof window !== "undefined" ? localStorage.getItem("role") : null;
    if (token && role) {
      setUser({ token, role });
    }
  }, []);

  const login = (info: AuthInfo) => {
    localStorage.setItem("token", info.token);
    localStorage.setItem("role", info.role);
    setUser(info);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
  };

  return (
    <html lang="en">
      <body className="antialiased">
        <AuthContext.Provider value={{ user, login, logout }}>
          <nav className="flex gap-4 p-4">
            {!user && <Link href="/login">Login</Link>}
            {user && <button onClick={logout}>Logout</button>}
            {user && <Link href="/rbac">RBAC</Link>}
            {user?.role === "admin" && <Link href="/admin">Admin Test</Link>}
            {user?.role === "ceo" && <Link href="/ceo">CEO Test</Link>}
          </nav>
          {children}
        </AuthContext.Provider>
      </body>
    </html>
  );
}
