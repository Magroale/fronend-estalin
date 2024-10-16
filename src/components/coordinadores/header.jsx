import imagen from "../../assets/ImagenMAG.jpg";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth-context.jsx";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import './coordinador.css';

export const Header = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const handleRegisterClick = () => {
    navigate("/Register"); // Navega a la página de registro de empleados
  };
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <header className="header">
      <div className="company-image">
        <img src={imagen} alt="Company Logo" className="small-logo" />
      </div>
      <div className="header-title">
        <h2>Bienvenido, lo que sea</h2>
      </div>
      {/* Botones de registro de nuevos empleados y cerrar sesión */}
      <div className="header-actions">
        <button
          className="register-button"
          onClick={handleRegisterClick}
          title="Registrar nuevo empleado"
        >
          <FaUser size={24} /> {/* Ícono de añadir empleado */}
        </button>
      </div>
      <div className="header-actions">
        <button className="logout-button" onClick={handleLogout}>
          <FaSignOutAlt size={24} />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </header>
  );
};
