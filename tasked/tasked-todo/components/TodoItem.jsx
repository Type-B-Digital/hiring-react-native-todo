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

const TodoItem = ({ todo }) => {
    if (!todo) return null;

    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(todo.title);

    const fadeAnimText = useRef(new Animated.Value(1)).current;
    const fadeAnimInput = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnimText, {
                toValue: isEditing ? 0 : 1,
                duration: 200,
                useNativeDriver: true,
                easing: Easing.out(Easing.ease),
            }),
            Animated.timing(fadeAnimInput, {
                toValue: isEditing ? 1 : 0,
                duration: 200,
                useNativeDriver: true,
                easing: Easing.out(Easing.ease),
            }),
        ]).start();
    }, [isEditing]);

    const handleEditSave = () => {
        if (text.trim()) {
            dispatch(editTodo({ id: todo.id, title: text.trim() }));
        }
        setIsEditing(false);
    };

    return (
        <View style={[styles.container, isEditing && styles.editingContainer]}>
            <TouchableOpacity onPress={() => dispatch(toggleTodo(todo.id))}>
                <View style={styles.checkbox}>
                    {todo.completed && <View style={styles.checkmark} />}
                </View>
            </TouchableOpacity>

            <Animated.View style={{ flex: 1, opacity: fadeAnimText }}>
                {!isEditing && (
                    <TouchableOpacity
                        onLongPress={() => setIsEditing(true)}
                        activeOpacity={0.7}
                    >
                        <Text style={[styles.text, todo.completed && styles.textCompleted]}>
                            {todo.title}
                        </Text>
                    </TouchableOpacity>
                )}
            </Animated.View>

            <Animated.View
                style={{
                    flex: 1,
                    opacity: fadeAnimInput,
                    position: 'absolute',
                    left: 44,
                    right: 60,
                }}
            >
                {isEditing && (
                    <TextInput
                        style={styles.textInput}
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
                <TouchableOpacity onPress={() => dispatch(deleteTodo(todo.id))}>
                    <Icon name="trash-2" size={20} color="#ff7675" />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    editingContainer: {
        backgroundColor: '#EEEEEE',
    },
    text: {
        fontSize: 16,
        color: '#2d3436',
    },
    textCompleted: {
        textDecorationLine: 'line-through',
        color: '#b2bec3',
    },
    textInput: {
        fontSize: 16,
        color: '#2d3436',
        backgroundColor: '#EEEEEE',
        padding: 5,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderRadius: 4,
        borderColor: '#000',
        marginRight: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkmark: {
        width: 12,
        height: 12,
        backgroundColor: '#64d3c2',
        borderRadius: 2,
    },
});

export default TodoItem;
