import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "./BarberAppointments.css"; // Importiamo il file CSS per gli stili personalizzati

const BarberAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0); // Stato per la pagina corrente
  const [appointmentDates, setAppointmentDates] = useState([]); // Stato per le date degli appuntamenti
  const navigate = useNavigate();

  const today = new Date(); // Data di oggi
  const endDate = new Date(today);
  endDate.setDate(today.getDate() + 8); // Definisci il giorno finale (oggi + 7 giorni, ad esempio)

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem("token"); // Ottieni il token dal localStorage

      if (!token) {
        navigate("/login"); // Se non c'è il token, reindirizza al login
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:8080/appuntamento/barber/appuntamenti",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}` // Aggiungi il token nell'header
            }
          }
        );

        if (response.ok) {
          const data = await response.json();

          // Ordina gli appuntamenti per data e orario (dalla più piccola alla più grande)
          const sortedAppointments = data
            .filter((appointment) => {
              const appointmentDate = new Date(appointment.data);
              return appointmentDate >= today && appointmentDate <= endDate;
            })
            .sort((a, b) => {
              // Crea un oggetto Date combinando la data e l'orario
              const dateA = new Date(`${a.data}T${a.oraappuntamento}`);
              const dateB = new Date(`${b.data}T${b.oraappuntamento}`);
              return dateA - dateB; // Ordina in ordine crescente
            });

          setAppointments(sortedAppointments); // Setta direttamente gli appuntamenti con i dati ordinati
        } else {
          setError("Errore nel recupero degli appuntamenti");
        }
      } catch (error) {
        console.error("ERROR : " + error);
        setError("Errore di rete");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [navigate]);

  useEffect(() => {
    // Raggruppa gli appuntamenti per data
    const groupedAppointments = appointments.reduce((acc, appointment) => {
      const dateKey = appointment.data; // Usa la data come chiave
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(appointment);
      return acc;
    }, {});

    // Ottieni una lista di date uniche (giorni)
    const dates = Object.keys(groupedAppointments).sort();
    setAppointmentDates(dates); // Salva le date nel state

    if (dates.length > 0) {
      const currentDate = new Date().toISOString().split("T")[0]; // Data di oggi in formato YYYY-MM-DD
      const currentDateIndex = dates.indexOf(currentDate);

      // Se oggi è presente nella lista, imposta la pagina, altrimenti metti la prima disponibile
      setCurrentPage(currentDateIndex !== -1 ? currentDateIndex : 0);
    }
  }, [appointments]); // Ricalcola le date degli appuntamenti ogni volta che gli appuntamenti cambiano

  if (loading) return <p>Caricamento appuntamenti...</p>;

  if (error) return <p>{error}</p>;

  // Ottieni gli appuntamenti per il giorno selezionato
  const currentDayAppointments = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.data);
    return (
      appointmentDate >= today &&
      appointmentDate <= endDate &&
      appointment.data === appointmentDates[currentPage]
    );
  });

  // Funzione per gestire il cambiamento di pagina
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <div className="container mt-5">
      <h2 className="heading">APPUNTAMENTI📍</h2>

      {/* Visualizza gli appuntamenti del giorno corrente */}
      <div>
        <h3> 📅GIORNO : {appointmentDates[currentPage]} 📅</h3>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">Nome Utente 🧔🏻</th>
              <th scope="col">Orario 🕰️</th>
              <th scope="col">Trattamento 💇🏻‍♂️</th>
            </tr>
          </thead>
          <tbody>
            {currentDayAppointments.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center">
                  Nessun appuntamento per questo giorno
                </td>
              </tr>
            ) : (
              currentDayAppointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.utenteNome}</td>
                  <td>{appointment.oraappuntamento}</td>
                  <td>{appointment.trattamentoNome}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Paginazione per le date */}
      <ReactPaginate
        previousLabel={"← Precedente"}
        nextLabel={"Successiva →"}
        pageCount={appointmentDates.length} // Numero totale di giorni
        onPageChange={handlePageChange} // Gestisce il cambiamento di pagina
        containerClassName={"pagination"}
        activeClassName={"active"}
        pageClassName={"page-item"}
        previousClassName={"page-item"}
        nextClassName={"page-item"}
        breakClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousLinkClassName={"page-link"}
        nextLinkClassName={"page-link"}
        breakLinkClassName={"page-link"}
      />
    </div>
  );
};

export default BarberAppointments;
