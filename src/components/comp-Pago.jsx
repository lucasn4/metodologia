
// comp-Pago.jsx
import React from "react";
import "../assets/styles/comp_pago.css";

const MetodoPago = ({ formData, metodoPago, setMetodoPago, handleFileChange, fileChosen }) => {
  const handleMetodoPagoChange = (event) => {
    setMetodoPago(event.target.value);
  };

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
                reservada(s) la(s) habitación(es) para vos, y el resto ser
                abonado en el establecimiento de manera presencial.
              </p>
            </div>
          )}
          {metodoPago === "efectivo" && (
            <div className="info-pago">
              <p>
                Transferi el total de $5,000 pesos a la siguiente cuenta:
              </p>
              <p>CBU: XXXXXXXX-XXXXXXXXX-XXX</p>
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
              <p>CBU: XXXXXXXX-XXXXXXXXX-XXX</p>
              <p>ALIAS: XXXXX_XXX</p>
              <p>NOMBRE: Jorge Nicolas Pallado</p>
              <p></p>
            </div>
          )}
        </div>
        <div className="espacio">
          <p>
            Una vez realizada la transferencia por favor subi y envianos
            comprobante de pago:
          </p>
        </div>

        <div className="espacio file-upload">
          <input
            type="file"
            id="upload-file"
            name="upload-file"
            accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"
            onChange={handleFileChange}
          />
          <label htmlFor="upload-file">
            <span>Subir Comprobante</span>
          </label>
          <div id="file-chosen">{fileChosen}</div>
        </div>
      </div>
    </div>
  );
};

const ResponsiveLayout = ({ formData , nhabiraciones ,start, end, metodoPago, setMetodoPago, handleFileChange, fileChosen  }) => {
    // Datos de ejemplo para el carrito
    const itemsCarrito = Array.from({ length: nhabiraciones }, (_, index) => ({ nombre: `Habitación ${index + 1}` }));
        return (
        <div className="espacio layout-container">
            <div className="left-section">
            <MetodoPago 
                    formData={formData} 
                    metodoPago={metodoPago}
                    setMetodoPago={setMetodoPago}
                    handleFileChange={handleFileChange}
                    fileChosen={fileChosen}
                />            </div>

            <div className="right-section">
                <div className="top-box">
                    <div className="content-box">
                        <h3>Detalles de la Reserva</h3>
                        <p>Fecha de Entrada: {start}</p><p>Fecha de Salida: {end}</p>

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
                        <p>Nombre: {formData.nombreH}</p>
                        <p>Apellido: {formData.apellidoH}</p>
                        <p>Telefono: {formData.telefonoH}</p>
                        <p>Email: {formData.emailH}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResponsiveLayout;