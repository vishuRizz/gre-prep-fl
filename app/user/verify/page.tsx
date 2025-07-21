// app/user/verify/page.tsx
"use client";

export const dynamic = 'force-dynamic'; // 👈 Add this line

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function VerifyUserPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    if (token) {
      fetch(`http://localhost:8080/public/user/verify?token=${token}`)
        .then((res) => res.text())
        .then((data) => setMessage(data))
        .catch(() => setMessage("Verification failed"));
    }
  }, [token]);

  return <div>{message}</div>;
}

