import React from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import taglio1 from "../assets/taglio1barber.jpg";
import taglio2 from "../assets/taglio2barber.jpg";
import taglio4 from "../assets/taglio4.jpg";

const lavori = [
  {
    id: 1,
    titolo: "Taglio Classico",
    immagine: taglio1,
    descrizione: "Un taglio classico per un look sempre alla moda."
  },
  {
    id: 2,
    titolo: "Rasatura Perfetta",
    immagine: taglio4,
    descrizione: "Una rasatura precisa e dettagliata per un viso impeccabile."
  },
  {
    id: 3,
    titolo: "Taglio Moderno",
    immagine: taglio2,
    descrizione: "Un taglio moderno per chi ama distinguersi."
  }
];

const Presentazione = () => {
  return (
    <Container
      fluid
      className="py-3"
      style={{ backgroundColor: "#343a40", color: "#f8f9fa" }}
    >
      <h3
        className="text-center mb-2"
        style={{ fontSize: "2rem", fontWeight: "bold", color: "whitesmoke" }}
      >
        I Nostri Lavori ✂️
      </h3>
      <Row className="justify-content-center">
        {lavori.map((lavoro) => (
          <Col
            key={lavoro.id}
            xs={12}
            sm={6}
            md={4}
            className="mb-4 d-flex align-items-stretch"
          >
            <Card
              className="shadow-lg border-0 w-100"
              style={{ backgroundColor: "whitesmoke", borderRadius: "50px" }}
            >
              <div
                style={{
                  width: "100%",
                  height: "300px",
                  overflow: "hidden",
                  borderRadius: "15px 15px 0 0"
                }}
              >
                <Card.Img
                  variant="top"
                  src={lavoro.immagine}
                  alt={lavoro.titolo}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <Card.Body className="d-flex flex-column text-center">
                <Card.Title
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "#343a40"
                  }}
                >
                  {lavoro.titolo}
                </Card.Title>
                <Card.Text
                  className="flex-grow-1"
                  style={{ fontSize: "1rem", color: "#6c757d" }}
                >
                  {lavoro.descrizione}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Sezione Call-to-Action */}
      <div className="text-center mt-2">
        <h3 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          Prenota anche tu un trattamento! 💈
        </h3>
        <p style={{ fontSize: "1rem", marginBottom: "20px" }}>
          Registrati subito per prenotare il tuo taglio oppure accedi se hai già
          un account!
        </p>
        <div>
          <Link to="/register">
            <Button
              variant="secondary"
              size="lg"
              className="mx-2 px-4"
              style={{ borderRadius: "30px", fontWeight: "bold" }}
            >
              Registrati ✨
            </Button>
          </Link>
          <Link to="/login">
            <Button
              variant="outline-secondary"
              size="lg"
              className="mx-2 px-4"
              style={{ borderRadius: "30px", fontWeight: "bold" }}
            >
              Accedi 🔑
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Presentazione;
