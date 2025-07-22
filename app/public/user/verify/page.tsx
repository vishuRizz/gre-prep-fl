'use client';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function UserVerifyPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [message, setMessage] = useState('Verifying...');

  useEffect(() => {
    if (!token) {
      setMessage('Invalid verification link.');
      return;
    }
    // Call your backend to verify the token
    fetch(`https://greprepcoach-service-177259961249.asia-south1.run.app/public/user/verify?token=${token}`)
      .then(res => res.text())
      .then(text => setMessage(text))
      .catch(() => setMessage('Verification failed. Please try again.'));
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded shadow text-center">
        <h2 className="text-2xl font-bold mb-4">Email Verification</h2>
        <p>{message}</p>
      </div>
    </div>
  );
}
