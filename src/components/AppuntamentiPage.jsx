import { useEffect, useState } from "react";

function AppuntamentiPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token non trovato");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/appuntamento/mieiappuntamenti", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Log della risposta completa
        console.log("Response Status:", response.status);
        const responseText = await response.text();
        console.log("Response Body:", responseText); // Vedi la risposta completa

        if (!response.ok) {
          throw new Error(`Errore nella richiesta: ${responseText}`);
        }

        const data = JSON.parse(responseText); // Parsing manuale della risposta
        setAppointments(data);
      } catch (err) {
        setError(err.message || "Errore sconosciuto");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div>
      <h1>Promemoria Appuntamenti</h1>
      {appointments.length === 0 ? (
        <p>Non hai appuntamenti.</p>
      ) : (
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment.id}>
              {appointment.data} - {appointment.oraappuntamento}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AppuntamentiPage;
