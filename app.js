// LIFE OS V2 - Personal Execution Operating System
// Core Engine

import { scheduleEngine } from "./core/scheduleEngine.js";
import { messages, defaultState } from "./core/state.js";
import {
  timeToMinutes,
  formatTime,
  getDateKey,
  getWeekKey,
  isSameDay,
} from "./utils/helpers.js";
import {
  updateExecutionEngine,
  updateCurrentTask,
  renderSchedule,
} from "./engine/execution.js";
import { updateScores, updateTimeHonesty } from "./engine/scoring.js";
import {
  updateDisciplineState,
  calculateConsistencyRate,
  updateCognitiveLoad,
  updateBurnoutRisk,
} from "./engine/discipline.js";
import { updatePsychology, setupDOM } from "./ui/components.js";
import {
  openModal,
  closeModal,
  showNotification,
  showMessageModal,
} from "./ui/modals.js";
import {
  enterFocusMode,
  enterLockdownMode,
  exitFocusMode,
  startFocusTimer,
  startLockdownTimer,
  exitLockdownMode,
  enterSleepMode,
  startSleepTimer,
  exitSleepMode,
} from "./engine/modes.js";
import {
  setupEventListeners,
  handleKeyboardShortcuts,
  updateTime,
  checkDailyReset,
  performDailyReset,
} from "./core/events.js";

class LifeOSV2 {
  constructor() {
    // System State
    this.state = { ...defaultState };

    // Schedule Engine (Dynamic)
    this.scheduleEngine = scheduleEngine;

    // Psychological Messages
    this.messages = messages;

    // DOM Elements
    this.elements = {};

    // Timers
    this.timers = {
      currentTask: null,
      countdown: null,
      focus: null,
      lockdown: null,
      sleep: null,
    };

    // Initialize
    this.init();
  }

  // ===== CORE SYSTEM =====

  init() {
    this.setupDOM();
    this.loadData();
    this.setupEventListeners();
    this.startSystem();
  }

  loadData() {
    try {
      // Load all data from localStorage
      const savedState = localStorage.getItem("lifeOS_v2_state");
      if (savedState) {
        const parsed = JSON.parse(savedState);

        // Merge with defaults, careful with dates
        this.state = {
          ...this.state,
          ...parsed,
          currentDate: new Date(),
          selectedDate: new Date(), // Always start with today
        };
      }

      // Load analytics
      const savedAnalytics = localStorage.getItem("lifeOS_v2_analytics");
      if (savedAnalytics) {
        this.state.analytics = JSON.parse(savedAnalytics);
      }

      // Load failure log
      const savedFailures = localStorage.getItem("lifeOS_v2_failures");
      if (savedFailures) {
        this.state.failureLog = JSON.parse(savedFailures);
      }
    } catch (error) {
      console.error("Error loading data:", error);
      this.showNotification(
        "System data corrupted. Starting fresh.",
        "warning"
      );
    }
  }

  saveData() {
    try {
      // Don't save currentDate (always now)
      const stateToSave = {
        ...this.state,
        currentDate: undefined,
      };

      localStorage.setItem("lifeOS_v2_state", JSON.stringify(stateToSave));
      localStorage.setItem(
        "lifeOS_v2_analytics",
        JSON.stringify(this.state.analytics)
      );
      localStorage.setItem(
        "lifeOS_v2_failures",
        JSON.stringify(this.state.failureLog)
      );
    } catch (error) {
      console.error("Error saving data:", error);
      this.showNotification("Storage error. Check space.", "danger");
    }
  }

  // ===== EXECUTION ENGINE =====
  updateExecutionEngine() {
    return updateExecutionEngine.call(this);
  }

  updateCurrentTask(tasks, now) {
    return updateCurrentTask.call(this, tasks, now);
  }

  renderSchedule(tasks, now) {
    return renderSchedule.call(this, tasks, now);
  }

  // ===== SCORING ENGINE =====
  updateScores() {
    return updateScores.call(this);
  }

  updateTimeHonesty(tasks) {
    return updateTimeHonesty.call(this, tasks);
  }

  // ===== DISCIPLINE SYSTEM =====
  updateDisciplineState() {
    return updateDisciplineState.call(this);
  }

