import React, { useState } from 'react';
import { View, FlatList, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTodos } from '../hooks/useTodos';
import TodoItem from '../components/TodoItem';
import TodoInput from '../components/TodoInput';
import FloatingButton from '../components/FloatingButton';
import { Colors } from '../constants/Colors';
import AppText from '../components/AppText';

export default function TodoScreen() {
  const { todos, addTodo, toggleTodo, editTodo, deleteTodo } = useTodos();
  const [inputVisible, setInputVisible] = useState(false);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
          <AppText style={styles.title}>tasked</AppText>
          {inputVisible && (
            <TodoInput
              onAdd={title => {
                addTodo(title);
                setInputVisible(false);
              }}
            />
          )}
          <FlatList
            data={todos}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TodoItem
                todo={item}
                onToggle={toggleTodo}
                onEdit={editTodo}
                onDelete={deleteTodo}
              />
            )}
            contentContainerStyle={{ paddingBottom: 120 }}
            showsVerticalScrollIndicator={false}
          />
          <FloatingButton
            icon={inputVisible ? 'close' : 'add'}
            onPress={() => setInputVisible(v => !v)}
          />
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 16, // add extra top padding
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#222',
  },
}); 