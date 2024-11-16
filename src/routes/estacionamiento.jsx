import React, { useState, useEffect } from "react";
import axios from "axios";
import CardTicket from "../components/CardTicket";
import styles from "../assets/styles/Estacionamiento.module.css";

const Estacionamiento = () => {
  const [parkingSpots, setParkingSpots] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSpot, setCurrentSpot] = useState(null);
  const [formData, setFormData] = useState({ plate: "", model: "", dueno: "" });

  // Obtener datos del backend
  useEffect(() => {
    const fetchParkingSpots = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/spots');
        setParkingSpots(response.data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    fetchParkingSpots();
  }, []);

  // Abrir el modal para editar
  const handleCardClick = (spot) => {
    setCurrentSpot(spot);
    setFormData({
      plate: spot.patenteH || "",
      model: spot.marcamodeloH || "",
      dueno: `${spot.nombreH} ${spot.apellidoH}` || "",
    });
    setIsModalOpen(true);
  };

  // Guardar los cambios en el backend
  const handleSave = async () => {
    if (currentSpot) {
      try {
        await axios.put(`http://localhost:5000/api/spots/${currentSpot.idEstacionamiento}`, {
          idHuesped: currentSpot.idHuesped,
          estado: 1,
        });
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error al guardar cambios:", error);
      }
    }
  };

  return (
    <div className={styles.estacionamientoContainer}>
      <h2>Estacionamiento</h2>
      <div className={styles.gridContainer}>
        {parkingSpots.map((spot) => (
          <div key={spot.idEstacionamiento} onClick={() => handleCardClick(spot)}>
            <CardTicket
              ticket={spot.estado === 1 ? "close" : "pending"}
              totalTickets={spot.espacio}
              text={
                spot.estado === 1
                  ? `${spot.patenteH} ${spot.marcamodeloH} ${spot.nombreH} ${spot.apellidoH}`
                  : "Libre"
              }
            />
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default Estacionamiento;
