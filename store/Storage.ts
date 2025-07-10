import AsyncStorage from '@react-native-async-storage/async-storage';

const TASKS_KEY = '@tasks';

// Save entire tasks array
export const saveAllTasks = async (tasks: any[]) => {
  try {
    const jsonValue = JSON.stringify(tasks);
    await AsyncStorage.setItem(TASKS_KEY, jsonValue);
  } catch (e) {
    console.error('Failed to save tasks', e);
    throw e; // Re-throw to handle in calling code
  }
};

// Get all tasks
export const getAllTasks = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(TASKS_KEY);
    return jsonValue ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Failed to load tasks', e);
    return [];
  }
};

// Add a new task
export const addTask = async (newTask: any) => {
  try {
    const currentTasks = await getAllTasks();
    const updatedTasks = [...currentTasks, newTask];
    await saveAllTasks(updatedTasks);
    return updatedTasks;
  } catch (e) {
    console.error('Failed to add task', e);
    throw e;
  }
};

// Update a task
export const updateTask = async (taskId: any, updatedTaskData: any) => {
  try {
    const currentTasks = await getAllTasks();
    const updatedTasks = currentTasks.map((task: { id: any; }) =>
      task.id === taskId ? { ...task, ...updatedTaskData } : task
    );
    await saveAllTasks(updatedTasks);
    return updatedTasks;
  } catch (e) {
    console.error('Failed to update task', e);
    throw e;
  }
};

// Delete a task
export const deleteTask = async (taskId: any) => {
  try {
    const currentTasks = await getAllTasks();
    const updatedTasks = currentTasks.filter((task: { id: any; }) => task.id !== taskId);
    await saveAllTasks(updatedTasks);
    return updatedTasks;
  } catch (e) {
    console.error('Failed to delete task', e);
    throw e;
  }
};

// Toggle task completion status
export const toggleTaskCompletion = async (taskId: any) => {
  try {
    const currentTasks = await getAllTasks();
    const updatedTasks = currentTasks.map((task: { id: any; completed: any; }) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    await saveAllTasks(updatedTasks);
    return updatedTasks;
  } catch (e) {
    console.error('Failed to toggle task', e);
    throw e;
  }
};