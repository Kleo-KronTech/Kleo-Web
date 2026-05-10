"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { X, Send } from "lucide-react";
import { MOCK_PATIENT } from "@/src/data/patient";

type Props = {
  setModalOpen: (open: boolean) => void;
};

const QUICK_MESSAGES = [
  "How are you feeling today?",
  "Don't forget your medication!",
  "Time for your walk outside.",
  "Lunch is ready, don't skip it.",
  "I'm checking in — everything okay?",
];

export default function SendMessageModal({ setModalOpen }: Props) {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async () => {
    if (!message.trim()) return;

    setIsSending(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3000/messages/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientId: MOCK_PATIENT.initials,
          message: message.trim(),
          sentBy: "Ana",
        }),
      });

      if (!res.ok) throw new Error("Failed to send");

      setSent(true);
      setTimeout(() => setModalOpen(false), 1500);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="w-full">
     
      <div className="flex items-center justify-between mb-5">
        <span className="text-sm font-medium text-zinc-300">
          Send message · {MOCK_PATIENT.name}
        </span>
        <button
          onClick={() => setModalOpen(false)}
          className="text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-md p-1"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {sent ? (
        <div className="flex flex-col items-center gap-3 py-8">
          <div className="w-10 h-10 rounded-full bg-[#ebe8ff] flex items-center justify-center">
            <Send size={18} className="text-[#5e54b8]" />
          </div>
          <p className="text-sm font-medium text-zinc-200">Message sent!</p>
          <p className="text-xs text-zinc-500">
            Maria will be notified on her app.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
         
          <div className="flex flex-col gap-1.5">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
              Quick select
            </p>
            <div className="flex flex-col gap-1">
              {QUICK_MESSAGES.map((msg) => (
                <button
                  key={msg}
                  onClick={() => setMessage(msg)}
                  className={`text-left px-3 py-2 rounded-lg text-sm transition-all border ${
                    message === msg
                      ? "border-[#5e54b8] bg-zinc-800 text-zinc-100"
                      : "border-zinc-800 bg-zinc-800/50 text-zinc-400 hover:border-zinc-600 hover:text-zinc-300"
                  }`}
                >
                  {msg}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
              Or write your own
            </p>
            <textarea
              rows={3}
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-[#5e54b8] resize-none"
            />
          </div>

          {error && <p className="text-xs text-red-400">{error}</p>}

          <Button
            onClick={handleSend}
            disabled={!message.trim() || isSending}
            className="w-full bg-[#5e54b8] hover:bg-[#4e46a8] border border-[#4e46a8] text-white font-medium rounded-lg disabled:opacity-40"
          >
            {isSending ? "Sending..." : "Send message"}
          </Button>
        </div>
      )}
    </div>
  );
}
