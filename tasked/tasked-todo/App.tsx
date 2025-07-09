import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import store from './redux/store';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
         <Stack.Screen
  name="Tasked"
  component={HomeScreen}
  options={{ headerShown: false }}
/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}