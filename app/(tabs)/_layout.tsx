import React from 'react';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import HomeScreen from '../screens/Home/HomeScreen';
import ExploreScreen from '../screens/Explore/ExploreScreen';

const Drawer = createDrawerNavigator();

function CustomDrawerContent({ navigation }: DrawerContentComponentProps) {
  return (
    <View style={styles.drawerContent}>
    <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => {
          navigation.closeDrawer(); // Cierra el drawer primero
          setTimeout(() => navigation.navigate('Home Prueba'), 50); // Navega después
        }}
      >
        <Text style={styles.drawerText}>Página de Inicio</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => {
          navigation.closeDrawer(); // Cierra el drawer primero
          setTimeout(() => navigation.navigate('Explore'), 50); // Navega después
        }}
      >
        <Text style={styles.drawerText}>Explorar</Text>
      </TouchableOpacity>

    </View>
  );
}

export default function Layout() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Explore" component={ExploreScreen} />
    </Drawer.Navigator>
  );
}

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
