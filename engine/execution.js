// Execution Engine

import { timeToMinutes, getDateKey, isSameDay } from "../utils/helpers.js";

export function updateExecutionEngine() {
  const now = new Date();
  const dayOfWeek = this.state.selectedDate.getDay();
  const dateKey = getDateKey(this.state.selectedDate);

  // Get today's schedule
  let tasks = [
    ...this.scheduleEngine.getScheduleForDate(this.state.selectedDate),
  ];

  // Add emergency tasks for this date
  if (this.state.emergencyTasks[dateKey]) {
    tasks = [...tasks, ...this.state.emergencyTasks[dateKey]];
  }

  // Sort by start time
  tasks.sort((a, b) => timeToMinutes(a.start) - timeToMinutes(b.start));

  // Update current task
  this.updateCurrentTask(tasks, now);

  // Render schedule
  this.renderSchedule(tasks, now);

  // Update scores
  this.updateScores();

  // Update time honesty
  this.updateTimeHonesty(tasks);

  // Update psychology
  this.updatePsychology();

  // Update discipline state
  this.updateDisciplineState();
}

export function updateCurrentTask(tasks, now) {
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  let currentTask = null;
  let nextTask = null;

  // Find current and next tasks
  for (const task of tasks) {
    const start = timeToMinutes(task.start);
    const end = timeToMinutes(task.end);

    if (currentMinutes >= start && currentMinutes <= end) {
      currentTask = task;
      break;
    } else if (currentMinutes < start && !nextTask) {
      nextTask = task;
    }
  }

  // Update UI
  if (currentTask) {
    const timeLeft = timeToMinutes(currentTask.end) - currentMinutes;
    const hours = Math.floor(timeLeft / 60);
    const minutes = timeLeft % 60;
    const seconds = 0;

    this.elements.currentTaskTime.textContent = `${currentTask.start} - ${currentTask.end}`;
    this.elements.currentTaskTitle.textContent = currentTask.title;
    this.elements.countdownTimer.textContent = `${hours
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;

    // Check if task is overdue
    const dateKey = getDateKey(this.state.selectedDate);
    const isCompleted = this.state.completedTasks[dateKey]?.[currentTask.id];
    const isFailed = this.state.failedTasks[dateKey]?.[currentTask.id];

    if (!isCompleted && !isFailed && timeLeft < 0) {
      this.elements.currentTaskStatus.textContent = "OVERDUE";
      if (this.elements.currentTaskStatus)
        this.elements.currentTaskStatus.style.color = "var(--danger-color)";

      // Auto-fail if brutal mode enabled
      if (this.state.settings.brutalMode && timeLeft < -5) {
        this.autoFailTask(currentTask);
      }
    } else if (isCompleted) {
      this.elements.currentTaskStatus.textContent = "COMPLETED";
      if (this.elements.currentTaskStatus)
        this.elements.currentTaskStatus.style.color = "var(--primary-color)";
    } else if (isFailed) {
      this.elements.currentTaskStatus.textContent = "FAILED";
      if (this.elements.currentTaskStatus)
        this.elements.currentTaskStatus.style.color = "var(--danger-color)";
    } else {
      this.elements.currentTaskStatus.textContent = "IN PROGRESS";
      if (this.elements.currentTaskStatus)
        this.elements.currentTaskStatus.style.color = "var(--primary-color)";
    }

    // Update focus/lockdown overlays
    if (
      this.state.systemMode === "focus" ||
      this.state.systemMode === "lockdown"
    ) {
      this.elements.focusTask.textContent = currentTask.title;
      this.elements.lockdownTask.textContent = currentTask.title;
    }
  } else if (nextTask) {
    this.elements.currentTaskTime.textContent = `${nextTask.start} - ${nextTask.end}`;
    this.elements.currentTaskTitle.textContent = nextTask.title;
    this.elements.countdownTimer.textContent = "--:--:--";
    this.elements.currentTaskStatus.textContent = "UP NEXT";
    this.elements.currentTaskStatus.style.color = "var(--text-secondary)";
  } else {
    this.elements.currentTaskTime.textContent = "--:-- - --:--";
    this.elements.currentTaskTitle.textContent = "No active task";
    this.elements.countdownTimer.textContent = "--:--:--";
    this.elements.currentTaskStatus.textContent = "AWAITING EXECUTION";
    this.elements.currentTaskStatus.style.color = "var(--text-secondary)";
  }
}

export function renderSchedule(tasks, now) {
  const dateKey = getDateKey(this.state.selectedDate);
  const isToday = isSameDay(this.state.selectedDate, now);
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  let html = "";

  tasks.forEach((task) => {
    const start = timeToMinutes(task.start);
    const end = timeToMinutes(task.end);
    const duration = end - start;

    // Calculate progress
    let progress = 0;
    if (isToday && currentMinutes > start && currentMinutes < end) {
      progress = ((currentMinutes - start) / duration) * 100;
    } else if (isToday && currentMinutes > end) {
      progress = 100;
    }

    // Determine status
    const isCompleted = this.state.completedTasks[dateKey]?.[task.id];
    const isFailed = this.state.failedTasks[dateKey]?.[task.id];
    const isMissed =
      isToday && currentMinutes > end && !isCompleted && !isFailed;
    const isActive =
      isToday &&
      currentMinutes >= start &&
      currentMinutes <= end &&
      !isCompleted &&
      !isFailed;

    // Calculate XP with multipliers
    const baseXP = task.baseXP || 10;
    const difficulty = task.difficulty || 1.0;
    const streakBonus = this.state.scores.streak * 0.01; // 1% per day streak
    const totalXP = Math.round(
      baseXP * difficulty * (1 + streakBonus) * this.state.scores.multiplier
    );

    // Build class list
    let classes = ["schedule-item"];
    if (isActive) classes.push("active");
    if (isCompleted) classes.push("completed");
    if (isFailed) classes.push("failed");
    if (isMissed) classes.push("missed");

    html += `
              <div class="${classes.join(" ")}" data-task-id="${task.id}">
                  <div class="item-header">
                      <div class="item-time">${task.start} - ${task.end}</div>
                      <div class="item-xp">${totalXP} XP</div>
                  </div>
                  <div class="item-title">${task.title}</div>
                  <div class="item-progress">
                      <div class="progress-fill" style="width: ${progress}%"></div>
                  </div>
              </div>
          `;
  });

  this.elements.scheduleGrid.innerHTML = html;

  // Add click handlers
  document.querySelectorAll(".schedule-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      const taskId = e.currentTarget.dataset.taskId;
      this.selectTask(taskId);
    });
  });
}
