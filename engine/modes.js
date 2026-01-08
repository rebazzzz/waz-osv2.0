// Focus & Lockdown Modes

import { formatTime } from "../utils/helpers.js";

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
      const tasks = this.scheduleTemplate[now.getDay()];
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
