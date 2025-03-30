import { createSlice } from '@reduxjs/toolkit';

const loadFromLocalStorage = () => {
  try {
    const tasksData = localStorage.getItem('tasks');
    return tasksData ? JSON.parse(tasksData) : [];
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return [];
  }
};

const saveToLocalStorage = (tasks) => {
  try {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    tasks: loadFromLocalStorage(),
    filter: 'all',
    sortBy: 'date',
    sortDirection: 'asc'
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      saveToLocalStorage(state.tasks);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      saveToLocalStorage(state.tasks);
    },
    toggleComplete: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        if (task.completed) {
          task.completedAt = new Date().toISOString();
        } else {
          task.completedAt = null;
        }
        saveToLocalStorage(state.tasks);
      }
    },
    updateTask: (state, action) => {
      const { id, updates } = action.payload;
      const taskIndex = state.tasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...updates };
        saveToLocalStorage(state.tasks);
      }
    },
    reorderTasks: (state, action) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const [removed] = state.tasks.splice(sourceIndex, 1);
      state.tasks.splice(destinationIndex, 0, removed);
      saveToLocalStorage(state.tasks);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSortDirection: (state, action) => {
      state.sortDirection = action.payload;
    }
  }
});

export const { 
  addTask, 
  deleteTask, 
  toggleComplete, 
  updateTask, 
  reorderTasks,
  setFilter,
  setSortBy,
  setSortDirection
} = todoSlice.actions;

export default todoSlice.reducer;
