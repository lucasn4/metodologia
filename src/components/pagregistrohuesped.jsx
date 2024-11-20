import Header from './header.jsx';
import Footer from './footer.jsx';
import React, { useState, useEffect, useRef } from 'react';
import '../assets/styles/formulario.css';
import Calendar from 'react-calendar';
import CompPago from './comp-Pago.jsx';
import 'react-calendar/dist/Calendar.css';
import '../assets/styles/reservafechas.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Formulario() {
  const [metodoPago, setMetodoPago] = useState("");
  const [file, setFile] = useState(null);
  const [fileChosen, setFileChosen] = useState("Ningún archivo seleccionado");
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setFileChosen(event.target.files[0].name);
};
    const [formData, setFormData] = useState({
        nombreH: '',
        apellidoH: '',
        telefonoH: '',
        emailH: '',
        vehiculoH: false,
        tipoH: '',
        marcamodeloH: '',
        colorH: '',
        patenteH: ''
    });
    
    const [currentStep, setCurrentStep] = useState(1);
    const [habitacionesDisponibles, setHabitacionesDisponibles] = useState(null);
    const reservaRef = useRef();
    const [selectedDates, setSelectedDates] = useState([]); 
    const [dateRange, setDateRange] = useState(''); 
    const [successMessage, setSuccessMessage] = useState('');
    const [nhabitaciones, setNhabitaciones] = useState(1);    // Almacena el número de habitaciones seleccionadas
    const [errors, setErrors] = useState({});
    const [error, setError] = useState("");  
    const [availabilityError, setAvailabilityError] = useState(false);
    const [nofechas, setNofechas] = useState([]);
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [fechaconflicto, setFechaconflicto] = useState('');
    // Almacena el mensaje de error

    const formatDate = (date) => {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
      };
    ;
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
        setErrors({ ...errors, [name]: '' }); // Limpiar error cuando el usuario empieza a escribir
    
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Asegúrate de que haya dos fechas seleccionadas
            if (selectedDates.length !== 2) {
                console.warn("Debe seleccionar un rango de dos fechas.");
                return;
            }
            if (!metodoPago) {
              setSuccessMessage('Error: Debe seleccionar un método de pago');
              return;
          }
    
            // Formatea las fechas
            const startDate = selectedDates[0].toISOString().split('T')[0];
            const endDate = selectedDates[1].toISOString().split('T')[0];
            // Incluye los datos del huésped y las fechas en el cuerpo de la solicitud
            const response = await fetch('http://localhost:5000/api/guardarDatosYReservarFechas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, startDate, endDate,nhabitaciones,metodoPago }),
            });
    
            if (response.ok) {
                const data = await response.json();
                setSuccessMessage('Datos enviados con éxito'); 
                // Reinicia el formulario y el estado
                setFormData({
                    nombreH: '',
                    apellidoH: '',
                    telefonoH: '',
                    emailH: '',
                    vehiculoH: false,
                    tipoH: '',
                    marcamodeloH: '',
                    colorH: '',
                    patenteH: ''
                });
                setSelectedDates([]);
                setDateRange('');
                setCurrentStep(1); // Vuelve al primer paso del formulario
            } else {
                console.error('Error al enviar los datos');
                setSuccessMessage('Error al enviar los datos'); 
            }
            console.log('Datos del huésped:', { ...formData });
            console.log('Fechas:', { startDate, endDate });
            console.log('Habitaciones reservadas:', nhabitaciones);


