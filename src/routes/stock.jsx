import React, { useState } from "react";
import "../App.css"; 
import { Link } from 'react-router-dom';

function App() {
  const [formData, setFormData] = useState({
    Producto : "",
    TipodeProducto: "",
    Cantidad: "",
  });
  const [productos, setProductos] = useState([]);
  const [productoencontrado, setProductoencontrado] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [successMessageborrado, setSuccessMessageborrado] = useState('');
  const [successUpdateMessage, setSuccessUpdateMessage] = useState('');
  const [selectedOption, setSelectedOption] = useState(''); // Estado para la opción seleccionada
  const [showUpdateInput, setShowUpdateInput] = useState(false); // Estado para mostrar el input de actualización o borrado
  const [idProducto, setIdProducto] = useState(""); 
  const [errorMensaje, setErrorMensaje] = useState('');

  
  const [productoEditado, setProductoEditado] = useState({
    Producto: "",
    TipodeProducto: "",
    Cantidad: "",
  });
  const handleChangeEditado = (e) => {
    setProductoEditado({
      ...productoEditado,
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
        const response = await fetch("http://localhost:5000/api/guardarproducto", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({...formData}),
        });

        if (response.ok) {
            const data = await response.json();
            setSuccessMessage('Se ha registrado un producto con éxito'); 
            setFormData({
              Producto: '',
              TipodeProducto: '',
              Cantidad: '',
            });
        } else {
            console.error('Error al enviar los datos');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
  };

  const cargarproducto = async () => {
    try {
        const response = await fetch("http://localhost:5000/api/cargarproducto");
        if (response.ok) {
            const data = await response.json();
            const formattedData = data.map(producto => ({
              ...producto,
              
            }));
            setProductos(formattedData);
        } else {
            console.error('Error al cargar los productos');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
};
const buscarproducto = async () => {  
  setShowUpdateInput(true); // Muestra el input para actualizar
  setSuccessMessage('');
  setSuccessMessageborrado('');
  console.log('Buscando producto con ID:', idProducto);
  try {
    const response = await fetch(`http://localhost:5000/api/buscarproducto/${idProducto}`); 
    if (response.ok) {
          const data = await response.json();
          console.log('Datos recibidos:', data);
          
      if (Array.isArray(data)) {  // Verificamos si 'data' es un arreglo
        const formattedData = data.map(producto => ({
          ...producto,
        }));
        setProductoencontrado(formattedData);
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
    setProductoencontrado([]); // Limpiar los datos en caso de error
    setErrorMensaje('Hubo un error en la solicitud.');
    console.error('Error en la solicitud:', error);
  }
};

const actualizarproducto = async () => {
  const productoActualizado = {
    idProducto: productoencontrado[0].idProducto,
    Producto: productoEditado.Producto || productoencontrado[0].Producto,
    TipodeProducto: productoEditado.TipodeProducto || productoencontrado[0].TipodeProducto,
    Cantidad: productoEditado.Cantidad || productoencontrado[0].Cantidad,
  };

  try {
    const response = await fetch(`http://localhost:5000/api/actualizarproducto/${productoActualizado.idProducto}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productoActualizado),
    });

    if (response.ok) {
      const data = await response.json();
      setSuccessMessage('Producto actualizado con éxito');
      console.log('Producto actualizado:', data);
      cargarproducto();  
      setProductoencontrado([]);  
      setErrorMensaje('');
    } else {
      console.error('Error al actualizar el producto');
      setErrorMensaje('Hubo un problema al actualizar el producto');
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
    setErrorMensaje('Hubo un error al actualizar el producto');
  }
};

const modificarproducto = () => {
  setShowUpdateInput(true); // Muestra el input para actualizar
};

const borrarproducto = async () => {
  try {
    // Asegurarse de que el ID del producto esté presente antes de enviar la solicitud
    if (!idProducto) {
      setErrorMensaje('Por favor ingrese un ID de producto para borrar.');
      return;
    }

    // Enviar la solicitud DELETE para eliminar el producto
    const response = await fetch(`http://localhost:5000/api/borrarproducto/${idProducto}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      const data = await response.json();
      setSuccessMessageborrado('Producto borrado con éxito');
      setErrorMensaje(''); // Limpiar mensajes de error si la eliminación fue exitosa

      cargarproducto();
      setProductoencontrado([]); // Limpiar el producto encontrado
      setIdProducto(""); // Limpiar el ID del producto
    } else {
      // Si hubo un error en la solicitud, mostrar el mensaje de error
      setErrorMensaje('Hubo un problema al borrar el producto');
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
    setErrorMensaje('Hubo un error al borrar el producto');
  }
};


  return (
    <div className="container">
      <h2>Administrar Productos</h2>

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
          <h3>Registrar Nuevo Producto</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="Producto"
              placeholder="Producto"
              value={formData.Producto}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              id="TipodeProducto"
              placeholder="Tipo de Producto"
              value={formData.TipodeProducto}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              id="Cantidad"
              placeholder="Cantidad"
              value={formData.Cantidad}
              onChange={handleChange}
              required
            />
            <button type="submit" style={{ display: 'flex', marginTop: '2%' }}>Registrar</button>
            {successMessage && <p style={{ color: 'green', marginTop: '2%', backgroundColor: 'lightgreen' }}>{successMessage}</p>}
          </form>
        </div>
      )}

      {selectedOption === "cargar" && (
        <div>
          <h3>Lista de Productos</h3>
          <button onClick={cargarproducto} style={{ marginTop: '2%' }}>Cargar Productos</button>
          <table border="1" cellPadding="10" cellSpacing="0" style={{ marginTop: "20px", width: "100%" }}>
            <thead>
              <tr>
                <th>idProducto</th>
                <th>Producto</th>
                <th>Tipo de Producto</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto, index) => (
                <tr key={index}>
                  <td>{producto.idProducto}</td>
                  <td>{producto.Producto}</td>
                  <td>{producto.TipodeProducto}</td>
                  <td>{producto.Cantidad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

{selectedOption === "actualizar" && (
  <div>
    <h3>Actualizar Producto</h3>
    <input
      type="text"
      placeholder="Ingrese el 'IdProducto' para Actualizar"
      value={idProducto}
      onChange={(e) => setIdProducto(e.target.value)}
      style={{ marginTop: '2%', marginBottom: '2%' }}
    />
    <button onClick={buscarproducto} style={{ marginTop: '2%' }}>Buscar</button>

    {/* Mostrar el mensaje de error si no se encuentra el producto */}
    {errorMensaje && <p style={{ color: 'red', marginTop: '10px' }}>{errorMensaje}</p>}
    
    {showUpdateInput && productoencontrado.length > 0 && (
  <div>
    <h2>Producto Encontrado</h2>
    <table border="1" cellPadding="10" cellSpacing="0" style={{ marginTop: "20px", width: "100%" }}>
      <thead>
        <tr>
          <th>idProducto</th>
          <th>Producto</th>
          <th>Tipo de Producto</th>
          <th>Cantidad</th>
        </tr>
      </thead>
      <tbody>
        <tr key={productoencontrado[0].idProducto}>
          <td>{productoencontrado[0].idProducto}</td>
          <td>
            <input
              type="text"
              id="Producto"
              value={productoEditado.Producto || productoencontrado[0].Producto}
              onChange={handleChangeEditado}
            />
          </td>
          <td>
            <input
              type="text"
              id="TipodeProducto"
              value={productoEditado.TipodeProducto || productoencontrado[0].TipodeProducto}
              onChange={handleChangeEditado}
            />
          </td>
          <td>
            <input
              type="text"
              id="Cantidad"
              value={productoEditado.Cantidad || productoencontrado[0].Cantidad}
              onChange={handleChangeEditado}
            />
          </td>
          
        </tr>
      </tbody>
    </table>

    {/* Botón para actualizar el producto */}
    <button onClick={actualizarproducto} style={{ marginTop: '2%' }}>
      Actualizar Producto
    </button>

  </div>
)}
    {successMessage && <p style={{ color: 'green', marginTop: '2%', backgroundColor: 'lightgreen' }}>{successMessage}</p>}

  </div>
)}


      {selectedOption === "borrar" && (
        <div>
          <h3>Borrar Producto</h3>
          <input
            type="text"
            placeholder="Ingrese el 'IdProducto' para Borrar"
            value={idProducto}
            onChange={(e) => setIdProducto(e.target.value)}
            style={{ marginTop: '2%', marginBottom: '2%' }}
          />
          <button onClick={buscarproducto} style={{ marginTop: '2%' }}>Buscar</button>
          
    {/* Mostrar el mensaje de error si no se encuentra el producto */}
    {errorMensaje && <p style={{ color: 'red', marginTop: '10px' }}>{errorMensaje}</p>}
    
    {showUpdateInput && productoencontrado.length > 0 && (
  <div>
    <h2>Producto Encontrado</h2>
    <table border="1" cellPadding="10" cellSpacing="0" style={{ marginTop: "20px", width: "100%" }}>
      <thead>
        <tr>
          <th>idProducto</th>
          <th>Producto</th>
          <th>Tipo de Producto</th>
          <th>Cantidad</th>
        </tr>
      </thead>
      <tbody>
        <tr key={productoencontrado[0].idProducto}>
        <td>{productoencontrado[0].idProducto}</td>
          <td>{productoencontrado[0].Producto}</td>
          <td>{productoencontrado[0].TipodeProducto}</td>
          <td>{productoencontrado[0].Cantidad}</td>
        </tr>
      </tbody>
    </table>

    {/* Botón para actualizar el producto */}
    <button onClick={borrarproducto} style={{ marginTop: '2%' }}>
      Borrar Producto
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
