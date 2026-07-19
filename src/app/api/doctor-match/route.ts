import { NextResponse } from "next/server";
import { DOCTORS } from "@/data/doctors";

// ─── Build doctor context block from data (no hardcoding) ─────────────────────
function buildDoctorContext() {
  return DOCTORS.map((d) =>
    `DOCTOR: ${d.name} (${d.qualifications})
Role: ${d.role} | Specialities: ${d.Specialities.join(", ")}
Treats: ${d.treatsConditions.join("; ")}
Age groups seen: ${d.ageGroups.join(", ")}
Profile: ${d.chatbotProfile}`
  ).join("\n\n");
}

// ─── Few-shot examples (teach LLM the routing pattern) ────────────────────────
// These examples demonstrate HOW to reason — not hardcoded rules.
// When a new doctor is added to doctors.ts, just update these examples.
const FEW_SHOT_EXAMPLES = `
EXAMPLE 1
Patient: "I have been feeling very sad and hopeless for months. I have no energy or interest in anything."
Reasoning: This is general adult depression with no specific sub-specialty trigger. All three neuropsychiatrists are qualified to treat mood disorders.
Response: "We understand how difficult this must be. Your concern about persistent sadness and low mood can be addressed by any of our neuropsychiatrists — Dr. Manik C. Bhise, Dr. Ashish Mohide, or Dr. Sadeq Qureshi. Please call us to book an appointment with the earliest available doctor."

EXAMPLE 2
Patient: "My 9-year-old son is very hyperactive, cannot sit still in class and his teacher says he has attention problems."
Reasoning: Hyperactivity and attention problems in a child clearly points to ADHD / child psychiatry. Dr. Sadeq Qureshi is the child and adolescent psychiatry specialist.
Response: "Thank you for reaching out. What you're describing in your son sounds like it could benefit from a Child Psychiatry assessment. We recommend Dr. Sadeq Qureshi, our Child and Adolescent Psychiatrist, who specialises in ADHD and behavioural disorders in children. Please call us to schedule an appointment."

EXAMPLE 3
Patient: "I have been drinking heavily every day for 2 years. I tried to stop but I get shaky and anxious. My family is very worried."
Reasoning: Heavy daily alcohol use with withdrawal symptoms (shakiness, anxiety on stopping) is a clear de-addiction case. Dr. Ashish Mohide is the de-addiction specialist trained at NIMHANS.
Response: "We're sorry to hear you're going through this — it takes courage to reach out. Your symptoms of heavy alcohol dependence and withdrawal are best assessed by Dr. Ashish Mohide, our De-addiction Specialist with advanced training from NIMHANS. Please call us urgently as withdrawal can need medical attention."

EXAMPLE 4
Patient: "I am having problems with my sexual health. I have erectile dysfunction and it has been affecting my marriage."
Reasoning: Erectile dysfunction and marital impact is a sexual medicine concern. Dr. Manik C. Bhise is the specialist in sexual medicine and relationship counselling.
Response: "We understand this can be a sensitive and distressing experience. Dr. Manik C. Bhise, our Neuropsychiatrist specialising in Sexual Medicine and Relationship Counselling, is best suited to help you. Please call us to book a confidential appointment."

EXAMPLE 5
Patient: "I hear voices talking to me that others cannot hear. Sometimes I feel people are following me."
Reasoning: Auditory hallucinations and paranoid delusions are symptoms of psychosis. Dr. Manik C. Bhise has the most experience with complex psychotic disorders.
Response: "These experiences sound very distressing and we want to help. The symptoms you describe need urgent psychiatric evaluation. We strongly recommend Dr. Manik C. Bhise, our senior Neuropsychiatrist with extensive experience in psychotic disorders. Please contact us as soon as possible."

EXAMPLE 6
Patient: "I have been under a lot of stress lately and I cannot sleep well. I keep waking up at night and feel tired all day."
Reasoning: Stress and insomnia in an adult with no specific sub-specialty marker — all three doctors can help, but Dr. Manik C. Bhise also has specific expertise in insomnia.
Response: "Sleep problems and stress are very common and very treatable. For your concern, you can consult Dr. Manik C. Bhise (who has specific expertise in insomnia), Dr. Ashish Mohide, or Dr. Sadeq Qureshi — all are available for a consultation. Please call us to book the earliest appointment."

EXAMPLE 7
Patient: "My teenage daughter has been refusing to go to school for the past month and is very anxious whenever we push her."
Reasoning: School refusal and anxiety in a teenager is a child and adolescent psychiatry concern. Dr. Sadeq Qureshi is the specialist.
Response: "School refusal and anxiety in teenagers is something Dr. Sadeq Qureshi, our Child and Adolescent Psychiatrist, handles with great expertise. He runs school mental health programs and parenting counselling sessions. Please call us to book an appointment for your daughter."

EXAMPLE 8
Patient: "I need a biopsy report for a tissue sample. The surgeon sent it for histopathology."
Reasoning: Histopathology, biopsy reporting, and tissue examination are pathology concerns. Dr. Anuradha Patil is the Consultant Pathologist.
Response: "For histopathology and biopsy reports, our Consultant Pathologist Dr. Anuradha Patil (MBBS, MD Pathology) is the right specialist. She handles all tissue-based diagnostics at Prerna Hospital. Please call us to arrange your pathology work."

EXAMPLE 9
Patient: "My wife has been diagnosed with ovarian cancer. The doctor wants a detailed pathology report."
Reasoning: Cancer pathology, ovarian tumor diagnosis, and malignancy reporting fall under pathology. Dr. Anuradha Patil specialises in ovarian tumor histopathology and hemato-oncology.
Response: "We understand how difficult this time must be for your family. For ovarian tumor pathology and cancer diagnostics, Dr. Anuradha Patil, our Consultant Pathologist with acclaimed research in ovarian tumor histopathology, is the right specialist to consult. Please call us to schedule an appointment."

EXAMPLE 10
Patient: "My blood reports show low hemoglobin and my platelet count is very low. The doctor suspects a blood disorder."
Reasoning: Blood count abnormalities and suspected blood disorders (hematological concerns like anemia, thrombocytopenia) are pathology/hemato-oncology concerns. Dr. Anuradha Patil is the specialist in hemato-oncology and hematological disorders.
Response: "Abnormal blood counts and suspected blood disorders are best evaluated by our Consultant Pathologist, Dr. Anuradha Patil, who specialises in hemato-oncology and hematological diagnostics. Please call us to schedule a consultation and arrange your lab work."`.trim();

