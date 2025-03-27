import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Importo lo stile per il calendario
import { Button, Card, Spinner, Alert } from "react-bootstrap";
import { it } from "date-fns/locale"; // Importo la lingua italiana
import "../style/OrariLiberi.css"; // css adibito

function OrariLiberi() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [orariLiberi, setOrariLiberi] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Funzione per verificare se una data è domenica o lunedì
  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 1; // 0 = domenica, 1 = lunedì
  };

  const fetchOrariLiberi = async (date) => {
    if (!date) return;
    setLoading(true);
    setError(""); // Resetta l'errore

    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("tipo_ruolo");

      if (!token || role !== "BARBER") {
        console.error(
          "Accesso negato: l'utente non è un BARBER o non è autenticato"
        );
        return;
      }

      // Correzione per evitare il problema del fuso orario!!!!!!!
      const correctedDate = new Date(date);
      correctedDate.setMinutes(date.getMinutes() - date.getTimezoneOffset()); // Normalizza il fuso orario

      // Formatta la data in formato yyyy-MM-dd (senza influenze del fuso orario)!!!!
      const formattedDate = correctedDate.toISOString().split("T")[0];

      // Chiamata API per ottenere gli orari liberi
      const response = await fetch(
        `/appuntamento/orariliberi/${formattedDate}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}` // Invia il token nel header
          }
        }
      );

      if (!response.ok) {
        throw new Error("Errore nel recupero degli orari");
      }

      // Recupero i dati dalla risposta in formato JSON
      const data = await response.json();

      // Aggiorna lo stato con gli orari liberi
      setOrariLiberi(data);
    } catch (error) {
      console.error("Errore nel recupero degli orari", error);
      setError(
        "C'è stato un errore nel recupero degli orari. Riprova più tardi."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchOrariLiberi(selectedDate);
    }
  }, [selectedDate]);

  return (
    <div className="orari-liberi-container">
      <h3 className="title">Seleziona una data per vedere gli orari liberi</h3>

      <div className="calendar-container">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="Seleziona una data"
          className="form-control calendar"
          minDate={new Date()} // Non permetto di selezionare date nel passato
          filterDate={(date) => !isWeekend(date)} // Disabilito domenica e lunedì
          locale={it} // Imposta la lingua italiana
        />
      </div>

      {loading && (
        <div className="loading-container">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {error && !loading && (
        <Alert variant="danger" className="error-message">
          <strong>Errore: </strong>
          {error}
        </Alert>
      )}

      {!loading && orariLiberi.length > 0 && (
        <Card className="orari-card mt-4">
          <Card.Body>
            <Card.Title>Orari Disponibili:</Card.Title>
            <div className="orari-list">
              {orariLiberi.map((orario, index) => (
                <Button key={index} className="orario-btn">
                  {orario}
                </Button>
              ))}
            </div>
          </Card.Body>
        </Card>
      )}

      {!loading && orariLiberi.length === 0 && (
        <Alert variant="info" className="no-orari-message">
          Nessun orario disponibile per questa data.
        </Alert>
      )}
    </div>
  );
}

export default OrariLiberi;
