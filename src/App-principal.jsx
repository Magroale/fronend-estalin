// import RolGerente from "./components/listaGerentes.jsx";
import Login from "./components/login/login.jsx";
import {GerenteView} from "./components/gerentes/listaGerentes.jsx";
import Coordinador from './components/coordinadores/coordinadores.jsx';
import { ListaContadores } from "./components/contadores/contadores.jsx";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./components/protected-route.jsx";

const AppPrincipal = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/gerentes"
          element={
            <ProtectedRoute allowedRoles={["Gerente"]}>
              <GerenteView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/coordinadores"
          element={
            <ProtectedRoute>
              <ProtectedRoute allowedRoles={["Coordinador"]}>
                <Coordinador />
              </ProtectedRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/contadores"
          element={
            <ProtectedRoute>
              <ProtectedRoute allowedRoles={["Contador"]}>
                <ListaContadores />
              </ProtectedRoute>
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default AppPrincipal;
