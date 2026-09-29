export interface ResourceItem {
  id: string;
  title: string;
  category: "legal" | "process" | "coping" | "practical" | "emergency";
  categoryLabel: string;
  readTime: string;
  audioLength: string;
  language: string;
  summary: string;
  plainLanguageSummary: string;
  fullContent: string[];
  plainContent: string[];
  source: string;
  lastUpdated: string;
  tags: string[];
  featured?: boolean;
}

export const CATEGORIES = [
  { id: "all", label: "All Topics" },
  { id: "legal", label: "Legal & Rights" },
  { id: "coping", label: "Emotional Support & Coping" },
  { id: "practical", label: "Livelihood & Practical Help" },
  { id: "process", label: "Understanding the Process" },
  { id: "emergency", label: "Emergency & Immediate Help" },
] as const;

export const FEATURED_RESOURCES: ResourceItem[] = [
  {
    id: "sec-15a-guide",
    title: "What is Section 15A Witness Protection?",
    category: "legal",
    categoryLabel: "Legal & Rights",
    readTime: "5 min read",
    audioLength: "3:40",
    language: "Hindi & English",
    summary:
      "A comprehensive, trauma-informed explanation of your statutory rights under Section 15A of the SC/ST (PoA) Act.",
    plainLanguageSummary:
      "The law guarantees that you and your family are kept safe from threats, given free travel money to attend court, and provided with a free government lawyer.",
    fullContent: [
      "Section 15A of the Scheduled Castes and the Scheduled Tribes (Prevention of Atrocities) Act provides a robust, legally binding statutory duty for the State to protect victims and witnesses from intimidation, coercion, and social boycott.",
      "Key Statutory Guarantees: (1) Right to reasonable, accurate, and timely notice of any court proceeding including bail hearings; (2) Right to protection against intimidation by designated police escort units; (3) Right to separate, secure waiting rooms at the Special Court premises so that victims do not encounter the accused.",
      "Financial Entitlement: Rule 11 of the 1995 Rules mandates the immediate advance payment of Travelling and Daily Allowance (TA/DA) to all witnesses and attendants for attending investigations and trial proceedings.",
    ],
    plainContent: [
      "You have the legal right to be protected by the police before, during, and after your court case.",
      "The court must notify you before any bail hearing so your lawyer can speak up for your safety.",
      "When you visit the courthouse, you will sit in a private, locked waiting area so the other party cannot approach or intimidate you.",
      "The government pays your bus, train, or car travel costs in advance, plus a daily meal allowance for you and your companion.",
    ],
    source: "Ministry of Social Justice & DLSA",
    lastUpdated: "12 Jun 2026",
    tags: ["Section 15A", "Witness Protection", "Special Court", "Legal Aid"],
    featured: true,
  },
  {
    id: "after-fir-process",
    title: "What Happens After a Report (FIR) is Filed?",
    category: "process",
    categoryLabel: "Understanding the Process",
    readTime: "8 min read",
    audioLength: "5:20",
    language: "English",
    summary:
      "Step-by-step statutory walkthrough of the criminal justice timeline from FIR registration through the 60-day investigation to trial.",
    plainLanguageSummary:
      "Learn what the police must do within 60 days, when your financial relief money arrives in your bank account, and what happens at your first hearing.",
    fullContent: [
      "1. Immediate FIR & Medical Examination: An officer not below the rank of Deputy Superintendent of Police (DySP) is designated to conduct the investigation. Immediate medical relief is provided, and Stage 1 relief (25%) is approved.",
      "2. 60-Day Charge Sheet Deadline: By law under Section 14(2), the investigation must conclude and the final report (charge sheet) must be filed in the Designated Special Court within 60 calendar days.",
      "3. Pre-Trial Conference & Stage 2 Relief: Upon charge sheet ingestion, Stage 2 relief (50%) is processed via DBT (PFMS), and you are assigned an accredited legal aid counsel from the District Legal Services Authority (DLSA).",
    ],
    plainContent: [
      "Step 1: The police file your First Information Report (FIR) and a senior DySP officer takes charge of your case. You receive 25% of your government relief money directly in your bank account.",
      "Step 2: The police must finish gathering evidence within 60 days and submit their final papers to the Special Court.",
      "Step 3: Once the court accepts the papers, another 50% of your relief money is paid, and a free legal aid lawyer is assigned to meet you.",
    ],
    source: "Ministry of Law & Justice / DLSA",
    lastUpdated: "05 May 2026",
    tags: ["FIR", "Investigation", "60-Day Rule", "Charge Sheet"],
    featured: true,
  },
  {
    id: "anxiety-stress-management",
    title: "Managing Anxiety and Courtroom Stress",
    category: "coping",
    categoryLabel: "Emotional Support & Coping",
    readTime: "6 min read",
    audioLength: "4:15",
    language: "Telugu & English",
    summary:
      "Practical psychological first-aid grounding techniques, cognitive reframing, and somatic coping strategies before testifying.",
    plainLanguageSummary:
      "Gentle ways to steady your racing heartbeat, organize your thoughts, and stay calm when preparing to speak in front of the judge.",
    fullContent: [
      "Courtroom anxiety is an entirely natural physiological response to acute stress. The body's threat detection system activates when facing unfamiliar legal environments or recalling distressing events.",
      "Somatic Grounding: Practice the 5-4-3-2-1 sensory orientation technique before entering the court hall to anchor awareness in physical safety.",
      "Cognitive Anchoring: Remind yourself that you are there as a protected truth-teller under the shield of Section 15A. Your assigned DLSA advocate sits beside you to safeguard your dignity.",
    ],
    plainContent: [
      "Feeling nervous or anxious about court is completely normal. Your body is trying to protect you.",
      "Look around the room and name 5 things you can see, 4 you can touch, and 3 you can hear. This gently signals to your mind that you are safe in this moment.",
      "Remember: You are not on trial. You are a protected witness, and your lawyer is there to ensure nobody treats you unfairly.",
    ],
    source: "Tele-MANAS & WHO Psychological First Aid",
    lastUpdated: "20 Apr 2026",
    tags: ["Anxiety", "Courtroom Prep", "Somatic Grounding", "Tele-MANAS"],
    featured: true,
  },
  {
    id: "dbt-relief-tracker-guide",
    title: "Understanding Financial Relief & PFMS Disbursements",
    category: "practical",
    categoryLabel: "Livelihood & Practical Help",
    readTime: "4 min read",
    audioLength: "3:10",
    language: "English & Hindi",
    summary:
      "Official guide to the 3-stage statutory victim compensation disbursements under SC/ST PoA Amendment Rules 2016.",
    plainLanguageSummary:
      "Find out how much money you are entitled to, how it transfers into your Aadhaar-linked bank account, and what to do if a payment is delayed.",
    fullContent: [
      "Statutory Compensation Scales: Relief amounts range from ₹1,00,000 to ₹8,25,000 depending on the specific offences registered under Section 3 of the Act.",
      "Disbursement Tranches: Tranche 1 (25%) upon FIR; Tranche 2 (50%) upon filing of Charge Sheet; Tranche 3 (25%) upon final judgment and verdict.",
      "Direct Benefit Transfer (DBT): Monies are credited directly into your verified bank account via the Public Financial Management System (PFMS) without any middlemen or deductions.",
    ],
    plainContent: [
      "You receive financial relief in 3 automatic payments directly into your bank account.",
      "First payment: When your FIR is filed (25%).",
      "Second payment: When the police submit the charge sheet (50%).",
      "Third payment: When the trial finishes (25%).",
      "No one is allowed to take a fee, commission, or cut from your money.",
    ],
    source: "District Social Welfare Dept",
    lastUpdated: "18 Jun 2026",
    tags: ["Financial Relief", "PFMS", "DBT", "Compensation"],
  },
  {
    id: "sp-protection-cell-guide",
    title: "How to Contact the Special Protection Cell in an Emergency",
    category: "emergency",
    categoryLabel: "Emergency & Immediate Help",
    readTime: "3 min read",
    audioLength: "2:45",
    language: "English & Hindi",
    summary:
      "Protocols for escalating threats, phone harassment, or physical intimidation directly to the Superintendent of Police.",
    plainLanguageSummary:
      "If you receive any threats or see suspicious people near your house, here is how to get immediate armed police assistance.",
    fullContent: [
      "Every district maintains a dedicated Special Protection Cell headed by an officer of Superintendent of Police (SP) rank.",
      "Immediate Threat Reporting: You can trigger a threat report directly through the Haven portal or dial the 24/7 designated Witness Protection Desk.",
      "Statutory Escalation: Under Section 15A(11), any intimidation of a witness constitutes an independent non-bailable offence punishable by imprisonment.",
    ],
    plainContent: [
      "Your district has an armed police team whose only job is to protect witnesses.",
      "If anyone warns you not to speak in court, calls your phone, or watches your house, call 112 or use Haven's Threat Report button immediately.",
      "Threatening a witness is a major crime, and the person threatening you will be arrested without bail.",
    ],
    source: "State Police Witness Protection Wing",
    lastUpdated: "02 Jul 2026",
    tags: ["Threat Report", "Police Escort", "SP Cell", "Emergency"],
  },
];
