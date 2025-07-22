"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function VerifyAdminPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [message, setMessage] = useState("Verifying your admin account...");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetch(`https://greprepcoach-service-177259961249.asia-south1.run.app/admin/verify?token=${token}`)
        .then((res) => res.text())
        .then((data) => {
          setMessage(data);
          setIsSuccess(data === "Success");
          setIsLoading(false);
        })
        .catch(() => {
          setMessage("Verification failed. Please try again.");
          setIsSuccess(false);
          setIsLoading(false);
        });
    } else {
      setMessage("No verification token provided.");
      setIsSuccess(false);
      setIsLoading(false);
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            {isLoading ? (
              <div>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                <h2 className="text-lg font-medium text-gray-900">Verifying...</h2>
                <p className="text-sm text-gray-600 mt-2">Please wait while we verify your admin account.</p>
              </div>
            ) : (
              <div>
                <div className={`text-6xl mb-4 ${isSuccess ? '🎉' : '❌'}`}>
                  {isSuccess ? '✅' : '❌'}
                </div>
                <h2 className={`text-lg font-medium mb-2 ${isSuccess ? 'text-green-900' : 'text-red-900'}`}>
                  {isSuccess ? 'Admin Account Verified!' : 'Verification Failed'}
                </h2>
                <p className={`text-sm mb-6 ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
                  {message}
                </p>
                
                {isSuccess ? (
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">
                      Your admin account has been successfully verified. You can now access the admin dashboard.
                    </p>
                    <Link
                      href="/admin/login"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Go to Admin Login
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">
                      There was an issue verifying your account. Please contact support or try creating your account again.
                    </p>
                    <Link
                      href="/admin/create"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Create New Admin Account
                    </Link>
                  </div>
                )}
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Link
                    href="/"
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    ← Back to Home
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 