import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ModificaUtente = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(true);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    nome: "",
    cognome: "",
    password: "",
    avatar: ""
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const estraiUtenteId = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload).utenteId;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError(
        "Token non trovato. Devi essere loggato per vedere i tuoi dati."
      );
      return;
    }

    const userId = estraiUtenteId(token);
    if (!userId) {
      setError("ID utente non trovato nel token.");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/utente/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok)
          throw new Error("Impossibile recuperare i dati dell'utente");

        const data = await response.json();
        setUserData({
          username: data.username,
          email: data.email,
          nome: data.nome,
          cognome: data.cognome,
          password: "",
          avatar: data.avatar || ""
        });
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:8080/utente/${userData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(userData)
        }
      );

      if (!response.ok) throw new Error("Errore nella modifica dell'utente");

      setSuccess("Dati modificati correttamente!");
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    navigate("/home");
  };

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Modifica Profilo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoading ? (
          <p>Caricamento...</p>
        ) : (
          <>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={userData.username}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formEmail" className="mt-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formAvatar" className="mt-3">
                <Form.Label>Avatar URL</Form.Label>
                <Form.Control
                  type="text"
                  name="avatar"
                  value={userData.avatar}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formNome" className="mt-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  name="nome"
                  value={userData.nome}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formCognome" className="mt-3">
                <Form.Label>Cognome</Form.Label>
                <Form.Control
                  type="text"
                  name="cognome"
                  value={userData.cognome}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPassword" className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Salva Modifiche
              </Button>
              <Button
                variant="secondary"
                onClick={handleClose}
                className="mt-3 ms-2"
              >
                Chiudi senza salvare
              </Button>
            </Form>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ModificaUtente;
