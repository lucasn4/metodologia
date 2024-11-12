import React, { useState, useEffect } from "react";
import "../assets/styles/stock.css";

const Stock = () => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productStock, setProductStock] = useState(0);
  const [productCategory, setProductCategory] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");

  const categories = ["Alimentos", "Insumos Personales"];
  // Cargar productos desde localStorage cuando el componente se monta
  useEffect(() => {
    const savedProducts = localStorage.getItem("products");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      setProducts([]); // En caso de que no haya productos en localStorage
    }
  }, []);

  // Guardar productos en localStorage cada vez que cambian
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productName || productStock < 0 || !productCategory) {
      setAlertMessage("Por favor, completa todos los campos correctamente.");
      return;
    }

    // Comprobar si el producto ya existe (sin importar mayúsculas/minúsculas)
    if (
      products.some(
        (product) =>
          product.name.toLowerCase() === productName.toLowerCase() &&
          product.id !== currentProductId // No permitir duplicados con el mismo ID
      )
    ) {
      setAlertMessage("Este producto ya existe en el inventario.");
      return;
    }

    const newProduct = {
      id: currentProductId ? currentProductId : Date.now(),
      name: productName,
      stock: productStock,
      category: productCategory,
    };

    setProducts((prevProducts) => {
      if (editMode) {
        return prevProducts.map((product) =>
          product.id === currentProductId ? newProduct : product
        );
      } else {
        return [...prevProducts, newProduct];
      }
    });

    resetForm();
    setAlertMessage(""); // Reset alert message after submission
  };

  const resetForm = () => {
    setProductName("");
    setProductStock(0);
    setProductCategory("");
    setCurrentProductId(null);
    setEditMode(false); // Reset edit mode after submission
  };

  const deleteProduct = (id) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.filter((product) => product.id !== id);
      // Actualizar localStorage con la lista actualizada
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      return updatedProducts;
    });
    setAlertMessage("Producto eliminado con éxito.");
  };

  const editProduct = (product) => {
    setProductName(product.name);
    setProductStock(product.stock);
    setProductCategory(product.category);
    setCurrentProductId(product.id);
    setEditMode(true);
    setAlertMessage(""); // Reset alert message when entering edit mode
  };
  const checkLowStock = (stock) => stock < 5;

  return (
    <div className="stock-wrapper">
      <div className="stock-container">
        <h1>Gestión de Stock</h1>
        {alertMessage && <div className="alert">{alertMessage}</div>}
        <div className="form-container">
          <form onSubmit={handleSubmit} className="input-container">
            <input
              type="text"
              placeholder="Nombre del producto"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Cantidad en stock"
              value={productStock}
              onChange={(e) => setProductStock(Number(e.target.value))}
              min="0"
              required
            />
            <select
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              required
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <button type="submit">
              {editMode ? "Actualizar" : "Añadir Producto"}
            </button>
          </form>
        </div>
        <div className="product-list-container">
          <h2>Productos</h2>
          <ul className="product-list">
            {products.map((product) => (
              <li
                key={product.id}
                className={`${
                  checkLowStock(product.stock) ? "low-stock" : ""
                } product-item`}
              >
                <span>
                  {product.name} - Stock: {product.stock} - Categoría:{" "}
                  {product.category}
                </span>
                <div className="actions">
                  <button onClick={() => editProduct(product)}>Editar</button>
                  <button onClick={() => deleteProduct(product.id)}>
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="inventory-report">
          <h2>Reporte de Inventario</h2>
          <p>Total de productos: {products.length}</p>
          <p>
            Productos con bajo stock:{" "}
            {products.filter((product) => checkLowStock(product.stock)).length}
          </p>

          {products.some((product) => checkLowStock(product.stock)) && (
            <div className="alert">
              ¡Alerta! Algunos productos tienen bajo stock.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Stock;
