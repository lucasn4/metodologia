import React, { useState, useEffect } from "react";
import "../assets/styles/comp_pago.css"; // Importa el archivo CSS
// ResponsiveLayout.jsx



const MetodoPago = ({ items }) => {
    const [metodoPago, setMetodoPago] = useState("");

    const handleMetodoPagoChange = (event) => {
      setMetodoPago(event.target.value);
    };
  
    useEffect(() => {
      const inputFile = document.getElementById('upload-file');
      const fileChosen = document.getElementById('file-chosen');
  
      if (inputFile) {
        inputFile.addEventListener('change', () => {
          fileChosen.textContent = inputFile.files[0].name;
        });
      }
    }, []);
  return (
    <div className="caja_de_pagos_carrito">
      <div className="metodo-pago-container">
        <h2>Método de Pago</h2>
        <div className="opciones-pago">
          <label className="custom-radio">
            Efectivo
            <input
              type="radio"
              value="efectivo"
              checked={metodoPago === "efectivo"}
              onChange={handleMetodoPagoChange}
            />
            <span className="checkmark"></span>
          </label>

          {metodoPago === "efectivo" && (
            <div className="info-pago">
              <p>
                Deberás por lo menos dejar una seña de $5,000 pesos para dejar
                reservada(s) la(s) habitación(es) para vos, y el resto ser abonado en el establecimiento de manera presencial.
              </p>
            </div>
            
             
          )}
          {metodoPago === "efectivo" && (
            <div className="info-pago">
              <p>
                Transferi el total de $5,000 pesos a la siguiente cuenta:
              </p>
              <p>
              CBU: XXXXXXXX-XXXXXXXXX-XXX
              </p>
              <p>ALIAS: XXXXX_XXX</p>
              <p>NOMBRE: Jorge Nicolas Pallado</p>
              <p></p>
            </div>
            
             
          )}

          <label className="custom-radio">
            Transferencia Bancaria
            <input
              type="radio"
              value="transferencia"
              checked={metodoPago === "transferencia"}
              onChange={handleMetodoPagoChange}
            />
            <span className="checkmark"></span>
          </label>
          
          
          {metodoPago === "transferencia" && (
            <div className="info-pago">
              <p>
                Transferi el total de $xxxx pesos a la siguiente cuenta:
              </p>
              <p>
              CBU: XXXXXXXX-XXXXXXXXX-XXX
              </p>
              <p>ALIAS: XXXXX_XXX</p>
              <p>NOMBRE: Jorge Nicolas Pallado</p>
              <p></p>
            </div>
          )}
        </div>
          <div className="espacio">
            <p>Una vez realizada la transferencia por favor subi y envianos comprobante de pago:</p>
          </div>

        <div className=" espacio file-upload">
  <input type="file" id="upload-file" name="upload-file" accept=".pdf, .doc, .docx, .jpg, .jpeg, .png" />
  <label htmlFor="upload-file">
    <span>Subir Comprobante</span>
  </label>
  <div id="file-chosen">Ningún archivo seleccionado</div> 
</div>


      </div>
      
      <button className="enviar-button">Enviar</button> 

    </div>
  );
};

const ResponsiveLayout = () => {
    // Datos de ejemplo para el carrito
    const itemsCarrito = [
        { nombre: "Habitación Simple - 1 noche" },
        { nombre: "Habitación Doble - 2 noches" }
    ];

    return (
        <div className="espacio layout-container">
            <div className="left-section">
                <MetodoPago items={itemsCarrito} /> 
            </div>

            <div className="right-section">
                <div className="top-box">
                    <div className="content-box">
                        <h3>Detalles de la Reserva</h3>
                        <p>Información adicional sobre tu reserva...</p>

                        {/* Resumen del Carrito */}
                        <h3>Resumen del Carrito</h3>
                        <ul>
                            {itemsCarrito.map((item, index) => (
                                <li key={index}>{item.nombre}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="bottom-box">
                    <div className="content-box">
                        <h3>Información de Contacto</h3>
                        <p>Datos de contacto y soporte...</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResponsiveLayout;