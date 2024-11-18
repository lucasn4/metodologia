import React, { useState } from "react";
import "../assets/styles/comp_pago.css"; // Importa el archivo CSS
// ResponsiveLayout.jsx
//import Estado from "./comp-pago-2"



const MetodoPago = ({ formData }) => {
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [metodoPago, setMetodoPago] = useState("");

  const handleMetodoPagoChange = (event) => {
    setMetodoPago(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    document.getElementById("file-chosen").textContent =
      event.target.files[0].name;
  };

  const handleClickEnviar = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("to", "programacionprueba99@gmail.com");
    formDataToSend.append("subject", subject);
    formDataToSend.append(
      "text",
      `Información de el Huesped; PAGO
        Nombre: ${formData.nombreH}
        Apellido: ${formData.apellidoH}
        Teléfono: ${formData.telefonoH}
        Email: ${formData.emailH}
        Pago: ${metodoPago}
        ${formData.vehiculoH ? `Vehículo: Sí` : `Vehículo: No`}
        ${formData.vehiculoH ? `Tipo de vehículo: ${formData.tipoH}` : ""}
        ${formData.vehiculoH ? `Marca y modelo: ${formData.marcamodeloH}` : ""}
        ${formData.vehiculoH ? `Color: ${formData.colorH}` : ""}
        ${formData.vehiculoH ? `Patente: ${formData.patenteH}` : ""}
        <p>Mensaje: ${text}

       `
    );
    if (file) {
      formDataToSend.append("attachment", file);
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/email/send-email",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (response.ok) {
        alert("Correo electrónico enviado con éxito!");
        setSubject("");
        setText("");
        setFile(null);
        setMetodoPago("");
        document.getElementById("file-chosen").textContent =
          "Ningún archivo seleccionado";
      } else {
        const errorData = await response.json();
        console.error("Error al enviar el correo:", errorData);
        alert("Hubo un error al enviar el correo electrónico.");
      }
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      alert("Hubo un error al enviar el correo electrónico.");
    }
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

        <div className=" espacio file-upload">
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
          <div id="file-chosen">Ningún archivo seleccionado</div>
        </div>
      </div>
      <button className="enviar-button" onClick={handleClickEnviar}>
        Enviar
      </button>
    </div>
  );
};



const ResponsiveLayout = ({ formData , numberOfRooms , start , end }) => {
    // Datos de ejemplo para el carrito
    const itemsCarrito = Array.from({ length: numberOfRooms }, (_, index) => ({ nombre: `Habitación ${index + 1}` }));
    console.log(itemsCarrito);
        return (
        <div className="espacio layout-container">
            <div className="left-section">
<MetodoPago formData={formData} items={itemsCarrito} /> 
            </div>

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