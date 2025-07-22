// app/user/verify/page.tsx
"use client";

export const dynamic = 'force-dynamic'; // 👈 Add this line
export const fetchCache = "force-no-store";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function VerifyUserContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    if (token) {
      fetch(`https://greprepcoach-service-177259961249.asia-south1.run.app/public/user/verify?token=${token}`)
        .then((res) => res.text())
        .then((data) => setMessage(data))
        .catch(() => setMessage("Verification failed"));
    }
  }, [token]);

  return <div>{message}</div>;
}

export default function VerifyUserPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyUserContent />
    </Suspense>
  );
}