import axios from "axios";
import { API_URL, SECRET_KEY } from "./config.js";

export const obtenerCompanias = async () => {
    try {
      const response = await axios.get(`${API_URL}/compania/allCompanias`, {
        headers: {
          Authorization: `${SECRET_KEY}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error obteniendo el rol de Gerente:', error);
      throw error;
    }
  };