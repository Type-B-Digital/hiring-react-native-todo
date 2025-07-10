import React, { useState } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { FAB } from 'react-native-paper';

const ToggleFAB = () => {
    const [isOpen, setIsOpen] = useState(false);
    const rotation = useState(new Animated.Value(0))[0];

    const toggleFAB = () => {
        Animated.timing(rotation, {
            toValue: isOpen ? 0 : 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
        setIsOpen(!isOpen);
    };

    const rotateInterpolation = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    return (
        <Animated.View style={{ transform: [{ rotate: rotateInterpolation }] }}>
            <FAB
                icon={isOpen ? 'close' : 'plus'}
                color='white'
                style={styles.fab}
                onPress={toggleFAB}
            />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
   
    fab: {
        // position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#51acb4',
        borderRadius: 28,
    },
});

export default ToggleFAB;