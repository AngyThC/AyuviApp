import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../../../services/apiClient'; // Importa el cliente configurado

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiClient.get('/usuarios/activos'); // Realiza la solicitud con el cliente configurado
        const userId = await AsyncStorage.getItem('userId'); // Obtén el userId
        const loggedUser = response.data.find((user: any) => user.idUsuario === parseInt(userId!));

        if (loggedUser) {
          setUserData(loggedUser); // Guarda los datos del usuario
          
          // Verificar si la contraseña no ha sido cambiada
          if (loggedUser.changedPassword === 0) {
            Alert.alert(
              '¡Advertencia!',
              'Debes cambiar tu contraseña por primera vez para continuar.',
              [{ text: 'Entendido', onPress: () => console.log('Alerta cerrada') }],
              { cancelable: false }
            );
          }
        } else {
          setError('Usuario no encontrado.');
        }
      } catch (err) {
        console.error('Error al obtener los datos del usuario:', err);
        setError('Error al cargar los datos del usuario.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Usuario no encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileImageContainer}>
        <Image
          style={styles.profileImage}
          source={{ uri: 'https://via.placeholder.com/146' }} // URL ficticia, cámbiala si tienes una imagen
        />
      </View>
      <Text style={styles.userName}>{userData.persona.nombre || 'Nombre no disponible'}</Text>
      <Text style={styles.userLocation}>{userData.persona.domicilio || 'Ubicación no disponible'}</Text>
      <View style={styles.userInfoContainer}>
        <Text style={styles.infoText}>
          <Text style={styles.infoLabel}>Usuario: </Text>
          {userData.usuario}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.infoLabel}>Teléfono: </Text>
          {userData.persona.telefono || 'No disponible'}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.infoLabel}>Email: </Text>
          {userData.persona.correo || 'No disponible'}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.infoLabel}>Fecha de registro: </Text>
          {new Date(userData.persona.createdAt).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );
};

export default UserProfile;

// Estilos
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20, backgroundColor: '#f8f8f8' },
  profileImageContainer: { marginBottom: 20 },
  profileImage: { width: 146, height: 146, borderRadius: 73, backgroundColor: '#ccc' },
  userName: { fontSize: 24, fontWeight: 'bold', marginBottom: 5, color: '#333' },
  userLocation: { fontSize: 16, color: '#666', marginBottom: 20 },
  userInfoContainer: { width: '100%', padding: 15, backgroundColor: '#fff', borderRadius: 8, elevation: 2 },
  infoText: { fontSize: 16, marginBottom: 10 },
  infoLabel: { fontWeight: 'bold', color: '#333' },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  errorText: { fontSize: 16, color: '#ff0000', textAlign: 'center' },
});
