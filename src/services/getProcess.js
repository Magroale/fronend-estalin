import axios from "axios";
import { API_URL, SECRET_KEY } from "./config.js";

export const obtenerProcesos = async (nombre , nombre_compania , status ) => {
    try {
        const params = new URLSearchParams();
      
        if (nombre) params.append("nombre", nombre);
        if (nombre_compania) params.append("nombre_compania", nombre_compania);
        if (status) params.append("status", status);

      const response = await axios.get(`${API_URL}/proceso/procesosFiltrados?${params.toString()}`, {
        headers: {
          Authorization: `${SECRET_KEY}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error obteniendo procesos:', error);
      throw error;
    }
  };