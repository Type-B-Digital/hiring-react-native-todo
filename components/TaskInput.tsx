// components/TaskInput.tsx
import React, { RefObject } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { ThemedView } from '@/components/ThemedView';
import CustomCheckbox from '@/components/CustomCheckBox';

type Props = {
  value: string;
  onChange: (text: string) => void;
  onSubmit: () => void;
  inputRef: RefObject<TextInput | null>;
  colorScheme: 'light' | 'dark';
};

const TaskInput = ({ value, onChange, onSubmit, inputRef, colorScheme }: Props) => {
  return (
    <ThemedView style={[styles.inputContainer, { backgroundColor: colorScheme === 'dark' ? '#2a2d2e' : '#ECEDEE' }]}>
      <CustomCheckbox  boxBackgroundColor={{ light: '#11181C', dark: '#9BA1A6' }} isChecked={false} onPress={() => {}} />
      <TextInput
        ref={inputRef}
        style={[styles.input, { color: colorScheme === 'dark' ? '#ECEDEE' : '#11181C' }]}
        placeholder="What needs to be done?"
        placeholderTextColor={colorScheme === 'dark' ? '#9BA1A6' : '#687076'}
        value={value}
        onChangeText={onChange}
        onSubmitEditing={onSubmit}
        returnKeyType="done"
        autoFocus
        blurOnSubmit={false}
      />
      <IconButton
        icon="check"
        mode="contained"
        containerColor="#e0f2f1"
        iconColor="#51acb4"
        size={20}
        onPress={onSubmit}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 8,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    paddingVertical: 8,
  },
});

export default TaskInput;
