import axios from "axios";
import { API_URL, SECRET_KEY } from "./config.js";

// Función para iniciar sesión
export const IniciarSesion = async (username, password) => {
    try {
      const response = await axios.post(
        `${API_URL}/usuario/login`, // Asegúrate de que esta URL sea correcta para tu backend
        {
          nombre_usuario: username,
          contrasena:password,
        },
        {
          headers: {
            'Content-Type': 'application/json', // Asegúrate de especificar el tipo de contenido
            Authorization: `${SECRET_KEY}`, // Usando Basic Auth
          },
        }
      );
  
      return response.data; // Devuelve los datos de la respuesta
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error; // Re-lanzar el error para que el componente pueda manejarlo
    }
  };