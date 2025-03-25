import { useEffect, useState } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { Button, Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import { Scissors, PersonCircle } from "react-bootstrap-icons";
import logo from "../assets/logobarber.jpg";

function TopBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [role, setRole] = useState(null);

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
    <Navbar
      expand="xl"
      className="shadow-sm py-2"
      style={{ backgroundColor: "#93979a00" }}
    >
      <Container>
        <NavLink
          to="/"
          className="nav-link text-dark fw-bold d-flex align-items-center"
        >
          <img
            src={logo}
            alt="Logo BarberShop"
            width="40"
            height="40"
            className="me-2"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain"
            }}
          />
        </NavLink>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            <NavLink
              to="/"
              className={`nav-link fw-semibold ${
                location.pathname === "/"
                  ? "text-dark fw-bold"
                  : "text-secondary"
              }`}
              style={{ fontSize: "14px" }} // Font più piccolo
            >
              Home
            </NavLink>
            <NavLink
              to="/lavori"
              className={`nav-link fw-semibold ${
                location.pathname === "/lavori"
                  ? "text-dark fw-bold"
                  : "text-secondary"
              }`}
              style={{ fontSize: "14px" }} // Font più piccolo
            >
              Lavori
            </NavLink>

            {role === "USER" && (
              <>
                <NavLink
                  to="/prenota/"
                  className={`nav-link fw-semibold ${
                    location.pathname.includes("/prenota")
                      ? "text-dark fw-bold"
                      : "text-secondary"
                  }`}
                  style={{ fontSize: "14px" }} // Font più piccolo
                >
                  Prenota
                </NavLink>
                <NavLink
                  to="/appuntamenti"
                  className={`nav-link fw-semibold ${
                    location.pathname.includes("/appuntamenti")
                      ? "text-dark fw-bold"
                      : "text-secondary"
                  }`}
                  style={{ fontSize: "14px" }} // Font più piccolo
                >
                  Promemoria
                </NavLink>
              </>
            )}

            {role === "BARBER" && (
              <>
                <NavLink
                  to="/appuntamento/barber/appuntamenti"
                  className={`nav-link fw-semibold  ${
                    location.pathname.includes(
                      "/appuntamento/barber/appuntamenti"
                    )
                      ? "text-dark fw-bold"
                      : "text-secondary"
                  }`}
                  style={{ fontSize: "13px" }} // Font più piccolo
                >
                  Prenotazioni
                </NavLink>
                <NavLink
                  to="/appuntamento/orariliberi"
                  className={`nav-link fw-semibold ${
                    location.pathname.includes("/appuntamento/orariliberi")
                      ? "text-dark fw-bold"
                      : "text-secondary"
                  }`}
                  style={{ fontSize: "13px" }} // Font più piccolo
                >
                  Posti Liberi
                </NavLink>
              </>
            )}
          </Nav>

          <Nav className="ms-auto d-flex align-items-center">
            <NavLink
              to="/contatti"
              className={`nav-link fw-semibold ${
                location.pathname === "/contatti"
                  ? "text-dark fw-bold"
                  : "text-secondary"
              }`}
              style={{ fontSize: "14px" }} // Font più piccolo
            >
              Licenze
            </NavLink>

            {/* Nuovo link a "Locazione" */}
            <NavLink
              to="/locazione"
              className={`nav-link fw-semibold me-3 ${
                location.pathname === "/locazione"
                  ? "text-dark fw-bold"
                  : "text-secondary"
              }`}
              style={{ fontSize: "14px" }} // Font più piccolo
            >
              Dove Siamo
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
                      style={{
                        cursor: "pointer",
                        objectFit: "cover",
                        border: "2px solid #007bff"
                      }}
                    />
                  ) : (
                    <PersonCircle
                      size={35}
                      className="text-secondary"
                      style={{ cursor: "pointer" }}
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
                <NavLink to="/register">
                  <Button variant="secondary" className="px-4">
                    Registrati
                  </Button>
                </NavLink>
                <NavLink to="/login">
                  <Button variant="outline-dark" className="px-4 ms-3">
                    Accedi
                  </Button>
                </NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopBar;
