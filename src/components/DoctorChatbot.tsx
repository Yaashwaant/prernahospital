"use client";
import { useState } from "react";
import { MessageCircle, X, Phone, Send, Loader2 } from "lucide-react";

export default function DoctorChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! Describe your symptoms and I’ll suggest the best psychiatrist for you." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim()) return;
    const userText = input.trim();
    setMessages(prev => [...prev, { from: "user", text: userText }]);
    setInput("");
    setLoading(true);

    try {
      const r = await fetch("/api/doctor-match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms: userText })
      });
      const { suggestion } = await r.json();
      setMessages(prev => [...prev, { from: "bot", text: suggestion }]);
    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, { from: "bot", text: "Sorry, I couldn’t process that. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating trigger */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1F4FD8] to-[#1ECAD3] text-white shadow-lg hover:scale-110 transition-transform"
        style={{
          boxShadow: "0 8px 30px rgba(30, 202, 211, 0.4)"
        }}
        aria-label="Open symptom chatbot"
      >
        <BotIcon className="h-9 w-9 drop-shadow-md" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4">
          {/* backdrop */}
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
          {/* panel */}
          <div className="relative w-80 rounded-2xl bg-white shadow-2xl ring-1 ring-gray-200">
            {/* Header */}
            <div className="flex items-center justify-between rounded-t-2xl bg-gradient-to-r from-[#1F4FD8] to-[#1ECAD3] px-4 py-3 text-white">
              <span className="font-semibold">Find Psychiatrist</span>
              <button onClick={() => setOpen(false)} aria-label="Close chat">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-64 overflow-y-auto p-4 space-y-3 text-sm">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[75%] rounded-lg px-3 py-2 ${m.from === "user" ? "bg-blue-100 text-blue-900" : "bg-gray-100 text-gray-800"}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-600">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Thinking…
                  </div>
                </div>
              )}
              {/* Call CTA */}
              <div className="mt-2 flex justify-center">
                <a
                  href="tel:07887888865"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#1ECAD3] to-[#1F4FD8] px-4 py-2 text-xs font-semibold text-white shadow"
                >
                  <Phone className="h-4 w-4" />
                  Call 07887888865 to book
                </a>
              </div>
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 p-3 flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && send()}
                placeholder="Type your symptoms..."
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F4FD8]"
              />
              <button
                onClick={send}
                disabled={loading}
                className="rounded-lg bg-gradient-to-r from-[#1F4FD8] to-[#1ECAD3] px-3 py-2 text-white shadow hover:opacity-90 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const BotIcon = ({ className }: { className?: string }) => (
  <svg viewBox="-5 -5 110 120" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <mask id="bot-mask">
        {/* Antennas */}
        <path d="M 35 25 L 35 12" stroke="white" strokeWidth="5" strokeLinecap="round" />
        <circle cx="35" cy="7" r="6" stroke="white" strokeWidth="5" fill="none" />
        <path d="M 65 25 L 65 12" stroke="white" strokeWidth="5" strokeLinecap="round" />
        <circle cx="65" cy="7" r="6" stroke="white" strokeWidth="5" fill="none" />
        
        {/* Body */}
        <path d="M 20 25 
                 H 80 
                 C 90 25 95 30 95 40 
                 V 75 
                 C 95 85 90 90 80 90 
                 H 55 
                 L 40 105 
                 V 90 
                 H 20 
                 C 10 90 5 85 5 75 
                 V 40 
                 C 5 30 10 25 20 25 Z" fill="white" />
        
        {/* Black cutouts (Eyes and Smile) */}
        <path d="M 30 55 Q 37.5 40 45 55" stroke="black" strokeWidth="7" strokeLinecap="round" fill="none" />
        <path d="M 55 55 Q 62.5 40 70 55" stroke="black" strokeWidth="7" strokeLinecap="round" fill="none" />
        <path d="M 35 70 Q 50 82 65 70" stroke="black" strokeWidth="6" strokeLinecap="round" fill="none" />
      </mask>
    </defs>
    
    <rect x="-10" y="-10" width="120" height="130" fill="currentColor" mask="url(#bot-mask)" />
  </svg>
);