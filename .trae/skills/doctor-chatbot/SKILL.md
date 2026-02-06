---
name: "doctor-chatbot"
description: "Creates a floating AI chatbot that recommends the best psychiatrist from 4 doctors based on user symptoms. Invoke when user wants symptom-based doctor matching."
---

# Doctor Chatbot Skill

## Purpose
Builds a persistent floating chat widget (bottom-right) that:
1. Collects user symptoms via natural language
2. Matches symptoms to the most suitable psychiatrist among 4 predefined doctors
3. Never offers medical advice or cures—only suggests which doctor to consult
4. Ends every reply with a "Call 07887888865 to book" button

## Doctor Dataset (edit as needed)
```json
[
  {
    "name": "Dr. Aanya Mehta",
    "specialty": "Anxiety & Mood Disorders",
    "keywords": ["anxiety", "panic", "mood", "depression", "bipolar", "stress"]
  },
  {
    "name": "Dr. Rohan Kapoor",
    "specialty": "PTSD & Trauma",
    "keywords": ["trauma", "ptsd", "nightmare", "flashback", "accident", "abuse"]
  },
  {
    "name": "Dr. Kavya Iyer",
    "specialty": "Child & Adolescent Psychiatry",
    "keywords": ["child", "teen", "adolescent", "school", "adhd", "behavior"]
  },
  {
    "name": "Dr. Arjun Sethi",
    "specialty": "Addiction & Dual Diagnosis",
    "keywords": ["addiction", "substance", "alcohol", "drug", "dual diagnosis"]
  }
]
```

## Implementation Steps

### 1. Install Floating UI & Icons
```bash
npm install @floating-ui/react lucide-react
```

### 2. Create Chatbot Component
`src/components/DoctorChatbot.tsx`
```tsx
"use client";
import { useState, useEffect } from "react";
import { FloatingPortal, useFloating } from "@floating-ui/react";
import { MessageCircle, X, Phone } from "lucide-react";

const doctors = [
  { name: "Dr. Aanya Mehta", specialty: "Anxiety & Mood Disorders", keywords: ["anxiety", "panic", "mood", "depression", "bipolar", "stress"] },
  { name: "Dr. Rohan Kapoor", specialty: "PTSD & Trauma", keywords: ["trauma", "ptsd", "nightmare", "flashback", "accident", "abuse"] },
  { name: "Dr. Kavya Iyer", specialty: "Child & Adolescent Psychiatry", keywords: ["child", "teen", "adolescent", "school", "adhd", "behavior"] },
  { name: "Dr. Arjun Sethi", specialty: "Addiction & Dual Diagnosis", keywords: ["addiction", "substance", "alcohol", "drug", "dual diagnosis"] }
];

export default function DoctorChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! Describe your symptoms and I'll suggest the best psychiatrist for you." }
  ]);
  const [input, setInput] = useState("");

  const { refs, floatingStyles } = useFloating({ placement: "bottom-end", middleware: [] });

  const send = () => {
    if (!input.trim()) return;
    const userText = input.trim();
    setMessages(prev => [...prev, { from: "user", text: userText }]);
    setInput("");

    // Simple keyword matching
    const scores = doctors.map(d => {
      const hits = d.keywords.filter(k => userText.toLowerCase().includes(k)).length;
      return { ...d, score: hits };
    });
    const best = scores.sort((a, b) => b.score - a.score)[0];

    const reply = best.score > 0
      ? `Based on what you shared, I recommend ${best.name} (${best.specialty}).`
      : `I suggest scheduling with any of our psychiatrists; they’ll assess and guide you further.`;

    setMessages(prev => [...prev, { from: "bot", text: reply }]);
  };

  return (
    <>
      {/* Floating trigger */}
      <button
        ref={refs.setReference}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#1F4FD8] to-[#1ECAD3] text-white shadow-lg hover:scale-110 transition-transform"
        aria-label="Open symptom chatbot"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {open && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            className="z-50 w-80 rounded-2xl bg-white shadow-2xl ring-1 ring-gray-200"
          >
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
                className="rounded-lg bg-gradient-to-r from-[#1F4FD8] to-[#1ECAD3] px-3 py-2 text-white shadow hover:opacity-90"
              >
                Send
              </button>
            </div>
          </div>
        </FloatingPortal>
      )}
    </>
  );
}
```

### 3. Add to Root Layout
`src/app/layout.tsx`
```tsx
import DoctorChatbot from "@/components/DoctorChatbot";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <DoctorChatbot />
      </body>
    </html>
  );
}
```

## Best Free LLM Options (No API Key)
1. **WebLLM (in-browser, no server)** – runs a small model (Phi-2, RedPajama) entirely in the browser via WASM.
   - Repo: https://github.com/mlc-ai/web-llm
   - Pros: zero cost, private, offline after first load.
   - Cons: 1-3 GB download, slower on low-end devices.

2. **Transformers.js + Xenova/gte-small** – tiny embedding model for keyword/semantic search inside the chatbot (no cloud calls).
   - https://huggingface.co/Xenova/gte-small
   - Replace the simple keyword loop with vector similarity for better matching.

3. **Ollama + Phi-3-mini** – run a 3B model locally; expose a small `/match` endpoint your Next.js app can call.
   - Install: `curl -fsSL https://ollama.ai/install.sh | sh && ollama pull phi3:mini`
   - Add a lightweight API route `src/app/api/match/route.ts` that runs `ollama run phi3:mini` with a prompt like:
     ```
     Given these symptoms: "{userText}", output only the doctor name from this list: Dr. Aanya Mehta, Dr. Rohan Kapoor, Dr. Kavya Iyer, Dr. Arjun Sethi.
     ```
   - Pros: better reasoning, still free. Cons: requires local Ollama running.

Pick option 1 for a pure front-end solution, or option 3 if you want richer reasoning without cloud APIs.