  calculateConsistencyRate() {
    return calculateConsistencyRate.call(this);
  }

  updateCognitiveLoad() {
    return updateCognitiveLoad.call(this);
  }

  updateBurnoutRisk(loadScore, taskCount) {
    return updateBurnoutRisk.call(this, loadScore, taskCount);
  }

  // ===== PSYCHOLOGICAL SYSTEMS =====
  updatePsychology() {
    return updatePsychology.call(this);
  }

  // ===== TASK ACTIONS =====

  completeTask() {
    const now = new Date();
    const dateKey = getDateKey(now);

    // Find current task
    const tasks = this.scheduleEngine.getScheduleForDate(now);
    const currentTask = this.findCurrentTask(tasks, now);

    if (currentTask) {
      // Check if already completed
      if (this.state.completedTasks[dateKey]?.[currentTask.id]) {
        this.showNotification("Task already completed", "warning");
        return;
      }

      // Mark as completed
      if (!this.state.completedTasks[dateKey]) {
        this.state.completedTasks[dateKey] = {};
      }
      this.state.completedTasks[dateKey][currentTask.id] = true;

      // Play sound
      this.playSound("complete");

      // Show notification
      this.showNotification(`Task completed: ${currentTask.title}`, "success");

      // Update
      this.updateExecutionEngine();
      this.saveData();
    } else {
      this.showNotification("No active task found", "warning");
    }
  }

  logFailure(taskId = null) {
    const now = new Date();
    const dateKey = getDateKey(now);

    let taskToFail;

    if (taskId) {
      // Find specific task
      const tasks = this.scheduleEngine.getScheduleForDate(now);
      taskToFail = tasks.find((t) => t.id === taskId);
    } else {
      // Find current task
      const tasks = this.scheduleEngine.getScheduleForDate(now);
      taskToFail = this.findCurrentTask(tasks, now);
    }

    if (taskToFail) {
      // Show failure modal
      this.elements.failureTaskTitle.textContent = taskToFail.title;

      // Calculate penalty
      const baseXP = taskToFail.baseXP || 10;
      const difficulty = taskToFail.difficulty || 1.0;
      const penalty = Math.round(baseXP * difficulty * 0.5);
      this.elements.penaltyPoints.textContent = `-${penalty}`;

      this.openModal("failure");

      // Store task for logging
      this.pendingFailure = {
        task: taskToFail,
        dateKey: dateKey,
        penalty: penalty,
      };
    } else {
      this.showNotification("No task to fail", "warning");
    }
  }

  confirmFailure() {
    if (!this.pendingFailure) return;

    const { task, dateKey, penalty } = this.pendingFailure;
    const reason = document.getElementById("failure-reason").value;
    const notes = document.getElementById("failure-notes").value;

    // Log failure
    if (!this.state.failedTasks[dateKey]) {
      this.state.failedTasks[dateKey] = {};
    }
    this.state.failedTasks[dateKey][task.id] = {
      timestamp: new Date().toISOString(),
      reason: reason,
      notes: notes,
      penalty: penalty,
    };

    // Add to failure log
    this.state.failureLog.push({
      date: dateKey,
      task: task.title,
      reason: reason,
      notes: notes,
    });

    // Apply penalty
    this.state.scores.total -= penalty;

    // Play sound
    this.playSound("fail");

    // Show notification
    this.showNotification(
      `Failure logged: ${task.title} (-${penalty} XP)`,
      "danger"
    );

    // Update
    this.updateExecutionEngine();
    this.saveData();
    this.closeModal();

    // Clear pending failure
    this.pendingFailure = null;
  }

  addEmergencyTask() {
    this.openModal("emergency");
  }

