import { createContext, useState } from 'react';

// Crear el contexto
const AuthContext = createContext();

// Proveedor de contexto
const AuthProvider = ({ children }) => {
  const [auth, setAuth]= useState({
    apiKey: localStorage.getItem("apiKey"),
    userRol: localStorage.getItem("userRol")
  })

  const login = (data) => {
    localStorage.setItem("apiKey", data.apiKey);
    localStorage.setItem("userRol", data.usuarioRol);
    setAuth({ apiKey: data.apiKey, userRol: data.userRol });
  }

  const logout = () => {
    localStorage.removeItem("apiKey");
    localStorage.removeItem("userRol");
    setAuth({ apiKey: null, usuarioRol: null });
  }


  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
