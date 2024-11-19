import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardTicket from "../components/CardTicket";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import '../assets/styles/admin.css';  // Importa el archivo CSS


const Admin = () => {
  const [totalhuespedes, setTotalhuespedes] = useState(null);
  const [totalSolicitudes, setTotalSolicitudes] = useState(null);
  const [totalEmpleados, setTotalEmpleados] = useState(null);
  const [totalProductos, setTotalProductos] = useState(null);
  const [nhuesped, setNhuesped] = useState(null);
  const [totalestacionamiento, setTotalestacionamiento] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
      const obtenersolicitudes = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/contarsolicitudes");
          if (!response.ok) {
              throw new Error("Error al obtener los datos del servidor");
          }
          const data = await response.json();
          setTotalSolicitudes(data.totalSolicitudes);
        } catch (err) {
          console.error("Error al obtener el total de solicitudes:", err);
          setError("No se pudo obtener el total de solicitudes.");
        }
      };
      const obtenerTotalEmpleados = async () => {
          try {
              const response = await fetch("http://localhost:5000/api/contarempleados");
              if (!response.ok) {
                  throw new Error("Error al obtener los datos del servidor");
              }
              const data = await response.json();
              setTotalEmpleados(data.totalEmpleados);
          } catch (err) {
              console.error("Error al obtener el total de empleados:", err);
              setError("No se pudo obtener el total de empleados.");
          }
      };
      const obtenerTotalstock = async () => {
          try {
              const response = await fetch("http://localhost:5000/api/contarproducto");
              if (!response.ok) {
                  throw new Error("Error al obtener los datos del servidor");
              }
              const data = await response.json();
              setTotalProductos(data.totalProductos);
          } catch (err) {
              console.error("Error al obtener el total de stock:", err);
              setError("No se pudo obtener el total de stock.");
          }
      };
      const obtenerTotalestacionamiento = async () => {
          try {
              const response = await fetch("http://localhost:5000/api/contarestacionamiento");
              if (!response.ok) {
                  throw new Error("Error al obtener los datos del servidor");
              }
              const data = await response.json();
              setTotalestacionamiento(data.totalestacionamiento);
          } catch (err) {
              console.error("Error al obtener el total de estacionamiento:", err);
              setError("No se pudo obtener el total de estacionamiento.");
          }
      };
      const obtenerTotalhuesped = async () => {
          try {
              const response = await fetch("http://localhost:5000/api/contarhuesped");
              if (!response.ok) {
                  throw new Error("Error al obtener los datos del servidor");
              }
              const data = await response.json();
              setTotalhuespedes(data.totalhuespedes);
          } catch (err) {
              console.error("Error al obtener el total de huesped:", err);
              setError("No se pudo obtener el total de huesped.");
          }
      };

      
      const obtenernhuesped = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/nhuesped");
            if (!response.ok) {
                throw new Error("Error al obtener los datos del servidor");
            }
            const data = await response.json();
            setNhuesped(data.nhuesped);
        } catch (err) {
            console.error("Error al obtener el total de huesped:", err);
            setError("No se pudo obtener el total de huesped.");
        }
    };
      obtenersolicitudes();
      obtenerTotalEmpleados();
      obtenerTotalstock();
      obtenerTotalestacionamiento();
      obtenerTotalhuesped();//son las habitaciones
      
      obtenernhuesped();
  }, []);

  return (
    <div className="home-container">
      <div className="flex items-center justify-between mb-10">
        {/* Asegúrate de agregar contenido si es necesario */}
      </div>
      <div className="card-grid">
        <CardTicket
          ticket="Habitaciones"
          totalTickets="Habitaciones"
          text={totalhuespedes !== null ? totalhuespedes : "Cargando..."}
          Linkpagina="/admin/habitaciones"
        />
        <CardTicket
          ticket="Huespedes"
          totalTickets="Huespedes"
          text={totalhuespedes !== null ? totalhuespedes : "Cargando..."}
          Linkpagina="/admin/totalhuespedes"
        />
        <CardTicket
          ticket="Inventario"
          totalTickets="Inventario"
          text={totalProductos !== null ? totalProductos : "Cargando..."}
          Linkpagina="/admin/stock"
        />
        <CardTicket
          ticket="solicitudes pendientes"
          totalTickets="Solicitudes"
          text={totalSolicitudes !== null ? totalSolicitudes : "Cargando..."}
          Linkpagina="/admin/solicitudes"
        />
        <CardTicket
          ticket="solicitudes pendientes"
          totalTickets="Empleados"
          text={totalEmpleados !== null ? totalEmpleados : "Cargando..."}
          Linkpagina="/admin/empleados"/>

         <CardTicket
          ticket="estacionamiento"
          totalTickets="estacionamiento"
          text={totalestacionamiento !== null ? totalestacionamiento : "Cargando..."}
          Linkpagina="/admin/estacionamiento"
        />
      </div>
    </div>
  );
};

export default Admin;
