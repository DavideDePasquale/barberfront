import { Container, Row, Col, Carousel, Button, Image } from "react-bootstrap";
import barber1 from "../assets/taglio1barber.jpg";
import barber2 from "../assets/taglio2barber.jpg";
import locale from "../assets/localebarber.jpg";
import logo from "../assets/logobarber.jpg";
import { Link } from "react-router-dom";

function FirstPage() {
  return (
    <Container
      fluid
      className="text-center py-3"
      style={{
        background:
          "linear-gradient(185deg,rgb(171, 173, 173),rgb(255, 255, 255))", // Gradiente caldo
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        maxWidth: "1200px",
        margin: "0 auto"
      }}
    >
      <Row className="align-items-center">
        <Col md={6} className="d-flex flex-column justify-content-center mb-4">
          <h2
            className="mb-3"
            style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#333" }}
          >
            Benvenuto nel Salone di Enrico Di Nardo
          </h2>

          <p style={{ fontSize: "1.1rem", lineHeight: "1.6", color: "#555" }}>
            Mi chiamo <strong>Enrico Di Nardo</strong> e sono un esperto
            barbiere con anni di esperienza nel settore. Ho conseguito il
            diploma presso la prestigiosa scuola{" "}
            <strong>CESVIM nel 2022</strong> e, dopo aver affinato la mia
            tecnica in diversi saloni, ho deciso di aprire il mio salone a{" "}
            <strong>Via Canonico Pasquale Uva 12 (Bisceglie, BT)</strong>. Il
            mio obiettivo è offrire un servizio di alta qualità, unendo
            tradizione e innovazione per garantire ai miei clienti tagli di
            capelli impeccabili e uno spazio accogliente per rilassarsi e
            prendersi cura di sé stessi.
          </p>
        </Col>
        <Col md={6} className="d-flex flex-column align-items-center">
          <Carousel className="w-100" interval={5000}>
            <Carousel.Item>
              <Image
                src={barber1}
                alt="Taglio classico"
                className="d-block w-100 rounded shadow-lg"
                style={{ maxHeight: "300px", objectFit: "cover" }}
              />
            </Carousel.Item>
            <Carousel.Item>
              <Image
                src={barber2}
                alt="Taglio moderno"
                className="d-block w-100 rounded shadow-lg"
                style={{ maxHeight: "300px", objectFit: "cover" }}
              />
            </Carousel.Item>
            <Carousel.Item>
              <Image
                src={locale}
                alt="Salone"
                className="d-block w-100 rounded shadow-lg"
                style={{ maxHeight: "300px", objectFit: "cover" }}
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
