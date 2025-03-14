import { useEffect, useState } from "react";
import { Button, Card, Pagination, Container, Row, Col } from "react-bootstrap";
import "./AppuntamentiPage.css"; // Importa il CSS

function AppuntamentiPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [futureAppointments, setFutureAppointments] = useState([]);
  const [pastAppointments, setPastAppointments] = useState([]);
  const [showFuture, setShowFuture] = useState(true); // Flag per mostrare appuntamenti futuri o passati
  const appointmentsPerPage = 3;

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

        if (!response.ok) {
          throw new Error(`Errore nella richiesta: ${response.statusText}`);
        }

        const data = await response.json();

        // Separiamo gli appuntamenti in passati e futuri
        const now = new Date();
        now.setHours(0, 0, 0, 0); // Imposta l'ora a mezzanotte per confronti solo sulla data
        const futureAppointmentsList = data.filter(
          (appointment) =>
            new Date(appointment.data + " " + appointment.oraappuntamento) >=
            now
        );
        const pastAppointmentsList = data.filter(
          (appointment) =>
            new Date(appointment.data + " " + appointment.oraappuntamento) < now
        );

        setFutureAppointments(futureAppointmentsList);
        setPastAppointments(pastAppointmentsList);
      } catch (err) {
        setError(err.message || "Errore sconosciuto");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Ordinamento degli appuntamenti futuri (dal più vicino al più lontano, ordinato anche per ora)
  const sortedFutureAppointments = futureAppointments.sort((a, b) => {
    const dateA = new Date(a.data + " " + a.oraappuntamento);
    const dateB = new Date(b.data + " " + b.oraappuntamento);
    return dateA - dateB; // Dal più vicino al più lontano
  });

  // Ordinamento degli appuntamenti passati (dal più lontano al più vicino, ordinato anche per ora)
  const sortedPastAppointments = pastAppointments.sort((a, b) => {
    const dateA = new Date(a.data + " " + a.oraappuntamento);
    const dateB = new Date(b.data + " " + b.oraappuntamento);
    return dateB - dateA; // Dal più lontano al più vicino
  });

  // Calcolare gli appuntamenti da mostrare sulla pagina corrente (futuri o passati)
  const currentAppointments = showFuture
    ? sortedFutureAppointments
    : sortedPastAppointments;
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const displayedAppointments = currentAppointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );

  // Funzioni per la paginazione
  const totalPages = Math.ceil(
    currentAppointments.length / appointmentsPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Funzioni per cambiare tra appuntamenti futuri e passati
  const showFutureAppointments = () => {
    setShowFuture(true);
    setCurrentPage(1); // Reset della pagina alla prima quando cambiamo tra passati e futuri
  };

  const showPastAppointments = () => {
    setShowFuture(false);
    setCurrentPage(1); // Reset della pagina alla prima quando cambiamo tra passati e futuri
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <Container className="appointments-page my-5">
      <h1 className="text-center mb-4">Promemoria Appuntamenti</h1>

      {/* Sezione per i bottoni di filtro */}
      <div className="d-flex justify-content-center mb-4">
        <Button
          variant={showFuture ? "primary" : "outline-primary"}
          onClick={showFutureAppointments}
          className="mx-2"
        >
          Appuntamenti Futuri
        </Button>
        <Button
          variant={showFuture ? "outline-primary" : "primary"}
          onClick={showPastAppointments}
          className="mx-2"
        >
          Appuntamenti Passati
        </Button>
      </div>

      {/* Messaggio se non ci sono appuntamenti */}
      {currentAppointments.length === 0 ? (
        <p className="text-center">Non hai appuntamenti.</p>
      ) : (
        <Row className="mx-2">
          {displayedAppointments.map((appointment) => (
            <Col key={appointment.id} sm={12} md={6} lg={4}>
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <Card.Title>
                    <strong>{appointment.data}</strong> -{" "}
                    {appointment.oraappuntamento}
                  </Card.Title>
                  <Card.Text>
                    <strong>Trattamento:</strong> <br />
                    {appointment.trattamento.tipotrattamento}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Paginazione */}
      <div className="d-flex justify-content-center my-4">
        <Pagination>
          <Pagination.Prev onClick={prevPage} disabled={currentPage === 1} />
          <Pagination.Item>{currentPage}</Pagination.Item>
          <Pagination.Next
            onClick={nextPage}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
    </Container>
  );
}

export default AppuntamentiPage;
