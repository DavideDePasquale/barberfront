import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { CloudSun, Scissors } from "react-bootstrap-icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function TopBar() {
  const navigate = useNavigate();

  useEffect(() => {
    // Ottieni il ruolo dell'utente dal localStorage
    const role = localStorage.getItem("role");

    if (role) {
      // In base al ruolo, redirigi alla pagina giusta
      if (role === "USER") {
        navigate("/prenota");
      } else if (role === "BARBER") {
        navigate("/appuntamento/barber/appuntamenti");
      }
    }
  }, [navigate]);

  return (
    <>
      <Navbar expand="md" className="topbarcol">
        <Container fluid>
          <NavLink to="/" className="nav-link">
            <Scissors style={{ width: "2em", height: "2.5em" }} />
          </NavLink>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <NavLink to="/home" className="nav-link">
                Home
              </NavLink>
              <NavLink to="/prenota/" className="nav-link">
                Prenota
              </NavLink>
              <NavLink to="/promemoria" className="nav-link">
                Promemoria
              </NavLink>
            </Nav>
            <Nav className="ms-auto my-1 my-lg-0" navbarScroll>
              <NavLink to="/contatti" className="nav-link me-2">
                Contatti & Lic.
              </NavLink>
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
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default TopBar;
