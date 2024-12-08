import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { API_ENDPOINT } from '@env'; // Importamos la variable de entorno
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }: { navigation: any }) {
  const [usuario, setUsuario] = useState('');
  const [contrasenia, setContrasenia] = useState('');

  const handleLogin = async () => {
    if (!usuario || !contrasenia) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    try {
    const response = await axios.post(`${API_ENDPOINT}/usuarios/login`, {
      usuario: usuario,
      contrasenia: contrasenia,
    });

    if (response.status === 200) {
      const { usuario, token } = response.data;
      await AsyncStorage.setItem('userId', String(usuario.idUsuario)); // Guarda el userId
      await AsyncStorage.setItem('token', token); // Guarda el token
      navigation.navigate('MainApp'); // Navega a la app principal
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    Alert.alert('Error', 'Credenciales incorrectas.');
  }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={usuario}
        onChangeText={setUsuario}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={contrasenia}
        onChangeText={setContrasenia}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
