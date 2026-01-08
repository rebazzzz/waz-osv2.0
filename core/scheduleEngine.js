// Schedule Engine - Dynamic Schedule Management

class ScheduleEngine {
  constructor() {
    this.scheduleData = null;
    this.lockedBlocks = new Set(); // Store IDs of locked blocks
    this.loadSchedule();
  }

  // Load schedule from localStorage or fallback to JSON file
  loadSchedule() {
    try {
      // Try to load from localStorage first (for user modifications)
      const savedSchedule = localStorage.getItem("lifeOS_v2_schedule");
      if (savedSchedule) {
        this.scheduleData = JSON.parse(savedSchedule);
      } else {
        // For now, load synchronously from the imported data
        // TODO: Make this async when we have proper async initialization
        this.scheduleData = this.getDefaultSchedule();
        this.saveSchedule();
      }
    } catch (error) {
      console.error("Error loading schedule:", error);
      this.scheduleData = this.getDefaultSchedule();
    }
  }

  // Get default schedule (synchronous fallback)
  getDefaultSchedule() {
    return {
      0: [
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
      1: [
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
      2: [
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
      3: [
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
      4: [
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
      5: [
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
      6: [
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
    };
  }

  // Save schedule to localStorage
  saveSchedule() {
    try {
      localStorage.setItem(
        "lifeOS_v2_schedule",
        JSON.stringify(this.scheduleData)
      );
    } catch (error) {
      console.error("Error saving schedule:", error);
    }
  }

  // Get schedule for a specific date (computed at runtime)
  getScheduleForDate(date) {
    const dayOfWeek = date.getDay().toString();
    const baseSchedule = this.scheduleData[dayOfWeek] || [];

    // Return a copy to prevent direct modification
    return JSON.parse(JSON.stringify(baseSchedule));
  }

  // Update a task in the schedule
  updateTask(dayOfWeek, taskId, updates) {
    if (!this.scheduleData[dayOfWeek]) return false;

    const taskIndex = this.scheduleData[dayOfWeek].findIndex(
      (task) => task.id === taskId
    );
    if (taskIndex === -1) return false;

    // Check if task is locked
    if (this.lockedBlocks.has(taskId)) {
      console.warn("Cannot update locked task:", taskId);
      return false;
    }

    // Update the task
    Object.assign(this.scheduleData[dayOfWeek][taskIndex], updates);
    this.saveSchedule();
    return true;
  }

  // Add a new task to a specific day
  addTask(dayOfWeek, task) {
    if (!this.scheduleData[dayOfWeek]) {
      this.scheduleData[dayOfWeek] = [];
    }

    // Generate unique ID if not provided
    if (!task.id) {
      task.id = `${dayOfWeek}_${Date.now()}`;
    }

    this.scheduleData[dayOfWeek].push(task);
    this.saveSchedule();
    return task.id;
  }

  // Remove a task from the schedule
  removeTask(dayOfWeek, taskId) {
    if (!this.scheduleData[dayOfWeek]) return false;

    // Check if task is locked
    if (this.lockedBlocks.has(taskId)) {
      console.warn("Cannot remove locked task:", taskId);
      return false;
    }

    const taskIndex = this.scheduleData[dayOfWeek].findIndex(
      (task) => task.id === taskId
    );
    if (taskIndex === -1) return false;

    this.scheduleData[dayOfWeek].splice(taskIndex, 1);
    this.saveSchedule();
    return true;
  }

  // Lock a task (make it immutable)
  lockTask(taskId) {
    this.lockedBlocks.add(taskId);
  }

  // Unlock a task
  unlockTask(taskId) {
    this.lockedBlocks.delete(taskId);
  }

  // Check if a task is locked
  isTaskLocked(taskId) {
    return this.lockedBlocks.has(taskId);
  }

  // Get all tasks for a specific category across the week
  getTasksByCategory(category) {
    const tasks = [];
    for (let day = 0; day < 7; day++) {
      const dayTasks = this.scheduleData[day.toString()] || [];
      tasks.push(...dayTasks.filter((task) => task.category === category));
    }
    return tasks;
  }

  // Get weekly schedule overview
  getWeeklyOverview() {
    const overview = {};
    for (let day = 0; day < 7; day++) {
      const dayStr = day.toString();
      overview[dayStr] = {
        tasks: this.scheduleData[dayStr] || [],
        totalXP: (this.scheduleData[dayStr] || []).reduce(
          (sum, task) => sum + (task.baseXP || 0),
          0
        ),
        categories: [
          ...new Set(
            (this.scheduleData[dayStr] || []).map((task) => task.category)
          ),
        ],
      };
    }
    return overview;
  }

  // Reset schedule to default (from JSON file)
  async resetToDefault() {
    try {
      const response = await fetch("./core/scheduleData.json");
      if (response.ok) {
        this.scheduleData = await response.json();
        this.lockedBlocks.clear();
        this.saveSchedule();
        return true;
      }
    } catch (error) {
      console.error("Error resetting schedule:", error);
    }
    return false;
  }

  // Export schedule as JSON
  exportSchedule() {
    return JSON.stringify(this.scheduleData, null, 2);
  }

  // Import schedule from JSON
  importSchedule(jsonString) {
    try {
      const newSchedule = JSON.parse(jsonString);
      // Basic validation
      if (typeof newSchedule === "object" && newSchedule !== null) {
        this.scheduleData = newSchedule;
        this.saveSchedule();
        return true;
      }
    } catch (error) {
      console.error("Error importing schedule:", error);
    }
    return false;
  }
}

// Create and export singleton instance
export const scheduleEngine = new ScheduleEngine();
