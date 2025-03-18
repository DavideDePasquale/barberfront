import { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Scissors, PersonCircle } from "react-bootstrap-icons"; // PersonCircle = Omino
import { Dropdown } from "react-bootstrap"; // Rimosso Modal

function TopBar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [role, setRole] = useState(null);

  // Funzione per estrarre l'ID dell'utente dal token
  const getUserIdFromToken = (token) => {
    if (!token) {
      console.error("Token non trovato!");
      return null;
    }

    try {
      const payload = token.split(".")[1]; // Prende la parte del payload del token
      const decoded = atob(payload); // Decodifica il base64
      const json = JSON.parse(decoded); // Converte in JSON
      console.log("Decoded Token:", json); // Aggiungi un log per vedere la struttura
      return json.utenteId; // Restituisce l'ID dell'utente
    } catch (error) {
      console.error("Errore nel decodificare il token", error);
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("tipo_ruolo");
    const storedAvatar = localStorage.getItem("avatar");

    if (!token) {
      setIsLoggedIn(false);
      setRole(null);
      return;
    }

    setIsLoggedIn(true);
    setRole(storedRole);
    setAvatar(storedAvatar);

    // Estrai l'ID dal token
    const userId = getUserIdFromToken(token);
    console.log("USER ID: ", userId); // Aggiungi un log per verificare l'ID
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tipo_ruolo");
    localStorage.removeItem("avatar");
    setIsLoggedIn(false);
    setRole(null);
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <Navbar expand="md" className="topbarcol">
        <Container fluid>
          <NavLink to="/" className="nav-link">
            <Scissors style={{ width: "2em", height: "2.5em" }} />
          </NavLink>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
              <NavLink to="" className="nav-link">
                Home
              </NavLink>

              {role === "USER" && (
                <>
                  <NavLink to="/prenota/" className="nav-link">
                    Prenota
                  </NavLink>
                  <NavLink to="/appuntamenti" className="nav-link">
                    Promemoria
                  </NavLink>
                </>
              )}

              {role === "BARBER" && (
                <>
                  <NavLink
                    to="/appuntamento/barber/appuntamenti"
                    className="nav-link"
                  >
                    Prenotazioni
                  </NavLink>
                  <NavLink to="/appuntamento/orariliberi" className="nav-link">
                    Posti Liberi
                  </NavLink>
                </>
              )}
            </Nav>
            <Nav className="ms-auto my-1 my-lg-0" navbarScroll>
              <NavLink to="/contatti" className="nav-link me-2">
                Contatti & Lic.
              </NavLink>

              {isLoggedIn ? (
                <Dropdown align="end">
                  <Dropdown.Toggle
                    variant="link"
                    id="dropdown-user"
                    className="p-0 border-0"
                  >
                    {avatar ? (
                      <img
                        src={avatar}
                        alt="Avatar"
                        className="rounded-circle"
                        width="40"
                        height="40"
                        style={{ cursor: "pointer", objectFit: "cover" }}
                      />
                    ) : (
                      <PersonCircle
                        size={40}
                        style={{ cursor: "pointer", color: "gray" }}
                      />
                    )}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={NavLink} to="/modifica-utente">
                      Modifica utente
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>Esci</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <>
                  <NavLink to="/login">
                    <Button variant="dark" className="px-4">
                      Accedi
                    </Button>
                  </NavLink>
                  <NavLink to="/register">
                    <Button variant="outline-dark" className="px-4 ms-3">
                      Registrati
                    </Button>
                  </NavLink>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default TopBar;
