import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "../style/BarberAppointments.css";

const BarberAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [appointmentDates, setAppointmentDates] = useState([]);
  const navigate = useNavigate();

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalizza l'orario per confronti precisi

  // Calcola la data massima (tra 8 giorni)
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 6);

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:8080/appuntamento/barber/appuntamenti",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (response.ok) {
          const data = await response.json();

          // Filtra gli appuntamenti per i prossimi 8 giorni
          const filteredAppointments = data.filter((appointment) => {
            const appointmentDate = new Date(appointment.data);
            return appointmentDate >= today && appointmentDate <= maxDate;
          });

          // Ordina prima per data, poi per orario
          const sortedAppointments = filteredAppointments.sort((a, b) => {
            const dateA = new Date(a.data);
            const dateB = new Date(b.data);
            if (dateA - dateB !== 0) return dateA - dateB; // Ordina per data
            return a.oraappuntamento.localeCompare(b.oraappuntamento); // Ordina per orario
          });

          setAppointments(sortedAppointments);
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
    // Raggruppa gli appuntamenti per data (max 7 giorni)
    const groupedAppointments = appointments
      .reduce((acc, appointment) => {
        const dateKey = appointment.data;
        if (!acc.includes(dateKey)) acc.push(dateKey);
        return acc;
      }, [])
      .slice(0, 7); // Prende solo i primi 7 giorni

    setAppointmentDates(groupedAppointments);

    if (groupedAppointments.length > 0) {
      const currentDateIndex = groupedAppointments.indexOf(
        today.toISOString().split("T")[0]
      );
      setCurrentPage(currentDateIndex !== -1 ? currentDateIndex : 0);
    }
  }, [appointments]);

  if (loading) return <p>Caricamento appuntamenti...</p>;
  if (error) return <p>{error}</p>;

  // Appuntamenti della data corrente selezionata
  const currentDayAppointments = appointments.filter(
    (appointment) => appointment.data === appointmentDates[currentPage]
  );

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <div className="container mt-5">
      <h2 className="heading">APPUNTAMENTI📍</h2>

      <div>
        <h3> 📅 GIORNO: {appointmentDates[currentPage]} 📅</h3>
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

      <ReactPaginate
        previousLabel={"← Precedente"}
        nextLabel={"Successiva →"}
        pageCount={appointmentDates.length}
        onPageChange={handlePageChange}
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
