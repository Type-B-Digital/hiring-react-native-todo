import CustomCheckbox from '@/components/CustomCheckBox';
import FABbutton from '@/components/FABbutton';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import TaskInput from '@/components/TaskInput';
import TaskItem from '@/components/TaskItem';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { addTask, deleteTask, getAllTasks, saveAllTasks, updateTask } from '@/store/Storage'; // Assuming you have storage utilities
import React, { useEffect, useRef, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, TextInput, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { IconButton, MD3Colors } from 'react-native-paper';

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt?: string;
};

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isInputVisible, setInputVisible] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [updateTaskId, setUpdateTaskId] = useState<string | null>(null);
  const inputRef = useRef<TextInput>(null);
  const colorScheme = useColorScheme() ?? 'light';
  // Load tasks on initial render
  useEffect(() => {
    const loadTasks = async () => {
      const loadedTasks = await getAllTasks();
      if (loadedTasks.length > 0) {
        setTasks(loadedTasks);
      } else {
        // Set default tasks if no tasks in storage
        setTasks([
          { id: '1', title: 'typography', completed: false },
          { id: '2', title: 'layout', completed: false },
        ]);
      }
    };
    loadTasks();
  }, []);

  // Focus input when it becomes visible
  useEffect(() => {
    if (isInputVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInputVisible]);

  const toggleTask = async (id: string) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    await saveAllTasks(updatedTasks);
  };

  const handleAddTask = async () => {
    if (updateTaskId) {
      // Update existing task
      const updatedTask = {
        id: updateTaskId,
        title: newTaskTitle.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      };

      const updatedTasks = await updateTask(updateTaskId, updatedTask);
      setTasks(updatedTasks);
      setUpdateTaskId(null); // Reset update state
      setNewTaskTitle('');
      setInputVisible(false);
      Keyboard.dismiss();
    } else if (newTaskTitle.trim()) {
      const newTask = {
        id: Date.now().toString(),
        title: newTaskTitle.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      };


      // Add to async storage and state
      const updatedTasks = await addTask(newTask);
      setTasks([updatedTasks[0], ...updatedTasks.slice(1)]); // Add new task at top

      // Reset input
      setNewTaskTitle('');
      setInputVisible(false);
      Keyboard.dismiss();
    }
  };

  const handleEditTask = (task: Task) => {
    // Set the task title in the input field
    setNewTaskTitle(task.title);
    setUpdateTaskId(task.id);
    // Show the input field if it's not already visible
    if (!isInputVisible) {
      setInputVisible(true);
    }
    // Focus the input field
    inputRef.current?.focus();
    // Remove the original task

  };

  const handleFABPress = () => {
    if (isInputVisible) {
      // Cancel input
      setNewTaskTitle('');
      setInputVisible(false);
      Keyboard.dismiss();
    } else {
      // Show input
      setInputVisible(true);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1 }}>
          <ParallaxScrollView
            headerBackgroundColor={{ light: '#fff', dark: '#51acb4' }}
            title='tasked'
          >
            <ThemedView style={styles.tasksContainer}>
              {/* New Task Input (when visible) */}
              {isInputVisible && (
                <TaskInput
                  value={newTaskTitle}
                  onChange={setNewTaskTitle}
                  onSubmit={handleAddTask}
                  inputRef={inputRef}
                  colorScheme={colorScheme}
                />
              )}
              {/* Existing Tasks */}
              {tasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={toggleTask}
                  onEdit={handleEditTask}
                  onDelete={async (id) => {
                    await deleteTask(id);
                    setTasks(prev => prev.filter(t => t.id !== id));
                  }}
                />
              ))}

            </ThemedView>
          </ParallaxScrollView>

          <View style={{ position: 'absolute', bottom: 30, right: 0, margin: 16 }}>
            <FABbutton
              onPress={handleFABPress}
              isInputVisible={isInputVisible}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tasksContainer: {
    top: 6,
    gap: 8,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 25,
    // bottom: 8,
    // backgroundColor:'red'
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    paddingVertical: 8,
    color: '#fff', // Adjust based on themej
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
});