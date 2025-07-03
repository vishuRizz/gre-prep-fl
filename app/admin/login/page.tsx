'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from '@/components/AuthContext';
import { toast } from 'sonner';

export default function AdminLoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleChange = (e: any) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:8080/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Login failed");
      }

      const data = await res.json();

      if (data.adminDto) {
        login(data.token, data.adminDto);
        toast.success("Login successful!");
        router.push("/");
      } else {
        toast.error("Not an admin account.");
      }

    } catch (err: any) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", paddingTop: 50 }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ display: "block", marginBottom: 10, width: "100%" }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{ display: "block", marginBottom: 10, width: "100%" }}
        />
        <button type="submit">Login</button>
        {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
      </form>
    </div>
  );
}
