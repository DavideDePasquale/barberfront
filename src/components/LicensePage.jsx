import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaGithub, FaCopyright, FaUsers } from "react-icons/fa";

const LicensePage = () => {
  return (
    <Container fluid className="bg-grey py-5" style={{ minHeight: "100vh" }}>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <Card
            className="shadow-lg border-0 p-4"
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "10px",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
              border: "1px solid #ddd"
            }}
          >
            <Card.Body>
              <Card.Title className="text-center mb-4">
                <FaCopyright /> Licenza e Copyright
              </Card.Title>
              <Card.Text className="mb-4">
                Questo progetto è stato sviluppato da{" "}
                <strong>De Pasquale Davide</strong>. È disponibile per l'uso
                secondo i termini della licenza descritta di seguito. Puoi
                usarlo, modificarlo e distribuirlo secondo le condizioni della
                licenza.
              </Card.Text>
              <Row>
                <Col>
                  <Card.Text>
                    <strong>Licenza:</strong> MIT License
                  </Card.Text>
                  <Card.Text>
                    <strong>Autore:</strong> De Pasquale Davide
                  </Card.Text>
                  <Card.Text>
                    <strong>Anno di Pubblicazione:</strong> 2025
                  </Card.Text>
                  <Button
                    variant="link"
                    href="https://github.com/DavideDePasquale"
                    target="_blank"
                  >
                    <FaGithub /> Visualizza su GitHub
                  </Button>
                </Col>
                <Col>
                  <Card.Text>
                    <strong>Diritti Riservati:</strong> Tutti i diritti sono
                    riservati.
                  </Card.Text>
                  <Card.Text>
                    <strong>Collaboratori:</strong> <FaUsers /> Nessun
                    collaboratore per il momento.
                  </Card.Text>
                </Col>
              </Row>
              <hr />
              <Card.Text className="text-center">
                <FaCopyright /> 2025 De Pasquale Davide. Tutti i diritti
                riservati.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LicensePage;
