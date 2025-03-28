import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Alert,
  Card,
  Container,
  Row,
  Col
} from "react-bootstrap";

function ModificaUtente() {
  const [userData, setUserData] = useState({
    nome: "",
    cognome: "",
    email: "",
    username: "",
    avatar: "",
    role: "",
    password: "" // Non precompilare mai
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const getUserIdFromToken = (token) => {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload?.utenteId;
  };

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    const utenteId = getUserIdFromToken(token);
    if (!utenteId) {
      setError("ID utente non trovato nel token.");
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/utente/${utenteId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error("Errore nel recupero dei dati");
      const data = await response.json();
      setUserData({
        nome: data.nome,
        cognome: data.cognome,
        email: data.email,
        username: data.username,
        avatar: data.avatar,
        role: data.tipoRuolo
      });
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setError("");
    setSuccess("");
    const token = localStorage.getItem("token");
    const utenteId = getUserIdFromToken(token);
    const dataToSend = { ...userData };
    if (!dataToSend.password) delete dataToSend.password;

    try {
      const response = await fetch(`http://localhost:8080/utente/${utenteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(dataToSend)
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      setSuccess("Dati salvati con successo!");
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <p className="text-center text-light">Caricamento...</p>;

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "85vh"
      }}
    >
      <Row className="w-100">
        <Col xs={12} md={{ span: 6, offset: 3 }}>
          <Card
            className="shadow-lg border-0 p-4"
            style={{
              borderRadius: "60px",
              backgroundColor: "rgb(216 219 222)"
            }}
          >
            <Card.Body>
              <Card.Title
                className="text-center mb-4"
                style={{
                  fontSize: "1.8rem",
                  fontWeight: "bold",
                  color: "#333"
                }}
              >
                Modifica Profilo
              </Card.Title>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              <Form>
                <Form.Group className="mb-3" controlId="nome">
                  <Form.Label className="fw-bold">Nome</Form.Label>
                  <Form.Control
                    type="text"
                    name="nome"
                    value={userData.nome}
                    onChange={handleChange}
                    required
                    style={{
                      borderRadius: "10px",
                      border: "1px solid #ccc",
                      padding: "10px"
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="cognome">
                  <Form.Label className="fw-bold">Cognome</Form.Label>
                  <Form.Control
                    type="text"
                    name="cognome"
                    value={userData.cognome}
                    onChange={handleChange}
                    required
                    style={{
                      borderRadius: "10px",
                      border: "1px solid #ccc",
                      padding: "10px"
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label className="fw-bold">Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    required
                    style={{
                      borderRadius: "10px",
                      border: "1px solid #ccc",
                      padding: "10px"
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="username">
                  <Form.Label className="fw-bold">Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={userData.username}
                    onChange={handleChange}
                    required
                    style={{
                      borderRadius: "10px",
                      border: "1px solid #ccc",
                      padding: "10px"
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="avatar">
                  <Form.Label className="fw-bold">Avatar URL</Form.Label>
                  <Form.Control
                    type="text"
                    name="avatar"
                    value={userData.avatar}
                    onChange={handleChange}
                    style={{
                      borderRadius: "10px",
                      border: "1px solid #ccc",
                      padding: "10px"
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="password">
                  <Form.Label className="fw-bold">
                    Password{" "}
                    <cite className="fw-light">
                      {" "}
                      (lascia vuoto il campo se non vuoi cambarla!){" "}
                    </cite>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    style={{
                      borderRadius: "10px",
                      border: "1px solid #ccc",
                      padding: "10px"
                    }}
                  />
                </Form.Group>

                <Button
                  variant="dark"
                  type="button"
                  onClick={handleSave}
                  className="w-100"
                  style={{
                    padding: "12px",
                    borderRadius: "10px",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    background: "#2c2c2c",
                    border: "none",
                    transition: "0.3s"
                  }}
                  onMouseOver={(e) => (e.target.style.background = "#444")}
                  onMouseOut={(e) => (e.target.style.background = "#2c2c2c")}
                >
                  Salva Modifiche
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ModificaUtente;
