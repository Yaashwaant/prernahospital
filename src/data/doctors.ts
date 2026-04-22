export interface Doctor {
  slug: string;
  name: string;
  role: string;
  title: string;
  specialties: string[];

  // ── Chatbot routing fields ─────────────────────────────────────────────────
  /** Symptom / condition keywords that should route to this doctor */
  keywords: string[];
  /** Human-readable list of conditions this doctor commonly treats */
  treatsConditions: string[];
  /** True if this doctor handles everyday / general psychiatric concerns */
  isGeneralist: boolean;
  /** Age groups this doctor sees */
  ageGroups: ("children" | "adolescents" | "adults" | "elderly")[];
  /**
   * Short paragraph the AI uses as context when constructing recommendations.
   * Write it as a third-person factual profile, mentioning strengths clearly.
   */
  chatbotProfile: string;

  // ── Display fields ─────────────────────────────────────────────────────────
  image: string;
  location: string;
  qualifications: string;
  overview: string[];
  fellowshipMembership: string[];
  fieldOfExpertise: string[];
  languagesSpoken: string[];
  awardsAchievements: string[];
}

export const DOCTORS: Doctor[] = [
  {
    slug: "ashish-mohide",
    name: "Dr. Ashish Mohide",
    role: "Consultant Neuropsychiatrist",
    title: "De-addiction Specialist",
    specialties: ["Neuropsychiatry", "De-addiction"],

    // ── Chatbot routing ──────────────────────────────────────────────────────
    keywords: [
      // De-addiction
      "alcohol", "alcoholism", "drinking", "drunk", "beer", "liquor", "wine",
      "drug", "drugs", "cocaine", "heroin", "marijuana", "cannabis", "weed",
      "substance", "addiction", "addicted", "withdrawal", "craving", "cravings",
      "relapse", "tobacco", "smoking", "smoke", "nicotine", "chewing tobacco",
      "de-addiction", "detox", "detoxification",
      // Child & community
      "child", "children", "kid", "kids", "adolescent", "school", "bedwetting",
      "learning problem", "learning difficulty", "community", "outreach",
      // General psychiatry
      "anxiety", "depression", "stress", "mood", "mental health", "psychiatry",
    ],
    treatsConditions: [
      "Alcohol use disorder & alcoholism",
      "Drug and substance use disorders (cocaine, heroin, cannabis, opioids)",
      "Nicotine and tobacco dependence",
      "Detoxification and medically supervised withdrawal",
      "Relapse prevention therapy",
      "Child and adolescent psychiatric disorders",
      "Anxiety disorders",
      "Depression and mood disorders",
      "Psychotherapy and counselling",
      "Community mental health",
    ],
    isGeneralist: true,
    ageGroups: ["children", "adolescents", "adults"],
    chatbotProfile:
      "Dr. Ashish Mohide is a neuropsychiatrist with specialised training in de-addiction medicine " +
      "from NIMHANS Bengaluru and community psychiatry from IPH Mumbai. He is the go-to choice for " +
      "alcohol, drug, tobacco, and substance abuse cases, as well as detoxification and relapse prevention. " +
      "He also has training in child psychiatry and psychotherapy. For general adult psychiatric problems " +
      "such as anxiety, stress and depression, he is fully qualified and available.",

    // ── Display ──────────────────────────────────────────────────────────────
    image: "/DR%20ASHISH%20PHOTO.jpeg",
    location: "Prerna Hospital LLP, Chhatrapati Sambhajinagar",
    qualifications: "MBBS, DPM, DNB",
    overview: [
      "Dr. Ashish Mohide is an experienced neuropsychiatrist with focused expertise in de-addiction, community psychiatry and child psychiatry.",
      "He has received dedicated training at premier institutes including NIMHANS Bengaluru and IPH Mumbai, and has been actively involved in academic as well as community mental health work.",
      "At Prerna Hospital he leads comprehensive de-addiction and mental health services, with a strong emphasis on holistic recovery and long-term rehabilitation.",
    ],
    fellowshipMembership: [
      "Training in Addiction Medicine at NIMHANS, Bengaluru",
      "Training in Child Psychiatry and Psychotherapy at NIMHANS",
      "Training in Industrial and Community Psychiatry at IPH, Mumbai",
      "Senior Resident experience at MGM Medical College, Aurangabad",
    ],
    fieldOfExpertise: [
      "Alcohol and substance use disorders",
      "Detoxification and relapse prevention",
      "Child and adolescent mental health",
      "Psychotherapy and counselling",
      "Community outreach and mental health awareness",
    ],
    languagesSpoken: ["Marathi", "Hindi", "English"],
    awardsAchievements: [
      "Active role in multiple mental health awareness programs and screening camps",
      "Contributor to de-addiction initiatives in remote villages around Chhatrapati Sambhajinagar",
      "Associated with NGOs working in mental health and women empowerment",
    ],
  },

  {
    slug: "manik-bhise",
    name: "Dr. Manik C. Bhise",
    role: "Consultant Neuropsychiatrist",
    title: "Director – Prerna Hospital LLP",
    specialties: ["De-addiction", "Sexology", "Neuropsychiatry"],

    // ── Chatbot routing ──────────────────────────────────────────────────────
    keywords: [
      // Sexology
      "sexual", "sex", "libido", "erectile", "erectile dysfunction", "impoten",
      "premature ejaculation", "no desire", "low desire", "intimacy", "relationship problem",
      "orgasm", "performance anxiety", "sexual problem", "marital problem",
      // Complex mood / psychosis
      "psychosis", "psychotic", "schizophrenia", "hallucination", "delusion",
      "bipolar", "mania", "manic", "severe depression", "suicidal", "self-harm",
      "insomnia", "unable to sleep", "not sleeping well",
      // De-addiction
      "alcohol", "drug", "addiction", "substance", "withdrawal", "relapse",
      // General
      "anxiety", "depression", "stress", "mood", "mental health",
      "rural mental health", "suicide prevention", "farmers", "research",
    ],
    treatsConditions: [
      "Complex mood disorders (severe depression, bipolar disorder, mania)",
      "Psychotic disorders (schizophrenia, hallucinations, delusions)",
      "Sexual medicine and dysfunction (erectile dysfunction, low libido, premature ejaculation)",
      "Insomnia and sleep disorders",
      "Marital and relationship counselling",
      "De-addiction and relapse prevention",
      "Rural mental health and suicide prevention",
      "Anxiety and stress disorders",
      "General adult psychiatry",
    ],
    isGeneralist: true,
    ageGroups: ["adults", "elderly"],
    chatbotProfile:
      "Dr. Manik C. Bhise is the Director of Prerna Hospital and a gold medallist in MD Psychiatry with over " +
      "two decades of experience. He is the primary specialist for sexual medicine (erectile dysfunction, low " +
      "libido, premature ejaculation, marital issues), complex psychotic and mood disorders (schizophrenia, " +
      "bipolar disorder, severe depression), and insomnia. He also handles de-addiction and general adult " +
      "psychiatry. Preferred for the most complex or unclear cases.",

    // ── Display ──────────────────────────────────────────────────────────────
    image: "/Dr%20Manik%20Bhise%20Pic.jpeg",
    location: "Prerna Hospital LLP, Chhatrapati Sambhajinagar",
    qualifications: "MBBS, MD (Psychiatry, Gold Medal)",
    overview: [
      "Dr. Manik C. Bhise is a senior psychiatrist, academic leader and Director at Prerna Hospital LLP with more than two decades of experience.",
      "He has held key academic positions including Professor and Head of Psychiatry at MGM Medical College, and has guided numerous students and residents.",
      "His work spans clinical practice, research in rural mental health and farmers' suicides, insomnia and psychological distress, alongside active involvement in professional bodies.",
    ],
    fellowshipMembership: [
      "Fellow of Indian Psychiatric Society (IPS)",
      "Fellow of Indian Association for Social Psychiatry (IASP)",
      "Fellow of Indian Association of Private Psychiatrists (IAPP)",
      "Reviewer for multiple national and international psychiatric journals",
    ],
    fieldOfExpertise: [
      "Treatment of complex mood and psychotic disorders",
      "De-addiction and relapse prevention programs",
      "Sexual medicine and relationship counselling",
      "Rural mental health and suicide prevention",
      "Clinical research and medical education",
    ],
    languagesSpoken: ["Marathi", "Hindi", "English"],
    awardsAchievements: [
      "Gold Medalist in MD Psychiatry (MUHS Nashik)",
      "Young Psychiatrist Fellowship – World Association for Social Psychiatry",
      "Recipient of multiple national awards including Sushrut Award, Murugappan Award and Dr Ramesh Patel Award",
      "Principal investigator for several clinical trials and author of numerous research publications",
    ],
  },

  {
    slug: "sadeq-qureshi",
    name: "Dr. Sadeq Qureshi",
    role: "Consultant Neuropsychiatrist",
    title: "Child and Adolescent Psychiatrist",
    specialties: ["De-addiction", "Child and Adolescent Psychiatry"],

    // ── Chatbot routing ──────────────────────────────────────────────────────
    keywords: [
      // Child & adolescent — primary specialty
      "child", "children", "kid", "kids", "baby", "toddler", "adolescent",
      "teenager", "teen", "school", "school problem", "school refusal",
      "adhd", "attention deficit", "hyperactive", "hyperactivity", "autism",
      "autistic", "learning disability", "speech delay", "developmental delay",
      "bedwetting", "enuresis", "conduct disorder", "oppositional",
      "parenting", "parent problem", "aggressive child", "behavioral problem",
      "behavior problem", "my child", "my son", "my daughter", "son", "daughter",
      // De-addiction
      "alcohol", "drug", "addiction", "substance", "withdrawal", "craving", "relapse",
      // General
      "anxiety", "depression", "stress", "mood", "mental health",
    ],
    treatsConditions: [
      "ADHD (Attention Deficit Hyperactivity Disorder)",
      "Autism spectrum disorder",
      "Child and adolescent anxiety and depression",
      "Behavioural and conduct disorders",
      "Learning disabilities and developmental delays",
      "School refusal and school-related problems",
      "Parenting difficulties and family counselling",
      "Bedwetting (enuresis)",
      "De-addiction (adolescents and adults)",
      "Anxiety, mood and stress disorders",
    ],
    isGeneralist: true,
    ageGroups: ["children", "adolescents", "adults"],
    chatbotProfile:
      "Dr. Sadeq Qureshi is a neuropsychiatrist specialising in child and adolescent psychiatry. He is the " +
      "first choice when the patient is a child or teenager, or when symptoms involve ADHD, autism, " +
      "developmental delay, learning difficulties, school problems, behavioural issues, or parenting concerns. " +
      "He also runs school mental health and parenting workshops. Additionally, he is trained in de-addiction " +
      "and handles adult anxiety, mood and stress disorders as a general psychiatrist.",

    // ── Display ──────────────────────────────────────────────────────────────
    image: "/DR%20SADEQ%20SIR%20PHOTO.JPG",
    location: "Prerna Hospital LLP, Chhatrapati Sambhajinagar",
    qualifications: "MBBS, DPM, DNB",
    overview: [
      "Dr. Sadeq Qureshi is a neuropsychiatrist and child and adolescent psychiatrist with extensive clinical and research experience.",
      "He has trained at leading institutes across Maharashtra and Hyderabad, and is associated with academic teaching as an Assistant Professor.",
      "His practice spans de-addiction, child and adolescent psychiatry and community mental health, with active participation in clinical research.",
    ],
    fellowshipMembership: [
      "Experience at Government Medical College, Aurangabad",
      "DPM from B.J. Medical College and Sassoon General Hospital, Pune",
      "DNB from Asha Hospital, Hyderabad",
      "Assistant Professor at JIIU's IIMSR Medical College, Badnapur, Jalna",
      "Co-investigator and rater in multiple multicentric international clinical trials",
    ],
    fieldOfExpertise: [
      "Child and adolescent psychiatry",
      "De-addiction and motivation enhancement",
      "Anxiety, mood and behavioural disorders",
      "Parenting workshops and school mental health programs",
    ],
    languagesSpoken: ["Marathi", "Hindi", "English"],
    awardsAchievements: [
      "Winner of Torrent Young Scholar Award 2013–14",
      "Former Assistant Editor, Indian Journal of Psychological Medicine",
      "Associated with NGOs such as Pankh Foundation and AIPIF for mental health and de-addiction awareness",
      "Organiser and speaker at multiple stress management and mental health awareness programs",
    ],
  },

  {
    slug: "anuradha-patil",
    name: "Dr. Anuradha Patil",
    role: "Consultant Pathologist",
    title: "Specialist in Histopathology & Cytopathology",
    specialties: ["Histopathology", "Cytopathology", "Hemato-oncology"],

    // ── Chatbot routing ──────────────────────────────────────────────────────
    keywords: [
      // Lab / pathology
      "pathology", "biopsy", "histopathology", "cytopathology", "cytology",
      "tissue sample", "tissue test", "tissue biopsy", "lab test", "lab report",
      "blood test", "blood count", "CBC", "complete blood count",
      "blood disorder", "anemia", "anaemia", "low hemoglobin", "low haemoglobin",
      "platelets", "white blood cells", "WBC", "RBC",
      // Cancer / oncology
      "cancer", "tumor", "tumour", "ovarian tumor", "ovarian tumour", "ovarian cancer",
      "malignancy", "malignant", "oncology", "hemato-oncology", "haematology",
      "lymphoma", "leukemia", "leukaemia", "bone marrow",
      // Neuropathology
      "neuropathology", "brain biopsy", "spinal", "nerve biopsy",
      // Diagnostics / general
      "diagnosis", "diagnostic", "report", "pathologist", "lab", "laboratory",
      "FNAC", "fine needle", "smear", "pap smear",
    ],
    treatsConditions: [
      "Histopathological examination and biopsy reporting",
      "Cytopathology (FNAC, pap smear, fluid cytology)",
      "Hematological disorders (anemia, blood count abnormalities)",
      "Hemato-oncology (leukemia, lymphoma, bone marrow disorders)",
      "Ovarian tumor pathology and reporting",
      "Neuropathology (brain and nerve tissue examination)",
      "Cancer diagnosis and staging through pathological analysis",
      "General laboratory diagnostics and pathology reports",
    ],
    isGeneralist: false,
    ageGroups: ["children", "adolescents", "adults", "elderly"],
    chatbotProfile:
      "Dr. Anuradha Patil is a Consultant Pathologist at Prerna Hospital with MBBS from JJM Medical College " +
      "(with distinction) and MD Pathology from KIMS Hubballi (6th university rank). She received specialized " +
      "training in Neuropathology at NIMHANS Bangalore. She is the go-to specialist for all pathology-related " +
      "needs — biopsy and histopathology reports, cytopathology (FNAC, pap smears), blood disorders, " +
      "hemato-oncology (leukemia, lymphoma), ovarian tumor diagnosis, and general lab investigations. " +
      "She is a recognized researcher in ovarian tumor histopathology and a Scientific Committee member " +
      "for MAPCON and MACYCON conferences.",

    // ── Display ──────────────────────────────────────────────────────────────
    image: "/Dr.%20Anuradha%20Patil.JPG",
    location: "Prerna Hospital LLP, Chhatrapati Sambhajinagar",
    qualifications: "MBBS, MD (Pathology)",
    overview: [
      "Dr. Anuradha Patil is a highly qualified Consultant Pathologist with expertise in histopathology, cytopathology, and hemato-oncology.",
      "She completed her MBBS with distinction from JJM Medical College, Davanagere and her MD Pathology from Karnataka Institute of Medical Sciences, Hubballi, securing the 6th university rank.",
      "She has undergone specialized neuropathology training at NIMHANS, Bangalore and has served as Assistant and Associate Professor, contributing to medical education and research.",
    ],
    fellowshipMembership: [
      "Training in Neuropathology at NIMHANS, Bangalore (2013)",
      "Assistant Professor at JIIU's Indian Institute of Medical Sciences, Badnapur, Jalna (2014–2015)",
      "Associate Professor at MGM Medical College, Chhatrapati Sambhajinagar (2015 onwards)",
      "Scientific Committee Member – MAPCON 2022 (Annual Conference of Maharashtra)",
      "Scientific Committee Member – MACYCON 2026 (Annual Cytology Conference, Maharashtra)",
    ],
    fieldOfExpertise: [
      "Histopathology and surgical pathology",
      "Cytopathology (FNAC, pap smear, body fluid cytology)",
      "Hemato-oncology and hematological disorders",
      "Neuropathology (brain and nerve tissue)",
      "Ovarian tumor pathology and research",
    ],
    languagesSpoken: ["Marathi", "Hindi", "English", "Kannada"],
    awardsAchievements: [
      "MBBS with distinction – JJM Medical College, Davanagere, Karnataka (2008)",
      "MD Pathology with 6th University Rank – Karnataka Institute of Medical Sciences, Hubballi (2013)",
      "Winner of Karnataka State Level Post Graduate Pathology Quiz (2013)",
      "Presented 'Neuroenteric cyst of posterior mediastinum' at 38th Annual Conference, IAPM Karnataka Chapter, SDUMC Kolar (2011)",
      "Presented 'Histopathological study of ovarian tumors' at 38th Annual Conference, IAPM Karnataka Chapter, Bangalore (2013)",
      "Well-acclaimed research on histopathological study of ovarian tumors",
    ],
  },
];

export function getDoctorBySlug(slug: string): Doctor | undefined {
  return DOCTORS.find((doctor) => doctor.slug === slug);
}
