import { useState } from "react";
import Calendar from "react-calendar";
import { FaPlusCircle } from "react-icons/fa";
import useCompanias from "../../hooks/useCompanies";
import useProcess from "../../hooks/useProcess";
// import useUsuarioRol from "../../hooks/useUsuarioRol";
import "./gerente.css";
import { createCoordinador } from '../../services/postCoordinador.js';
import { createContador } from "../../services/postContador.js";
import { createCompania } from "../../services/postCompanies.js";
import { deleteCoordinador } from "../../services/deleteCoordinador.js";
import { deleteContador } from "../../services/deleteContador.js";
import { deleteCompania } from "../../services/deleteCompanies.js";
import { updateCoordinador } from "../../services/updateCoordinador.js";
import { updateContador } from "../../services/updateContador.js";

function Gerente() {
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [nombreUsuario, setNombreUsuario] = useState("");
    const [nombreCompleto, setNombreCompleto] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [rol, setRol] = useState("");
    const [email, setEmail] = useState("");
    const [nombre, setNombre] = useState("");
    const [nit, setNit] = useState("");
    const [ultimoDigito, setUltimoDigito] = useState("");
    const [id_compania, setId_compania] = useState("");
    const [idCoordinador, setIdCoordinador] = useState("");
    const [idContador, setIdContador] = useState("");

    const [selectedCompany, setSelectedCompany] = useState("");
    const [estado, setEstado] = useState("Activo");

    const [coordinadorFilter, setCoordinadorFilter] = useState("");
    const [contadorFilter, setContadorFilter] = useState("");
    const [companiaFilter, setCompaniaFilter] = useState("");
    const [estadoFilter, setEstadoFilter] = useState("");
    const { procesos, loading } = useProcess(coordinadorFilter, contadorFilter, companiaFilter, estadoFilter);

    // handlers

    const handleSubmitCrearCoordinador = async (e) => {
        e.preventDefault(); // Evitar el comportamiento por defecto del formulario (recarga de la página)

        // Validación simple
        if (!nombreUsuario || !nombreCompleto || !contrasena || !rol || !email) {
            alert('Por favor, rellena todos los campos');
            return;
        }

        const procesoData = {
            nombreUsuario: nombre_usuario,
            nombreCompleto: nombre_completo,
            contrasena,
            rol,
            email,
        };

        try {
            // Llamar a la función CreateCoordinador
            const result = await createCoordinador(procesoData);
            console.log('Coordinador creado:', result);
            alert('Coordinador creado exitosamente');
            closeModal(); // Cerrar el modal después de crear el proceso
        } catch (error) {
            console.error('Error al crear coordinador:', error);
            alert('Error al crear el coordinador');
        }
    };
    const handleSubmitCrearContador = async (e) => {
        e.preventDefault(); // Evitar el comportamiento por defecto del formulario (recarga de la página)

        // Validación simple
        if (!nombreUsuario || !nombreCompleto || !contrasena || !rol || !email) {
            alert('Por favor, rellena todos los campos');
            return;
        }

        const procesoData = {
            nombreUsuario: nombre_usuario,
            nombreCompleto: nombre_completo,
            contrasena,
            rol,
            email,
        }

        try {
            // Llamar a la función createContador
            const result = await createContador(procesoData);
            console.log('Contador creado:', result);
            alert('Contador creado exitosamente');
            closeModal(); // Cerrar el modal después de crear el proceso
        } catch (error) {
            console.error('Error al crear Contador:', error);
            alert('Error al crear el Contador');
        }
    };
    const handleSubmitCrearCompania = async (e) => {
        e.preventDefault(); // Evitar el comportamiento por defecto del formulario (recarga de la página)

        if (!nombre || !nit || !ultimoDigito) {
            alert('Por favor, escribe el nombre de usuario');
            return;
        }

        const procesoData = {
            nombre,
            nit,
            ultimoDigito: ultimo_digito,
        }

        try {
            // Llamar a la función createCompania
            const result = await createCompania(procesoData);
            console.log('Compañía creada:', result);
            alert('Compañía creada exitosamente');
            closeModal(); // Cerrar el modal después de crear el proceso
        } catch (error) {
            console.error('Error al crear la compañía:', error);
            alert('Error al crear la compañía');
        }


    };
    const handleSubmitDeleteCoordinador = async (e) => {
        e.preventDefault(); // Evitar el comportamiento por defecto del formulario (recarga de la página)

        // Validación simple
        if (!nombreUsuario || !rol) {
            alert('Por favor, escribe el nombre de usuario');
            return;
        }

        const procesoData = {
            nombreUsuario: nombre_usuario,
            rol,
        }
        try {
            // Llamar a la función deleteCoordinador
            const result = await deleteCoordinador(procesoData);
            console.log('Coordinador borrado:', result);
            alert('Coordinador borrado exitosamente');
            closeModal(); // Cerrar el modal después de crear el proceso
        } catch (error) {
            console.error('Error al borrar el coordinador:', error);
            alert('Error al borrar el coordinador');
        }
    };
    const handleSubmitDeleteContador = async (e) => {
        e.preventDefault(); // Evitar el comportamiento por defecto del formulario (recarga de la página)

        // Validación simple
        if (!nombreUsuario || !rol) {
            alert('Por favor, escribe el nombre de usuario');
            return;
        }

        const procesoData = {
            nombreUsuario: nombre_usuario,
            rol,
        }
        try {
            // Llamar a la función deleteCoordinador
            const result = await deleteContador(procesoData);
            console.log('Contador borrado:', result);
            alert('Contador borrado exitosamente');
            closeModal(); // Cerrar el modal después de crear el proceso
        } catch (error) {
            console.error('Error al borrar el contador:', error);
            alert('Error al borrar el contador');
        }

    }
    const handleSubmitDeleteCompania = async (e) => {
        e.preventDefault(); // Evitar el comportamiento por defecto del formulario (recarga de la página)

        // Validación simple
        if (!id_compania) {
            alert('Por favor, escribe el ID de la compañía');
            return;

        }

        const procesoData = {
            id_compania,
        }

        try {
            // Llamar a la función deleteCoordinador
            const result = await deleteCompania(procesoData);
            console.log('Compañía borrada:', result);
            alert('Compañía borrada exitosamente');
            closeModal(); // Cerrar el modal después de crear el proceso
        } catch (error) {
        }




    }
    const handleSubmitUpdateCoordinador = async (e) => {
        e.preventDefault(); // Evitar el comportamiento por defecto del formulario (recarga de la página)

        if (!idCoordinador) {
            alert('Por favor, escribe el ID de la compañía');
            return;
        }

        const procesoData = {
            idCoordinador: id,
            nombreUsuario: nombre_usuario,
            nombreCompleto: nombre_completo,
            contrasena,
            email,
        }

        try {
            // Llamar a la función updateCoordinador
            const result = await updateCoordinador(procesoData);
            console.log('Coordinador actualizado:', result);
            alert('Coordinador actualizado exitosamente');
            closeModal(); // Cerrar el modal después de crear el proceso
        } catch (error) {
            console.error('Error al actualizar el coordinador:', error);
            alert('Error al actualizar el coordinador');

        }
    }
    const handleSubmitUpdateContador = async (e) => {
        e.preventDefault(); // Evitar el comportamiento por defecto del formulario (recarga de la página)

        if (!idContador) {
            alert('Por favor, escribe el ID del contador');
            return;
        }

        const procesoData = {
            idContador: id,
            nombreUsuario: nombre_usuario,
            nombreCompleto: nombre_completo,
            contrasena,
            email,
        }

        try {
            // Llamar a la función updateCoordinador
            const result = await updateContador(procesoData);
            console.log('Contador actualizado:', result);
            alert('Contador actualizado exitosamente');
            closeModal(); // Cerrar el modal después de crear el proceso
        } catch (error) {
            console.error('Error al actualizar el Contador:', error);
            alert('Error al actualizar el Contador');

        }
    }
    const handleSubmitUpdateCompania = async (e) => {
        e.preventDefault(); // Evitar el comportamiento por defecto del formulario (recarga de la página)

        if (!idCompania) {
            alert('Por favor, escribe el ID de la compañía');
            return;

        }

        const procesoData = {
            idCompania: id,
            nombre,
            nit,
            ultimoDigito: ultimo_digito
        }
        
        try {
            // Llamar a la función updateCompania
            const result = await updateCompania(procesoData);
            console.log('Compania actualizada:', result);
            alert('Compania actualizada exitosamente');
            closeModal(); // Cerrar el modal después de crear el proceso
        } catch (error) {
            console.error('Error al actualizar la Compania:', error);
            alert('Error al actualizar la Compania');

        }
    }
}