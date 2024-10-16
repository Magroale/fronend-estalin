import { useState } from "react";
import { Header } from "./header.jsx";
import Calendar from "react-calendar";
import { FaPlusCircle } from "react-icons/fa";
import useCompanias from "../../hooks/useCompanies";
import useProcess from "../../hooks/useProcess";
// import useUsuarioRol from "../../hooks/useUsuarioRol";
import "./coordinador.css";
import { asignarProceso } from '../../services/postProcess.js';

function Coordinador() {
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [nombreProceso, setNombreProceso] = useState("");
  const [descripcionProceso, setDescripcionProceso] = useState("");
  const [fechaEntrega, setFechaEntrega] = useState("");

  const { companies } = useCompanias();
  // const { usuarios } = useUsuarioRol("Contador");

  const [selectedCompany, setSelectedCompany] = useState("");
  const [estado, setEstado] = useState("Activo");

  const [contadorFilter, setContadorFilter] = useState("");
  const [companiaFilter, setCompaniaFilter] = useState("");
  const [estadoFilter, setEstadoFilter] = useState("");

  const { procesos, loading } = useProcess(contadorFilter, companiaFilter, estadoFilter);

  const openModal = () => setShowModal(true);

  const closeModal = () => setShowModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar el comportamiento por defecto del formulario (recarga de la página)

    // Validación simple
    if (!nombreProceso || !selectedCompany || !fechaEntrega || !descripcionProceso) {
      alert('Por favor, rellena todos los campos');
      return;
    }

    // Crear el objeto con los datos del proceso
    const procesoData = {
      id_fk_compania: selectedCompany,
      nombre_proceso: nombreProceso,
      fecha_carga: new Date().toISOString().split('T')[0], // Fecha actual
      status: estado,
      descripcion: descripcionProceso,
      fecha_entrega: fechaEntrega,
    };

    try {
      // Llamar a la función asignarProceso
      const result = await asignarProceso(procesoData);
      console.log('Proceso creado:', result);
      alert('Proceso creado exitosamente');
      closeModal(); // Cerrar el modal después de crear el proceso
    } catch (error) {
      console.error('Error al crear el proceso:', error);
      alert('Error al crear el proceso');
    }
  };

  console.log(companies);
  return (
    <div className="coordinador-container">
      <Header />
      <main className="main">
        <section className="left-section">
          <h2>Lista de procesos</h2>
          <div className="individual-percentage-section">
            <div
              className="fixed-headers"
              style={{ position: "sticky", top: 0 }}
            >
              <table className="individual-performance">
                <thead>
                  <tr>
                    <th>Proceso</th>
                    <th>
                      <input
                        type="text"
                        placeholder="Filtrar por Contador"
                        value={contadorFilter}
                        onChange={(e) => setContadorFilter(e.target.value)} // Actualiza el filtro de contador
                        className="filter-input"
                      />
                    </th>
                    <th>
                      <input
                        type="text"
                        placeholder="Filtrar por Compañía"
                        value={companiaFilter}
                        onChange={(e) => setCompaniaFilter(e.target.value)} // Actualiza el filtro de compañía
                        className="filter-input"
                      />
                    </th>
                    <th>
                      <input
                        type="text"
                        placeholder="Filtrar por Estado"
                        value={estadoFilter}
                        onChange={(e) => setEstadoFilter(e.target.value)} // Actualiza el filtro de estado
                        className="filter-input"
                      />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="4">Cargando...</td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan="4">{error}</td>
                    </tr>
                  ) : procesos.length > 0 ? (
                    procesos.map((proceso) => (
                      <tr key={proceso.id_proceso}>
                        <td>{proceso.nombre_proceso}</td>
                        <td>
                          {
                            proceso.Companium?.Contador?.Usuario
                              ?.nombre_completo
                          }
                        </td>
                        <td>{proceso.Companium?.nombre}</td>
                        <td>{proceso.status}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">No se encontraron procesos</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="right-section">
          <div className="calendar-section">
            <h2>Fecha de entregas importantes</h2>
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              calendarContainerClassName="small-calendar"
            />
          </div>
          <div className="file-upload-section add-process-section">
            <h2>Añadir Proceso</h2>
            <div className="upload-image">
              <button onClick={openModal}>
                <FaPlusCircle size={50} color="#6a5acd" />
              </button>
            </div>
          </div>
        </section>
      </main>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-content">
              <h3>Añadir Proceso</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Nombre del Proceso:</label>
                  <input
                    type="text"
                    placeholder="Nombre del Proceso"
                    value={nombreProceso}
                    onChange={(e) => setNombreProceso(e.target.value)}
                    className="select-input"
                  />
                </div>

                <div className="form-group">
                  <label>Seleccionar Compañía:</label>
                  <select
                    value={selectedCompany}
                    onChange={(e) => setSelectedCompany(e.target.value)}
                    className="select-input"
                  >
                    <option value="">Seleccione una Compañía</option>
                    {companies.map((company) => (
                      <option
                        key={company.id_compania}
                        value={company.id_compania}
                      >
                        {company.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                    <label>Fecha de Entrega:</label>
                    <input
                      type="date"
                      placeholder="Fecha de Entrega"
                      value={fechaEntrega}
                      onChange={(e) => setFechaEntrega(e.target.value)}
                      className="select-input"
                    />
                </div>

                <div className="form-group">
                  <label>Estado del Proceso:</label>
                  <select
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                    className="select-input"
                  >
                    <option value="Activo">Activo</option>
                    <option value="En Proceso">En Proceso</option>
                    <option value="Revisión">Revisión</option>
                    <option value="Finalizado">Finalizado</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Descripción del Proceso:</label>
                  <textarea
                    type="text"
                    placeholder="Descripción del Proceso"
                    value={descripcionProceso}
                    onChange={(e) => setDescripcionProceso(e.target.value)}
                    className="select-input"
                  />
                </div>

                <div className="button-group">
                  <button type="submit" className="modal-button add-button">
                    Añadir
                  </button>
                  <button
                    type="button"
                    className="modal-button cancel-button"
                    onClick={closeModal}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Coordinador;
