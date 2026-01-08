// Scoring Engine

import { timeToMinutes, getDateKey, isSameDay } from "../utils/helpers.js";

export function updateScores() {
  const dateKey = getDateKey(this.state.selectedDate);
  const dayOfWeek = this.state.selectedDate.getDay();
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const isToday = isSameDay(this.state.selectedDate, now);

  // Calculate daily score
  let dailyScore = 0;
  let dailyPossible = 0;

  const tasks = this.scheduleEngine.getScheduleForDate(this.state.selectedDate);
  tasks.forEach((task) => {
    const baseXP = task.baseXP || 10;
    const difficulty = task.difficulty || 1.0;
    const possible = Math.round(baseXP * difficulty);
    dailyPossible += possible;

    if (this.state.completedTasks[dateKey]?.[task.id]) {
      const streakBonus = this.state.scores.streak * 0.01;
      const multiplier = this.state.scores.multiplier;
      const earned = Math.round(possible * (1 + streakBonus) * multiplier);
      dailyScore += earned;
    } else if (this.state.failedTasks[dateKey]?.[task.id]) {
      // Penalty for failure
      const penalty = Math.round(possible * 0.5); // 50% penalty
      dailyScore -= penalty;
    } else if (isToday) {
      // Check if task is in progress
      const start = timeToMinutes(task.start);
      const end = timeToMinutes(task.end);

      if (currentMinutes >= start && currentMinutes <= end) {
        // Task is in progress - add partial score
        const progress = Math.min(
          (currentMinutes - start) / (end - start),
          1.0
        );
        const streakBonus = this.state.scores.streak * 0.01;
        const multiplier = this.state.scores.multiplier;
        const earned = Math.round(
          possible * progress * (1 + streakBonus) * multiplier
        );
        dailyScore += earned;
      } else if (currentMinutes > end) {
        // Task is overdue - treat as failed with penalty
        const penalty = Math.round(possible * 0.5); // 50% penalty
        dailyScore -= penalty;
      }
    }
  });

  // Update weekly score (last 7 days)
  let weeklyScore = 0;
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const key = getDateKey(date);
    weeklyScore += this.state.scores.dailyHistory?.[key] || 0;
  }

  // Update monthly score (last 30 days)
  let monthlyScore = 0;
  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const key = getDateKey(date);
    monthlyScore += this.state.scores.dailyHistory?.[key] || 0;
  }

  // Update streak
  let streak = this.state.scores.streak;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = getDateKey(yesterday);

  if (dailyScore >= dailyPossible * 0.8) {
    // 80% completion maintains streak
    if (this.state.scores.dailyHistory?.[yesterdayKey] >= dailyPossible * 0.8) {
      streak++;
    } else {
      streak = 1;
    }
  } else {
    streak = 0;
  }

  // Update multiplier based on streak
  const multiplier = 1 + streak * 0.05; // 5% bonus per day streak

  // Update state
  this.state.scores.daily = dailyScore;
  this.state.scores.weekly = weeklyScore;
  this.state.scores.monthly = monthlyScore;
  this.state.scores.streak = streak;
  this.state.scores.multiplier = multiplier;
  this.state.scores.total += dailyScore;

  // Update UI
  this.elements.dailyScore.textContent = dailyScore;
  this.elements.weeklyScore.textContent = weeklyScore;
  this.elements.monthlyScore.textContent = monthlyScore;
  this.elements.totalScore.textContent = this.state.scores.total;
  this.elements.dailyStreak.textContent = streak;

  // Update progress bars
  const dailyPercent =
    dailyPossible > 0 ? (dailyScore / dailyPossible) * 100 : 0;
  if (this.elements.dailyProgress)
    this.elements.dailyProgress.style.width = `${Math.min(dailyPercent, 100)}%`;

  // Update today's execution percentage
  this.elements.todayExecution.textContent = `${Math.round(dailyPercent)}%`;

  // Save daily history
  if (!this.state.scores.dailyHistory) {
    this.state.scores.dailyHistory = {};
  }
  this.state.scores.dailyHistory[dateKey] = dailyScore;

  this.saveData();
}

export function updateTimeHonesty(tasks) {
  const dateKey = getDateKey(this.state.selectedDate);
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  let planned = 0;
  let actual = 0;

  tasks.forEach((task) => {
    const start = timeToMinutes(task.start);
    const end = timeToMinutes(task.end);
    const duration = end - start;

    planned += duration;

    if (this.state.completedTasks[dateKey]?.[task.id]) {
      // Completed tasks count as planned duration
      actual += duration;
    } else if (this.state.failedTasks[dateKey]?.[task.id]) {
      // Failed tasks count as 0
      actual += 0;
    } else if (currentMinutes > start && currentMinutes < end) {
      // In-progress tasks count partial
      actual += currentMinutes - start;
    } else if (currentMinutes > end) {
      // Missed tasks count as 0
      actual += 0;
    }
  });

  const plannedHours = (planned / 60).toFixed(1);
  const actualHours = (actual / 60).toFixed(1);
  const delta = actual - planned;

  this.state.timeStats.planned = planned;
  this.state.timeStats.actual = actual;
  this.state.timeStats.delta = delta;

  // Update UI
  this.elements.plannedHours.textContent = `${plannedHours}h`;
  this.elements.actualHours.textContent = `${actualHours}h`;
  this.elements.timeDelta.textContent = `${delta >= 0 ? "+" : ""}${(
    delta / 60
  ).toFixed(1)}h`;
  if (this.elements.timeDelta)
    this.elements.timeDelta.style.color =
      delta >= 0 ? "var(--primary-color)" : "var(--danger-color)";

  this.elements.promisedHours.textContent = `${plannedHours}h`;
  this.elements.executedHours.textContent = `${actualHours}h`;
}
