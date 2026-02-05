"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simple hardcoded authentication
    if (username === "admin" && password === "admin@prerna2026") {
      // Store authentication status in localStorage
      localStorage.setItem("isAdminAuthenticated", "true");
      router.push("/admin/dashboard");
    } else {
      setError("Invalid username or password");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F7FB] to-[#E8F2F7] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-refined border border-gray-100 p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#1F4FD8] mb-2">Admin Login</h1>
          <p className="text-gray-600 text-sm">Prerna Hospital Admin Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1F4FD8] focus:border-transparent transition-all"
              placeholder="Enter username"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1F4FD8] focus:border-transparent transition-all"
              placeholder="Enter password"
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-[#1F4FD8] to-[#1ECAD3] text-white font-semibold py-3 px-4 rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-gray-500">
          <p>Default credentials:</p>
          <p>Username: admin</p>
          <p>Password: admin@prerna2026</p>
        </div>
      </div>
    </div>
  );
}