import { NextResponse } from "next/server";
import { DOCTORS } from "@/data/doctors";

// Build the active doctors list from our source of truth (doctors.ts)
const doctors = DOCTORS.map((d) => ({
  name: d.name,
  specialty: d.specialties.join(" & ") || d.title || d.role
}));

const ROUTING_HINTS = [
  "If symptoms mention child, school, adolescent, ADHD, autism, behavior: prefer Child & Adolescent Psychiatry.",
  "If symptoms mention alcohol, tobacco, drugs, craving, withdrawal, relapse: prefer De-addiction.",
  "If symptoms mention sexual, libido, performance, erectile: prefer Sexual Medicine.",
  "Otherwise prefer Neuropsychiatry for mood, anxiety, psychosis, sleep or unclear cases."
].join("\n");

const SYSTEM = [
  "Choose exactly one psychiatrist from the list based on the user’s symptoms.",
  "Do NOT diagnose or give medical advice.",
  'Respond only in this format: "I recommend {Doctor} ({Specialty})."',
  'If unclear, respond: "I suggest scheduling with any of our psychiatrists; they’ll assess and guide you further."',
  "Routing rules:",
  ROUTING_HINTS,
  "Doctors:",
  ...doctors.map((d) => `- ${d.name}: ${d.specialty}`)
].join("\n");

export async function POST(req: Request) {
  const { symptoms } = await req.json();
  const prompt = `${SYSTEM}\nUser: ${symptoms}\nAssistant:`;

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.1,
      max_tokens: 50
    })
  });

  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content?.trim() || "I suggest scheduling with any of our psychiatrists; they’ll assess and guide you further.";
  return NextResponse.json({ suggestion: text });
}
