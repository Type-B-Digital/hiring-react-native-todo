import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, toggleTodo, editTodo, setTodos } from '../redux/todosSlice';
import { loadInitialTodos } from '../redux/todosSlice';
import TodoItem from '../components/TodoItem';
import uuid from 'react-native-uuid';

export default function HomeScreen() {
  const [input, setInput] = useState('');
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    loadInitialTodos().then(initial => {
      dispatch(setTodos(initial));
    });
  }, []);

  const handleAdd = () => {
    if (input.trim()) {
      dispatch(addTodo({ id: uuid.v4(), title: input.trim(), completed: false }));
      setInput('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add a new task"
        value={input}
        onChangeText={setInput}
      />
      <Button title="Add" onPress={handleAdd} />
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TodoItem
            todo={item}
            onToggle={() => dispatch(toggleTodo(item.id))}
            onDelete={() => dispatch(deleteTodo(item.id))}
            onEdit={(newTitle) => dispatch(editTodo({ id: item.id, title: newTitle }))}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
  },
});