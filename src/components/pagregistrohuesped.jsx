import Header from './header.jsx';
import Footer from './footer.jsx';
import React, { useState, useEffect,useRef  } from 'react';
import '../assets/styles/formulario.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../assets/styles/reservafechas.css';

function Formulario() {
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
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            const response = await fetch('http://localhost:5000/api/guardarDatos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            // Enviar las fechas solo si hay dos seleccionadas
            if (selectedDates.length === 2) {
                sendDatesToBackend(selectedDates);
            } else {
                console.warn("Debe seleccionar un rango de dos fechas.");
            }

            if (response.ok) {
                const data = await response.json();
                console.log(data.message); // Muestra el mensaje de éxito
                // Reiniciar el formulario y las fechas
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
                setCurrentStep(1); // Volver al primer paso del formulario
            } else {
                console.error('Error al enviar los datos');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    const isStepOneComplete = formData.nombreH && formData.apellidoH && formData.telefonoH && formData.emailH;

    const handleNext = () => {
        if (isStepOneComplete) {
            setCurrentStep(2);
        }
    };

    const handleBack = () => {
        setCurrentStep(1);
    };

    /******************************************************  */

    const [selectedDates, setSelectedDates] = useState([]); // Array de fechas seleccionadas
    const [dateRange, setDateRange] = useState(''); // Rango de fechas en texto
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Asegura que 'today' solo tenga la fecha sin horas

    const handleDateClick = (date) => {
        if (selectedDates.length < 2) {
            const newDates = [...selectedDates, date];
            setSelectedDates(newDates);

            // Si ya se han seleccionado dos fechas, crea el rango
            if (newDates.length === 2) {
                const formattedDates = newDates
                .map((date) => date.toLocaleDateString('es-ES'))
                .join(' / ');
                setDateRange(`(${formattedDates})`);
                /*sendDatesToBackend(newDates);*/
            }
        } else {
            // Si ya se seleccionaron dos fechas, reinicia
            setSelectedDates([date]);
            setDateRange('');
        }
    };

    const sendDatesToBackend = async (dates) => {
    try {
        const startDate = dates[0].toISOString().split('T')[0];
        const endDate = dates[1].toISOString().split('T')[0];

        const response = await fetch('http://localhost:5000/api/reservarFechas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ startDate, endDate }),
        });
    
        const data = await response.json();
        console.log(data.message); // Mostrar mensaje de éxito o error
    } catch (error) {
        console.error('Error al reservar fechas:', error);
    }
    };
    // Función para resaltar fechas dentro del rango
    const tileClassName = ({ date }) => {
        if (selectedDates.length === 2) {
            const [startDate, endDate] = selectedDates;
            // Comprueba si la fecha está dentro del rango
            if (date >= startDate && date <= endDate) {
                return 'in-range'; // Aplica una clase 'in-range' para las fechas dentro del rango
            }
        }

        // Aplica la clase 'selected' solo a las fechas seleccionadas
        return selectedDates.some(
        (selectedDate) => selectedDate.toDateString() === date.toDateString()
        )
          ? 'selected'
          : null;
    };

    // Deshabilita las fechas antes de hoy o dentro del rango seleccionado
    const tileDisabled = ({ date }) => {
        date.setHours(0, 0, 0, 0); // Asegura que solo compare la fecha sin horas
        if (date < today) {
            return true;
        }
        if (selectedDates.length === 1 && date < selectedDates[0]) {
            return true;
        }
        return false;
    };

    return (
        <>
            <Header />
            <div className="form-container">
                <form onSubmit={handleSubmit} className="form">
                    {currentStep === 1 && (
                        <>
                            <label>Nombre:
                                <input
                                    type="text"
                                    name="nombreH"
                                    value={formData.nombreH}
                                    onChange={handleChange}
                                />
                            </label>

                            <label>Apellido:
                                <input
                                    type="text"
                                    name="apellidoH"
                                    value={formData.apellidoH}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>Teléfono:
                                <input
                                    type="tel"
                                    name="telefonoH"
                                    value={formData.telefonoH}
                                    onChange={handleChange}
                                />
                            </label>
                            
                            <label>Email:
                                <input
                                    type="email"
                                    name="emailH"
                                    value={formData.emailH}
                                    onChange={handleChange}
                                />
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
                                            onChange={handleChange}
                                        />
                                    </label>
                                    <label>Marca/Modelo:
                                        <input
                                            type="text"
                                            name="marcamodeloH"
                                            value={formData.marcamodeloH}
                                            onChange={handleChange}
                                        />
                                    </label>
                                    <label>Color:
                                        <input
                                            type="text"
                                            name="colorH"
                                            value={formData.colorH}
                                            onChange={handleChange}
                                        />
                                    </label>

                                    <label>Patente:
                                        <input
                                            type="text"
                                            name="patenteH"
                                            value={formData.patenteH}
                                            onChange={handleChange}
                                        />
                                    </label>
                                </>
                            )}

                            <button type="button" onClick={handleNext} disabled={!isStepOneComplete}>
                                Siguiente
                            </button>
                        </>
                    )}

                    {currentStep === 2 && (
                        <>
                            <div>
                                <Calendar
                                    onClickDay = {handleDateClick}
                                    tileClassName={tileClassName}
                                    tileDisabled={tileDisabled}
                                    />
                                <input type="text" value={dateRange} readOnly />
                            </div>
                            
                            <button type="button" /*onClick={}*/>
                                Ver disponibilidad habitaciones
                            </button>

                            

                            <button type="button" onClick={handleBack}>
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