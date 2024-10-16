import { useEffect, useState, useContext } from "react";
import { IniciarSesion } from "../../services/login";
import { AuthContext } from "../auth-context"; 
import { useNavigate } from "react-router-dom";
// import video from "../../assets/video.mp4";
// import imagen from "../../assets/ImagenMAG.jpg";
// import { FaUserShield } from "react-icons/fa";
// import { BsFillShieldLockFill } from "react-icons/bs";
// import { AiOutlineSwapRight } from "react-icons/ai";
import "./login.css";
import { RiLockPasswordFill} from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";

const Login = () => {
  const { auth, login } = useContext(AuthContext); 
  const [nombre_usuario, setNombreUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const [showMessage, setShowMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await IniciarSesion(nombre_usuario, contrasena);
      login(data);
      console.log("data:", data);
      switch (data.usuarioRol) {
        case "Gerente":
          navigate("/gerentes");
          break;
        case "Coordinador":
          navigate("/coordinadores");
          break;
        case "Contador":
          navigate("/contadores");
          break;
        default:
          navigate("/login");
      }
    } catch (err) {
      setShowMessage("Credenciales incorrectas. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  // Efecto para redirigir si ya hay una sesión activa
  useEffect(() => {
    const { apiKey, userRol } = auth; // Extraemos apiKey y userRol
    if (apiKey) {
      switch (userRol) {
        case "Gerente":
          navigate("/gerentes");
          break;
        case "Coordinador":
          navigate("/coordinadores");
          break;
        case "Contador":
          navigate("/contadores");
          break;
        default:
          navigate("/login");
      }
    }
  }, [auth.apiKey, auth.userRol, navigate]);

  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <form className="login" onSubmit={handleSubmit}>
            <div className="login__field">
              <FaUserAlt className="login__icon"/>
              <input
                type="text"
                id="nombre_usuario"
                value={nombre_usuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
                required
                placeholder="Nombre de Usuario"
                className="login__input"
              />
            </div>
            <div className="login__field">
              <RiLockPasswordFill className="login__icon"/>
              <input
              className="login__input"
                type="password"
                id="contrasena"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
                placeholder="Contraseña"
              />
            </div>
            <button className="button login__submit">
              <span className="button__text">{loading ? "Iniciando..." : "Iniciar Sesión"}</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
          </form>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
};

export default Login;
