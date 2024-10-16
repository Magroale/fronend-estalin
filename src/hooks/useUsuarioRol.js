import { useEffect, useState } from 'react';
import {obtenerUsuarioRol} from '../services/getUsuarioByRol.js';

const useCompanias = (rol) => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await obtenerUsuarioRol(rol); // Llama a la función para obtener las compañías
        setUsuarios(data); // Actualiza el estado con los datos obtenidos
      } catch (err) {
        setError('Error al cargar las compañías'); // Maneja cualquier error
      } finally {
        setLoading(false); // Cambia el estado de carga a false
      }
    };

    fetchCompanies(); // Llama a la función fetchCompanies
  }, [rol]); // El array vacío asegura que solo se ejecute al montar el hook

  return { usuarios, loading}; // Retorna el estado
};

export default useCompanias;
