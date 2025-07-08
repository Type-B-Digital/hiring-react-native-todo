import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

export default function AppText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[styles.text, props.style]}
    />
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Montserrat_700Bold',
    fontWeight: '700',
    fontSize: 32,
    lineHeight: 32, // 100%
    letterSpacing: -0.41,
  },
});
 