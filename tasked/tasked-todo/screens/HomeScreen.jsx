import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TextInput,
    Pressable,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodo,
    setTodos,
} from '../redux/todosSlice';
import { loadInitialTodos } from '../redux/todosSlice';
import TodoItem from '../components/TodoItem';
import uuid from 'react-native-uuid';

export default function HomeScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [input, setInput] = useState('');
    const todos = useSelector((state) => state.todos);
    const dispatch = useDispatch();

    useEffect(() => {
        loadInitialTodos().then((initial) => {
            dispatch(setTodos(initial));
        });
    }, []);

    const handleAdd = () => {
        if (input.trim()) {
            dispatch(
                addTodo({
                    id: uuid.v4(),
                    title: input.trim(),
                    completed: false,
                })
            );
            setInput('');
            setModalVisible(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>tasked</Text>

            <FlatList
                data={todos}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
                renderItem={({ item }) => (
                    <TodoItem
                        todo={item}
                        onToggle={() => dispatch(toggleTodo(item.id))}
                        onDelete={() => dispatch(deleteTodo(item.id))}
                        onEdit={(newTitle) =>
                            dispatch(editTodo({ id: item.id, title: newTitle }))
                        }
                    />
                )}
            />

            <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>

            <Modal animationType="slide" transparent={true} visible={modalVisible}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <TextInput
                            placeholder="Enter task"
                            style={styles.modalInput}
                            value={input}
                            onChangeText={setInput}
                        />
                        <Pressable style={styles.modalButton} onPress={handleAdd}>
                            <Text style={styles.modalButtonText}>Add Task</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 84,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        lineHeight: 32,
        letterSpacing: -0.41,
        marginBottom: 24,
        fontFamily: 'TT Firs Neue',
    },
    listContainer: {
        paddingBottom: 100,
    },
    fab: {
        position: 'absolute',
        bottom: 32,
        right: 32,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#51ACB4',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 5,
    },
    fabText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    modalBackground: {
        flex: 1,
        backgroundColor: '#00000088',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 12,
        elevation: 5,
    },
    modalInput: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        marginBottom: 12,
        fontSize: 16,
        padding: 8,
    },
    modalButton: {
        backgroundColor: '#000',
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 8,
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});