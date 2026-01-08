// System State Management

// Messages
export const messages = {
  active: [
    "Execution builds identity. Keep going.",
    "Consistency compounds. You're building something real.",
    "Discipline equals freedom. This is how you earn it.",
    "What you do every day matters more than what you do once in a while.",
  ],
  success: [
    "Execution builds identity. Keep going.",
    "Consistency compounds. You're building something real.",
    "Discipline equals freedom. This is how you earn it.",
    "What you do every day matters more than what you do once in a while.",
  ],
  warning: [
    "Risk detected. Course correction required.",
    "Promises vs execution: The gap is widening.",
    "Your schedule is a contract with yourself. Honor it.",
    "Self-deception detected. Brutal honesty required.",
  ],
  failure: [
    "System failure. Discipline breach detected.",
    "You promised. You failed. Account for it.",
    "The cost of avoidance is always higher than the cost of execution.",
    "This moment defines you. What's your response?",
  ],
};

// Default state
export const defaultState = {
  // Core
  currentDate: new Date(),
  selectedDate: new Date(),
  systemMode: "normal", // normal, focus, lockdown

  // Execution
  schedule: {},
  completedTasks: {},
  failedTasks: {},
  emergencyTasks: {},

  // Scoring
  scores: {
    daily: 0,
    weekly: 0,
    monthly: 0,
    total: 0,
    streak: 0,
    multiplier: 1.0,
  },

  // Discipline
  disciplineState: "active", // active, warning, failure
  failureLog: [],
  punishmentLevel: 0,

  // Time Honesty
  timeStats: {
    planned: 0,
    actual: 0,
    overruns: 0,
    underexecution: 0,
  },

  // Settings
  settings: {
    resetTime: "05:00",
    punishmentThreshold: 70,
    brutalMode: false,
    autoFocus: false,
    theme: "dark",
  },

  // Analytics
  analytics: {
    weeklyReports: {},
    burnoutRisk: 0,
    cognitiveLoad: "low",
    consistencyRate: 0,
  },
};