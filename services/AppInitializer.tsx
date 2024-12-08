import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../services/apiClient';
import { useNavigation } from '@react-navigation/native';

const AppInitializer = () => {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        // Obtén el ID del usuario autenticado desde AsyncStorage
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) {
          throw new Error('ID de usuario no encontrado en AsyncStorage.');
        }

        // Solicita los usuarios activos desde el backend
        const response = await apiClient.get('/usuarios/activos');
        const loggedUser = response.data.find((user) => user.idUsuario === parseInt(userId));

        if (!loggedUser) {
          throw new Error('Usuario no encontrado en la lista de usuarios activos.');
        }

        // Verifica si necesita cambiar la contraseña
        if (loggedUser.changedPassword === 0) {
          Alert.alert(
            '¡Advertencia!',
            'Debes cambiar tu contraseña por primera vez para continuar.',
            [
              {
                text: 'Entendido',
                onPress: () => console.log('Alerta cerrada'),
              },
            ],
            { cancelable: false }
          );
        }

        // Si todo está bien, navega al layout principal
        navigation.navigate('MainApp');
      } catch (error) {
        console.error('Error al verificar el estado del usuario:', error);
        Alert.alert('Error', 'Ocurrió un error al verificar tu estado. Intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    checkUserStatus();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  return null;
};

export default AppInitializer;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
