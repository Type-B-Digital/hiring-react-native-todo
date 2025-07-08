import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Todo } from '../hooks/useTodos';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (id: string, title: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onEdit, onDelete }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.title);
  const scale = useSharedValue(1);

  React.useEffect(() => {
    if (todo.completed) {
      scale.value = withSpring(1.15, { damping: 4 }, () => {
        scale.value = withSpring(1);
      });
    } else {
      scale.value = withSpring(0.9, { damping: 4 }, () => {
        scale.value = withSpring(1);
      });
    }
  }, [todo.completed]);

  const animatedCheckbox = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleEdit = () => {
    if (editing && text.trim() !== '') {
      onEdit(todo.id, text.trim());
    }
    setEditing(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => onToggle(todo.id)}
        activeOpacity={0.7}
      >
        <Animated.View style={[styles.checkbox, todo.completed && styles.checked, animatedCheckbox]}>
          {todo.completed && (
            <Ionicons name="checkmark" size={20} color="#fff" />
          )}
        </Animated.View>
      </TouchableOpacity>
      {editing ? (
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          onBlur={handleEdit}
          autoFocus
          onSubmitEditing={handleEdit}
        />
      ) : (
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Text style={[styles.text, todo.completed && styles.completed]}>{todo.title}</Text>
          <TouchableOpacity onPress={() => setEditing(true)} style={styles.iconButtonEdit}>
            <Ionicons name="pencil" size={15} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity onPress={() => onDelete(todo.id)} style={styles.iconButtonDelete}>
        <Ionicons name="trash" size={15} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#222',
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: Colors.light.primary,
  },
  text: {
    fontSize: 20,
    color: '#222',
    flex: 1,
  },
  completed: {
    color: Colors.light.gray,
    textDecorationLine: 'line-through',
  },
  input: {
    fontSize: 20,
    flex: 1,
    borderBottomWidth: 1,
    borderColor: Colors.light.primary,
    color: '#222',
    padding: 0,
  },
  iconButtonEdit: {
    marginLeft: 8,
    marginRight: 10, // add gap between edit and delete
    padding: 5,
    backgroundColor: '#55B7C6',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#55B7C6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  iconButtonDelete: {
    marginLeft: 0,
    padding: 5,
    backgroundColor: '#F76C6C',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#F76C6C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
});     