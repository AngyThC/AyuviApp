import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { API_ENDPOINT } from '@env'; // Importamos la variable de entorno

export default function LoginScreen({ navigation }: { navigation: any }) {
  const [usuario, setUsuario] = useState(''); // El nombre de usuario
  const [contrasenia, setContrasenia] = useState(''); // La contraseña

  // Función para manejar el inicio de sesión
  const handleLogin = async () => {
    if (!usuario || !contrasenia) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    try {
      // Llamada a la API de login
      const response = await fetch(`${API_ENDPOINT}/usuarios/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario, contrasenia }),
      });

      const result = await response.json();

      if (response.ok) {
        // Si el login fue exitoso
        Alert.alert('¡Éxito!', 'Inicio de sesión exitoso');
        console.log(result);

        // Guarda el token o redirige a otra pantalla
        navigation.navigate('Home', { user: result.usuario }); // Cambia "Home" por la pantalla que corresponda
      } else {
        // Si hubo un error, muestra el mensaje del backend
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
