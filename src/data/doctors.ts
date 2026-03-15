export interface Doctor {
  slug: string;
  name: string;
  role: string;
  title: string;
  specialties: string[];
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
    image: "/DR%20ASHISH%20PHOTO.jpeg",
    location: "Prerna Hospital LLP, Chhatrapati Sambhajinagar",
    qualifications: "MBBS, DPM, DNB",
    overview: [
      "Dr. Ashish Mohide is an experienced neuropsychiatrist with focused expertise in de-addiction, community psychiatry and child psychiatry.",
      "He has received dedicated training at premier institutes including NIMHANS Bengaluru and IPH Mumbai, and has been actively involved in academic as well as community mental health work.",
      "At Prerna Hospital he leads comprehensive de-addiction and mental health services, with a strong emphasis on holistic recovery and long-term rehabilitation."
    ],
    fellowshipMembership: [
      "Training in Addiction Medicine at NIMHANS, Bengaluru",
      "Training in Child Psychiatry and Psychotherapy at NIMHANS",
      "Training in Industrial and Community Psychiatry at IPH, Mumbai",
      "Senior Resident experience at MGM Medical College, Aurangabad"
    ],
    fieldOfExpertise: [
      "Alcohol and substance use disorders",
      "Detoxification and relapse prevention",
      "Child and adolescent mental health",
      "Psychotherapy and counselling",
      "Community outreach and mental health awareness"
    ],
    languagesSpoken: ["Marathi", "Hindi", "English"],
    awardsAchievements: [
      "Active role in multiple mental health awareness programs and screening camps",
      "Contributor to de-addiction initiatives in remote villages around Chhatrapati Sambhajinagar",
      "Associated with NGOs working in mental health and women empowerment"
    ]
  },
  {
    slug: "manik-bhise",
    name: "Dr. Manik C. Bhise",
    role: "Consultant Neuropsychiatrist",
    title: "Director – Prerna Hospital LLP",
    specialties: ["De-addiction", "Sexology", "Neuropsychiatry"],
    image: "/Dr%20Manik%20Bhise%20Pic.jpeg",
    location: "Prerna Hospital LLP, Chhatrapati Sambhajinagar",
    qualifications: "MBBS, MD (Psychiatry, Gold Medal)",
    overview: [
      "Dr. Manik C. Bhise is a senior psychiatrist, academic leader and Director at Prerna Hospital LLP with more than two decades of experience.",
      "He has held key academic positions including Professor and Head of Psychiatry at MGM Medical College, and has guided numerous students and residents.",
      "His work spans clinical practice, research in rural mental health and farmers’ suicides, insomnia and psychological distress, alongside active involvement in professional bodies."
    ],
    fellowshipMembership: [
      "Fellow of Indian Psychiatric Society (IPS)",
      "Fellow of Indian Association for Social Psychiatry (IASP)",
      "Fellow of Indian Association of Private Psychiatrists (IAPP)",
      "Reviewer for multiple national and international psychiatric journals"
    ],
    fieldOfExpertise: [
      "Treatment of complex mood and psychotic disorders",
      "De-addiction and relapse prevention programs",
      "Sexual medicine and relationship counselling",
      "Rural mental health and suicide prevention",
      "Clinical research and medical education"
    ],
    languagesSpoken: ["Marathi", "Hindi", "English"],
    awardsAchievements: [
      "Gold Medalist in MD Psychiatry (MUHS Nashik)",
      "Young Psychiatrist Fellowship – World Association for Social Psychiatry",
      "Recipient of multiple national awards including Sushrut Award, Murugappan Award and Dr Ramesh Patel Award",
      "Principal investigator for several clinical trials and author of numerous research publications"
    ]
  },
  {
    slug: "sadeq-qureshi",
    name: "Dr. Sadeq Qureshi",
    role: "Consultant Neuropsychiatrist",
    title: "Child and Adolescent Psychiatrist",
    specialties: ["De-addiction", "Child and Adolescent Psychiatry"],
    image: "/DR%20SADEQ%20SIR%20PHOTO.JPG",
    location: "Prerna Hospital LLP, Chhatrapati Sambhajinagar",
    qualifications: "MBBS, DPM, DNB",
    overview: [
      "Dr. Sadeq Qureshi is a neuropsychiatrist and child and adolescent psychiatrist with extensive clinical and research experience.",
      "He has trained at leading institutes across Maharashtra and Hyderabad, and is associated with academic teaching as an Assistant Professor.",
      "His practice spans de-addiction, child and adolescent psychiatry and community mental health, with active participation in clinical research."
    ],
    fellowshipMembership: [
      "Experience at Government Medical College, Aurangabad",
      "DPM from B.J. Medical College and Sassoon General Hospital, Pune",
      "DNB from Asha Hospital, Hyderabad",
      "Assistant Professor at JIIU’s IIMSR Medical College, Badnapur, Jalna",
      "Co-investigator and rater in multiple multicentric international clinical trials"
    ],
    fieldOfExpertise: [
      "Child and adolescent psychiatry",
      "De-addiction and motivation enhancement",
      "Anxiety, mood and behavioural disorders",
      "Parenting workshops and school mental health programs"
    ],
    languagesSpoken: ["Marathi", "Hindi", "English"],
    awardsAchievements: [
      "Winner of Torrent Young Scholar Award 2013–14",
      "Former Assistant Editor, Indian Journal of Psychological Medicine",
      "Associated with NGOs such as Pankh Foundation and AIPIF for mental health and de-addiction awareness",
      "Organiser and speaker at multiple stress management and mental health awareness programs"
    ]
  }
];

export function getDoctorBySlug(slug: string): Doctor | undefined {
  return DOCTORS.find((doctor) => doctor.slug === slug);
}

