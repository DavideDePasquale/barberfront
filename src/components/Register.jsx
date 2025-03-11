import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

function Registrazione() {
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    email: "",
    username: "",
    password: "",
    avatar: ""
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

    // Prepara i dati per inviarli al backend
    const payload = {
      nome: formData.nome,
      cognome: formData.cognome,
      email: formData.email,
      username: formData.username,
      password: formData.password,
      avatar: formData.avatar,
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
          password: "",
          avatar: ""
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
    <Container>
      <h6>
        Sei già registrato? <Link to="/login"> Clicca qui </Link>
      </h6>
      <h2>Registrazione</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formNome">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Inserisci il tuo nome"
            required
          />
        </Form.Group>

        <Form.Group controlId="formCognome">
          <Form.Label>Cognome</Form.Label>
          <Form.Control
            type="text"
            name="cognome"
            value={formData.cognome}
            onChange={handleChange}
            placeholder="Inserisci il tuo cognome"
            required
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Inserisci la tua email"
            required
          />
        </Form.Group>

        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Inserisci un username"
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Inserisci la tua password"
            required
          />
        </Form.Group>

        <Form.Group controlId="formAvatar">
          <Form.Label>Avatar (URL immagine - opzionale)</Form.Label>
          <Form.Control
            type="url"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            placeholder="Inserisci un URL per l'avatar (opzionale)"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Registrati
        </Button>
      </Form>
    </Container>
  );
}

export default Registrazione;
