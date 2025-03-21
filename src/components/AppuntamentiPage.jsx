import { useState, useEffect } from "react";
import {
  Button,
  Card,
  Pagination,
  Container,
  Row,
  Col,
  Modal,
  Form,
  Alert
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { it } from "date-fns/locale"; // Importa la lingua italiana da date-fns
import "./AppuntamentiPage.css";

function AppuntamentiPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [futureAppointments, setFutureAppointments] = useState([]);
  const [pastAppointments, setPastAppointments] = useState([]);
  const [showFuture, setShowFuture] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedTrattamento, setSelectedTrattamento] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [trattamenti, setTrattamenti] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const appointmentsPerPage = 3;

  const fetchTrattamenti = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token non trovato");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/trattamenti/all", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error("Errore nella richiesta dei trattamenti");
      }

      const data = await response.json();
      setTrattamenti(data);
    } catch (error) {
      console.error("Errore durante il recupero dei trattamenti:", error);
    }
  };

  const fetchAvailableTimes = async (date) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token non trovato");
      return;
    }

    const formattedDate = new Date(date).toLocaleDateString("en-CA", {
      timeZone: "Europe/Rome"
    });

    console.log("Data selezionata:", formattedDate);

    try {
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

      if (!response.ok) {
        throw new Error(`Errore HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log("Orari disponibili:", data);

      setAvailableTimes(data);
    } catch (error) {
      console.error("Errore durante la fetch degli orari disponibili:", error);
      setAvailableTimes([]);
    }
  };

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

      const now = new Date();
      now.setHours(0, 0, 0, 0);
      const futureAppointmentsList = data.filter(
        (appointment) =>
          new Date(appointment.data + " " + appointment.oraappuntamento) >= now
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

  const handleEditAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setSelectedTime(appointment.oraappuntamento);
    setSelectedTrattamento(appointment.id_trattamento);
    setSelectedDate(new Date(appointment.data));
    setShowModal(true);
    fetchAvailableTimes(appointment.data);
  };

  useEffect(() => {
    fetchAppointments();
    fetchTrattamenti();
  }, []);

  const sortedFutureAppointments = futureAppointments.sort((a, b) => {
    const dateA = new Date(a.data + " " + a.oraappuntamento);
    const dateB = new Date(b.data + " " + b.oraappuntamento);
    return dateA - dateB;
  });

  const sortedPastAppointments = pastAppointments.sort((a, b) => {
    const dateA = new Date(a.data + " " + a.oraappuntamento);
    const dateB = new Date(b.data + " " + b.oraappuntamento);
    return dateB - dateA;
  });

  const currentAppointments = showFuture
    ? sortedFutureAppointments
    : sortedPastAppointments;

  // Pagina attuale da mostrare
  const currentAppointmentsOnPage = currentAppointments.slice(
    (currentPage - 1) * appointmentsPerPage,
    currentPage * appointmentsPerPage
  );

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

  const showFutureAppointments = () => {
    setShowFuture(true);
    setCurrentPage(1);
  };

  const showPastAppointments = () => {
    setShowFuture(false);
    setCurrentPage(1);
  };

  const handleSaveChanges = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Token non trovato");
      return;
    }

    const userId = JSON.parse(atob(token.split(".")[1])).utenteId;

    const formattedDate = selectedDate.toISOString().split("T")[0];
    const formattedTime = selectedTime;
    const trattamentoId = parseInt(selectedTrattamento, 10);

    try {
      const response = await fetch(`/appuntamento/${selectedAppointment.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          data: formattedDate,
          oraappuntamento: formattedTime,
          id_trattamento: trattamentoId,
          id_utente: userId
        })
      });

      if (!response.ok) {
        throw new Error("Errore nella modifica dell'appuntamento");
      }

      setSuccessMessage("La modifica della prenotazione è andata a buon fine!");
      setShowModal(false);
      fetchAppointments();
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (error) {
      setError(error.message || "Errore nella modifica dell'appuntamento");
    }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableTimes(selectedDate);
    }
  }, [selectedDate]);

  const isWeekend = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 1; // Domenica = 0, Lunedì = 1
  };

  const today = new Date(); // Data odierna

  const isAppointmentPassed = (appointment) => {
    const appointmentDate = new Date(
      appointment.data + " " + appointment.oraappuntamento
    );
    return appointmentDate < today;
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

      {successMessage && (
        <Alert variant="success" className="text-center">
          {successMessage}
        </Alert>
      )}

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

      {currentAppointmentsOnPage.length === 0 ? (
        <p className="text-center">Non hai appuntamenti.</p>
      ) : (
        <Row className="mx-2">
          {currentAppointmentsOnPage.map((appointment) => (
            <Col key={appointment.id} md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>
                    Trattamento :<br />{" "}
                    {appointment.trattamento.tipotrattamento}
                  </Card.Title>
                  <Card.Text>
                    <strong>Data:</strong> {appointment.data}
                    <br />
                    <strong>Orario:</strong> {appointment.oraappuntamento}
                  </Card.Text>
                  {/* Condizione per mostrare il tasto "Modifica" solo per appuntamenti futuri */}
                  {!isAppointmentPassed(appointment) && (
                    <Button
                      variant="primary"
                      onClick={() => handleEditAppointment(appointment)}
                    >
                      Modifica
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <div className="d-flex justify-content-center">
        <Pagination>
          <Pagination.Prev onClick={prevPage} />
          <Pagination.Item>{currentPage}</Pagination.Item>
          <Pagination.Next onClick={nextPage} />
        </Pagination>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica Appuntamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formDate">
              <Form.Label>Data</Form.Label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="form-control"
                dateFormat="yyyy/MM/dd"
                locale={it} // Imposta la lingua italiana
                minDate={today}
                filterDate={isWeekend}
              />
            </Form.Group>

            <Form.Group controlId="formTrattamento">
              <Form.Label>Trattamento</Form.Label>
              <Form.Control
                as="select"
                value={selectedTrattamento}
                onChange={(e) => setSelectedTrattamento(e.target.value)}
              >
                {trattamenti.map((trattamento) => (
                  <option key={trattamento.id} value={trattamento.id}>
                    {trattamento.tipotrattamento}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formTime">
              <Form.Label>Orario</Form.Label>
              <Form.Control
                as="select"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              >
                {availableTimes.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <div className="d-flex justify-content-center mt-4">
              <Button variant="success" onClick={handleSaveChanges}>
                Salva modifiche
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default AppuntamentiPage;
