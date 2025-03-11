import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Prenotazione.css"; // File CSS personalizzato

const Prenotazione = () => {
  const [username, setUsername] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [orariDisponibili, setOrariDisponibili] = useState([]);
  const [selectedOrario, setSelectedOrario] = useState("");
  const [selectedTrattamento, setSelectedTrattamento] = useState("");
  const [prenotazioneConfermata, setPrenotazioneConfermata] = useState(null);
  const [trattamenti, setTrattamenti] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payloadBase64 = token.split(".")[1];
        const payloadJson = atob(payloadBase64);
        const userData = JSON.parse(payloadJson);
        setUsername(userData.sub); // Recupera il nome utente dal token JWT
      } catch (error) {
        console.error("Errore nella decodifica del token:", error);
      }
    }
    fetchTrattamenti(); // Recupera i trattamenti all'inizio
  }, []);

  const getSaluto = () => {
    const ora = new Date().getHours();
    if (ora < 12) return "Buongiorno";
    else if (ora < 18) return "Buon pomeriggio";
    else return "Buonasera";
  };

  const getUserIdFromToken = (token) => {
    try {
      const payloadBase64 = token.split(".")[1]; // Ottieni la parte centrale del token
      const payloadJson = atob(payloadBase64); // Decodifica la base64
      const userData = JSON.parse(payloadJson); // Converte in JSON
      return userData.sub; // Estrai l'ID utente (o la proprietà che contiene l'ID)
    } catch (error) {
      console.error("Errore nella decodifica del token:", error);
      return null; // In caso di errore, ritorna null
    }
  };

  const fetchTrattamenti = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token non trovato");

      const response = await fetch("http://localhost:8080/trattamenti/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error("Errore nel recupero dei trattamenti");

      const data = await response.json();
      setTrattamenti(data);
    } catch (error) {
      console.error("Errore nel recupero dei trattamenti:", error);
    }
  };

  const fetchOrariDisponibili = async (date) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token non trovato");

      const formattedDate = date.toISOString().split("T")[0];
      console.log("Data selezionata:", formattedDate);

      const response = await fetch(
        `http://localhost:8080/appuntamento/orariodisponibile?data=${formattedDate}&id_trattamento=${selectedTrattamento}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!response.ok) throw new Error("Errore nella risposta del server");

      const data = await response.json();
      setOrariDisponibili(data);
    } catch (error) {
      console.error("Errore nel recupero degli orari disponibili", error);
      setOrariDisponibili([]); // Reset in caso di errore
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    fetchOrariDisponibili(date);
  };

  const handlePrenotazione = async () => {
    if (!selectedOrario || !selectedTrattamento) {
      alert("Seleziona un trattamento e un orario prima di confermare!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token non trovato");

      const formattedDate = selectedDate.toISOString().split("T")[0];
      const userId = getUserIdFromToken(token); // Ottieni l'ID utente dal token

      if (!userId) {
        alert("Impossibile estrarre l'ID utente dal token.");
        return;
      }

      // Chiamata per creare una nuova prenotazione
      const response = await fetch(
        "http://localhost:8080/appuntamento/nuovoappuntamento",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            data: formattedDate,
            oraappuntamento: selectedOrario,
            id_trattamento: selectedTrattamento, // ID trattamento
            id_utente: userId // ID utente
          })
        }
      );

      if (!response.ok) throw new Error("Errore durante la prenotazione");

      const result = await response.json();
      setPrenotazioneConfermata(result);
    } catch (error) {
      console.error("Errore durante la prenotazione:", error);
    }
  };

  return (
    <div className="container">
      <h2>
        {getSaluto()}, {username}!
      </h2>
      <h3>Prenota il tuo appuntamento</h3>

      <div className="calendar-container">
        <Calendar onChange={handleDateChange} value={selectedDate} />
      </div>

      <h3>Seleziona il trattamento:</h3>
      <select
        onChange={(e) => setSelectedTrattamento(e.target.value)}
        value={selectedTrattamento}
      >
        <option value="">Seleziona un trattamento</option>
        {trattamenti.map((trattamento) => (
          <option key={trattamento.id} value={trattamento.id}>
            {trattamento.tipotrattamento} - {trattamento.durata_minuti} minuti
          </option>
        ))}
      </select>

      <h3>Orari Disponibili:</h3>
      {orariDisponibili.length > 0 ? (
        <select
          onChange={(e) => setSelectedOrario(e.target.value)}
          value={selectedOrario}
        >
          <option value="">Seleziona un orario</option>
          {orariDisponibili.map((orario, index) => (
            <option key={index} value={orario}>
              {orario}
            </option>
          ))}
        </select>
      ) : (
        <p>Nessun orario disponibile per questa data.</p>
      )}

      <button
        onClick={handlePrenotazione}
        disabled={!selectedOrario || !selectedTrattamento}
      >
        Conferma Prenotazione
      </button>

      {prenotazioneConfermata && (
        <div className="success-message">
          <p>
            Prenotazione confermata per il {prenotazioneConfermata.data} alle{" "}
            {prenotazioneConfermata.oraappuntamento}
          </p>
        </div>
      )}
    </div>
  );
};

export default Prenotazione;
