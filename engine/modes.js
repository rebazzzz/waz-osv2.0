// Focus & Lockdown Modes

import { formatTime, timeToMinutes, getDateKey } from "../utils/helpers.js";

export function enterFocusMode() {
  this.state.systemMode = "focus";
  this.elements.focusOverlay.classList.remove("hidden");

  // Update focus display
  const now = new Date();
  const tasks = this.scheduleEngine.getScheduleForDate(now);
  const currentTask = this.findCurrentTask(tasks, now);

  if (currentTask) {
    this.elements.focusTask.textContent = currentTask.title;
  }

  // Start focus timer
  this.startFocusTimer();
}

export function enterLockdownMode() {
  this.showMessageModal(
    "Lockdown mode blocks all distractions for 25 minutes. Continue?",
    "LOCKDOWN MODE",
    () => {
      // onConfirm
      this.state.systemMode = "lockdown";
      this.elements.lockdownOverlay.classList.remove("hidden");

      // Update lockdown display
      const now = new Date();
      const tasks = this.scheduleEngine.getScheduleForDate(now);
      const currentTask = this.findCurrentTask(tasks, now);

      if (currentTask) {
        this.elements.lockdownTask.textContent = currentTask.title;
      }

      // Start lockdown timer (25 minutes)
      this.startLockdownTimer(25);
    },
    () => {
      // onCancel - do nothing
    }
  );
}

export function exitFocusMode() {
  this.state.systemMode = "normal";
  this.elements.focusOverlay.classList.add("hidden");

  // Stop timers
  if (this.timers.focus) {
    clearInterval(this.timers.focus);
  }
}

export function startFocusTimer() {
  let seconds = 0;

  this.timers.focus = setInterval(() => {
    seconds++;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    this.elements.focusTimer.textContent = `${hours
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }, 1000);
}

export function startLockdownTimer(minutes) {
  let seconds = minutes * 60;

  this.timers.lockdown = setInterval(() => {
    seconds--;

    if (seconds <= 0) {
      clearInterval(this.timers.lockdown);
      this.exitLockdownMode();
      this.showNotification(
        "Lockdown complete. Return to normal mode.",
        "success"
      );
      return;
    }

    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    this.elements.lockdownTimer.textContent = `${hours
      .toString()
      .padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }, 1000);
}

export function exitLockdownMode() {
  this.state.systemMode = "normal";
  this.elements.lockdownOverlay.classList.add("hidden");

  // Stop timers
  if (this.timers.lockdown) {
    clearInterval(this.timers.lockdown);
  }
}

export function enterSleepMode() {
  this.state.systemMode = "sleep";
  this.elements.sleepOverlay.classList.remove("hidden");

  // Start sleep timer (from 23:00 to 05:00)
  this.startSleepTimer();
}

export function startSleepTimer() {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  // Calculate seconds until 05:00
  let targetHour = 5; // 05:00
  let secondsUntilTarget;

  if (currentHour < 5 || (currentHour === 5 && currentMinute === 0)) {
    // Before 05:00, count down to 05:00
    secondsUntilTarget =
      targetHour * 3600 -
      (currentHour * 3600 + currentMinute * 60 + now.getSeconds());
  } else {
    // After 05:00, count down to 05:00 next day
    secondsUntilTarget =
      24 * 3600 -
      (currentHour * 3600 + currentMinute * 60 + now.getSeconds()) +
      targetHour * 3600;
  }

  this.timers.sleep = setInterval(() => {
    secondsUntilTarget--;

    if (secondsUntilTarget <= 0) {
      clearInterval(this.timers.sleep);
      this.exitSleepMode();
      return;
    }

    const hours = Math.floor(secondsUntilTarget / 3600);
    const minutes = Math.floor((secondsUntilTarget % 3600) / 60);
    const seconds = secondsUntilTarget % 60;

    this.elements.sleepTimer.textContent = `${hours
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }, 1000);
}

export function exitSleepMode() {
  this.state.systemMode = "normal";
  this.elements.sleepOverlay.classList.add("hidden");

  // Stop timers
  if (this.timers.sleep) {
    clearInterval(this.timers.sleep);
  }
}
