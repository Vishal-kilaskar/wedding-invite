"use client";

import { useState } from "react";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setIsAuthenticated(true);
      } else {
        setError("Invalid password");
      }
    } catch {
      setError("Login failed. Please try again.");
    }
  };

  if (isAuthenticated) {
    return <AdminDashboard />;
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "var(--color-primary-dark)" }}
    >
      <div
        className="w-full max-w-md p-8 rounded-2xl"
        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(212,175,55,0.3)" }}
      >
        <h1
          className="text-2xl font-bold text-center mb-6"
          style={{ color: "var(--color-accent)", fontFamily: "var(--font-heading)" }}
        >
          Admin Panel
        </h1>

        <form onSubmit={handleLogin}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="w-full px-4 py-3 rounded-lg mb-4 focus:outline-none focus:ring-2"
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              color: "var(--color-secondary)",
              border: "1px solid rgba(212,175,55,0.2)",
            }}
          />
          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 rounded-full font-bold transition-all hover:scale-[1.02]"
            style={{ backgroundColor: "var(--color-accent)", color: "var(--color-primary-dark)" }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