  confirmEmergencyTask() {
    const title = document.getElementById("emergency-title").value.trim();
    const duration = parseInt(
      document.getElementById("emergency-duration").value
    );
    const priority = document.getElementById("emergency-priority").value;

    if (!title || duration < 5) {
      this.showNotification("Invalid emergency task", "warning");
      return;
    }

    const now = new Date();
    const dateKey = getDateKey(now);

    // Create emergency task
    const task = {
      id: `emergency_${Date.now()}`,
      start: formatTime(now),
      end: formatTime(new Date(now.getTime() + duration * 60000)),
      title: title,
      category: "emergency",
      baseXP: Math.round(duration / 5), // 1 XP per 5 minutes
      difficulty:
        priority === "critical" ? 2.0 : priority === "high" ? 1.5 : 1.2,
      priority: priority,
      emergency: true,
    };

    // Add to emergency tasks
    if (!this.state.emergencyTasks[dateKey]) {
      this.state.emergencyTasks[dateKey] = [];
    }
    this.state.emergencyTasks[dateKey].push(task);

    // Show notification
    this.showNotification(`Emergency task added: ${title}`, "warning");

    // Update
    this.updateExecutionEngine();
    this.saveData();
    this.closeModal();
  }

  // ===== FOCUS & LOCKDOWN MODES =====
  enterFocusMode() {
    return enterFocusMode.call(this);
  }

  enterLockdownMode() {
    return enterLockdownMode.call(this);
  }

  exitFocusMode() {
    return exitFocusMode.call(this);
  }

  startFocusTimer() {
    return startFocusTimer.call(this);
  }

  startLockdownTimer(minutes) {
    return startLockdownTimer.call(this, minutes);
  }

  exitLockdownMode() {
    return exitLockdownMode.call(this);
  }

  // ===== SLEEP MODE =====
  enterSleepMode() {
    return enterSleepMode.call(this);
  }

  startSleepTimer() {
    return startSleepTimer.call(this);
  }

  exitSleepMode() {
    return exitSleepMode.call(this);
  }

  // ===== WEEKLY WAR ROOM =====

  openWarRoom() {
    // Check if it's Sunday
    const today = new Date();
    if (today.getDay() !== 0) {
      this.showNotification(
        "Weekly War Room is only available on Sundays",
        "warning"
      );
      return;
    }

    // Calculate weekly stats
    let weeklyScore = 0;
    let completedTasks = 0;
    let totalTasks = 0;
    let failures = 0;

    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const key = getDateKey(date);
      const dayOfWeek = date.getDay();

      weeklyScore += this.state.scores.dailyHistory?.[key] || 0;

      const tasks = this.scheduleEngine.getScheduleForDate(date);
      tasks.forEach((task) => {
        if (!task.optional) {
          totalTasks++;
          if (this.state.completedTasks[key]?.[task.id]) {
            completedTasks++;
          }
          if (this.state.failedTasks[key]?.[task.id]) {
            failures++;
          }
        }
      });
    }

    const executionRate =
      totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    // Update modal
    this.elements.warWeeklyScore.textContent = weeklyScore;
    this.elements.warExecutionRate.textContent = `${Math.round(
      executionRate
    )}%`;
    this.elements.warFailures.textContent = failures;

