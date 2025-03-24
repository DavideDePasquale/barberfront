import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Alert,
  Card,
  Row,
  Col
} from "react-bootstrap";
import { Link } from "react-router-dom";

function Registrazione() {
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    email: "",
    username: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const payload = { ...formData, avatar: null, tipoRuolo: "user" };

    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = await response.text(); // Ora il backend restituisce solo un testo

      if (response.ok) {
        setSuccess("Registrazione avvenuta con successo!");
        setFormData({
          nome: "",
          cognome: "",
          email: "",
          username: "",
          password: ""
        });
      } else {
        setError(result); // Mostra il messaggio del backend
      }
    } catch (error) {
      setError("Errore di connessione con il server", error);
    }
  };

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
                Registrazione
              </Card.Title>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formNome">
                  <Form.Label className="fw-bold">Nome</Form.Label>
                  <Form.Control
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="Inserisci il tuo nome"
                    required
                    style={{
                      borderRadius: "10px",
                      border: "1px solid #ccc",
                      padding: "10px"
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCognome">
                  <Form.Label className="fw-bold">Cognome</Form.Label>
                  <Form.Control
                    type="text"
                    name="cognome"
                    value={formData.cognome}
                    onChange={handleChange}
                    placeholder="Inserisci il tuo cognome"
                    required
                    style={{
                      borderRadius: "10px",
                      border: "1px solid #ccc",
                      padding: "10px"
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label className="fw-bold">Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Inserisci la tua email"
                    required
                    style={{
                      borderRadius: "10px",
                      border: "1px solid #ccc",
                      padding: "10px"
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label className="fw-bold">Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Inserisci un username"
                    required
                    style={{
                      borderRadius: "10px",
                      border: "1px solid #ccc",
                      padding: "10px"
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formPassword">
                  <Form.Label className="fw-bold">Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Inserisci la tua password"
                    required
                    style={{
                      borderRadius: "10px",
                      border: "1px solid #ccc",
                      padding: "10px"
                    }}
                  />
                </Form.Group>

                <Button
                  variant="dark"
                  type="submit"
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
                  Registrati
                </Button>

                <h6 className="text-center mt-3">
                  Sei già registrato? <Link to="/login"> Clicca qui </Link>
                </h6>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Registrazione;
