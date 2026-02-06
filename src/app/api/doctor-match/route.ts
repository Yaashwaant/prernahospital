import { NextResponse } from "next/server";

const doctors = [
  { name: "Dr. Aanya Mehta", specialty: "Anxiety & Mood Disorders" },
  { name: "Dr. Rohan Kapoor", specialty: "PTSD & Trauma" },
  { name: "Dr. Kavya Iyer", specialty: "Child & Adolescent Psychiatry" },
  { name: "Dr. Arjun Sethi", specialty: "Addiction & Dual Diagnosis" }
];

const SYSTEM = [
  "You choose a single psychiatrist from the list based on the user’s symptoms.",
  "Never provide cures, diagnoses, or medical advice.",
  "Output only: \"I recommend {Doctor} ({Specialty}).\"",
  "If unclear: \"I suggest scheduling with any of our psychiatrists; they’ll assess and guide you further.\"",
  "Doctors:",
  ...doctors.map(d => `- ${d.name}: ${d.specialty}`)
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