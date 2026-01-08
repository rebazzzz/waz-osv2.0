// Event Handlers and System Functions

import { getDateKey } from '../utils/helpers.js';

export function setupEventListeners() {
  // Task actions
  this.elements.completeTask.addEventListener("click", () =>
    this.completeTask()
  );
  this.elements.failTask.addEventListener("click", () => this.logFailure());
  this.elements.addMicroTask.addEventListener("click", () =>
    this.addEmergencyTask()
  );

  // Navigation
  this.elements.prevDay.addEventListener("click", () => this.navigateDay(-1));
  this.elements.nextDay.addEventListener("click", () => this.navigateDay(1));
  this.elements.todayBtn.addEventListener("click", () => this.goToToday());

  // System modes
  this.elements.focusModeBtn.addEventListener("click", () =>
    this.enterFocusMode()
  );
  this.elements.lockdownBtn.addEventListener("click", () =>
    this.enterLockdownMode()
  );
  this.elements.exitFocus.addEventListener("click", () =>
    this.exitFocusMode()
  );

  // Modals
  this.elements.settingsBtn.addEventListener("click", () =>
    this.openModal("settings")
  );
  this.elements.weeklyWarRoomBtn.addEventListener("click", () =>
    this.openWarRoom()
  );
  this.elements.exportDataBtn.addEventListener("click", () =>
    this.exportData()
  );

  // Modal buttons
  document
    .getElementById("log-failure")
    .addEventListener("click", () => this.confirmFailure());
  document
    .getElementById("add-emergency-task")
    .addEventListener("click", () => this.confirmEmergencyTask());
  document
    .getElementById("save-reflection")
    .addEventListener("click", () => this.saveWeeklyReflection());
  document
    .getElementById("export-weekly")
    .addEventListener("click", () => this.exportWeeklyReport());

  // Settings
  document
    .getElementById("punishment-threshold")
    .addEventListener("input", (e) => {
      document.getElementById(
        "threshold-value"
      ).textContent = `${e.target.value}%`;
      this.state.settings.punishmentThreshold = parseInt(e.target.value);
      this.saveData();
    });

  document.getElementById("brutal-mode").addEventListener("change", (e) => {
    this.state.settings.brutalMode = e.target.checked;
    this.saveData();
  });

  document.getElementById("factory-reset").addEventListener("click", () => {
    if (confirm("FACTORY RESET: Delete ALL data?")) {
      localStorage.clear();
      location.reload();
    }
  });

  document.getElementById("clear-data").addEventListener("click", () => {
    if (confirm("Clear all task data (keep settings)?")) {
      this.state.completedTasks = {};
      this.state.failedTasks = {};
      this.state.emergencyTasks = {};
      this.state.scores = {
        daily: 0,
        weekly: 0,
        monthly: 0,
        total: 0,
        streak: 0,
        multiplier: 1.0,
        dailyHistory: {},
      };
      this.saveData();
      location.reload();
    }
  });

  // Modal close buttons
  document.querySelectorAll(".modal-close").forEach((btn) => {
    btn.addEventListener("click", () => this.closeModal());
  });

  // Modal overlay click
  this.elements.modalOverlay.addEventListener("click", (e) => {
    if (e.target === this.elements.modalOverlay) {
      this.closeModal();
    }
  });

  // Keyboard shortcuts
  document.addEventListener("keydown", (e) =>
    this.handleKeyboardShortcuts(e)
  );

  // Update time every minute
  setInterval(() => this.updateTime(), 60000);

  // Check for daily reset
  setInterval(() => this.checkDailyReset(), 60000);

  // Update execution engine every 30 seconds
  setInterval(() => this.updateExecutionEngine(), 30000);
}

export function handleKeyboardShortcuts(e) {
  // Don't trigger if in input
  if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
    return;
  }

  switch (e.key.toLowerCase()) {
    case "f":
      e.preventDefault();
      if (this.state.systemMode === "normal") {
        this.enterFocusMode();
      }
      break;

    case "l":
      e.preventDefault();
      if (this.state.systemMode === "normal") {
        this.enterLockdownMode();
      }
      break;

    case "s":
      e.preventDefault();
      this.openModal("settings");
      break;

    case " ":
      e.preventDefault();
      if (
        this.state.systemMode === "focus" ||
        this.state.systemMode === "lockdown"
      ) {
        this.completeTask();
      }
      break;

    case "escape":
      if (this.state.systemMode === "focus") {
        this.exitFocusMode();
      }
      break;
  }
}

export function updateTime() {
  const now = new Date();
  this.elements.currentTime.textContent = `${now
    .getHours()
    .toString()
    .padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

  // Update day name
  const days = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];
  this.elements.currentDay.textContent = days[now.getDay()];
}

export function checkDailyReset() {
  const now = new Date();
  const resetTime = this.state.settings.resetTime.split(":");
  const resetHour = parseInt(resetTime[0]);
  const resetMinute = parseInt(resetTime[1]);

  const resetToday = new Date();
  resetToday.setHours(resetHour, resetMinute, 0, 0);

  if (now > resetToday) {
    const todayKey = getDateKey(now);

    // Check if we've already reset today
    if (
      !this.state.analytics.lastReset ||
      this.state.analytics.lastReset !== todayKey
    ) {
      this.performDailyReset();
    }
  }
}

export function performDailyReset() {
  const todayKey = getDateKey(new Date());

  // Archive yesterday's data
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = getDateKey(yesterday);

  // Clear temporary data (keep completed/failed for history)
  // Emergency tasks are cleared daily
  if (this.state.emergencyTasks[yesterdayKey]) {
    delete this.state.emergencyTasks[yesterdayKey];
  }

  // Update last reset
  this.state.analytics.lastReset = todayKey;

  // Save
  this.saveData();

  // Show notification
  this.showNotification("Daily reset complete. New day started.", "success");

  // Update UI
  this.updateExecutionEngine();
}