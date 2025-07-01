// app/user/signup/page.tsx
"use client";

import { useState } from "react";

const API_ENDPOINTS = {
  signup: {
    user: "http://localhost:8080/public/user/create",
    admin: "http://localhost:8080/admin/create",
  },
  login: {
    user: "http://localhost:8080/api/user/login",
    admin: "http://localhost:8080/api/user/login", // same endpoint, but check admin in response
  },
};

export default function AuthPage() {
  const [role, setRole] = useState<"user" | "admin">("user");
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      let endpoint = API_ENDPOINTS[mode][role];
      let payload: any = { username: form.username, password: form.password };
      if (mode === "signup") payload.email = form.email;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Request failed");
      }
      if (mode === "login") {
        const data = await res.json();
        if (role === "admin" && !data.adminDto) {
          setMessage("Not an admin account.");
        } else {
          setMessage("Login successful!");
          // Save token, redirect, etc.
        }
      } else {
        setMessage("Signup successful! Please login.");
        setMode("login");
      }
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-indigo-50 py-12 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full border border-gray-100">
        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 rounded-l-lg font-semibold border ${role === "user" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700"}`}
            onClick={() => setRole("user")}
          >
            User
          </button>
          <button
            className={`px-4 py-2 rounded-r-lg font-semibold border-l-0 border ${role === "admin" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700"}`}
            onClick={() => setRole("admin")}
          >
            Admin
          </button>
        </div>
        <div className="flex justify-center mb-8">
          <button
            className={`px-4 py-2 rounded-l-lg font-semibold border ${mode === "signup" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"}`}
            onClick={() => setMode("signup")}
          >
            Sign Up
          </button>
          <button
            className={`px-4 py-2 rounded-r-lg font-semibold border-l-0 border ${mode === "login" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"}`}
            onClick={() => setMode("login")}
          >
            Log In
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {mode === "signup" && (
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          )}
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors"
            disabled={loading}
          >
            {loading ? (mode === "signup" ? "Signing Up..." : "Logging In...") : (mode === "signup" ? "Sign Up" : "Log In")}
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-600 font-semibold">{message}</p>}
      </div>
    </div>
  );
}
