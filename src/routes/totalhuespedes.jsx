import React, { useEffect, useState } from "react";
import "../App.css"; 
import { Link } from 'react-router-dom';

function App() {
  
  const [huespedes, setHuespedes] = useState([]);
  const [huespedencontrado, setHuespedencontrado] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [successMessageborrado, setSuccessMessageborrado] = useState('');
  const [successUpdateMessage, setSuccessUpdateMessage] = useState('');
  const [selectedOption, setSelectedOption] = useState(''); // Estado para la opción seleccionada
  const [showUpdateInput, setShowUpdateInput] = useState(false); // Estado para mostrar el input de actualización o borrado
  const [idProducto, setIdProducto] = useState(""); 
  const [errorMensaje, setErrorMensaje] = useState('');
  
  const [idHuesped, setIdHuesped] = useState(""); // Estado para almacenar el id del empleado a actualizar o borrar

  const cargarHuesped = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/cargarhuesped');
      if (!response.ok) {
        throw new Error('Error al obtener los datos del servidor');
      }
      const data = await response.json();
      setHuespedes(data);
      console.log(data);
    } catch (error) {
      console.error('Error al obtener las solicitudes:', error);
    }
  };
  
const buscarhuesped = async () => {  
  setShowUpdateInput(true); // Muestra el input para actualizar
  setSuccessMessage('');
  setSuccessMessageborrado('');
  console.log('Buscando producto con ID:', idHuesped);
  try {
    const response = await fetch(`http://localhost:5000/api/buscarhuesped/${idHuesped}`); 
    if (response.ok) {
          const data = await response.json();
          console.log('Datos recibidos:', data);
          
      if (Array.isArray(data)) {  // Verificamos si 'data' es un arreglo
        const formattedData = data.map(producto => ({
          ...producto,
        }));
        setHuespedencontrado(formattedData);
        setErrorMensaje('');
      } else {
        // Si no hay resultados, mostramos el mensaje de error y limpiamos los datos previos
        setProductoencontrado([]); // Limpiar la tabla de producto
        setErrorMensaje("El id no corresponde a un producto.");
      }
    } else {
      setProductoencontrado([]); // Limpiar los datos si la respuesta no es exitosa
      setErrorMensaje("El id no corresponde a un producto.");
      console.error('Error al cargar los productos');
    }
  } catch (error) {
    setHuespedencontrado([]); // Limpiar los datos en caso de error
    setErrorMensaje('Hubo un error en la solicitud.');
    console.error('Error en la solicitud:', error);
  }
};

const borrarhuesped = async () => {
  try {
    // Asegurarse de que el ID del producto esté presente antes de enviar la solicitud
    if (!idHuesped) {
      setErrorMensaje('Por favor ingrese un ID de producto para borrar.');
      return;
    }

    // Enviar la solicitud DELETE para eliminar el producto
    const response = await fetch(`http://localhost:5000/api/borrarhuesped/${idHuesped}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      const data = await response.json();
      setSuccessMessageborrado('Huesped borrado con éxito');
      setErrorMensaje(''); // Limpiar mensajes de error si la eliminación fue exitosa

      cargarHuesped();
      setHuespedencontrado([]); // Limpiar el producto encontrado
      setIdHuesped(""); // Limpiar el ID del producto
    } else {
      // Si hubo un error en la solicitud, mostrar el mensaje de error
      setErrorMensaje('Hubo un problema al borrar el huesped');
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
    setErrorMensaje('Hubo un error al borrar el huesped');
  }
};

  return (
    <>
    <div className="container">
      <h2>Administrar Huespedes</h2>

          <h3>Lista de Huespedes</h3>
          <button className="button" onClick={cargarHuesped}>Cargar Huespedes</button>
          <table border="1" cellPadding="10" cellSpacing="0" style={{ marginTop: "20px", width: "100%" }}>
            <thead>
              <tr>
                <th>idHuesped</th>
                <th>nombreH</th>
                <th>apellidoH</th>
                <th>telefonoH</th>
                <th>emailH</th>
                <th>vehiculoH</th>
                <th>tipoH</th>
                <th>marcamodeloH</th>
                <th>colorH</th>
                <th>patenteH</th>
              </tr>
            </thead>
            <tbody>
              {huespedes.map((producto, index) => (
                <tr key={index}>
                  <td>{producto.idHuesped}</td>
                  <td>{producto.nombreH}</td>
                  <td>{producto.apellidoH}</td>
                  <td>{producto.telefonoH}</td>
                  <td>{producto.emailH}</td>
                  <td>{producto.vehiculoH}</td>
                  <td>{producto.tipoH}</td>
                  <td>{producto.marcamodeloH}</td>
                  <td>{producto.colorH}</td>
                  <td>{producto.patenteH}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h3>Borrar Huesped</h3>
          <input
            type="text"
            placeholder="Ingrese el 'IdHuesped' para Borrar"
            value={idHuesped}
            onChange={(e) => setIdHuesped(e.target.value)}
            style={{ marginTop: '2%', marginBottom: '2%' }}
          />
          <button onClick={buscarhuesped} style={{ marginTop: '2%' }}>Buscar</button>
          
    {/* Mostrar el mensaje de error si no se encuentra el producto */}
    {errorMensaje && <p style={{ color: 'red', marginTop: '10px' }}>{errorMensaje}</p>}
    
    {showUpdateInput && huespedencontrado.length > 0 && (
  <div>
    <h2>Huesped Encontrado</h2>
    <table border="1" cellPadding="10" cellSpacing="0" style={{ marginTop: "20px", width: "100%" }}>
      <thead>
        <tr>
        <th>idHuesped</th>
                <th>nombreH</th>
                <th>apellidoH</th>
                <th>telefonoH</th>
                <th>emailH</th>
                <th>vehiculoH</th>
                <th>tipoH</th>
                <th>marcamodeloH</th>
                <th>colorH</th>
                <th>patenteH</th>
        </tr>
      </thead>
      <tbody>
        <tr key={huespedencontrado[0].idHuesped}>
        <td>{huespedencontrado[0].idHuesped}</td>
          <td>{huespedencontrado[0].nombreH}</td>
          <td>{huespedencontrado[0].apellidoH}</td>
          <td>{huespedencontrado[0].telefonoH}</td>
          <td>{huespedencontrado[0].emailH}</td>
          <td>{huespedencontrado[0].vehiculoH}</td>
          <td>{huespedencontrado[0].tipoH}</td>
          <td>{huespedencontrado[0].marcamodeloH}</td>
          <td>{huespedencontrado[0].colorH}</td>
          <td>{huespedencontrado[0].patenteH}</td>

        </tr>
      </tbody>
    </table>

    {/* Botón para actualizar el producto */}
    <button onClick={borrarhuesped} style={{ marginTop: '2%' }}>
      Borrar Huesped
    </button>

  </div>
)}
    {successMessageborrado && <p style={{ color: 'green', marginTop: '2%', backgroundColor: 'lightgreen' }}>{successMessageborrado}</p>}
        </div>
      
      <Link to="/admin" className='a'>
          <button style={{position: 'fixed', bottom: '3%', right: '3%', width: '10%'}}>ATRAS</button>
      </Link>
      </>
      )
    }

export default App;
