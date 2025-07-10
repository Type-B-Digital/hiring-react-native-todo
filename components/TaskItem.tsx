// components/TaskItem.tsx
import React from 'react';
import { View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { IconButton, MD3Colors } from 'react-native-paper';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import CustomCheckbox from '@/components/CustomCheckBox';

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

type Props = {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
};

const TaskItem = ({ task, onToggle, onEdit, onDelete }: Props) => {
  const swipeLeftAction = () => (
    <View style={{ flexDirection: 'row', gap: 8, marginLeft: 10, justifyContent: 'center', alignItems: 'center' }}>
      <IconButton
        icon="pencil"
        mode="contained"
        containerColor="#e0f2f1"
        iconColor="#55c85a"
        size={20}
        onPress={() => onEdit(task)}
      />
      <IconButton
        icon="delete"
        mode="contained"
        containerColor="#ffebee"
        iconColor={MD3Colors.error50}
        size={20}
        onPress={() => onDelete(task.id)}
      />
    </View>
  );

  return (
    <Swipeable renderLeftActions={swipeLeftAction}>
      <ThemedView style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 13, paddingHorizontal: 25 }}>
        <CustomCheckbox isChecked={task.completed} onPress={() => onToggle(task.id)} boxBackgroundColor={{ light: '#11181C', dark: '#9BA1A6' }} />
        <ThemedText type='defaultSemiBold' style={task.completed ? { textDecorationLine: 'line-through', color: '#888' } : {}}>
          {task.title}
        </ThemedText>
      </ThemedView>
    </Swipeable>
  );
};

export default TaskItem;
