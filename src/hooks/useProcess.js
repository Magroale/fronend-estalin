import { useEffect, useState } from 'react';
import { obtenerProcesos } from '../services/getProcess.js';

const useProcess = (nombre = "", nombre_compania = "", status = "") => {
  const [procesos, setProcesos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Control para el debounce
  const [debouncedNombre, setDebouncedNombre] = useState(nombre);
  const [debouncedCompania, setDebouncedCompania] = useState(nombre_compania);
  const [debouncedStatus, setDebouncedStatus] = useState(status);

  // Debounce inputs
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedNombre(nombre);
      setDebouncedCompania(nombre_compania);
      setDebouncedStatus(status);
    }, 500); 

    return () => clearTimeout(handler);
  }, [nombre, nombre_compania, status]);

  // Fetch data
  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true); // Para mostrar loading mientras se carga
      try {
        const data = await obtenerProcesos(debouncedNombre, debouncedCompania, debouncedStatus);
        setProcesos(data.length ? data : []); // Asegura que el estado procesos se actualice
      } catch (err) {
        setError('Error al cargar las compañías'); 
        setProcesos([]); // Resetea el estado si ocurre un error
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies(); 
  }, [debouncedNombre, debouncedCompania, debouncedStatus]);

  return { procesos, loading, error };
};

export default useProcess;
