import React, { useState, useEffect } from 'react';
import styles from "../assets/styles/stock.module.css";  // Asegúrate de tener los estilos adecuados

const ProductManagement = () => {
  const [productList, setProductList] = useState([]);
  const [name, setName] = useState("");
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [notification, setNotification] = useState("");
  const [error, setError] = useState("");    

  const categories = ["Alimentos", "Insumos Personales"];

  // Cargar productos desde el servidor
  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((response) => response.json())
      .then((data) => setProductList(data))
      .catch((error) => console.error('Error al cargar productos:', error));
  }, []);

  // Enviar datos del formulario al backend
  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    if (!name || stock < 0 || !category) {
      setNotification("Por favor, completa todos los campos correctamente.");
      return;
    }
  
    const newProduct = {
      name: name,
      category: category,
      stock: stock,
    };
  
    try {
      const response = await fetch('http://localhost:5000/api/agregarProducto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Mensaje de éxito
        setNotification('Producto añadido con éxito');
        resetForm(); // Limpiar formulario después de enviar
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error al agregar el producto');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setNotification('Error al enviar los datos');
    }
  };
  

  // Limpiar formulario
  const resetForm = () => {
    setName("");
    setStock(0);
    setCategory("");
    setCurrentProductId(null);
    setIsEditing(false);
    setNotification("");
  };

  // Eliminar producto
  const handleDeleteProduct = (id) => {
    fetch(`http://localhost:5000/api/products/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setProductList((prevList) => prevList.filter((item) => item.id !== id));
          setNotification("Producto eliminado con éxito.");
        } else {
          throw new Error("Error al eliminar el producto.");
        }
      })
      .catch((error) => setNotification(error.message));
  };

  // Cargar datos en el formulario para editar
  const handleEditProduct = (product) => {
    setName(product.name);
    setStock(product.stock);
    setCategory(product.category);
    setCurrentProductId(product.id);
    setIsEditing(true);
    setNotification("");
  };

  return (
    <div className={styles.productWrapper}>
      <div className={styles.productContainer}>
        <h1>Gestión de Productos</h1>
        {notification && <div className={styles.notification}>{notification}</div>}
        <div className={styles.formContainer}>
          <form onSubmit={handleFormSubmit} className={styles.inputContainer}>
            <input
              type="text"
              placeholder="Nombre del producto"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Cantidad en stock"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              min="0"
              required
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <button type="submit"onClick={handleFormSubmit}>Añadir Productos</button>
          </form>
        </div>
        <div className={styles.productListContainer}>
          <h2>Productos Disponibles</h2>
          <ul className={styles.productList}>
            {productList.map((product) => (
              <li key={product.id} className="productItem">
                <span>{product.name} - Stock: {product.stock} - Categoría: {product.category}</span>
                <div className={styles.actions}>
                  <button onClick={() => handleEditProduct(product)}>Editar</button>
                  <button onClick={() => handleDeleteProduct(product.id)}>Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
