"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const VerifyEmailPage: React.FC = () => {
  const [verified, setVerified] = useState(false);
  const router = useRouter();

  // Automatically redirect to login after verification
  useEffect(() => {
    if (verified) {
      const timer = setTimeout(() => {
        router.push('/user/auth');
      }, 2000); // 2 seconds delay
      return () => clearTimeout(timer);
    }
  }, [verified, router]);

  const handleCheckVerification = () => {
    // Here you would check with backend if email is verified
    setVerified(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-indigo-50 py-12 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full border border-gray-100 text-center">
        <h2 className="text-2xl font-bold mb-4 text-emerald-700">Verify Your Email</h2>
        <p className="mb-6 text-gray-700">
          We have sent a verification link to your email address.<br />
          Please check your inbox and click the link to verify your account.<br />
          <span className="text-sm text-gray-500">(Check your spam folder if you don't see it!)</span>
        </p>
        {!verified ? (
          <>
            <Button className="w-full mb-2" onClick={handleCheckVerification}>
              I have verified my email
            </Button>
            <p className="text-xs text-gray-400">You must verify your email before logging in.</p>
          </>
        ) : (
          <div>
            <p className="mb-4 text-green-600 font-semibold">Email verified! Redirecting to login...</p>
            <Button className="w-full" disabled>
              Go to Login
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage; 