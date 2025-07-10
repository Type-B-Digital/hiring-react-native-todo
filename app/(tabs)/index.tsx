import { StyleSheet, View } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import FABbutton from '@/components/FABbutton';
import React, { useState } from 'react';
import CustomCheckbox from '@/components/CustomCheckBox'; // Assuming you have a custom checkbox component

export default function HomeScreen() {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'typography', completed: false },
    { id: '2', title: 'layout', completed: false },
    { id: '3', title: 'color', completed: false },
    { id: '4', title: 'style', completed: false },
    { id: '5', title: 'get started', completed: true },
    { id: '6', title: 'meditate', completed: true },
    { id: '7', title: 'exercise', completed: false },
    { id: '8', title: 'read', completed: false },
    { id: '9', title: 'write', completed: true },
    { id: '10', title: 'learn', completed: false },
    { id: '11', title: 'build', completed: false },
    { id: '12', title: 'share', completed: false },
    { id: '13', title: 'enjoy', completed: true },
    { id: '14', title: 'repeat', completed: false },
    { id: '15', title: 'explore', completed: false },
    { id: '16', title: 'create', completed: false },
  ]);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#51acb4', dark: '#51acb4' }}
        title='tasked'
      >
        <ThemedView style={styles.tasksContainer}>
          {tasks.map((task) => (
            <ThemedView key={task.id} style={styles.taskItem}>
           
              <CustomCheckbox
                isChecked={task.completed}
                onPress={() => toggleTask(task.id)}
                boxBackgroundColor={{ light: '#11181C', dark: '#9BA1A6' }} // Optional background color
              />
              <ThemedText 
                style={[
                  // styles.taskText,
                  task.completed && styles.completedTask
                ]}
                type='defaultSemiBold'
              >
                {task.title}
              </ThemedText>
            </ThemedView>
          ))}
        </ThemedView>
      </ParallaxScrollView>
      <View style={{ position: 'absolute', bottom: 0, right: 0, margin: 16 }}>
        <FABbutton />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  tasksContainer: {
    gap: 8,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#888',
  },

 
});