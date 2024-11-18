import React from "react";
import { Link } from "react-router-dom";
import { RiAddLine } from "react-icons/ri";

const CardTicket = ({ ticket, totalTickets, text, Linkpagina }) => {
  let statusClass = "";

  // Colores para diferentes tipos de tickets
  switch (ticket) {
    case "pending":
      statusClass = "bg-yellow-500/10 text-yellow-300";
      break;
    case "inProcess":
      statusClass = "bg-blue-500/10 text-blue-300";
      break;
    case "close":
      statusClass = "bg-green-500/10 text-green-300";
      break;
    case "total":
      statusClass = "bg-pink-500/10 text-pink-300";
      break;
    default:
      statusClass = "bg-gray-700 text-gray-300";
  }

  return (
    <Link
      to={Linkpagina}
      className="card-ticket bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="text-center mb-6">
        {/* Información del ticket */}
        <h1 className="text-5xl font-bold text-white">{totalTickets}</h1>
        <h2 className={`text-xl font-medium ${statusClass}`}>{text}</h2>
       
        
      </div>

      {/* Botón de agregar */}
      <div className="text-center mt-4">
        
      </div>
    </Link>
  );
};

export default CardTicket;
