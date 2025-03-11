import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Scissors } from "react-bootstrap-icons";
import { Link, NavLink, useNavigate } from "react-router-dom";

function TopBar() {
  const navigate = useNavigate();

  const isAuthenticated = () => {
    return sessionStorage.getItem("token") !== null;
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token"); // Rimuove il token dal sessionStorage
    navigate("/login"); // Reindirizza alla pagina di login
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
              <NavLink to="/home" className="nav-link">
                Home
              </NavLink>
              {isAuthenticated() && (
                <>
                  <NavLink to="/calendario" className="nav-link">
                    Calendario
                  </NavLink>
                  <NavLink to="/prenotazione" className="nav-link">
                    Prenota
                  </NavLink>
                </>
              )}
              <NavLink to="/promemoria" className="nav-link">
                Promemoria
              </NavLink>
            </Nav>

            <Nav className="ms-auto my-1 my-lg-0" navbarScroll>
              <NavLink to="/contatti" className="nav-link me-2">
                Contatti & Lic.
              </NavLink>

              {!isAuthenticated() ? (
                <>
                  <Button
                    variant="dark"
                    className="px-4 ms-3"
                    onClick={() => navigate("/login")}
                  >
                    Accedi
                  </Button>
                  <Button
                    variant="outline-dark"
                    className="px-4 ms-3"
                    onClick={() => navigate("/register")}
                  >
                    Registrati
                  </Button>
                </>
              ) : (
                <Button
                  variant="danger"
                  className="px-4 ms-3"
                  onClick={handleLogout}
                >
                  Esci
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default TopBar;
