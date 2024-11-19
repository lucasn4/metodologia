import { Checkbox } from '@headlessui/react';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/solicitud.css';

export const solicitudes = () => {
    
  const [solicitudes, setSolicitudes] = useState([]);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null); // Estado para almacenar la solicitud seleccionada
  const [habitacionSeleccionada, setHabitacionSeleccionada] = useState([]); // Estado para las habitaciones seleccionadas
  const [successMessage, setSuccessMessage] = useState('');
  const obtenerSolicitudes = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/cargarsolicitudes');
      if (!response.ok) {
        throw new Error('Error al obtener los datos del servidor');
      }
      const data = await response.json();
      setSolicitudes(data);
      console.log(data);
    } catch (error) {
      console.error('Error al obtener las solicitudes:', error);
    }
  };

  useEffect(() => {
    
    obtenerSolicitudes();
  }, []);

  const handleAccionClick = (solicitud) => {
    setSelectedSolicitud(solicitud); // Actualiza el estado con los datos de la solicitud seleccionada
    setHabitacionSeleccionada([]); // Restablece la selección de habitaciones al seleccionar una nueva solicitud
  };

  const handleHabitacionClick = (index) => {
    const updatedSelection = [...habitacionSeleccionada];
    if (updatedSelection.includes(index)) {
      // Si la habitación ya está seleccionada, la deseleccionamos
      setHabitacionSeleccionada(updatedSelection.filter((hab) => hab !== index));
    } else if (updatedSelection.length < selectedSolicitud.nhabitaciones) {
      // Si aún no hemos seleccionado el número máximo de habitaciones
      updatedSelection.push(index);
      setHabitacionSeleccionada(updatedSelection);
    }
    console.log(`Habitación ${index} seleccionada`);
  };

  const enviar = async (e) => {
      e.preventDefault();
      try {
          console.log(selectedSolicitud);
          console.log(habitacionSeleccionada);
          const response = await fetch("http://localhost:5000/api/enviarahuesped", {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({...selectedSolicitud,habitacionSeleccionada}),
          });
  
          if (response.ok) {
              const data = await response.json();
              setSuccessMessage('Se ha registrado un huesped con éxito'); 
              setTimeout(() => setSuccessMessage(''), 3000); // El mensaje desaparecerá después de 3 segundos
              setSelectedSolicitud([]);
              borrarsolicitudes();
              setSelectedSolicitud(null); // Restablecer la solicitud seleccionada
          } else {
              console.error('Error al enviar los datos');
          }
      } catch (error) {
          console.error('Error en la solicitud:', error);
      }
    };

    const borrarsolicitudes = async () => {
      try {
        // Asegurarse de que el ID del empleado esté presente antes de enviar la solicitud
        if (!selectedSolicitud.idsolicitudes) {
          setErrorMensaje('Por favor ingrese un ID de solicitudes para borrar.');
          return;
        }
    
        // Enviar la solicitud DELETE para eliminar el empleado
        const response = await fetch(`http://localhost:5000/api/borrarsolicitud/${selectedSolicitud.idsolicitudes}`, {
          method: 'DELETE',
        });
    
        if (response.ok) {
          const data = await response.json();
          obtenerSolicitudes();
          setSelectedSolicitud(null); // Restablecer la solicitud seleccionada
          // Recargar la lista de empleados después de la eliminación
        } else {
          // Si hubo un error en la solicitud, mostrar el mensaje de error
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };
  return (
    <>
      <div>
        <h3>Lista de Solicitudes</h3>
        <table border="1" cellPadding="10" cellSpacing="0" style={{ marginTop: "20px", width: "100%", marginBottom: "20px" }}>
          <thead>
            <tr>
              <th>idSolicitudes</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Telefono</th>
              <th>Email</th>
              <th>Vehiculo (si/no)</th>
              <th>Tipo Vehiculo</th>
              <th>Marca/Modelo</th>
              <th>Color</th>
              <th>Patente</th>
              <th>N° Habitaciones deseadas</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.map((solicitud, index) => (
              <tr key={index} style={{ marginBottom: '10px' }}>
                <td>{solicitud.idsolicitudes}</td>
                <td>{solicitud.nombreH}</td>
                <td>{solicitud.apellidoH}</td>
                <td>{solicitud.telefonoH}</td>
                <td>{solicitud.emailH}</td>
                <td>{solicitud.vehiculoH}</td>
                <td>{solicitud.tipoH}</td>
                <td>{solicitud.marcamodeloH}</td>
                <td>{solicitud.colorH}</td>
                <td>{solicitud.patenteH}</td>
                <td>{solicitud.nhabitaciones}</td>
                <td>
                  <button onClick={() => handleAccionClick(solicitud)}>Acciones</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedSolicitud && (
          <>
            <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px', display: 'flex', gap: '20px' }}>
              {/* Información de la solicitud */}
              <div>
                <h4>Datos de la Solicitud Seleccionada:</h4>
                <p><strong>idSolicitudes:</strong> {selectedSolicitud.idsolicitudes}</p>
                <p><strong>Nombre:</strong> {selectedSolicitud.nombreH}</p>
                <p><strong>Apellido:</strong> {selectedSolicitud.apellidoH}</p>
                <p><strong>Teléfono:</strong> {selectedSolicitud.telefonoH}</p>
                <p><strong>Email:</strong> {selectedSolicitud.emailH}</p>
                <p><strong>Vehículo:</strong> {selectedSolicitud.vehiculoH}</p>
                <p><strong>Tipo Vehículo:</strong> {selectedSolicitud.tipoH}</p>
                <p><strong>Marca/Modelo:</strong> {selectedSolicitud.marcamodeloH}</p>
                <p><strong>Color:</strong> {selectedSolicitud.colorH}</p>
                <p><strong>Patente:</strong> {selectedSolicitud.patenteH}</p>
              </div>

              {/* Sección de selección de habitaciones */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <p style={{ fontSize: '18px', marginBottom: '10px' }}>Seleccione {selectedSolicitud.nhabitaciones} habitaciones</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 40px)', gap: '10px' }}>
                  {Array.from({ length: 7 }).map((_, index) => (
                    <button
                      key={index}
                      className='habitacion-boton'
                      onClick={() => handleHabitacionClick(index + 1)}
                      style={{
                        backgroundColor: habitacionSeleccionada.includes(index + 1) ? 'lightblue' : 'lightgray',
                        height: '50px',
                        pointerEvents: habitacionSeleccionada.length >= selectedSolicitud.nhabitaciones && !habitacionSeleccionada.includes(index + 1) ? 'none' : 'auto',
                      }}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>

              {habitacionSeleccionada.length === selectedSolicitud.nhabitaciones && (
                <div style={{ marginTop: '20px' }}>
                  <button onClick={enviar} style={{ marginRight: '10px' }}>Aprobar</button>
                  <button  onClick={borrarsolicitudes}style={{ marginRight: '10px' }}>Rechazar</button>
                
                </div>
              )}
            </div>
          </>
        )}
        {successMessage && <p style={{ color: 'green', marginTop: '2%', backgroundColor: 'lightgreen' }}>{successMessage}</p>}
      </div>
      <Link to="/admin" className='a'>
        <button style={{ position: 'fixed', bottom: '3%', right: '3%', width: '10%' }}>ATRAS</button>
      </Link>
    </>
  );
};

export default solicitudes;
