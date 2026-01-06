// LIFE OS V2 - Personal Execution Operating System
// Core Engine

class LifeOSV2 {
  constructor() {
    // System State
    this.state = {
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

    // Schedule Template (Hardcoded - Non-negotiable)
    this.scheduleTemplate = {
      0: [
        // Monday
        {
          id: "mon_1",
          start: "05:00",
          end: "08:30",
          title: "Gym/WORK",
          category: "training",
          baseXP: 35,
          difficulty: 1.2,
        },
        {
          id: "mon_2",
          start: "09:00",
          end: "12:30",
          title: "WORK",
          category: "work",
          baseXP: 40,
          difficulty: 1.0,
        },
        {
          id: "mon_3",
          start: "13:00",
          end: "18:00",
          title: "WORK",
          category: "work",
          baseXP: 60,
          difficulty: 1.0,
        },
        {
          id: "mon_4",
          start: "18:30",
          end: "21:00",
          title: "Wrestling",
          category: "training",
          baseXP: 30,
          difficulty: 1.5,
        },
        {
          id: "mon_5",
          start: "21:00",
          end: "22:15",
          title: "Software Development",
          category: "development",
          baseXP: 15,
          difficulty: 1.3,
        },
      ],
      1: [
        // Tuesday
        {
          id: "tue_1",
          start: "05:00",
          end: "08:30",
          title: "Gym/WORK",
          category: "training",
          baseXP: 35,
          difficulty: 1.2,
        },
        {
          id: "tue_2",
          start: "09:00",
          end: "12:30",
          title: "WORK",
          category: "work",
          baseXP: 40,
          difficulty: 1.0,
        },
        {
          id: "tue_3",
          start: "13:00",
          end: "17:30",
          title: "WORK",
          category: "work",
          baseXP: 55,
          difficulty: 1.0,
        },
        {
          id: "tue_4",
          start: "17:45",
          end: "21:00",
          title: "Taekwondo",
          category: "training",
          baseXP: 35,
          difficulty: 1.5,
        },
        {
          id: "tue_5",
          start: "20:30",
          end: "22:15",
          title: "Software Development",
          category: "development",
          baseXP: 20,
          difficulty: 1.3,
        },
      ],
      2: [
        // Wednesday
        {
          id: "wed_1",
          start: "05:00",
          end: "08:30",
          title: "Gym/WORK",
          category: "training",
          baseXP: 35,
          difficulty: 1.2,
        },
        {
          id: "wed_2",
          start: "09:00",
          end: "12:30",
          title: "WORK",
          category: "work",
          baseXP: 40,
          difficulty: 1.0,
        },
        {
          id: "wed_3",
          start: "13:00",
          end: "18:00",
          title: "WORK",
          category: "work",
          baseXP: 60,
          difficulty: 1.0,
        },
        {
          id: "wed_4",
          start: "18:30",
          end: "21:00",
          title: "Wrestling",
          category: "training",
          baseXP: 30,
          difficulty: 1.5,
        },
        {
          id: "wed_5",
          start: "21:00",
          end: "22:15",
          title: "Software Development",
          category: "development",
          baseXP: 15,
          difficulty: 1.3,
        },
      ],
      3: [
        // Thursday
        {
          id: "thu_1",
          start: "05:00",
          end: "08:30",
          title: "Gym/WORK",
          category: "training",
          baseXP: 35,
          difficulty: 1.2,
        },
        {
          id: "thu_2",
          start: "08:00",
          end: "12:30",
          title: "WORK",
          category: "work",
          baseXP: 45,
          difficulty: 1.0,
        },
        {
          id: "thu_3",
          start: "13:00",
          end: "16:30",
          title: "WORK",
          category: "work",
          baseXP: 40,
          difficulty: 1.0,
        },
        {
          id: "thu_4",
          start: "17:30",
          end: "21:30",
          title: "WORK",
          category: "work",
          baseXP: 50,
          difficulty: 1.2,
        },
        {
          id: "thu_5",
          start: "21:45",
          end: "22:15",
          title: "Software Development",
          category: "development",
          baseXP: 10,
          difficulty: 1.3,
        },
      ],
      4: [
        // Friday
        {
          id: "fri_1",
          start: "05:00",
          end: "08:30",
          title: "Gym/WORK",
          category: "training",
          baseXP: 35,
          difficulty: 1.2,
        },
        {
          id: "fri_2",
          start: "09:00",
          end: "12:00",
          title: "WORK",
          category: "work",
          baseXP: 30,
          difficulty: 1.0,
        },
        {
          id: "fri_3",
          start: "12:00",
          end: "13:00",
          title: "Friday Prayer",
          category: "rest",
          baseXP: 10,
          difficulty: 0.5,
        },
        {
          id: "fri_4",
          start: "13:00",
          end: "17:30",
          title: "WORK",
          category: "work",
          baseXP: 45,
          difficulty: 1.0,
        },
        {
          id: "fri_5",
          start: "17:45",
          end: "21:00",
          title: "Taekwondo",
          category: "training",
          baseXP: 35,
          difficulty: 1.5,
        },
      ],
      5: [
        // Saturday
        {
          id: "sat_1",
          start: "05:00",
          end: "08:30",
          title: "Gym/REST",
          category: "recovery",
          baseXP: 25,
          difficulty: 0.8,
        },
        {
          id: "sat_2",
          start: "09:00",
          end: "13:00",
          title: "WORK",
          category: "work",
          baseXP: 50,
          difficulty: 1.0,
        },
        {
          id: "sat_3",
          start: "14:00",
          end: "18:00",
          title: "WORK",
          category: "work",
          baseXP: 50,
          difficulty: 1.0,
        },
        {
          id: "sat_4",
          start: "19:00",
          end: "20:00",
          title: "WORK",
          category: "work",
          baseXP: 15,
          difficulty: 1.0,
        },
      ],
      6: [
        // Sunday
        {
          id: "sun_1",
          start: "10:00",
          end: "13:00",
          title: "Weekly War Room",
          category: "planning",
          baseXP: 40,
          difficulty: 1.5,
          required: true,
        },
        {
          id: "sun_2",
          start: "14:00",
          end: "16:00",
          title: "Optional Business or Software Dev",
          category: "optional",
          baseXP: 25,
          difficulty: 1.3,
          optional: true,
        },
      ],
    };

    // Psychological Messages
    this.messages = {
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

    // DOM Elements
    this.elements = {};

    // Timers
    this.timers = {
      currentTask: null,
      countdown: null,
      focus: null,
      lockdown: null,
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

  setupDOM() {
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
      currentTaskTime: get("current-task-time"),
      currentTaskTitle: get("current-task-title"),
      currentTaskStatus: get("current-task-status"),
      scheduleGrid: get("schedule-grid"),

      // Score panel
      totalScore: get("total-score"),
      dailyScore: get("daily-score"),
      weeklyScore: get("weekly-score"),
      monthlyScore: get("monthly-score"),
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
      focusTask: get("focus-task"),
      focusTimer: get("focus-timer"),
      lockdownTask: get("lockdown-task"),
      lockdownTimer: get("lockdown-timer"),
      exitFocus: get("exit-focus"),

      // Modals
      modalOverlay: get("modal-overlay"),
      settingsModal: get("settings-modal"),
      warRoomModal: get("war-room-modal"),
      failureModal: get("failure-modal"),
      emergencyModal: get("emergency-modal"),
    };
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
          selectedDate: new Date(parsed.selectedDate || new Date()),
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
    const now = new Date();
    const dayOfWeek = this.state.selectedDate.getDay();
    const dateKey = this.getDateKey(this.state.selectedDate);

    // Get today's schedule
    let tasks = [...this.scheduleTemplate[dayOfWeek]];

    // Add emergency tasks for this date
    if (this.state.emergencyTasks[dateKey]) {
      tasks = [...tasks, ...this.state.emergencyTasks[dateKey]];
    }

    // Sort by start time
    tasks.sort(
      (a, b) => this.timeToMinutes(a.start) - this.timeToMinutes(b.start)
    );

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

  updateCurrentTask(tasks, now) {
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    let currentTask = null;
    let nextTask = null;

    // Find current and next tasks
    for (const task of tasks) {
      const start = this.timeToMinutes(task.start);
      const end = this.timeToMinutes(task.end);

      if (currentMinutes >= start && currentMinutes <= end) {
        currentTask = task;
        break;
      } else if (currentMinutes < start && !nextTask) {
        nextTask = task;
      }
    }

    // Update UI
    if (currentTask) {
      const timeLeft = this.timeToMinutes(currentTask.end) - currentMinutes;
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
      const dateKey = this.getDateKey(this.state.selectedDate);
      const isCompleted = this.state.completedTasks[dateKey]?.[currentTask.id];
      const isFailed = this.state.failedTasks[dateKey]?.[currentTask.id];

      if (!isCompleted && !isFailed && timeLeft < 0) {
        this.elements.currentTaskStatus.textContent = "OVERDUE";
        this.elements.currentTaskStatus.style.color = "var(--danger-color)";

        // Auto-fail if brutal mode enabled
        if (this.state.settings.brutalMode && timeLeft < -5) {
          this.autoFailTask(currentTask);
        }
      } else if (isCompleted) {
        this.elements.currentTaskStatus.textContent = "COMPLETED";
        this.elements.currentTaskStatus.style.color = "var(--primary-color)";
      } else if (isFailed) {
        this.elements.currentTaskStatus.textContent = "FAILED";
        this.elements.currentTaskStatus.style.color = "var(--danger-color)";
      } else {
        this.elements.currentTaskStatus.textContent = "IN PROGRESS";
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

  renderSchedule(tasks, now) {
    const dateKey = this.getDateKey(this.state.selectedDate);
    const isToday = this.isSameDay(this.state.selectedDate, now);
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    let html = "";

    tasks.forEach((task) => {
      const start = this.timeToMinutes(task.start);
      const end = this.timeToMinutes(task.end);
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

  // ===== SCORING ENGINE =====

  updateScores() {
    const dateKey = this.getDateKey(this.state.selectedDate);
    const dayOfWeek = this.state.selectedDate.getDay();

    // Calculate daily score
    let dailyScore = 0;
    let dailyPossible = 0;

    const tasks = this.scheduleTemplate[dayOfWeek];
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
      }
    });

    // Update weekly score (last 7 days)
    let weeklyScore = 0;
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const key = this.getDateKey(date);
      weeklyScore += this.state.scores.dailyHistory?.[key] || 0;
    }

    // Update monthly score (last 30 days)
    let monthlyScore = 0;
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const key = this.getDateKey(date);
      monthlyScore += this.state.scores.dailyHistory?.[key] || 0;
    }

    // Update streak
    let streak = this.state.scores.streak;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayKey = this.getDateKey(yesterday);

    if (dailyScore >= dailyPossible * 0.8) {
      // 80% completion maintains streak
      if (
        this.state.scores.dailyHistory?.[yesterdayKey] >=
        dailyPossible * 0.8
      ) {
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

  // ===== TIME HONESTY SYSTEM =====

  updateTimeHonesty(tasks) {
    const dateKey = this.getDateKey(this.state.selectedDate);
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    let planned = 0;
    let actual = 0;

    tasks.forEach((task) => {
      const start = this.timeToMinutes(task.start);
      const end = this.timeToMinutes(task.end);
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
    this.elements.timeDelta.style.color =
      delta >= 0 ? "var(--primary-color)" : "var(--danger-color)";

    this.elements.promisedHours.textContent = `${plannedHours}h`;
    this.elements.executedHours.textContent = `${actualHours}h`;
  }

  // ===== DISCIPLINE SYSTEM =====

  updateDisciplineState() {
    const dateKey = this.getDateKey(this.state.selectedDate);
    const tasks = this.scheduleTemplate[this.state.selectedDate.getDay()];
    let completedCount = 0;
    let totalCount = 0;

    tasks.forEach((task) => {
      if (!task.optional) {
        totalCount++;
        if (this.state.completedTasks[dateKey]?.[task.id]) {
          completedCount++;
        }
      }
    });

    const completionRate =
      totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
    const threshold = this.state.settings.punishmentThreshold;

    let newState = "active";
    if (completionRate < threshold) {
      newState = "warning";
    }
    if (completionRate < threshold / 2) {
      newState = "failure";
    }

    // Check if we have any failures today
    if (this.state.failedTasks[dateKey]) {
      const failureCount = Object.keys(this.state.failedTasks[dateKey]).length;
      if (failureCount > 0) {
        newState = "warning";
      }
      if (failureCount > 2) {
        newState = "failure";
      }

      this.elements.failureCount.textContent = failureCount;
    }

    // Update system state
    if (newState !== this.state.disciplineState) {
      this.state.disciplineState = newState;
      document.body.setAttribute("data-discipline-state", newState);

      // Show notification on state change
      if (newState === "warning") {
        this.showNotification(
          "Discipline warning. Course correction required.",
          "warning"
        );
      } else if (newState === "failure") {
        this.showNotification(
          "System failure. Mandatory reflection required.",
          "danger"
        );
      }
    }

    // Update consistency rate
    const consistency = this.calculateConsistencyRate();
    this.state.analytics.consistencyRate = consistency;
    this.elements.consistencyRate.textContent = `${Math.round(consistency)}%`;

    // Update cognitive load
    this.updateCognitiveLoad();
  }

  calculateConsistencyRate() {
    let consistentDays = 0;
    let totalDays = 0;

    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const key = this.getDateKey(date);

      if (this.state.scores.dailyHistory?.[key]) {
        totalDays++;
        const score = this.state.scores.dailyHistory[key];

        // Determine if day was consistent (score > 70% of possible)
        const dayOfWeek = date.getDay();
        const tasks = this.scheduleTemplate[dayOfWeek];
        let possible = 0;
        tasks.forEach((task) => {
          if (!task.optional) {
            const baseXP = task.baseXP || 10;
            const difficulty = task.difficulty || 1.0;
            possible += Math.round(baseXP * difficulty);
          }
        });

        if (score >= possible * 0.7) {
          consistentDays++;
        }
      }
    }

    return totalDays > 0 ? (consistentDays / totalDays) * 100 : 0;
  }

  updateCognitiveLoad() {
    const dateKey = this.getDateKey(this.state.selectedDate);
    const tasks = this.scheduleTemplate[this.state.selectedDate.getDay()];

    let loadScore = 0;
    let taskCount = 0;

    tasks.forEach((task) => {
      if (!task.optional) {
        taskCount++;
        loadScore += task.difficulty || 1.0;

        // Check if task is completed/failed
        if (this.state.completedTasks[dateKey]?.[task.id]) {
          loadScore -= 0.5; // Completion reduces load
        } else if (this.state.failedTasks[dateKey]?.[task.id]) {
          loadScore += 0.3; // Failure increases load
        }
      }
    });

    // Add emergency tasks
    if (this.state.emergencyTasks[dateKey]) {
      this.state.emergencyTasks[dateKey].forEach((task) => {
        taskCount++;
        loadScore += 1.5; // Emergency tasks are high load
      });
    }

    // Determine load level
    let loadLevel = "LOW";
    if (loadScore / taskCount > 1.2) loadLevel = "MEDIUM";
    if (loadScore / taskCount > 1.5) loadLevel = "HIGH";
    if (loadScore / taskCount > 2.0) loadLevel = "CRITICAL";

    this.state.analytics.cognitiveLoad = loadLevel;
    this.elements.cognitiveLoad.textContent = loadLevel;
    this.elements.cognitiveLoad.style.color =
      loadLevel === "LOW"
        ? "var(--primary-color)"
        : loadLevel === "MEDIUM"
        ? "var(--warning-color)"
        : loadLevel === "HIGH"
        ? "var(--warning-color)"
        : "var(--danger-color)";

    // Update burnout risk
    this.updateBurnoutRisk(loadScore, taskCount);
  }

  updateBurnoutRisk(loadScore, taskCount) {
    const avgLoad = loadScore / Math.max(taskCount, 1);
    const consistency = this.state.analytics.consistencyRate;
    const streak = this.state.scores.streak;

    // Calculate risk score (0-100)
    let risk = 0;
    risk += avgLoad * 25; // Load contributes up to 50 points
    risk += (100 - consistency) * 0.3; // Low consistency increases risk
    risk += Math.min(streak * 2, 20); // Long streaks increase risk slightly

    // Cap at 100
    risk = Math.min(risk, 100);

    this.state.analytics.burnoutRisk = risk;
    this.elements.burnoutRisk.style.width = `${risk}%`;
    this.elements.burnoutRisk.textContent = `${Math.round(risk)}%`;

    // Color coding
    if (risk < 30) {
      this.elements.burnoutRisk.style.background = "var(--primary-color)";
    } else if (risk < 70) {
      this.elements.burnoutRisk.style.background = "var(--warning-color)";
    } else {
      this.elements.burnoutRisk.style.background = "var(--danger-gradient)";
    }
  }

  // ===== PSYCHOLOGICAL SYSTEMS =====

  updatePsychology() {
    const state = this.state.disciplineState;
    const messages = this.messages[state];

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

  // ===== TASK ACTIONS =====

  completeTask() {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const dateKey = this.getDateKey(now);

    // Find current task
    const tasks = this.scheduleTemplate[dayOfWeek];
    const currentTask = this.findCurrentTask(tasks, now);

    if (currentTask) {
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
    const dayOfWeek = now.getDay();
    const dateKey = this.getDateKey(now);

    let taskToFail;

    if (taskId) {
      // Find specific task
      const tasks = this.scheduleTemplate[dayOfWeek];
      taskToFail = tasks.find((t) => t.id === taskId);
    } else {
      // Find current task
      const tasks = this.scheduleTemplate[dayOfWeek];
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
    const dateKey = this.getDateKey(now);

    // Create emergency task
    const task = {
      id: `emergency_${Date.now()}`,
      start: this.formatTime(now),
      end: this.formatTime(new Date(now.getTime() + duration * 60000)),
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
    this.state.systemMode = "focus";
    this.elements.focusOverlay.classList.remove("hidden");

    // Update focus display
    const now = new Date();
    const tasks = this.scheduleTemplate[now.getDay()];
    const currentTask = this.findCurrentTask(tasks, now);

    if (currentTask) {
      this.elements.focusTask.textContent = currentTask.title;
    }

    // Start focus timer
    this.startFocusTimer();
  }

  enterLockdownMode() {
    if (
      !confirm(
        "Lockdown mode blocks all distractions for 25 minutes. Continue?"
      )
    ) {
      return;
    }

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
  }

  exitFocusMode() {
    this.state.systemMode = "normal";
    this.elements.focusOverlay.classList.add("hidden");

    // Stop timers
    if (this.timers.focus) {
      clearInterval(this.timers.focus);
    }
  }

  startFocusTimer() {
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

  startLockdownTimer(minutes) {
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

  exitLockdownMode() {
    this.state.systemMode = "normal";
    this.elements.lockdownOverlay.classList.add("hidden");

    // Stop timers
    if (this.timers.lockdown) {
      clearInterval(this.timers.lockdown);
    }
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
      const key = this.getDateKey(date);
      const dayOfWeek = date.getDay();

      weeklyScore += this.state.scores.dailyHistory?.[key] || 0;

      const tasks = this.scheduleTemplate[dayOfWeek];
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

    const weekKey = this.getWeekKey(new Date());

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
      const start = this.timeToMinutes(task.start);
      const end = this.timeToMinutes(task.end);

      if (currentMinutes >= start && currentMinutes <= end) {
        return task;
      }
    }

    return null;
  }

  timeToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
  }

  formatTime(date) {
    return `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  }

  getDateKey(date) {
    return date.toISOString().split("T")[0];
  }

  getWeekKey(date) {
    const firstDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - date.getDay()
    );
    return firstDay.toISOString().split("T")[0];
  }

  isSameDay(date1, date2) {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  // ===== EVENT HANDLERS =====

  setupEventListeners() {
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

  handleKeyboardShortcuts(e) {
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

  // ===== SYSTEM FUNCTIONS =====

  startSystem() {
    // Simulate boot sequence
    setTimeout(() => {
      this.elements.bootScreen.classList.add("hidden");
      this.elements.app.classList.remove("hidden");

      this.updateTime();
      this.updateExecutionEngine();

      this.showNotification(
        "LIFE OS V2 initialized. Ready for execution.",
        "success"
      );
    }, 3000);
  }

  updateTime() {
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

  checkDailyReset() {
    const now = new Date();
    const resetTime = this.state.settings.resetTime.split(":");
    const resetHour = parseInt(resetTime[0]);
    const resetMinute = parseInt(resetTime[1]);

    const resetToday = new Date();
    resetToday.setHours(resetHour, resetMinute, 0, 0);

    if (now > resetToday) {
      const todayKey = this.getDateKey(now);

      // Check if we've already reset today
      if (
        !this.state.analytics.lastReset ||
        this.state.analytics.lastReset !== todayKey
      ) {
        this.performDailyReset();
      }
    }
  }

  performDailyReset() {
    const todayKey = this.getDateKey(new Date());

    // Archive yesterday's data
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayKey = this.getDateKey(yesterday);

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

  navigateDay(delta) {
    const newDate = new Date(this.state.selectedDate);
    newDate.setDate(newDate.getDate() + delta);
    this.state.selectedDate = newDate;
    this.updateExecutionEngine();
  }

  goToToday() {
    this.state.selectedDate = new Date();
    this.updateExecutionEngine();
    this.showNotification("Returned to today", "success");
  }

  selectTask(taskId) {
    // Find task
    const dayOfWeek = this.state.selectedDate.getDay();
    const tasks = this.scheduleTemplate[dayOfWeek];
    const task = tasks.find((t) => t.id === taskId);

    if (task) {
      // Show task details
      this.showNotification(`Selected: ${task.title}`, "info");
    }
  }

  openModal(modalName) {
    this.elements.modalOverlay.classList.remove("hidden");

    // Hide all modals
    document.querySelectorAll(".modal").forEach((modal) => {
      modal.classList.add("hidden");
    });

    // Show requested modal
    document.getElementById(`${modalName}-modal`).classList.remove("hidden");
  }

  closeModal() {
    this.elements.modalOverlay.classList.add("hidden");
    document.querySelectorAll(".modal").forEach((modal) => {
      modal.classList.add("hidden");
    });
  }

  showNotification(message, type = "info") {
    const container = document.getElementById("notifications");
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;

    container.appendChild(notification);

    // Remove after 5 seconds
    setTimeout(() => {
      notification.style.animation = "slideOut 0.3s ease";
      setTimeout(() => notification.remove(), 300);
    }, 5000);
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
}

// Initialize system
window.lifeOS = new LifeOSV2();
