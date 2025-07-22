'use client';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function AdminResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  if (!token) {
    return <div className="text-center mt-10 text-red-600">Invalid or missing reset token. Please use the link from your email.</div>;
  }

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('https://greprepcoach-service-177259961249.asia-south1.run.app/admin/api/reset-password-with-token', {
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
      <h2 className="text-xl font-bold mb-4">Admin Reset Password</h2>
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



