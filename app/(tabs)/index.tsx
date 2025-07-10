import { Image } from 'expo-image';
import { Platform, StyleSheet, View, TouchableOpacity } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import FABbutton from '@/components/FABbutton';
import { Checkbox } from 'react-native-paper'; // Or your preferred checkbox component
import React, { useState } from 'react';

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

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <Image
            source={require('@/assets/images/partial-react-logo.png')}
            style={styles.reactLogo}
          />
        }
        title='tasked'
      >
        <ThemedView style={styles.tasksContainer}>
          {tasks.map((task) => (
            <ThemedView key={task.id} style={styles.taskItem}>
              <Checkbox
                status={task.completed ? 'checked' : 'unchecked'}
                onPress={() => toggleTask(task.id)}
                color="#51acb4"
                
              />
              <ThemedText 
                style={[
                  styles.taskText,
                  task.completed && styles.completedTask
                ]}
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
    // marginTop: 20,
    // paddingHorizontal: 16,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    // borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  taskText: {
    fontSize: 16,
    marginLeft: 12,
    flex: 1,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});