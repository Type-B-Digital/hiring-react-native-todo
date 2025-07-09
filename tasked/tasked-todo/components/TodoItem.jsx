// components/TodoItem.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo, editTodo } from '../redux/todosSlice';

const TodoItem = ({ item }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(item.title);

  const handleEditSave = () => {
    if (text.trim()) {
      dispatch(editTodo({ id: item.id, title: text.trim() }));
      setIsEditing(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* ✅ Checkbox */}
      <TouchableOpacity onPress={() => dispatch(toggleTodo(item.id))}>
        <Icon
          name={item.completed ? 'check-circle' : 'circle'}
          size={24}
          color={item.completed ? '#00B894' : '#CED4DA'}
        />
      </TouchableOpacity>

      {/* 📝 Task text or input */}
      {isEditing ? (
        <TextInput
          style={[styles.textInput, item.completed && styles.textCompleted]}
          value={text}
          onChangeText={setText}
          onSubmitEditing={handleEditSave}
          onBlur={handleEditSave} // Save also on blur for better UX
          autoFocus
        />
      ) : (
        <TouchableOpacity
          style={{ flex: 1 }}
          onLongPress={() => setIsEditing(true)}
          activeOpacity={0.7}
        >
          <Text style={[styles.text, item.completed && styles.textCompleted]}>
            {item.title}
          </Text>
        </TouchableOpacity>
      )}

      {/* ✏️ Edit icon (only show if not editing) */}
      {!isEditing && (
        <TouchableOpacity onPress={() => setIsEditing(true)} style={{ marginRight: 12 }}>
          <Icon name="edit-2" size={20} color="#0984e3" />
        </TouchableOpacity>
      )}

      {/* ❌ Delete icon (hide while editing to avoid confusion) */}
      {!isEditing && (
        <TouchableOpacity onPress={() => dispatch(deleteTodo(item.id))}>
          <Icon name="trash-2" size={20} color="#ff7675" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 14,
    marginVertical: 6,
    marginHorizontal: 16,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    justifyContent: 'space-between',
  },
  text: {
    flex: 1,
    marginHorizontal: 12,
    fontSize: 16,
    color: '#2d3436',
  },
  textInput: {
    flex: 1,
    marginHorizontal: 12,
    fontSize: 16,
    color: '#2d3436',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 0,
  },
  textCompleted: {
    textDecorationLine: 'line-through',
    color: '#b2bec3',
  },
});

export default TodoItem;
