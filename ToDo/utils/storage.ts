import AsyncStorage from '@react-native-async-storage/async-storage';

const TODOS_KEY = 'TASKED_TODOS';

export async function loadTodos() {
  try {
    const json = await AsyncStorage.getItem(TODOS_KEY);
    return json ? JSON.parse(json) : [];
  } catch (e) {
    console.error('Failed to load todos', e);
    return [];
  }
}

export async function saveTodos(todos: any[]) {
  try {
    await AsyncStorage.setItem(TODOS_KEY, JSON.stringify(todos));
  } catch (e) {
    console.error('Failed to save todos', e);
  }
} 