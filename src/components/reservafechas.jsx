import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../assets/styles/reservafechas.css';

const RangoCalendario = () => {
  const [selectedDates, setSelectedDates] = useState([]); // Array de fechas seleccionadas
  const [dateRange, setDateRange] = useState(''); // Rango de fechas en texto
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Asegura que 'today' solo tenga la fecha sin horas

  const handleDateClick = (date) => {
    if (selectedDates.length < 2) {
      const newDates = [...selectedDates, date];
      setSelectedDates(newDates);

      // Si ya se han seleccionado dos fechas, crea el rango
      if (newDates.length === 2) {
        const formattedDates = newDates
          .map((date) => date.toLocaleDateString('es-ES'))
          .join(' / ');
        setDateRange(`(${formattedDates})`);
        sendDatesToBackend(newDates);
      }
    } else {
      // Si ya se seleccionaron dos fechas, reinicia
      setSelectedDates([date]);
      setDateRange('');
    }
  };

  const sendDatesToBackend = async (dates) => {
  try {
    const startDate = dates[0].toISOString().split('T')[0];
    const endDate = dates[1].toISOString().split('T')[0];

    const response = await fetch('http://localhost:5000/api/reservarFechas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ startDate, endDate }),
    });
    
    const data = await response.json();
    alert(data.message); // Mostrar mensaje de éxito o error
  } catch (error) {
    console.error('Error al reservar fechas:', error);
  }
  };
  // Función para resaltar fechas dentro del rango
  const tileClassName = ({ date }) => {
    if (selectedDates.length === 2) {
      const [startDate, endDate] = selectedDates;
      // Comprueba si la fecha está dentro del rango
      if (date >= startDate && date <= endDate) {
        return 'in-range'; // Aplica una clase 'in-range' para las fechas dentro del rango
      }
    }

    // Aplica la clase 'selected' solo a las fechas seleccionadas
    return selectedDates.some(
      (selectedDate) => selectedDate.toDateString() === date.toDateString()
    )
      ? 'selected'
      : null;
  };

  // Deshabilita las fechas antes de hoy o dentro del rango seleccionado
  const tileDisabled = ({ date }) => {
    date.setHours(0, 0, 0, 0); // Asegura que solo compare la fecha sin horas
    if (date < today) {
      return true;
    }
    if (selectedDates.length === 1 && date < selectedDates[0]) {
      return true;
    }
    return false;
  };

  return (
    <div>
      <Calendar
        onClickDay = {handleDateClick}
        tileClassName={tileClassName}
        tileDisabled={tileDisabled}
      />
      <input type="text" value={dateRange} readOnly />
    </div>
  );
};

export default RangoCalendario;