// Reiniciar todos los estados
setFormData({
  nombreH: '',
  apellidoH: '',
  telefonoH: '',
  emailH: '',
  vehiculoH: false,
  tipoH: '',
  marcamodeloH: '',
  colorH: '',
  patenteH: ''
});
setSelectedDates([]);
setDateRange('');
setCurrentStep(1);
setMetodoPago("");
setFile(null);
setFileChosen("Ningún archivo seleccionado");






           ///////////// Lógica de envío a gmail

            const formDataToSend = new FormData();
          formDataToSend.append("to", "programacionprueba99@gmail.com");
          formDataToSend.append("subject", "Nueva Reserva");
          formDataToSend.append(
              "text",
              `Información de el Huesped; PAGO
                  Nombre: ${formData.nombreH}
                  Apellido: ${formData.apellidoH}
                  Teléfono: ${formData.telefonoH}
                  Email: ${formData.emailH}
                  Pago: ${metodoPago}
                  Estado del Pago: Pendiente
        Habitaciones Reservadas: ${nhabitaciones}  
                  Fecha de entrada: ${startDate}
                  Fecha de salida: ${endDate}
                  ${formData.vehiculoH ? `Vehículo: Sí` : `Vehículo: No`}
                  ${formData.vehiculoH ? `Tipo de vehículo: ${formData.tipoH}` : ""}
                  ${formData.vehiculoH ? `Marca y modelo: ${formData.marcamodeloH}` : ""}
                  ${formData.vehiculoH ? `Color: ${formData.colorH}` : ""}
                  ${formData.vehiculoH ? `Patente: ${formData.patenteH}` : ""}`
          );
            if (file) {
              formDataToSend.append("attachment", file);
          }

            const response2 = await fetch(
              "http://localhost:5000/api/email/send-email",
              {
                  method: "POST",
                  body: formDataToSend,
              }
          );



        } catch (error) {
            console.error('Error en la solicitud:', error);
            setSuccessMessage('Error al enviar los datos'); 
        }
    };
    
    
    //const isStepOneComplete = formData.nombreH && formData.apellidoH && formData.telefonoH && formData.emailH;
    const isStepOneComplete2 = selectedDates;

    const validateStepOne = () => {
      const newErrors = {};
      if (!formData.nombreH) newErrors.nombreH = 'Debe ingresar este campo';
      if (!formData.apellidoH) newErrors.apellidoH = 'Debe ingresar este campo';
      if (!formData.telefonoH) newErrors.telefonoH = 'Debe ingresar este campo';
      if (!formData.emailH) newErrors.emailH = 'Debe ingresar este campo';
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
  };
  const validateStepTwo = () => {
    const newErrors = {};
    if (selectedDates.length !== 2) { // Verifica que se hayan seleccionado dos fechas
        newErrors.selectedDates = 'Debe seleccionar un rango de dos fechas';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};

    const handleNext = () => {
        if (validateStepOne()) {
            setCurrentStep(2);
        }
    };
    const handleNext3 = async () => {
      if (!validateStepTwo()) return;
    
      try {
        const startDate = formatDate(selectedDates[0]);
        const endDate = formatDate(selectedDates[1]);
    
        const response = await fetch(
          `http://localhost:5000/api/verificarDisponibilidad?startDate=${startDate}&endDate=${endDate}`
        );
    
        if (!response.ok) {
          throw new Error('Error al verificar la disponibilidad');
        }
    
        const data = await response.json();
        let ban=false;
        let hasError = false;
        console.log("aqui");
        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            console.log(data[i].habitacionesdis, nhabitaciones,data[i].fechasdis);
            if (data[i].habitacionesdis >= nhabitaciones) {
                ban=true;
            }
            else{
              ban=false;
              setFechaconflicto(data[i].fechasdis);
              break;

            }
          }
          if(ban){
            setCurrentStep(3);
          }
          else{
            setNofechas(formatDate(data[i].fechasdis));
            hasError = true;
          }
        } else {
          hasError = true;
        }
        setAvailabilityError(hasError);
      } catch (error) {
        console.error('Error:', error.message);
        setAvailabilityError(true); // Por si hay un error en la solicitud
      }
    };
    

    const handleBack = () => {
        setCurrentStep(1);
    };
    const handleBack2 = () => {
        setCurrentStep(2);
    };

    // Estado para el rango de fechas seleccionadas en el calendario
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const handleDateClick = (date) => {
        if (selectedDates.length < 2) {
            const newDates = [...selectedDates, date];
            setSelectedDates(newDates);

            if (newDates.length === 2) {
                const formattedDates = newDates
                .map((date) => date.toLocaleDateString('es-ES'))
                .join(' / ');
                setDateRange(`(${formattedDates})`);
            }
        } else {
            setSelectedDates([date]);
            setDateRange('');
        }
    };

    const tileClassName = ({ date }) => {
        if (selectedDates.length === 2) {
            const [startDate, endDate] = selectedDates;
            if (date >= startDate && date <= endDate) {
                return 'in-range';
            }
        }
        return selectedDates.some(
        (selectedDate) => selectedDate.toDateString() === date.toDateString()
        )
          ? 'selected'
          : null;
    };

    const tileDisabled = ({ date }) => {
        date.setHours(0, 0, 0, 0);
        if (date < today) {
            return true;
        }
        if (selectedDates.length === 1 && date < selectedDates[0]) {
            return true;
        }
        return false;
    };
    useEffect(() => {
      if (selectedDates.length === 2) { // Asegúrate de que hay dos fechas seleccionadas
        const s = formatDate(selectedDates[0]);
        const e = formatDate(selectedDates[1]);
        setStart(s);
        setEnd(e);
      }
    }, [selectedDates]); // El efecto se ejecutará solo cuando cambie `selectedDates`
    return (
        <>
            <Header />

            <div className="form-container">
                
                <form onSubmit={handleSubmit} className="form">
                {successMessage && <label className="success-message">{successMessage}</label>}
                    
                    {currentStep === 1 && (
                        <>
                            <label>PASO 1</label>
                            <div className="icon-container">
  <div 
    className="icon-circle" 
    style={{
      backgroundColor: currentStep === 1 ? '#48362C' : 'lightgrey'
    }}
  >
    <i className="bi bi-file-person" style={{ fontSize: '2rem', color: 'white'}}></i>
  </div>

  <div 
    className="icon-circle"
    style={{
      backgroundColor: 'lightgrey'
    }}
  >
    <i className="bi bi-three-dots" style={{ fontSize: '2rem', color: 'white' }}></i>
  </div>

  <div 
    className="icon-circle" 
    style={{
      backgroundColor: currentStep === 2 ? '#48362C' : 'lightgrey'
    }}
  >
    <i className="bi bi-door-closed" style={{ fontSize: '2rem', color: 'white' }}></i>
  </div>

  <div 
    className="icon-circle" 
    style={{
      backgroundColor: 'lightgrey'
    }}
  >
    <i className="bi bi-three-dots" style={{ fontSize: '2rem', color: 'white' }}></i>
  </div>

  <div 
    className="icon-circle" 
    style={{
      backgroundColor: currentStep === 3 ? '#48362C' : 'lightgrey'
    }}
  >
    <i className="bi bi-cash-coin" style={{ fontSize: '2rem', color: 'white' }}></i>
  </div>
</div>
<label>Nombre (*):
                                <input
                                    type="text"
                                    name="nombreH"
                                    value={formData.nombreH}
                                    placeholder="Ingrese su nombre"
                                    onChange={handleChange}
                                    style={{ borderColor: errors.nombreH ? 'red' : '' }}
                                />
                                {errors.nombreH && <span className="error-text">{errors.nombreH}</span>}
                            </label>
                            <label>Apellido (*):
                                <input
                                    type="text"
                                    name="apellidoH"
                                    value={formData.apellidoH}
                                    placeholder="Ingrese su apellido"
                                    onChange={handleChange}
                                    style={{ borderColor: errors.apellidoH ? 'red' : '' }}
                                />
                                {errors.apellidoH && <span className="error-text">{errors.apellidoH}</span>}
                            </label>
                            <label>Teléfono (*):
                                <input
                                    type="tel"
                                    name="telefonoH"
                                    value={formData.telefonoH}
                                    placeholder="Ingrese su telefono"
                                    onChange={handleChange}
                                    style={{ borderColor: errors.telefonoH ? 'red' : '' }}
                                />
                                {errors.telefonoH && <span className="error-text">{errors.telefonoH}</span>}
                            </label>
                            <label>Email (*):
                                <input
                                    type="email"
                                    name="emailH"
                                    value={formData.emailH}
                                    placeholder="Ingrese su email"
                                    onChange={handleChange}
                                    style={{ borderColor: errors.emailH ? 'red' : '' }}
                                />
                                {errors.emailH && <span className="error-text">{errors.emailH}</span>}
                            </label>
                            <label>Vehículo:
                                <input
                                    type="checkbox"
                                    name="vehiculoH"
                                    checked={formData.vehiculoH}
                                    onChange={handleChange}
                                />
                            </label>

                            {formData.vehiculoH && (
                                <>
                                    <label>Tipo:
                                        <input
                                            type="text"
                                            name="tipoH"
                                            value={formData.tipoH}
                                    placeholder="Ingrese su tipo de vehiculo"
                                            onChange={handleChange}
                                        />
                                    </label>
                                    <label>Marca/Modelo:
                                        <input
                                            type="text"
                                            name="marcamodeloH"
                                            value={formData.marcamodeloH}
                                    placeholder="Ingrese marca y modelo de su vehiculo"
                                            onChange={handleChange}
                                        />
                                    </label>
                                    <label>Color:
                                        <input
                                            type="text"
                                            name="colorH"
                                            value={formData.colorH}
                                            placeholder="Ingrese el color de su vehiculo"
                                            onChange={handleChange}
                                        />
                                    </label>
                                    <label>Patente:
                                        <input
                                            type="text"
                                            name="patenteH"
                                            value={formData.patenteH}
                                            placeholder="Ingrese patente de su vehiculo"
                                            onChange={handleChange}
                                        />
                                    </label>
                                </>
                            )}
                            <label style={{ color: 'red' }}>(*) Campos obligatorios</label>
                            <button type="button" onClick={handleNext}>
                                Siguiente
                            </button>
                        </>
                    )}

                    {currentStep === 2 && (
                        <>
                        <label>PASO 2</label>
                        <div className="icon-container">
  <div 
    className="icon-circle" 
    style={{
      backgroundColor: currentStep === 1 ? '#48362C' : 'lightgrey'
    }}
  >
    <i className="bi bi-file-person" style={{ fontSize: '2rem', color: 'white'}}></i>
  </div>

  <div 
    className="icon-circle"
    style={{
      backgroundColor: 'lightgrey'
    }}
  >
    <i className="bi bi-three-dots" style={{ fontSize: '2rem', color: 'white' }}></i>
  </div>

  <div 
    className="icon-circle" 
    style={{
      backgroundColor: currentStep === 2 ? '#48362C' : 'lightgrey'
    }}
  >
    <i className="bi bi-door-closed" style={{ fontSize: '2rem', color: 'white' }}></i>
  </div>

  <div 
    className="icon-circle" 
    style={{
      backgroundColor: 'lightgrey'
    }}
  >
    <i className="bi bi-three-dots" style={{ fontSize: '2rem', color: 'white' }}></i>
  </div>

  <div 
    className="icon-circle" 
    style={{
      backgroundColor: currentStep === 3 ? '#48362C' : 'lightgrey'
    }}
  >
    <i className="bi bi-cash-coin" style={{ fontSize: '2rem', color: 'white' }}></i>
  </div>
</div>
                            <div>
                                <Calendar
                                    onClickDay={handleDateClick}
                                    tileClassName={tileClassName}
                                    tileDisabled={tileDisabled}
                                />
                                <input type="text" value={dateRange} readOnly 
                                    style={{ borderColor: errors.selectedDates ? 'red' : '' }}
                                />
                                {errors.selectedDates && <span className="error-text">{errors.selectedDates}</span>}
                                <label>Numero de habitaciones:
                                <input 
                                type="number" 
                                placeholder="Ingrese el numero de habitaciones" 
                                min={1} 
                                max={7}
                                value={nhabitaciones}
                                onChange={(e) => setNhabitaciones(Number(e.target.value))}
                                />
                                </label>
                                {availabilityError && (
                                <span className="error-text" style={{ color: 'red', fontSize: '12px' }}>
                                No hay disponibilidad en una de las fechas seleccionadas ( 
                                {formatDate(fechaconflicto)}).
                                </span>
                                )}
                            </div>
                            
                            <button type="button" onClick={handleBack}>
                                Atrás
                            </button>
                            
                            <button type="button" onClick={handleNext3} >
                                Siguiente
                            </button>
                            
                        </>
                    )}
                    {currentStep === 3 && (
                        <>
                        <label>PASO 3</label>
                        <div className="icon-container">
  <div 
    className="icon-circle" 
    style={{
      backgroundColor: currentStep === 1 ? '#48362C' : 'lightgrey'
    }}
  >
    <i className="bi bi-file-person" style={{ fontSize: '2rem', color: 'white'}}></i>
  </div>

  <div 
    className="icon-circle"
    style={{
      backgroundColor: 'lightgrey'
    }}
  >
    <i className="bi bi-three-dots" style={{ fontSize: '2rem', color: 'white' }}></i>
  </div>

  <div 
    className="icon-circle" 
    style={{
      backgroundColor: currentStep === 2 ? '#48362C' : 'lightgrey'
    }}
  >
    <i className="bi bi-door-closed" style={{ fontSize: '2rem', color: 'white' }}></i>
  </div>

  <div 
    className="icon-circle" 
    style={{
      backgroundColor: 'lightgrey'
    }}
  >
    <i className="bi bi-three-dots" style={{ fontSize: '2rem', color: 'white' }}></i>
  </div>

  <div 
    className="icon-circle" 
    style={{
      backgroundColor: currentStep === 3 ? '#48362C' : 'lightgrey'
    }}
  >
    <i className="bi bi-cash-coin" style={{ fontSize: '2rem', color: 'white' }}></i>
  </div>
</div>
                            
                            <CompPago 
    formData={formData} 
    nhabiraciones={nhabitaciones} 
    start={start} 
    end={end}
    metodoPago={metodoPago} 
    setMetodoPago={setMetodoPago} 
    handleFileChange={handleFileChange} 
    fileChosen={fileChosen}
/>
<button type="button" onClick={handleBack2}>
    Atrás
</button>
                            
                            <button type="submit" onClick={handleSubmit}>
                                Enviar
                            </button>
                        </>
                    )}
                </form>
            </div>
            <Footer />
        </>
    );
}

export default Formulario;
