import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const handleEdit = () => {
    onEdit(title);
    setEditing(false);
  };

  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={onToggle}>
        <Text style={[styles.text, todo.completed && styles.completed]}>{todo.title}</Text>
      </TouchableOpacity>
      {editing ? (
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          onSubmitEditing={handleEdit}
        />
      ) : (
        <TouchableOpacity onPress={() => setEditing(true)}>
          <Text style={styles.edit}>Edit</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={onDelete}>
        <Text style={styles.delete}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  text: {
    flex: 1,
    fontSize: 16,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
    flex: 1,
  },
  edit: {
    marginHorizontal: 10,
    color: 'blue',
  },
  delete: {
    color: 'red',
  },
});