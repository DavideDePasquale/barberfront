import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../style/Prenotazione.css";

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
      if (!token) {
        console.error("Token non trovato!");
        return null;
      }

      const payloadBase64 = token.split(".")[1];
      const payloadJson = atob(payloadBase64);
      const userData = JSON.parse(payloadJson);

      console.log("Payload del token:", userData);

      const userId = userData.utenteId || userData.sub;

      if (!userId) {
        console.error("ID utente non trovato nel token.");
        return null;
      }

      return userId;
    } catch (error) {
      console.error("Errore nella decodifica del token:", error);
      return null;
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

      const formattedDate = date.toLocaleDateString("en-CA", {
        timeZone: "Europe/Rome"
      });

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

      // Se la data selezionata è oggi, disabilita gli orari passati
      const today = new Date();
      if (date.toLocaleDateString() === today.toLocaleDateString()) {
        const currentHour = today.getHours();
        setOrariDisponibili(
          data.filter((orario) => {
            const hour = parseInt(orario.split(":")[0], 10); // Estraggo l'ora
            return hour >= currentHour; // Mantengo solo gli orari futuri
          })
        );
      } else {
        setOrariDisponibili(data); // Usa tutti gli orari se non è oggi
      }
    } catch (error) {
      console.error("Errore nel recupero degli orari disponibili", error);
      setOrariDisponibili([]); // Resetto in caso di errore
    }
  };

  const handleDateChange = (date) => {
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0); // Impostato a mezzanotte

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Impostata la data di oggi a mezzanotte

    // Non permetto la selezione di date nel passato
    if (normalizedDate < today) {
      alert("Non puoi selezionare una data nel passato!");
      return;
    }

    console.log("Data selezionata (normalizzata):", normalizedDate);

    setSelectedDate(normalizedDate);
    fetchOrariDisponibili(normalizedDate);
  };

  const handlePrenotazione = async () => {
    if (!selectedOrario || !selectedTrattamento) {
      alert("Seleziona un trattamento e un orario prima di confermare!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token non trovato");

      const formattedDate = selectedDate.toLocaleDateString("en-CA", {
        timeZone: "Europe/Rome"
      });
      const userId = getUserIdFromToken(token);

      if (!userId) {
        alert("Impossibile estrarre l'ID utente dal token.");
        return;
      }

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
            id_trattamento: Number(selectedTrattamento),
            id_utente: userId
          })
        }
      );

      const rawResponse = await response.text();
      let responseData = {};
      if (rawResponse) {
        responseData = JSON.parse(rawResponse);
      } else {
        console.error("La risposta del server è vuota.");
      }

      if (!response.ok) throw new Error("Errore durante la prenotazione");

      console.log("Risposta del server:", responseData);
      setPrenotazioneConfermata(responseData);
    } catch (error) {
      console.error("Errore durante la prenotazione:", error);
    }
  };

  // Funzione per disabilitare domenica (0) e lunedì (1)
  const tileDisabled = ({ date }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Imposta la data odierna a mezzanotte
    return date < today || date.getDay() === 0 || date.getDay() === 1; // Disabilita le date precedenti a oggi e i giorni di chiusura
  };

  return (
    <div className="container2">
      <h2>
        {getSaluto()}, {username}!
      </h2>
      <h3>Prenota il tuo appuntamento</h3>

      <div className="calendar-container">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileDisabled={tileDisabled} // Aggiunta della logica per disabilitare domenica e lunedì
        />
      </div>

      <h3>Seleziona il trattamento:</h3>
      <select
        onChange={(e) => setSelectedTrattamento(e.target.value)}
        value={selectedTrattamento}
      >
        <option value="">Seleziona un trattamento</option>
        {trattamenti.map((trattamento) => (
          <option key={trattamento.id} value={trattamento.id}>
            {trattamento.tipotrattamento}
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
        <p>Nessun orario disponibile per questa data e trattamento.</p>
      )}

      <button onClick={handlePrenotazione}>Conferma prenotazione</button>

      {prenotazioneConfermata && (
        <div className="success-message">
          <h3>Prenotazione confermata!</h3>
          <p>
            Prenotazione per il giorno {prenotazioneConfermata.data} avvenuta
            con successo ☑️
          </p>
        </div>
      )}
    </div>
  );
};

export default Prenotazione;
