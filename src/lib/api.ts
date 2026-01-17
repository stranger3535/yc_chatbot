const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";


export async function askChat(question: string) {
  const res = await fetch(`${BASE_URL}/api/chat/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question }),
  });

  if (!res.ok) {
    throw new Error("Backend error");
  }

  return res.json();
}
