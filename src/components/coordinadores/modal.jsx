import useCompanias from "../../hooks/useCompanies";
import useUsuarioRol from "../../hooks/useUsuarioRol";
import "./coordinador.css";
import { useState } from "react";

export const Modal = () => {
  const { companies } = useCompanias();
  const { usuarios } = useUsuarioRol("Contador");
  const [estado, setEstado] = useState("Activo");
    const [selectedContador, setSelectedContador] = useState("");

  const [selectedCompany, setSelectedCompany] = useState("");
  const closeModal = () => setShowModal(false);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <h3>Añadir Proceso</h3>
          <form>
            <div className="form-group">
              <label>Seleccionar Contador:</label>
              <select
                value={selectedContador}
                onChange={(e) => setSelectedContador(e.target.value)}
                className="select-input"
              >
                <option value="">Seleccione un Contador</option>
                {usuarios.map((usuario) => (
                  <option key={usuario.id_usuario} value={usuario.id_usuario}>
                    {usuario.nombre_completo}
                  </option>
                ))}
              </select>
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
                  <option key={company.id_compania} value={company.id_compania}>
                    {company.nombre}
                  </option>
                ))}
              </select>
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
  );
};
