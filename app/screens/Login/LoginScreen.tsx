import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { API_ENDPOINT } from '@env'; // Importamos la variable de entorno

export default function LoginScreen({ navigation }: { navigation: any }) {
  const [usuario, setUsuario] = useState('');
  const [contrasenia, setContrasenia] = useState('');

  const handleLogin = async () => {
    if (!usuario || !contrasenia) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    try {
      // Realizar la solicitud de login con Axios
      const response = await axios.post(`${API_ENDPOINT}/usuarios/login`, {
        usuario,
        contrasenia,
      });

      const result = response.data;

      // Redirigir al Drawer principal si el login es exitoso
      if (response.status === 200) {
        Alert.alert('¡Éxito!', 'Inicio de sesión exitoso');
        navigation.navigate('MainApp'); // Redirige al Drawer principal
      } else {
        Alert.alert('Error', result.message || 'Credenciales inválidas');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      Alert.alert('Error', 'Hubo un problema con la conexión al servidor');
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
