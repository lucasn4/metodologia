import React, { useState } from "react";
import "../App.css"; 
import { Link } from 'react-router-dom';

function App() {
  const [formData, setFormData] = useState({
    nombreE: "",
    apellidoE: "",
    puestoE: "",
    fechaAltaE: "",
  });
  const [empleados, setEmpleados] = useState([]);
  const [empleadoencontrado, setEmpleadoencontrado] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [successMessageborrado, setSuccessMessageborrado] = useState('');
  const [successUpdateMessage, setSuccessUpdateMessage] = useState('');
  const [selectedOption, setSelectedOption] = useState(''); // Estado para la opción seleccionada
  const [showUpdateInput, setShowUpdateInput] = useState(false); // Estado para mostrar el input de actualización o borrado
  const [idEmpleado, setIdEmpleado] = useState(""); // Estado para almacenar el id del empleado a actualizar o borrar
  const [errorMensaje, setErrorMensaje] = useState('');

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const [empleadoEditado, setEmpleadoEditado] = useState({
    nombreE: "",
    apellidoE: "",
    puestoE: "",
    fechaAltaE: "",
  });
  const handleChangeEditado = (e) => {
    setEmpleadoEditado({
      ...empleadoEditado,
      [e.target.id]: e.target.value,
    });
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value); // Actualiza la opción seleccionada
    setShowUpdateInput(false); // Oculta el input de actualización al cambiar de opción
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch("http://localhost:5000/api/guardarempleados", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({...formData}),
        });

        if (response.ok) {
            const data = await response.json();
            setSuccessMessage('Se ha registrado un empleado con éxito'); 
            setFormData({
                nombreE: '',
                apellidoE: '',
                puestoE: '',
                fechaAltaE: '',
            });
        } else {
            console.error('Error al enviar los datos');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
  };

  const cargarempleados = async () => {
    try {
        const response = await fetch("http://localhost:5000/api/cargarempleados");
        if (response.ok) {
            const data = await response.json();
            const formattedData = data.map(empleado => ({
              ...empleado,
              fechaAltaE: formatDate(empleado.fechaAltaE),
            }));
            setEmpleados(formattedData);
        } else {
            console.error('Error al cargar los empleados');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
};
const buscarempleados = async () => {  
  setShowUpdateInput(true); // Muestra el input para actualizar
  setSuccessMessage('');
  setSuccessMessageborrado('');
  console.log('Buscando empleado con ID:', idEmpleado);
  try {
    const response = await fetch(`http://localhost:5000/api/buscarempleados/${idEmpleado}`); // Pasamos idEmpleado en la URL
    if (response.ok) {
          const data = await response.json();
          console.log('Datos recibidos:', data);
          
      if (Array.isArray(data)) {  // Verificamos si 'data' es un arreglo
        const formattedData = data.map(empleado => ({
          ...empleado,
          fechaAltaE: formatDate(empleado.fechaAltaE),
        }));
        setEmpleadoencontrado(formattedData);
        setErrorMensaje('');
      } else {
        // Si no hay resultados, mostramos el mensaje de error y limpiamos los datos previos
        setEmpleadoencontrado([]); // Limpiar la tabla de empleados
        setErrorMensaje("El id no corresponde a un empleado.");
      }
    } else {
      setEmpleadoencontrado([]); // Limpiar los datos si la respuesta no es exitosa
      setErrorMensaje("El id no corresponde a un empleado.");
      console.error('Error al cargar los empleados');
    }
  } catch (error) {
    setEmpleadoencontrado([]); // Limpiar los datos en caso de error
    setErrorMensaje('Hubo un error en la solicitud.');
    console.error('Error en la solicitud:', error);
  }
};

const actualizarEmpleado = async () => {
  const empleadoActualizado = {
    idEmpleado: empleadoencontrado[0].idEmpleado,
    nombreE: empleadoEditado.nombreE || empleadoencontrado[0].nombreE,
    apellidoE: empleadoEditado.apellidoE || empleadoencontrado[0].apellidoE,
    puestoE: empleadoEditado.puestoE || empleadoencontrado[0].puestoE,
    fechaAltaE: empleadoEditado.fechaAltaE || empleadoencontrado[0].fechaAltaE,
  };

  try {
    const response = await fetch(`http://localhost:5000/api/actualizarempleado/${empleadoActualizado.idEmpleado}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(empleadoActualizado),
    });

    if (response.ok) {
      const data = await response.json();
      setSuccessMessage('Empleado actualizado con éxito');
      console.log('Empleado actualizado:', data);
      // Actualizar la lista de empleados después de la actualización
      cargarempleados();  // Recarga los empleados actualizados
      setEmpleadoencontrado([]);  // Limpiar los datos del empleado encontrado
      setErrorMensaje('');
    } else {
      console.error('Error al actualizar el empleado');
      setErrorMensaje('Hubo un problema al actualizar el empleado');
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
    setErrorMensaje('Hubo un error al actualizar el empleado');
  }
};

const modificarEmpleado = () => {
  setShowUpdateInput(true); // Muestra el input para actualizar
};

const borrarEmpleado = async () => {
  try {
    // Asegurarse de que el ID del empleado esté presente antes de enviar la solicitud
    if (!idEmpleado) {
      setErrorMensaje('Por favor ingrese un ID de empleado para borrar.');
      return;
    }

    // Enviar la solicitud DELETE para eliminar el empleado
    const response = await fetch(`http://localhost:5000/api/borrarempleado/${idEmpleado}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      const data = await response.json();
      setSuccessMessageborrado('Empleado borrado con éxito');
      setErrorMensaje(''); // Limpiar mensajes de error si la eliminación fue exitosa

      // Recargar la lista de empleados después de la eliminación
      cargarempleados();
      setEmpleadoencontrado([]); // Limpiar el empleado encontrado
      setIdEmpleado(""); // Limpiar el ID del empleado
    } else {
      // Si hubo un error en la solicitud, mostrar el mensaje de error
      setErrorMensaje('Hubo un problema al borrar el empleado');
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
    setErrorMensaje('Hubo un error al borrar el empleado');
  }
};


  return (
    <div className="container">
      <h2>Administrar Empleados</h2>

      {/* Dropdown para seleccionar la acción */}
      <select 
        onChange={handleSelectChange} 
        value={selectedOption} 
        style={{ marginTop: '2%', marginBottom: '2%', width: '70%', height: '50px' }}
      >
        <option value="">Selecciona una opción</option>
        <option value="guardar">Guardar</option>
        <option value="cargar">Cargar</option>
        <option value="actualizar">Actualizar</option>
        <option value="borrar">Borrar</option>
      </select>

      {/* Mostrar contenido según la opción seleccionada */}
      {selectedOption === "guardar" && (
        <div>
          <h3>Registrar Nuevo Empleado</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="nombreE"
              placeholder="Nombre"
              value={formData.nombreE}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              id="apellidoE"
              placeholder="Apellido"
              value={formData.apellidoE}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              id="puestoE"
              placeholder="Puesto"
              value={formData.puestoE}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              id="fechaAltaE"
              value={formData.fechaAltaE}
              onChange={handleChange}
              required
              style={{ marginTop: '2%' }}
            />
            <button type="submit" style={{ display: 'flex', marginTop: '2%' }}>Registrar</button>
            {successMessage && <p style={{ color: 'green', marginTop: '2%', backgroundColor: 'lightgreen' }}>{successMessage}</p>}
          </form>
        </div>
      )}

      {selectedOption === "cargar" && (
        <div>
          <h3>Lista de Empleados</h3>
          <button onClick={cargarempleados} style={{ marginTop: '2%' }}>Cargar Empleados</button>
          <table border="1" cellPadding="10" cellSpacing="0" style={{ marginTop: "20px", width: "100%" }}>
            <thead>
              <tr>
                <th>idEmpleado</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Puesto</th>
                <th>Fecha de Alta</th>
              </tr>
            </thead>
            <tbody>
              {empleados.map((empleado, index) => (
                <tr key={index}>
                  <td>{empleado.idEmpleado}</td>
                  <td>{empleado.nombreE}</td>
                  <td>{empleado.apellidoE}</td>
                  <td>{empleado.puestoE}</td>
                  <td>{empleado.fechaAltaE}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

{selectedOption === "actualizar" && (
  <div>
    <h3>Actualizar Empleado</h3>
    <input
      type="text"
      placeholder="Ingrese el 'IdEmpleado' para Actualizar"
      value={idEmpleado}
      onChange={(e) => setIdEmpleado(e.target.value)}
      style={{ marginTop: '2%', marginBottom: '2%' }}
    />
    <button onClick={buscarempleados} style={{ marginTop: '2%' }}>Buscar</button>

    {/* Mostrar el mensaje de error si no se encuentra el empleado */}
    {errorMensaje && <p style={{ color: 'red', marginTop: '10px' }}>{errorMensaje}</p>}
    
    {showUpdateInput && empleadoencontrado.length > 0 && (
  <div>
    <h2>Empleado Encontrado</h2>
    <table border="1" cellPadding="10" cellSpacing="0" style={{ marginTop: "20px", width: "100%" }}>
      <thead>
        <tr>
          <th>idEmpleado</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Puesto</th>
          <th>Fecha de Alta</th>
        </tr>
      </thead>
      <tbody>
        <tr key={empleadoencontrado[0].idEmpleado}>
          <td>{empleadoencontrado[0].idEmpleado}</td>
          <td>
            <input
              type="text"
              id="nombreE"
              value={empleadoEditado.nombreE || empleadoencontrado[0].nombreE}
              onChange={handleChangeEditado}
            />
          </td>
          <td>
            <input
              type="text"
              id="apellidoE"
              value={empleadoEditado.apellidoE || empleadoencontrado[0].apellidoE}
              onChange={handleChangeEditado}
            />
          </td>
          <td>
            <input
              type="text"
              id="puestoE"
              value={empleadoEditado.puestoE || empleadoencontrado[0].puestoE}
              onChange={handleChangeEditado}
            />
          </td>
          <td>
            <input
              type="date"
              id="fechaAltaE"
              value={empleadoEditado.fechaAltaE || empleadoencontrado[0].fechaAltaE}
              onChange={handleChangeEditado}
            />
          </td>
        </tr>
      </tbody>
    </table>

    {/* Botón para actualizar el empleado */}
    <button onClick={actualizarEmpleado} style={{ marginTop: '2%' }}>
      Actualizar Empleado
    </button>

  </div>
)}
    {successMessage && <p style={{ color: 'green', marginTop: '2%', backgroundColor: 'lightgreen' }}>{successMessage}</p>}

  </div>
)}


      {selectedOption === "borrar" && (
        <div>
          <h3>Borrar Empleado</h3>
          <input
            type="text"
            placeholder="Ingrese el 'IdEmpleado' para Borrar"
            value={idEmpleado}
            onChange={(e) => setIdEmpleado(e.target.value)}
            style={{ marginTop: '2%', marginBottom: '2%' }}
          />
          <button onClick={buscarempleados} style={{ marginTop: '2%' }}>Buscar</button>
          
    {/* Mostrar el mensaje de error si no se encuentra el empleado */}
    {errorMensaje && <p style={{ color: 'red', marginTop: '10px' }}>{errorMensaje}</p>}
    
    {showUpdateInput && empleadoencontrado.length > 0 && (
  <div>
    <h2>Empleado Encontrado</h2>
    <table border="1" cellPadding="10" cellSpacing="0" style={{ marginTop: "20px", width: "100%" }}>
      <thead>
        <tr>
          <th>idEmpleado</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Puesto</th>
          <th>Fecha de Alta</th>
        </tr>
      </thead>
      <tbody>
        <tr key={empleadoencontrado[0].idEmpleado}>
          <td>{empleadoencontrado[0].nombreE}</td>
          <td>{empleadoencontrado[0].apellidoE}</td>
          <td>{empleadoencontrado[0].puestoE}</td>
          <td>{empleadoencontrado[0].fechaAltaE}</td>
        </tr>
      </tbody>
    </table>

    {/* Botón para actualizar el empleado */}
    <button onClick={borrarEmpleado} style={{ marginTop: '2%' }}>
      Borrar Empleado
    </button>

  </div>
)}
    {successMessageborrado && <p style={{ color: 'green', marginTop: '2%', backgroundColor: 'lightgreen' }}>{successMessageborrado}</p>}
        </div>
      )}
      <Link to="/admin" className='a'>
          <button style={{position: 'fixed', bottom: '3%', right: '3%', width: '10%'}}>ATRAS</button>
      </Link>
    </div>
  );
}

export default App;
