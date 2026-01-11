"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch("/api/trends")
      .then(setData)
      .catch((err: any) => setError(err.message));
  }, []);

  return (
    <main style={{ padding: 20 }}>
      <h1>API Test</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
