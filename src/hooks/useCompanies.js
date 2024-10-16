import { useEffect, useState } from 'react';
import {obtenerCompanias} from '../services/getAllCompanies.js';

const useCompanias = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await obtenerCompanias(); // Llama a la función para obtener las compañías
        setCompanies(data); // Actualiza el estado con los datos obtenidos
      } catch (err) {
        setError('Error al cargar las compañías'); // Maneja cualquier error
      } finally {
        setLoading(false); // Cambia el estado de carga a false
      }
    };

    fetchCompanies(); // Llama a la función fetchCompanies
  }, []); // El array vacío asegura que solo se ejecute al montar el hook

  return { companies, loading}; // Retorna el estado
};

export default useCompanias;
