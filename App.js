  /**
   * Sample React Native App
   * https://github.com/facebook/react-native
   *
  * @format
   */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Keyboard,
  useColorScheme
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function App() {
  const systemScheme = useColorScheme();
  const [theme, setTheme] = useState(systemScheme);

  const colors = {
    background: theme === 'dark' ? '#121212' : '#fff',
    text: theme === 'dark' ? '#fff' : '#000',
    subText: theme === 'dark' ? '#aaa' : '#888',
    input: theme === 'dark' ? '#1e1e1e' : '#f0f0f0',
    border: theme === 'dark' ? '#333' : '#eee',
    checkbox: '#6EC6CA',
  };

  const [todos, setTodos] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  useEffect(() => { loadTodos(); }, []);
  useEffect(() => { saveTodos(); }, [todos]);

  const loadTodos = async () => {
    try {
      const json = await AsyncStorage.getItem('@todos');
      if (json != null) setTodos(JSON.parse(json));
    } catch (e) {
      console.error('Failed to load', e);
    }
  };

  const saveTodos = async () => {
    try {
      await AsyncStorage.setItem('@todos', JSON.stringify(todos));
    } catch (e) {
      console.error('Failed to save', e);
    }
  };

  const addTodo = () => {
    const trimmed = newTitle.trim();
    if (trimmed.length === 0) return;
    setTodos(prev => [...prev, { id: Date.now().toString(), title: trimmed, completed: false }]);
    setNewTitle('');
    setInputVisible(false);
    Keyboard.dismiss();
  };

  const toggleTodo = (id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const editTodo = (id, newTitle) => {
    setTodos(prev =>
      prev.map(todo => (todo.id === id ? { ...todo, title: newTitle } : todo))
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={styles.subHeader}>ToDo App</Text>
      <Text style={[styles.header, { color: colors.text }]}>tasked</Text>

      <TouchableOpacity
        style={[styles.themeToggle, { borderColor: colors.border }]}
        onPress={() => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))}
      >
        <Text style={{ color: colors.text }}>
          Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
        </Text>
      </TouchableOpacity>

      {inputVisible && (
        <TextInput
          style={[styles.input, { backgroundColor: colors.input, color: colors.text }]}
          value={newTitle}
          onChangeText={setNewTitle}
          onSubmitEditing={addTodo}
          placeholder="Add new task"
          placeholderTextColor={colors.subText}
          autoFocus
        />
      )}

      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        contentContainerStyle={{ backgroundColor: colors.background }}
        style={{ flex: 1 }}
        renderItem={({ item }) => (
          <View style={[styles.todoRow, { borderBottomColor: colors.border }]}>
            <TouchableOpacity
              style={[
                styles.checkbox,
                { backgroundColor: item.completed ? colors.checkbox : colors.text }
              ]}
              onPress={() => toggleTodo(item.id)}
            />
            {editingId === item.id ? (
              <TextInput
                style={[
                  styles.todoText,
                  {
                    flex: 1,
                    borderBottomWidth: 1,
                    borderColor: colors.border,
                    color: colors.text,
                    paddingVertical: 2,
                  }
                ]}
                value={editingText}
                onChangeText={setEditingText}
                onSubmitEditing={() => {
                  const trimmed = editingText.trim();
                  if (trimmed.length > 0) {
                    editTodo(item.id, trimmed);
                  }
                  setEditingId(null);
                }}
                onBlur={() => setEditingId(null)}
                autoFocus
                returnKeyType="done"
              />
            ) : (
              <TouchableOpacity
                style={{ flex: 1 }}
                onLongPress={() => {
                  setEditingId(item.id);
                  setEditingText(item.title);
                }}
              >
                <Text
                  style={[
                    styles.todoText,
                    {
                      color: item.completed ? colors.subText : colors.text,
                      textDecorationLine: item.completed ? 'line-through' : 'none'
                    }
                  ]}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={() => deleteTodo(item.id)}>
              <Icon name="trash" size={18} color={colors.subText} />
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.checkbox }]}
        onPress={() => setInputVisible(!inputVisible)}
      >
        <Text style={styles.fabIcon}>{inputVisible ? '×' : '+'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60 },
  header: { fontSize: 32, fontWeight: 'bold', marginLeft: 20, marginBottom: 20 },
  themeToggle: {
    alignSelf: 'flex-end',
    marginRight: 20,
    marginBottom: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderRadius: 8,
  },
  input: {
    padding: 15,
    fontSize: 18,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 8,
  },
  subHeader: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 40,
    marginTop: -20,
    fontWeight: 'bold',
    color: 'red',
    borderWidth: 1,
    borderColor: 'red',
    paddingVertical: 10,
  },
  todoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    marginRight: 12,
  },
  todoText: { fontSize: 18, flex: 1 },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabIcon: { color: '#fff', fontSize: 30 },
});
