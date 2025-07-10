import React, { useState } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { FAB } from 'react-native-paper';

type ToggleFABProps = {
    onPress: () => void;
    isInputVisible: boolean;
};

const ToggleFAB = ({ onPress, isInputVisible }: ToggleFABProps) => {
    const rotation = useState(new Animated.Value(0))[0];

    const toggleFAB = () => {
        Animated.timing(rotation, {
            toValue: isInputVisible ? 0 : 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
        onPress();
    };

    const rotateInterpolation = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '90deg'], // Changed to 135deg for more natural close icon
    });

    return (
        <Animated.View style={{ transform: [{ rotate: rotateInterpolation }] }}>
            <FAB
                icon={isInputVisible ? 'close' : 'plus'}
                color='white'
                style={styles.fab}
                onPress={toggleFAB}
            />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    fab: {
        margin: 16,
        backgroundColor: '#51acb4',
        borderRadius: 28,
    },
});

export default ToggleFAB;