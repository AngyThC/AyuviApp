import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Importar las pantallas
import HomeScreen from './app/screens/Home/HomeScreen';
import AboutScreen from './app/screens/About/AboutScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Inicio"
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#fff',
            width: 240,
          },
        }}
      >
        <Drawer.Screen name="Inicio" component={HomeScreen} />
        <Drawer.Screen name="Acerca de Nosotros" component={AboutScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
