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
  const fetchParkingSpots = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/spots");
      setParkingSpots(response.data);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  useEffect(() => {
    fetchParkingSpots();
  }, []);

  // Abrir el modal para editar
  const handleCardClick = (spot) => {
    setCurrentSpot(spot);
    setFormData({
      plate: spot.patenteH || "",
      model: spot.marcamodeloH || "",
      dueno: `${spot.nombreH ?? ""} ${spot.apellidoH ?? ""}`.trim(),
    });
    setIsModalOpen(true);
  };

  // Guardar los cambios en el backend
  const handleSave = async () => {
    if (currentSpot) {
      try {
        await axios.put(
          `http://localhost:5000/api/spots/${currentSpot.idEstacionamiento}`,
          {
            idHuesped: currentSpot.idHuesped,
            estado: 1, // Marcar el lugar como ocupado
          }
        );
        setIsModalOpen(false);
        fetchParkingSpots(); // Actualizar datos después de guardar
      } catch (error) {
        console.error("Error al guardar cambios:", error);
      }
    }
  };

  // Cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentSpot(null);
  };

  return (
    <div className={styles.estacionamientoContainer}>
      <h2>Estacionamiento</h2>
      <div className={styles.gridContainer}>
        {parkingSpots.map((spot) => (
          <div
            key={spot.idEstacionamiento}
            onClick={() => handleCardClick(spot)}
          >
            <CardTicket
              ticket={spot.estado === 1 ? "close" : "pending"}
              totalTickets={spot.idEstacionamiento && spot.marcamodeloH}
              plate={spot.patenteH ? spot.patenteH : "Disponible"}
              model={spot.marcamodeloH ? spot.marcamodeloH : "N/A"}
              text={
                spot.nombreH && spot.apellidoH && spot.marcamodeloH
                  ? `${spot.nombreH} ${spot.apellidoH}`
                  : "disponible"
              }
              isOccupied={spot.estado === 1}
            />
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button onClick={closeModal}>Cerrar</button>
            
            <div>
              <h3>Patente: {formData.plate}</h3>
              <h3>Modelo: {formData.model}</h3>
              <h3>Dueño: {formData.dueno}</h3>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default Estacionamiento;
