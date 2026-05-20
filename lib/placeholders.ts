/** Placeholder content — replace with MDX loaders in Phase 2 */

export type Feature = {
  title: string;
  description: string;
  icon: "clipboard" | "calendar" | "users" | "message" | "shield" | "sparkles";
};

export type FAQItem = {
  question: string;
  answer: string;
};

export const FEATURES: Feature[] = [
  {
    icon: "clipboard",
    title: "Organize your work history",
    description:
      "Build a clear timeline of employers, titles, and dates so your application matches what verifiers will see.",
  },
  {
    icon: "calendar",
    title: "Explain employment gaps",
    description:
      "Learn how to document time between roles honestly and confidently—without over-explaining.",
  },
  {
    icon: "users",
    title: "Prepare references",
    description:
      "Choose the right contacts, confirm they're reachable, and align on what they'll be asked.",
  },
  {
    icon: "message",
    title: "Interview with confidence",
    description:
      "Practice talking through your record so you sound prepared, not defensive, in every conversation.",
  },
  {
    icon: "shield",
    title: "Know what employers check",
    description:
      "Understand common screening steps—criminal, employment, education—so nothing catches you off guard.",
  },
  {
    icon: "sparkles",
    title: "Tools that save time",
    description:
      "Checklists, templates, and guides you can use tonight—not a 50-page manual you'll never finish.",
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Is BackgroundReady legal advice?",
    answer:
      "No. We provide educational resources and preparation tools. For legal questions about your specific record, consult a qualified attorney or advisor in your jurisdiction.",
  },
  {
    question: "When should I start preparing?",
    answer:
      "As early as possible—ideally while you're applying or as soon as you receive an offer contingent on screening. Having your timeline and references ready reduces delays.",
  },
  {
    question: "Will this help if I have a criminal record?",
    answer:
      "Our content focuses on general readiness and transparency. Laws and employer policies vary widely; we encourage you to understand your rights and seek professional guidance when needed.",
  },
  {
    question: "Are products and services available now?",
    answer:
      "We're launching in phases. The free checklist is the best place to start today; product and service pages show what's coming and how to get notified.",
  },
  {
    question: "How is my email used for the checklist?",
    answer:
      "We'll only use it to deliver the checklist and occasional readiness tips. You can unsubscribe anytime. Full privacy details will be published before launch.",
  },
];

export const TRUST_STATS = [
  { value: "10+", label: "Topics covered" },
  { value: "Free", label: "Checklist to start" },
  { value: "100%", label: "Job seeker focused" },
];

export const ABOUT_VALUES = [
  {
    title: "Clarity over fear",
    description:
      "Background checks feel scary when you don't know what's coming. We explain the process in plain language.",
  },
  {
    title: "Preparation over perfection",
    description:
      "Nobody has a flawless record. Readiness means being organized, honest, and consistent—not pretending.",
  },
  {
    title: "Respect for your story",
    description:
      "Gaps, career changes, and fresh starts are normal. We help you present yours with confidence.",
  },
];
