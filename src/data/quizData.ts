export interface Question {
  id: number;
  question: string;
  options: string[];
}

export const quizQuestions: Question[] = [
  {
    id: 1,
    question: "What energizes you the most?",
    options: ["Time alone to reflect", "Social gatherings with friends", "Creative activities", "Physical exercise"]
  },
  {
    id: 2,
    question: "How do you typically make decisions?",
    options: ["Based on logic and analysis", "Based on feelings and values", "Based on experience", "Based on intuition and possibilities"]
  },
  {
    id: 3,
    question: "What's your preferred learning style?",
    options: ["Reading and researching", "Discussion and collaboration", "Hands-on experience", "Visual demonstrations"]
  },
  {
    id: 4,
    question: "What kind of environment helps you work best?",
    options: ["Quiet and structured", "Collaborative and interactive", "Flexible and adaptable", "Creative and stimulating"]
  },
  {
    id: 5,
    question: "How do you handle stress?",
    options: ["Analyze the problem and make a plan", "Talk to friends or family", "Take time for self-care", "Change your environment or routine"]
  },
  {
    id: 6,
    question: "What's most important in your relationships?",
    options: ["Honesty and direct communication", "Emotional connection and support", "Shared interests and activities", "Growth and independence"]
  },
  {
    id: 7,
    question: "When faced with a new challenge, you typically:",
    options: ["Research and gather information", "Seek advice from others", "Trust your instincts", "Jump in and learn as you go"]
  },
  {
    id: 8,
    question: "What's your approach to planning?",
    options: ["Detailed schedules and lists", "General guidelines with flexibility", "Minimal planning, more adapting", "Focus on the big picture, not details"]
  },
  {
    id: 9,
    question: "What do you value most in your life path?",
    options: ["Security and stability", "Growth and challenges", "Balance and harmony", "Purpose and meaning"]
  },
  {
    id: 10,
    question: "How do others typically describe your personality?",
    options: ["Calm and collected", "Energetic and passionate", "Thoughtful and analytical", "Adaptable and flexible"]
  }
];

// Prahar descriptions
export interface PraharInfo {
  id: number;
  name: string;
  description: string;
}

export const praharInfo: Record<number, PraharInfo> = {
  1: {
    id: 1,
    name: "Prath Prahar",
    description: "You are aligned with the Prath Prahar, representing new beginnings, fresh energy, and spiritual awakening."
  },
  2: {
    id: 2,
    name: "Sang Prahar",
    description: "You embody the Sang Prahar, characterized by clear thinking, productivity, and steady growth."
  },
  3: {
    id: 3,
    name: "Madhayan Prahar",
    description: "You resonate with the Madhayan Prahar, symbolizing peak energy, clarity of purpose, and full expression."
  },
  4: {
    id: 4,
    name: "Apar Prahar",
    description: "You connect with the Apar Prahar, representing transition, reflection, and balanced wisdom."
  },
  5: {
    id: 5,
    name: "Sankal Prahar",
    description: "You align with the Sankal Prahar, characterized by introspection, winding down, and deeper awareness."
  },
  6: {
    id: 6,
    name: "Pradosh Prahar",
    description: "You embody the Pradosh Prahar, symbolizing the integration of day's learnings and peaceful transition."
  },
  7: {
    id: 7,
    name: "Nishit Prahar",
    description: "You resonate with the Nishit Prahar, representing rest, rejuvenation, and subconscious exploration."
  },
  8: {
    id: 8,
    name: "Usha Kal Prahar",
    description: "You connect with the Usha Kal Prahar, characterized by deep stillness, mystical awareness, and renewal."
  }
};

// The mapping of question answers to Prahars
// Odd-numbered questions: A→P1, B→P2, C→P3, D→P4
// Even-numbered questions: A→P5, B→P6, C→P7, D→P8
export const questionPraharMapping = {
  1: {0: 1, 1: 2, 2: 3, 3: 4},
  2: {0: 5, 1: 6, 2: 7, 3: 8},
  3: {0: 1, 1: 2, 2: 3, 3: 4},
  4: {0: 5, 1: 6, 2: 7, 3: 8},
  5: {0: 1, 1: 2, 2: 3, 3: 4},
  6: {0: 5, 1: 6, 2: 7, 3: 8},
  7: {0: 1, 1: 2, 2: 3, 3: 4},
  8: {0: 5, 1: 6, 2: 7, 3: 8},
  9: {0: 1, 1: 2, 2: 3, 3: 4},
  10: {0: 5, 1: 6, 2: 7, 3: 8},
};
