import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Prenotazione = () => {
  const [dataSelezionata, setDataSelezionata] = useState(null);
  const [orariDisponibili, setOrariDisponibili] = useState([]);

  const handleDataChange = async (date) => {
    setDataSelezionata(date);

    // Simuliamo una chiamata API per ottenere gli orari disponibili
    try {
      const response = await fetch(
        `http://localhost:8080/orari-disponibili?data=${
          date.toISOString().split("T")[0]
        }`
      );
      const data = await response.json();
      setOrariDisponibili(data);
    } catch (error) {
      console.error("Errore nel recupero degli orari disponibili", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Seleziona una data per la prenotazione</h2>
      <Calendar onChange={handleDataChange} value={dataSelezionata} />

      {dataSelezionata && (
        <div>
          <h3>
            Orari disponibili per il {dataSelezionata.toLocaleDateString()}:
          </h3>
          {orariDisponibili.length > 0 ? (
            <ul>
              {orariDisponibili.map((orario, index) => (
                <li key={index}>{orario}</li>
              ))}
            </ul>
          ) : (
            <p>Caricamento orari...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Prenotazione;
