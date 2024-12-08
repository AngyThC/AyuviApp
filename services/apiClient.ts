import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_ENDPOINT } from '@env';

// Crea una instancia de Axios
const apiClient = axios.create({
  baseURL: API_ENDPOINT, // Usa la base URL de tu backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir el token en las solicitudes
apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token'); // Obtén el token de AsyncStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Añade el token al encabezado
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
