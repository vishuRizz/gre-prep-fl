 'use client';
export const dynamic = 'force-dynamic'; // ✅ Add this line
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('http://localhost:8080/user/api/reset-password-with-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const text = await res.text();
      setMessage(text);
    } catch {
      setMessage('An error occurred.');
    }
  };

  return (
    <form onSubmit={handleReset} className="max-w-sm mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Reset Password</h2>
      <input
        type="password"
        placeholder="Enter new password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full px-4 py-2 border rounded mb-4"
        required
      />
      <button
        type="submit"
        className="w-full bg-[#7AC86B] text-white py-2 rounded hover:bg-[#6bb05c] transition"
      >
        Reset Password
      </button>
      {message && <div className="mt-4 text-center text-green-600">{message}</div>}
    </form>
  );
}