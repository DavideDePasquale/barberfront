import { Container, Row, Col, Carousel, Button, Image } from "react-bootstrap";
import barber1 from "../assets/taglio1barber.jpg";
import barber2 from "../assets/taglio2barber.jpg";
import barber3 from "../assets/taglio3barber.jpg";
import locale from "../assets/localebarber.jpg";
import logo from "../assets/logobarber.jpg";
import { Link } from "react-router-dom";

function FirstPage() {
  return (
    <Container
      fluid
      className="text-center py-2"
      style={{
        background:
          "linear-gradient(185deg,rgb(171, 173, 173),rgb(255, 255, 255))", // Gradiente caldo
        borderRadius: "20px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        maxWidth: "1200px",
        margin: "0 auto"
      }}
    >
      <Row className="align-items-center">
        <Col md={5} className="d-flex flex-column justify-content-center mb-2">
          <h2
            className="mb-1"
            style={{ fontSize: "3.4rem", fontWeight: "bold", color: "#333" }}
          >
            Next Studio <br />{" "}
          </h2>
          <h3 style={{ fontSize: "1.6rem", fontWeight: "bold", color: "#333" }}>
            Dove Stile e Personalità si Incontrano
          </h3>
          <p style={{ textAlign: "left" }}>
            Benvenuto in <strong>Next Studio</strong>, il luogo dove ogni
            dettaglio è studiato per offrirti un’esperienza di grooming su
            misura. Situato in{" "}
            <strong>Via Canonico Pasquale Uva 12, Bisceglie (BT)</strong>, il
            nostro salone combina tecniche tradizionali e tendenze moderne per
            garantirti un look sempre curato e al passo con i tempi.
          </p>

          <p style={{ textAlign: "left" }}>
            Che tu stia cercando un taglio classico, una sfumatura perfetta o
            una barba impeccabile, da <strong>Next Studio</strong> troverai
            professionalità, attenzione ai dettagli e un ambiente accogliente
            pensato per il tuo relax.
          </p>
        </Col>
        <Col md={7} className="d-flex flex-column align-items-center">
          <Carousel className="w-100" interval={5000}>
            <Carousel.Item>
              <Image
                src={barber1}
                alt="Taglio classico"
                className="d-block w-100 rounded shadow-lg"
                style={{ maxHeight: "365px", objectFit: "cover" }}
              />
            </Carousel.Item>
            <Carousel.Item>
              <Image
                src={barber2}
                alt="Taglio moderno"
                className="d-block w-100 rounded shadow-lg"
                style={{ maxHeight: "365px", objectFit: "cover" }}
              />
            </Carousel.Item>
            <Carousel.Item>
              <Image
                src={barber3}
                alt="Taglio moderno2"
                className="d-block w-100 rounded shadow-lg"
                style={{ maxHeight: "365px", objectFit: "cover" }}
              />
            </Carousel.Item>
            <Carousel.Item>
              <Image
                src={locale}
                alt="Salone"
                className="d-block w-100 rounded shadow-lg"
                style={{ maxHeight: "365px", objectFit: "cover" }}
              />
            </Carousel.Item>
          </Carousel>
          <div
            className="mt-3"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              backgroundColor: "black",
              boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden"
            }}
          >
            <img
              src={logo}
              alt="Logo Barber Shop"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain"
              }}
            />
          </div>
        </Col>
      </Row>
      <h3 className="mt-4" style={{ fontSize: "1.6rem", color: "#343a40" }}>
        Che aspetti? Registrati o accedi per prenotare la tua esperienza
        esclusiva nel mio salone!
      </h3>
      <div className="mt-3">
        <Link to="/register">
          <Button
            variant="secondary"
            className="mx-2"
            style={{
              borderRadius: "30px",
              padding: "10px 30px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease"
            }}
          >
            Registrati
          </Button>
        </Link>
        <Link to="/login">
          <Button
            variant="outline-dark"
            className="mx-2"
            style={{
              borderRadius: "30px",
              padding: "10px 30px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease"
            }}
          >
            Accedi
          </Button>
        </Link>
      </div>
    </Container>
  );
}

export default FirstPage;
