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

      const token = await response.text();
      if (!token) throw new Error("Token non presente nella risposta.");

      const decodedToken = parseJwt(token);
      const tipo_ruolo = decodedToken?.roles ? decodedToken.roles[0] : null;

      localStorage.setItem("token", token);
      if (tipo_ruolo) localStorage.setItem("tipo_ruolo", tipo_ruolo);

      navigate(
        tipo_ruolo === "USER"
          ? "/prenota/"
          : "/appuntamento/barber/appuntamenti"
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const parseJwt = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
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
        <Col xs={12} md={{ span: 4, offset: 4 }}>
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
                Accedi al Tuo Account
              </Card.Title>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label className="fw-bold">Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Inserisci username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                    placeholder="Inserisci password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    padding: "10px",
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
