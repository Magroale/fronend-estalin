import axios from "axios";
import { API_URL, SECRET_KEY } from "./config.js";

export const updateCoordinador = async (procesoData) => {
  try {
    const response = await axios.post(
      `${API_URL}/coordinador/actualizarCoordinador/${id}`,
      procesoData, // Enviar los datos del proceso aquí
      {
        headers: {
          Authorization: `${SECRET_KEY}`,
          'Content-Type': 'application/json', // Asegurarse de que se envía JSON
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creando el proceso:', error);
    throw error;
  }
};