import React from 'react';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import HomeScreen from '../screens/Home/HomeScreen';
import ExploreScreen from '../screens/Explore/ExploreScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import UserProfile from '../screens/UserProfile/UserProfile';

// Crear instancias de navegadores
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// Contenido personalizado del Drawer
function CustomDrawerContent({ navigation }: DrawerContentComponentProps) {
  return (
    <View style={styles.drawerContent}>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => {
          navigation.closeDrawer();
          setTimeout(() => navigation.navigate('Home'), 50);
        }}
      >
        <Text style={styles.drawerText}>Página de Inicio</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => {
          navigation.closeDrawer();
          setTimeout(() => navigation.navigate('Explore'), 50);
        }}
      >
        <Text style={styles.drawerText}>Explorar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => {
          navigation.closeDrawer();
          setTimeout(() => navigation.navigate('MyProfile'), 50);
        }}
      >
        <Text style={styles.drawerText}>Mi perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

// Drawer Navigator para las pantallas principales
function DrawerLayout() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Explore" component={ExploreScreen} />
      <Drawer.Screen name="MyProfile" component={UserProfile} />
    </Drawer.Navigator>
  );
}

// Stack Navigator para manejar Login y el Drawer
export default function Layout() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Pantalla de Login en pantalla completa */}
      <Stack.Screen name="Login" component={LoginScreen} />
      {/* Drawer principal con las pantallas principales */}
      <Stack.Screen name="MainApp" component={DrawerLayout} />
    </Stack.Navigator>
  );
}

// Estilos personalizados
const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingVertical: 50,
    paddingHorizontal: 10,
    backgroundColor: '#282828',
  },
  drawerItem: {
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 5,
  },
  drawerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
});
