import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Importa los estilos de Leaflet
import '../assets/styles/mapa.css'; // Opcional: si quieres personalizar los estilos del mapa
import { Imagen14 } from '../assets/imagenes/img-js/imgs.js';
const Map = () => {
  useEffect(() => {
    // Inicializa el mapa
    const map = L.map('map').setView([-26.594043479158344, -65.92142971494846], 15);

    // Añade la capa de los tiles
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Contenido HTML para el popup
    const popupContent = `
      <div style="text-align: center;">
        <h4><strong>Hostal Samay Kiti</strong></h4>
        <img src="${Imagen14}" alt="Descripción de la imagen" style="width: 100%; height: auto;"/>
        <p style="font-size: 14px; font-weight: normal;">Hipolito Irigoyen s/n</p>
      </div>
    `;

    // Añade un marcador con el popup
    L.marker([-26.594043479158344, -65.92142971494846]).addTo(map)
      .bindPopup(popupContent)
      .openPopup();

    // Limpia el mapa al desmontar el componente
    return () => {
      map.remove();
    };
  }, []);

  return (
    <div id="map" style={{ height: '400px', width: '100%' }}></div>
  );
};

export default Map;