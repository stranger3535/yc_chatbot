"use client";

import { useState } from "react";
import { askChat } from "@/lib/api";
import ExampleQuestions from "./ExampleQuestions";
import MessageBubble from "./MessageBubble";

type Message = {
  role: "user" | "bot";
  text: string;
};

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function send(question?: string) {
    const q = question ?? input.trim();
    if (!q || loading) return;

    setMessages((prev) => [...prev, { role: "user", text: q }]);
    setInput("");
    setLoading(true);

    try {
      const data = await askChat(q);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: data.answer },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "⚠️ Error talking to server" },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto bg-slate-950 p-6 rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-white">
        YC Intel Chat
      </h1>

      {/* Example prompts */}
      <ExampleQuestions onSelect={send} />

      {/* Chat messages */}
      <div className="space-y-3 min-h-[320px] mb-4 flex flex-col">
        {messages.map((m, i) => (
          <MessageBubble key={i} role={m.role} text={m.text} />
        ))}

        {loading && (
          <div className="text-slate-400 text-sm">Thinking…</div>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Ask about YC companies…"
          className="flex-1 px-3 py-2 rounded bg-slate-800 text-white placeholder-slate-400 outline-none"
        />
        <button
          onClick={() => send()}
          disabled={loading}
          className="px-4 py-2 bg-green-500 rounded text-black font-medium disabled:opacity-60"
        >
          Send
        </button>
      </div>
    </div>
  );
}
