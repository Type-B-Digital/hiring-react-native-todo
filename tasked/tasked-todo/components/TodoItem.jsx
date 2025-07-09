import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Easing,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo, editTodo } from '../redux/todosSlice';

const TodoItem = ({ item }) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(item.title);

    // Animated values for fade effect
    const fadeAnimText = useRef(new Animated.Value(1)).current;
    const fadeAnimInput = useRef(new Animated.Value(0)).current;

    // Animate fade in/out when isEditing changes
    useEffect(() => {
        if (isEditing) {
            Animated.parallel([
                Animated.timing(fadeAnimText, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                    easing: Easing.out(Easing.ease),
                }),
                Animated.timing(fadeAnimInput, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                    easing: Easing.out(Easing.ease),
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(fadeAnimText, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                    easing: Easing.out(Easing.ease),
                }),
                Animated.timing(fadeAnimInput, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                    easing: Easing.out(Easing.ease),
                }),
            ]).start();
        }
    }, [isEditing, fadeAnimText, fadeAnimInput]);

    const handleEditSave = () => {
        if (text.trim()) {
            dispatch(editTodo({ id: item.id, title: text.trim() }));
            setIsEditing(false);
        }
    };

    return (
        <View style={styles.container}>

            <TouchableOpacity onPress={() => dispatch(toggleTodo(item.id))}>
                <Icon
                    name={item.completed ? 'check-circle' : 'circle'}
                    size={24}
                    color={item.completed ? '#00B894' : '#CED4DA'}
                />
            </TouchableOpacity>


            <Animated.View style={{ flex: 1, opacity: fadeAnimText }}>
                {!isEditing && (
                    <TouchableOpacity
                        onLongPress={() => setIsEditing(true)}
                        activeOpacity={0.7}
                    >
                        <Text style={[styles.text, item.completed && styles.textCompleted]}>
                            {item.title}
                        </Text>
                    </TouchableOpacity>
                )}
            </Animated.View>

            <Animated.View style={{ flex: 1, opacity: fadeAnimInput, position: 'absolute', left: 48, right: 60 }}>
                {isEditing && (
                    <TextInput
                        style={[styles.textInput, item.completed && styles.textCompleted]}
                        value={text}
                        onChangeText={setText}
                        onSubmitEditing={handleEditSave}
                        onBlur={handleEditSave}
                        autoFocus
                    />
                )}
            </Animated.View>


            {!isEditing && (
                <TouchableOpacity onPress={() => setIsEditing(true)} style={{ marginRight: 12 }}>
                    <Icon name="edit-2" size={20} color="#0984e3" />
                </TouchableOpacity>
            )}


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
        position: 'relative',
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