    this.openModal("war-room");
  }

  saveWeeklyReflection() {
    const reflection = document
      .getElementById("weekly-reflection")
      .value.trim();

    if (!reflection) {
      this.showNotification("Reflection is required", "warning");
      return;
    }

    const weekKey = getWeekKey(new Date());

    // Save weekly report
    this.state.analytics.weeklyReports[weekKey] = {
      date: new Date().toISOString(),
      score: this.state.scores.weekly,
      reflection: reflection,
      failures: this.state.failureLog.filter((f) => {
        const failureDate = new Date(f.date);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return failureDate >= weekAgo;
      }),
    };

    // Reset failures for new week
    this.state.failureLog = [];

    this.showNotification(
      "Weekly reflection saved. New week unlocked.",
      "success"
    );
    this.closeModal();
    this.saveData();
  }

  // ===== UTILITY FUNCTIONS =====

  findCurrentTask(tasks, now) {
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    for (const task of tasks) {
      const start = timeToMinutes(task.start);
      const end = timeToMinutes(task.end);

      if (currentMinutes >= start && currentMinutes <= end) {
        return task;
      }
    }

    return null;
  }

  timeToMinutes(timeStr) {
    return timeToMinutes(timeStr);
  }

  formatTime(date) {
    return formatTime(date);
  }

  getDateKey(date) {
    return getDateKey(date);
  }

  getWeekKey(date) {
    return getWeekKey(date);
  }

  isSameDay(date1, date2) {
    return isSameDay(date1, date2);
  }

  // ===== EVENT HANDLERS =====
  setupEventListeners() {
    return setupEventListeners.call(this);
  }

  handleKeyboardShortcuts(e) {
    return handleKeyboardShortcuts.call(this, e);
  }

  // ===== SYSTEM FUNCTIONS =====

  startSystem() {
    // Simulate boot sequence
    setTimeout(() => {
      this.elements.bootScreen.classList.add("hidden");
      this.elements.app.classList.remove("hidden");

      this.updateTime();
      this.updateExecutionEngine();

      this.showNotification(
        "WAZ GO initialized. Ready for execution.",
        "success"
      );
    }, 3000);
  }

  updateTime() {
    return updateTime.call(this);
  }

  checkDailyReset() {
    return checkDailyReset.call(this);
  }

  performDailyReset() {
    return performDailyReset.call(this);
  }

  navigateDay(delta) {
    const newDate = new Date(this.state.selectedDate);
    newDate.setDate(newDate.getDate() + delta);
    this.state.selectedDate = newDate;
    this.updateExecutionEngine();
    this.updateTime();
  }

  goToToday() {
    this.state.selectedDate = new Date();
    this.updateExecutionEngine();
    this.updateTime();
    this.showNotification("Returned to today", "success");
  }

  selectTask(taskId) {
    // Find task
    const tasks = this.scheduleEngine.getScheduleForDate(
      this.state.selectedDate
    );
    const task = tasks.find((t) => t.id === taskId);

    if (task) {
      // Show task details
      this.showNotification(`Selected: ${task.title}`, "info");
    }
  }

  openModal(modalName) {
    return openModal.call(this, modalName);
  }

  closeModal() {
    return closeModal.call(this);
  }

  showNotification(message, type = "info") {
    return showNotification.call(this, message, type);
  }

  showMessageModal(
    message,
    title = "SYSTEM MESSAGE",
    onConfirm = null,
    onCancel = null
  ) {
    return showMessageModal.call(this, message, title, onConfirm, onCancel);
  }

  playSound(type) {
    const audio = document.getElementById(`${type}-sound`);
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {
        // Sound play failed, ignore
      });
    }
  }

  exportData() {
    const exportData = {
      state: this.state,
      analytics: this.state.analytics,
      failureLog: this.state.failureLog,
      exportDate: new Date().toISOString(),
      version: "2.0",
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const filename = `life-os-v2-backup-${this.getDateKey(new Date())}.json`;

    const link = document.createElement("a");
    link.href = dataUri;
    link.download = filename;
    link.click();

    this.showNotification("Data exported successfully", "success");
  }

  exportWeeklyReport() {
    const weekKey = this.getWeekKey(new Date());
    const report = this.state.analytics.weeklyReports[weekKey];

    if (!report) {
      this.showNotification("No weekly report available", "warning");
      return;
    }

    const dataStr = JSON.stringify(report, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const filename = `life-os-weekly-${weekKey}.json`;

    const link = document.createElement("a");
    link.href = dataUri;
    link.download = filename;
    link.click();

    this.showNotification("Weekly report exported", "success");
  }

  autoFailTask(task) {
    if (this.state.settings.brutalMode) {
      const dateKey = this.getDateKey(new Date());
      const penalty = Math.round(
        (task.baseXP || 10) * (task.difficulty || 1.0) * 0.5
      );

      if (!this.state.failedTasks[dateKey]) {
        this.state.failedTasks[dateKey] = {};
      }

      this.state.failedTasks[dateKey][task.id] = {
        timestamp: new Date().toISOString(),
        reason: "auto_fail_brutal_mode",
        notes: "Auto-failed by brutal mode (task overdue)",
        penalty: penalty,
      };

      this.state.scores.total -= penalty;

      this.showNotification(
        `BRUTAL MODE: ${task.title} auto-failed (-${penalty} XP)`,
        "danger"
      );
      this.updateExecutionEngine();
      this.saveData();
    }
  }

  setupDOM() {
    return setupDOM.call(this);
  }
}

// Initialize system when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  window.lifeOS = new LifeOSV2();
});
