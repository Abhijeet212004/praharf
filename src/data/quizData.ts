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
    name: "Usha",
    description: "You are aligned with Usha, the divine dawn that marks new beginnings. This prahar represents awakening consciousness, fresh possibilities, and the serene energy of early morning. A time of purity and spiritual connection."
  },
  2: {
    id: 2,
    name: "Purvanha",
    description: "You embody Purvanha, the energetic morning period of productivity and clarity. This prahar signifies steady growth, focused intention, and building momentum. A time when your analytical abilities and creative expression are in harmony."
  },
  3: {
    id: 3,
    name: "Madhyaha",
    description: "You resonate with Madhyaha, the powerful midday zenith of vitality. This prahar symbolizes peak energy, full illumination, and decisive action. A time of maximum brightness when achievements reach their highest potential."
  },
  4: {
    id: 4,
    name: "Aparanha",
    description: "You connect with Aparanha, the afternoon period of transition and balance. This prahar represents reflection, integration of experiences, and practical wisdom. A time of measured energy that blends activity with contemplation."
  },
  5: {
    id: 5,
    name: "Sanyankal",
    description: "You align with Sanyankal, the sunset period of transformation and beauty. This prahar characterizes introspection, the completion of daily cycles, and deeper emotional awareness. A time when outer activities give way to inner contemplation."
  },
  6: {
    id: 6,
    name: "Pradosh",
    description: "You embody Pradosh, the evening twilight of mystery and transition. This prahar symbolizes the integration of day's lessons and the preparation for rest. A sacred time when the veil between worlds thins, inviting spiritual practices."
  },
  7: {
    id: 7,
    name: "Nishith",
    description: "You resonate with Nishith, the midnight hour of stillness and depth. This prahar represents deep meditation, subconscious exploration, and rejuvenation. A powerful time of transformation when intuition and mystical insights are heightened."
  },
  8: {
    id: 8,
    name: "Triyama",
    description: "You connect with Triyama, the pre-dawn period of profound silence and potential. This prahar characterizes regeneration, the synthesis of dream wisdom, and preparation for rebirth. A time of sacred darkness that precedes the coming light."
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
