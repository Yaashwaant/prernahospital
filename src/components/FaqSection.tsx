"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

const faqs: FAQItem[] = [
  {
    question: "What are the early signs and symptoms of depression?",
    answer: (
      <div className="space-y-4">
        <p>
          Depression is a clinical condition, not simply a low mood. According to diagnostic criteria (DSM-5 / ICD-11), symptoms must persist for at least two weeks and represent a change from previous functioning. Common early warning signs include:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Emotional:</strong> persistent sadness, emptiness, or hopelessness; unexplained tearfulness; loss of interest or pleasure in activities once enjoyed (anhedonia); irritability or frustration over minor matters.</li>
          <li><strong>Physical and cognitive:</strong> significant fatigue, low energy, sleep disturbance (insomnia or oversleeping), appetite or weight changes, difficulty concentrating or making decisions, psychomotor slowing, and unexplained physical aches.</li>
        </ul>
        <p className="font-medium text-[#003D52]">
          When to act: If these symptoms persist beyond two weeks, interfere with work, relationships, or self-care, or if thoughts of self-harm or death are present, professional evaluation is essential. Depression is highly treatable — do not wait.
        </p>
      </div>
    ),
  },
  {
    question: "When should I consult a psychiatrist?",
    answer: (
      <div className="space-y-4">
        <p>
          A psychiatrist is a medical doctor (MBBS + postgraduate training) specialising in the diagnosis, treatment, and prevention of mental, emotional, and behavioural disorders. Consider a consultation if you or someone you care for experiences:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Persistent sadness, hopelessness, or emotional numbness lasting more than two weeks</li>
          <li>Severe anxiety, panic attacks, or constant excessive worry</li>
          <li>Persistent sleep problems — difficulty falling asleep, staying asleep, or sleeping too much</li>
          <li>Intrusive, obsessive, or uncontrollable thoughts</li>
          <li>Sudden personality changes, aggression, or social withdrawal</li>
          <li>Hallucinations (hearing or seeing things others do not) or delusions</li>
          <li>Inability to function at work, school, or in relationships</li>
          <li>Dependence on alcohol, drugs, or prescription medications</li>
          <li>Thoughts of self-harm or suicide</li>
        </ul>
        <p>
          You do not need a referral to see a psychiatrist at Prerna Hospital. Our OPD is open 9:00 AM – 8:00 PM, and 24/7 emergency care is available on campus.
        </p>
      </div>
    ),
  },
  {
    question: "How can I stop overthinking and anxiety?",
    answer: (
      <div className="space-y-4">
        <p>
          Occasional overthinking is a normal human experience — our brains are wired to anticipate threats. It becomes a clinical concern when it is persistent, difficult to control, and disrupts daily functioning.
        </p>
        <p>
          <strong>Self-help strategies with evidence support:</strong> diaphragmatic breathing (slow, deep breaths to activate the parasympathetic nervous system), scheduled &quot;worry time&quot; to contain ruminative thinking, regular physical activity, and limiting caffeine and screen exposure before bed.
        </p>
        <p className="font-medium">When professional help is needed:</p>
        <p>
          If anxiety or overthinking consistently disrupts sleep, work performance, or relationships, or causes physical symptoms such as a racing heart, chest tightness, or dizziness, a formal assessment is recommended. Prerna Hospital&apos;s psychological therapy team offers:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Cognitive Behavioural Therapy (CBT)</strong> — the gold-standard psychotherapy for anxiety, shown in multiple meta-analyses to significantly reduce anxiety symptoms</li>
          <li><strong>Mindfulness-based approaches</strong> — structured techniques to reduce rumination</li>
          <li><strong>Medication</strong> — SSRIs and SNRIs are safe, effective, and non-addictive first-line options when clinically indicated, prescribed by our consultant psychiatrists</li>
        </ul>
      </div>
    ),
  },
  {
    question: "What is the best treatment for alcohol and drug addiction?",
    answer: (
      <div className="space-y-4">
        <p>
          Addiction (Substance Use Disorder) is a chronic, relapsing brain condition — not a moral failing. Effective treatment is multi-component and personalised. At Prerna Hospital, our de-addiction programme includes:
        </p>
        <ol className="list-decimal pl-5 space-y-3">
          <li><strong>Medical detoxification</strong> — When withdrawal symptoms such as tremors, seizures, or delirium are medically risky, supervised detox ensures safety. This is never the full treatment — it is only the beginning.</li>
          <li><strong>Counselling and psychotherapy</strong> — Motivational Interviewing (MI) helps build readiness for change. CBT identifies and restructures the thought patterns and triggers that sustain addiction.</li>
          <li><strong>Medication-Assisted Treatment (MAT)</strong> — Evidence-based medications can reduce cravings and block the rewarding effects of substances, significantly improving long-term outcomes.</li>
          <li><strong>Family therapy</strong> — Addiction affects the entire family system. Involving family members improves communication, reduces enabling behaviours, and strengthens the recovery environment.</li>
          <li><strong>Relapse prevention planning</strong> — A structured aftercare plan identifying high-risk situations, coping strategies, and support systems is essential for sustained recovery.</li>
        </ol>
        <p>
          Recovery is possible. Our specialist psychiatrists — Dr. Ashish Mohide, Dr. Manik C. Bhise (MBBS, MD Psychiatry, Gold Medal), and Dr. Sadeq Qureshi — have extensive experience in de-addiction care.
        </p>
      </div>
    ),
  },
  {
    question: "What are the signs that someone needs de-addiction treatment?",
    answer: (
      <div className="space-y-4">
        <p>
          The DSM-5 defines Substance Use Disorder across a spectrum from mild to severe, based on meeting 2 or more of 11 criteria. Practically, watch for these signs:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Loss of control:</strong> using more than intended or for longer than planned; a persistent desire or repeated failed attempts to cut down.</li>
          <li><strong>Physical dependence:</strong> needing more of the substance for the same effect (tolerance); experiencing withdrawal symptoms — shaking, sweating, nausea, anxiety, or seizures — when not using.</li>
          <li><strong>Life impact:</strong> neglecting work, studies, or parenting responsibilities; withdrawing from social activities and hobbies; continuing to use despite knowing it is causing physical or psychological harm.</li>
          <li><strong>Preoccupation:</strong> spending significant time obtaining, using, or recovering from the substance; strong cravings that are difficult to resist.</li>
        </ul>
        <p>
          If three or more of these signs are present, a formal assessment with a psychiatrist is strongly advisable. At Prerna Hospital, our de-addiction services include inpatient care with 24/7 nursing supervision, available on our green city campus in Chhatrapati Sambhajinagar.
        </p>
      </div>
    ),
  },
  {
    question: "How do I book an appointment with a psychiatrist at Prerna Hospital?",
    answer: (
      <div className="space-y-4">
        <p>Booking options:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Phone:</strong> <a href="tel:7887888865" className="text-[#008489] hover:underline">7887888865</a> / <a href="tel:02403591167" className="text-[#008489] hover:underline">0240-3591167</a> / <a href="tel:9325358630" className="text-[#008489] hover:underline">9325358630</a></li>
          <li><strong>WhatsApp:</strong> <a href="https://wa.me/917887888865" target="_blank" rel="noopener noreferrer" className="text-[#008489] hover:underline">Message us at 7887888865</a></li>
          <li><strong>In person:</strong> Walk in directly — no referral needed</li>
          <li><strong>Online:</strong> Use the contact form at <a href="/contact" className="text-[#008489] hover:underline">prernahospital.com/contact</a></li>
        </ul>
        <ul className="list-none space-y-2 pt-2 border-t border-gray-100">
          <li><strong>OPD hours:</strong> 9:00 AM – 8:00 PM, Monday to Saturday. Consultant psychiatrists are available throughout OPD hours.</li>
          <li><strong>Emergency:</strong> 24 hours a day, 7 days a week. Emergency psychiatric admission is available round the clock.</li>
          <li><strong>Location:</strong> G47, Town Centre N-6, Connaught Place, near Ganesh Temple and Varsha Palace Hotel, Cidco, Chhatrapati Sambhajinagar 431003.</li>
        </ul>
        <p className="pt-2">
          <strong>What to expect at your first visit:</strong> A consultant psychiatrist will conduct a comprehensive assessment of your symptoms, medical history, and personal circumstances. The consultation is confidential. Based on the assessment, a treatment plan — which may include therapy, medication, further investigation, or inpatient care — will be discussed with you and your family if appropriate.
        </p>
      </div>
    ),
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="w-full bg-[#F3F7FA] px-4 py-20 md:px-8 md:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-[#003D52] md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Clear, evidence-based answers to common questions about mental health, de-addiction, and our hospital services.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={false}
                className="overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left focus:outline-none"
                >
                  <span className="text-lg font-bold text-[#003D52] pr-8">
                    {faq.question}
                  </span>
                  <div
                    className={[
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors",
                      isOpen ? "bg-[#003D52] text-white" : "bg-teal-50 text-[#008489]",
                    ].join(" ")}
                  >
                    <Plus
                      className={[
                        "h-5 w-5 transition-transform duration-300",
                        isOpen ? "rotate-45" : "",
                      ].join(" ")}
                    />
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-0 text-gray-600 leading-relaxed text-[15px] md:text-base">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
