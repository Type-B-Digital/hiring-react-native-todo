import React from 'react';
import { TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

interface FloatingButtonProps {
  onPress: () => void;
  icon?: 'add' | 'close';
}

export default function FloatingButton({ onPress, icon = 'add' }: FloatingButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
      <Ionicons name={icon === 'add' ? 'add' : 'close'} size={32} color="#fff" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 24,
    bottom: 32,
    backgroundColor: Colors.light.primary,
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 8,
    // Add a little scale and transition for modern feel
    transform: [{ scale: 1 }],
  },
}); 