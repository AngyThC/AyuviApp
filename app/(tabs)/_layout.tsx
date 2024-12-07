import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Importa tus pantallas
import HomeScreen from '../screens/Home/HomeScreen';
import ExploreScreen from '../screens/Explore/ExploreScreen'; // Asegúrate de que existe esta pantalla

// Crear el Drawer Navigator
const Drawer = createDrawerNavigator();

export default function DrawerLayout() {
  return (
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#f8f8f8', // Fondo del sidebar
            width: 240, // Ancho del sidebar
          },
          headerShown: true, // Mostrar encabezado en las pantallas
        }}
      >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Página de Inicio',
          }}
        />
        <Drawer.Screen
          name="Explore"
          component={ExploreScreen}
          options={{
            title: 'Explorar',
          }}
        />
      </Drawer.Navigator>
  );
}
