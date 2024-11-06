import React from "react";
import "../assets/styles/pagos.css";
import Pago from "../components/comp-Pago.jsx";

const ReactComponent = () => {
  const itemsCarrito = [
    { nombre: "Habitación Individual" },
    { nombre: "Habitación Doble" },
    // ... más items si es necesario
  ];
  return (
    <div> {/*  Aquí se agrega el div padre */}
      <div className="separacion flex items-center justify-between bg-background p-4">
        <div className="flex items-center">
          <div className="centrar_numero w-8 h-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground">
            1
          </div>
          <div className="ml-2 text-primary font-semibold">Pago</div>
        </div>

        <div className="flex items-center">
          <div className="centrar_numero w-8 h-8 flex items-center justify-center rounded-full bg-secondary text-secondary-foreground">
            2
          </div>
          <div className="ml-2 text-secondary font-semibold">Estado</div>
        </div>

        <div className="flex items-center">
          <div className="centrar_numero w-8 h-8 flex items-center justify-center rounded-full bg-accent text-accent-foreground">
            3
          </div>
          <div className="ml-2 text-accent font-semibold">Confirmación</div>
        </div>
      </div>
      <div className="caja_depago">
      <Pago items={itemsCarrito} /> {/* Pasar la prop items */}
      </div>
    </div> // Cierre del div padre
  );
};

export default ReactComponent;