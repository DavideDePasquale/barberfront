import React, { useEffect, useState } from "react";

function ModificaUtente() {
  const [userData, setUserData] = useState({
    nome: "",
    cognome: "",
    email: "",
    username: "",
    avatar: "",
    role: "", // Non includere la password nel form
    password: "" // Inizialmente vuoto, non lo precompilare mai
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Funzione per ottenere l'ID utente dal token
  const getUserIdFromToken = (token) => {
    const payload = JSON.parse(atob(token.split(".")[1])); // Decodifica il token
    return payload?.utenteId; // Assicurati che il payload contenga 'utenteId'
  };

  // Funzione per recuperare i dati dell'utente
  const fetchUserData = async () => {
    const token = localStorage.getItem("token"); // Ottieni il token dal localStorage
    const utenteId = getUserIdFromToken(token); // Estrai l'ID utente dal token

    if (!utenteId) {
      setError("ID utente non trovato nel token.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/utente/${utenteId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error("Errore nel recupero dei dati dell'utente");
      }

      const data = await response.json();
      setUserData({
        nome: data.nome,
        cognome: data.cognome,
        email: data.email,
        username: data.username,
        avatar: data.avatar,
        role: data.tipoRuolo // Mantieni il ruolo, ma non includere la password
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

  // Gestisci il cambiamento dei dati nel modulo
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Gestisci il salvataggio dei dati modificati
  const handleSave = async () => {
    const token = localStorage.getItem("token");
    const utenteId = getUserIdFromToken(token);

    const dataToSend = { ...userData };

    // Se la password non è stata modificata (è vuota), non inviarla
    if (!dataToSend.password) {
      delete dataToSend.password; // Rimuovi la password se non è stata cambiata
    }

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
        throw new Error("Errore nel salvataggio dei dati");
      }

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token); // Aggiorna il token nel localStorage
      }

      alert("Dati salvati con successo!");
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) return <p>Caricamento...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Modifica il tuo profilo</h1>
      <form>
        <label>
          Nome:
          <input
            type="text"
            name="nome"
            value={userData.nome}
            onChange={handleChange}
          />
        </label>
        <label>
          Cognome:
          <input
            type="text"
            name="cognome"
            value={userData.cognome}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
          />
        </label>
        <label>
          Avatar URL:
          <input
            type="text"
            name="avatar"
            value={userData.avatar}
            onChange={handleChange}
          />
        </label>
        <label>
          Password (lascia vuoto se non vuoi modificarla):
          <input
            type="password"
            name="password"
            value={userData.password} // Il campo password rimane vuoto
            onChange={handleChange}
          />
        </label>
        <button type="button" onClick={handleSave}>
          Salva
        </button>
      </form>
    </div>
  );
}

export default ModificaUtente;
