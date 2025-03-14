import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        throw new Error("Credenziali errate! Riprova.");
      }

      // Ottieni la risposta come testo (token JWT)
      const token = await response.text();

      if (!token) {
        throw new Error("Token non presente nella risposta.");
      }

      // Decodifica il token JWT
      const decodedToken = parseJwt(token);
      const tipo_ruolo = decodedToken?.roles ? decodedToken.roles[0] : null;

      // Salva il token nel localStorage
      localStorage.setItem("token", token);

      // Salva il ruolo nel localStorage (utile per altre funzionalità)
      if (tipo_ruolo) {
        localStorage.setItem("tipo_ruolo", tipo_ruolo);
      }

      // Naviga alla pagina giusta in base al ruolo
      if (tipo_ruolo === "USER") {
        navigate("/prenota/"); // Naviga alla pagina di prenotazione per l'utente
      } else if (tipo_ruolo === "BARBER") {
        navigate("/appuntamento/barber/appuntamenti"); // Naviga alla pagina degli appuntamenti del barbiere
      } else {
        navigate("/"); // Naviga alla home page per altri ruoli o errori
      }
    } catch (error) {
      setError(error.message); // Mostra un messaggio di errore in caso di fallimento
    }
  };

  // Funzione per decodificare il token JWT
  const parseJwt = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  };

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to right,rgb(18 18 18 / 0%),rgb(195 195 195 / 23%))"
      }}
    >
      <Row className="w-100">
        <Col xs={12} md={{ span: 4, offset: 4 }}>
          <Card className="shadow">
            <Card.Body>
              <Card.Title className="text-center mb-4">Login</Card.Title>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Inserisci username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-4" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Inserisci password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  Accedi
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
