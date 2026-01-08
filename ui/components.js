// UI Components and Psychology

export function updatePsychology() {
  const state = this.state.disciplineState;
  const messages = this.messages[state] || this.messages.active;

  // Random message
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  this.elements.mirrorMessage1.textContent = `"${randomMessage}"`;

  // Update discipline level
  let level = "EXECUTOR";
  if (this.state.scores.streak >= 7) level = "DISCIPLINED";
  if (this.state.scores.streak >= 30) level = "ELITE";
  if (this.state.disciplineState === "failure") level = "RECALIBRATING";

  this.elements.disciplineLevel.textContent = level;
}

export function setupDOM() {
  // Cache DOM elements
  const get = (id) => document.getElementById(id);

  this.elements = {
    // App containers
    bootScreen: get("boot-screen"),
    app: get("app"),

    // Status bar
    currentTime: get("current-time"),
    disciplineLevel: get("level-value"),
    dailyStreak: get("daily-streak"),

    // Execution panel
    currentDay: get("current-day"),
    countdownTimer: get("countdown-timer"),
    currentTaskCard: get("current-task-card"),
    currentTaskContainer: get("current-task-container"),
    currentTaskTime: get("current-task-time"),
    currentTaskTitle: get("current-task-title"),
    currentTaskStatus: get("current-task-status"),
    scheduleGrid: get("schedule-grid"),

    // Score panel
    totalScore: get("total-score"),
    dailyScore: get("daily-score"),
    weeklyScore: get("weekly-score"),
    monthlyScore: get("monthly-score"),
    dailyProgress: get("daily-progress"),
    disciplineState: get("discipline-state"),

    // Time honesty
    plannedHours: get("planned-hours"),
    actualHours: get("actual-hours"),
    timeDelta: get("time-delta"),

    // Psychology
    mirrorMessage1: get("mirror-message-1"),
    mirrorMessage2: get("mirror-message-2"),
    promisedHours: get("promised-hours"),
    executedHours: get("executed-hours"),
    burnoutRisk: get("burnout-risk"),

    // Footer stats
    todayExecution: get("today-execution"),
    consistencyRate: get("consistency-rate"),
    failureCount: get("failure-count"),
    cognitiveLoad: get("cognitive-load"),

    // Buttons
    focusModeBtn: get("focus-mode-btn"),
    lockdownBtn: get("lockdown-btn"),
    settingsBtn: get("settings-btn"),
    completeTask: get("complete-task"),
    failTask: get("fail-task"),
    addMicroTask: get("add-micro-task"),
    prevDay: get("prev-day"),
    nextDay: get("next-day"),
    todayBtn: get("today-btn"),
    weeklyWarRoomBtn: get("weekly-war-room-btn"),
    exportDataBtn: get("export-data-btn"),
    exitFocus: get("exit-focus"),

    // Overlays
    focusOverlay: get("focus-overlay"),
    lockdownOverlay: get("lockdown-overlay"),
    sleepOverlay: get("sleep-overlay"),
    focusTask: get("focus-task"),
    focusTimer: get("focus-timer"),
    lockdownTask: get("lockdown-task"),
    lockdownTimer: get("lockdown-timer"),
    sleepTimer: get("sleep-timer"),
    exitFocus: get("exit-focus"),

    // Modals
    modalOverlay: get("modal-overlay"),
    settingsModal: get("settings-modal"),
    warRoomModal: get("war-room-modal"),
 
    failureModal: get("failure-modal"),
    emergencyModal: get("emergency-modal"),
    failureTaskTitle: get("failure-task-title"),
    penaltyPoints: get("penalty-points"),
  };
}
