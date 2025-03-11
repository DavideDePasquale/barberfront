// src/components/Dashboard.jsx
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Dashboard = () => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  useEffect(() => {
    // Qui puoi fare eventuali chiamate al backend per recuperare i trattamenti disponibili,
    // in base alla data selezionata
  }, [date]);

  return (
    <div>
      <h1>Benvenuto nella Dashboard!</h1>
      <div>
        <h2>Seleziona una data per la tua prenotazione:</h2>
        <Calendar onChange={handleDateChange} value={date} />
      </div>
      <div>
        <p>Data selezionata: {date.toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default Dashboard;
