'use client';

import { useEffect, useState } from "react";

type UserResponseDto = {
  id: string;
  username: string;
  email: string;
  phone: string;
  purchasedCourseIds: string[];
  orderIds: string[];
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserResponseDto[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      console.error("No token found.");
      return;
    }
  
    fetch("http://localhost:8080/admin/api/getUsers", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text(); // read error body safely
          throw new Error(`Error ${res.status}: ${text}`);
        }
  
        const data = await res.json();
        setUsers(data);
      })
      .catch((err) => {
        console.error("Failed to fetch users:", err);
      });
  }, []);
  
  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please log in as admin.");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`http://localhost:8080/admin/api/delete-user?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user.id !== id));
        alert("User deleted!");
      } else {
        const text = await res.text();
        alert("Failed to delete user: " + text);
      }
    } catch (err) {
      alert("Error deleting user.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>All Users</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} — {user.email}
            <button
              style={{ marginLeft: 16, color: 'white', background: 'red', border: 'none', borderRadius: 4, padding: '2px 8px', cursor: 'pointer' }}
              onClick={() => handleDelete(user.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
