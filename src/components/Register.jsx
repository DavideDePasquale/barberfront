import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
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

    // Verifica che tutti i campi obbligatori siano riempiti
    if (
      !formData.nome ||
      !formData.cognome ||
      !formData.email ||
      !formData.username ||
      !formData.password
    ) {
      setError("Tutti i campi sono obbligatori");
      return;
    }

    // Prepara i dati per inviarli al backend (l'avatar è null di default)
    const payload = {
      nome: formData.nome,
      cognome: formData.cognome,
      email: formData.email,
      username: formData.username,
      password: formData.password,
      avatar: null, // Non c'è bisogno di includerlo nel form, lo mandiamo come null
      tipoRuolo: "user" // Ruolo predefinito, non visibile nel form
    };

    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setSuccess("Registrazione avvenuta con successo!");
        setError("");
        setFormData({
          nome: "",
          cognome: "",
          email: "",
          username: "",
          password: ""
        });
      } else {
        const result = await response.json();
        setError(result.message || "Errore durante la registrazione");
      }
    } catch (error) {
      console.error("Errore backend:", error);
      setError("Errore di connessione con il server");
    }
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center py-4">
      <div
        className="card p-3 shadow-sm"
        style={{ width: "100%", maxWidth: "400px", borderRadius: "10px" }}
      >
        <h6 className="text-center mb-3">
          Sei già registrato? <Link to="/login"> Clicca qui </Link>
        </h6>
        <h2
          className="text-center mb-3"
          style={{ fontWeight: "600", color: "rgb(67 72 77)" }}
        >
          Registrazione
        </h2>

        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formNome" className="mb-2">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Inserisci il tuo nome"
              required
              style={{ borderRadius: "10px" }}
            />
          </Form.Group>

          <Form.Group controlId="formCognome" className="mb-2">
            <Form.Label>Cognome</Form.Label>
            <Form.Control
              type="text"
              name="cognome"
              value={formData.cognome}
              onChange={handleChange}
              placeholder="Inserisci il tuo cognome"
              required
              style={{ borderRadius: "10px" }}
            />
          </Form.Group>

          <Form.Group controlId="formEmail" className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Inserisci la tua email"
              required
              style={{ borderRadius: "10px" }}
            />
          </Form.Group>

          <Form.Group controlId="formUsername" className="mb-2">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Inserisci un username"
              required
              style={{ borderRadius: "10px" }}
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Inserisci la tua password"
              required
              style={{ borderRadius: "10px" }}
            />
          </Form.Group>

          <Button
            variant="dark"
            type="submit"
            className="w-100"
            style={{
              borderRadius: "10px",
              padding: "8px 0",
              fontWeight: "bold"
            }}
          >
            Registrati
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default Registrazione;