import { symptomsSchema } from "@/lib/validation";

// ─── System prompt ─────────────────────────────────────────────────────────────
function buildSystemPrompt() {
  return `You are a helpful patient-facing assistant at Prerna Hospital, a neuropsychiatric hospital in Chhatrapati Sambhajinagar.

Your job is to read a patient's concern and recommend the most appropriate doctor(s) from the hospital team below.
If the concern is generic (anxiety, stress, depression, general mood issues) with no clear sub-specialty, recommend ALL available psychiatrists.
If the concern has a clear sub-specialty match (child, addiction, sexual medicine, psychosis), recommend the most suitable psychiatrist specifically.
If the concern is about pathology, biopsy, lab tests, blood disorders, cancer diagnosis, histopathology, cytopathology (FNAC, pap smear), or hemato-oncology, recommend Dr. Anuradha Patil specifically.

HOSPITAL DOCTORS:
${buildDoctorContext()}

GUIDELINES:
- Do NOT diagnose the patient or give medical advice
- Do NOT suggest specific medications
- Be warm, reassuring and concise (2–3 sentences maximum)
- Always end with a call to action to contact the hospital
- If unsure between two doctors, mention both

FEW-SHOT EXAMPLES (for your reference on how to reason and respond):
${FEW_SHOT_EXAMPLES}`;
}

// ─── API handler ──────────────────────────────────────────────────────────────
export async function POST(req: Request) {
  let symptoms: string;
  try {
    const body = await req.json();
    const result = symptomsSchema.safeParse(body.symptoms);
    if (!result.success) {
      return NextResponse.json({
        suggestion: result.error.issues[0]?.message || "Please describe your symptoms or concern so I can help you find the right doctor.",
      }, { status: 400 });
    }
    symptoms = result.data;
  } catch {
    return NextResponse.json({
      suggestion: "Please describe your symptoms or concern so I can help you find the right doctor.",
    }, { status: 400 });
  }


  // Fallback if Groq key not configured
  if (!process.env.GROQ_API_KEY) {
    const names = DOCTORS.map((d) => `${d.name} (${d.Specialities[0]})`).join(", ");
    return NextResponse.json({
      suggestion: `Our team of psychiatrists — ${names} — are here to help. Please call us to book an appointment.`,
    });
  }

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: buildSystemPrompt() },
          { role: "user", content: symptoms },
        ],
        temperature: 0.3,
        max_tokens: 150,
      }),
    });

    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content?.trim();

    if (text) return NextResponse.json({ suggestion: text });

    // AI gave empty response
    throw new Error("Empty AI response");

  } catch {
    const names = DOCTORS.map((d) => `${d.name} (${d.Specialities[0]})`).join(", ");
    return NextResponse.json({
      suggestion: `Our team — ${names} — are ready to help with your concern. Please call us to book an appointment.`,
    });
  }
}
