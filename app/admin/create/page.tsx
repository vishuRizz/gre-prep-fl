'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminCreatePage() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: ""
  });
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("http://localhost:8080/admin/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.text();

      if (res.ok) {
        alert("Admin created successfully!");
        router.push("/admin/login");
      } else {
        setError(data || "Something went wrong.");
      }
    } catch (err) {
      setError("Error connecting to server.");
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto", paddingTop: 50 }}>
      <h2>Create Admin</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          type="email"
          style={{ display: "block", marginBottom: 10, width: "100%" }}
        />
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          style={{ display: "block", marginBottom: 10, width: "100%" }}
        />
        <input
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          type="password"
          style={{ display: "block", marginBottom: 10, width: "100%" }}
        />
        <button type="submit">Create Admin</button>
        {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
      </form>
    </div>
  );
}
