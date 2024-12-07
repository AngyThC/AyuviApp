import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Layout from './_layout'; // Asegúrate de que esta ruta sea correcta

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Layout />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
