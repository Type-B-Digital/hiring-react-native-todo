import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const loadInitialTodos = async () => {
    const data = await AsyncStorage.getItem('TODOS');
    return data ? JSON.parse(data) : [];
};

const saveTodos = async (todos) => {
    await AsyncStorage.setItem('TODOS', JSON.stringify(todos));
};

const todosSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        setTodos(state, action) {
            return action.payload;
        },
        addTodo(state, action) {
            state.push(action.payload);
            saveTodos(state);
        },
        toggleTodo(state, action) {
            const todo = state.find(t => t.id === action.payload);
            if (todo) todo.completed = !todo.completed;
            saveTodos(state);
        },
        editTodo(state, action) {
            const { id, title } = action.payload;
            const todo = state.find(t => t.id === id);
            if (todo) todo.title = title;
            saveTodos(state);
        },
        deleteTodo(state, action) {
            const newState = state.filter(t => t.id !== action.payload);
            saveTodos(newState);
            return newState;
        },
    },
});

export const { addTodo, toggleTodo, editTodo, deleteTodo, setTodos } = todosSlice.actions;
export default todosSlice.reducer;
export { loadInitialTodos };