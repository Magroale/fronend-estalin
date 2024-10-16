import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import  AppPrincipal  from "./App-principal";
import { AuthProvider } from "./components/auth-context";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <AppPrincipal />
    </AuthProvider>
  </StrictMode>
);
