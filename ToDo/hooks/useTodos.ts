import { useCallback, useEffect, useState } from 'react';
import { loadTodos, saveTodos } from '../utils/storage';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const loaded = await loadTodos();
      setTodos(loaded);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!loading) saveTodos(todos);
  }, [todos, loading]);

  const addTodo = useCallback((title: string) => {
    setTodos(todos => [
      { id: Date.now().toString(), title, completed: false },
      ...todos,
    ]);
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos(todos => todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, []);

  const editTodo = useCallback((id: string, title: string) => {
    setTodos(todos => todos.map(todo =>
      todo.id === id ? { ...todo, title } : todo
    ));
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos(todos => todos.filter(todo => todo.id !== id));
  }, []);

  return {
    todos,
    loading,
    addTodo,
    toggleTodo,
    editTodo,
    deleteTodo,
    setTodos,
  };
} 