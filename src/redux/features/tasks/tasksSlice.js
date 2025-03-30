import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  filters: {
    status: "all",
    priority: "all",
    assignee: "all",
    search: "",
  },
  sortBy: "createdAt",
  sortOrder: "desc",
};

const tasksSlice = createSlice({
  name: "tasksSlice",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: state.tasks.length === 0 ? 1 : state.tasks.at(-1).id + 1,
        status: "pending",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...action.payload,
      };
      state.tasks.push(newTask);
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateStatus: (state, action) => {
      const task = state.tasks.find((item) => item.id === action.payload.id);
      if (task) {
        task.status = action.payload.status;
        task.updatedAt = new Date().toISOString();
      }
    },
    updateTask: (state, action) => {
      const { id, ...updates } = action.payload;
      const task = state.tasks.find((item) => item.id === id);
      if (task) {
        Object.assign(task, updates);
        task.updatedAt = new Date().toISOString();
      }
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

// Selectors
export const selectFilteredTasks = (state) => {
  const { tasks, filters, sortBy, sortOrder } = state.tasks;

  let filteredTasks = [...tasks];

  // Apply filters
  if (filters.status !== "all") {
    filteredTasks = filteredTasks.filter(
      (task) => task.status === filters.status
    );
  }

  if (filters.priority !== "all") {
    filteredTasks = filteredTasks.filter(
      (task) => task.priority === filters.priority
    );
  }

  if (filters.assignee !== "all") {
    filteredTasks = filteredTasks.filter(
      (task) => task.assignTo === filters.assignee
    );
  }

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filteredTasks = filteredTasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchLower) ||
        task.description.toLowerCase().includes(searchLower)
    );
  }

  // Apply sorting
  filteredTasks.sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return filteredTasks;
};

export const selectTaskStats = (state) => {
  const tasks = state.tasks.tasks;
  return {
    total: tasks.length,
    pending: tasks.filter((task) => task.status === "pending").length,
    inProgress: tasks.filter((task) => task.status === "in-progress").length,
    completed: tasks.filter((task) => task.status === "completed").length,
    highPriority: tasks.filter((task) => task.priority === "high").length,
    mediumPriority: tasks.filter((task) => task.priority === "medium").length,
    lowPriority: tasks.filter((task) => task.priority === "low").length,
  };
};

export const {
  addTask,
  removeTask,
  updateStatus,
  updateTask,
  setFilters,
  setSortBy,
  setSortOrder,
  clearFilters,
} = tasksSlice.actions;

export default tasksSlice.reducer;
