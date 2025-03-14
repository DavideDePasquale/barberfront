import { Container, Row, Col, Carousel, Button, Image } from "react-bootstrap";
import barber1 from "../assets/taglio1barber.jpg";
import barber2 from "../assets/taglio2barber.jpg";
import locale from "../assets/localebarber.jpg";
import logo from "../assets/logobarber.jpg";
import { Link } from "react-router-dom";

function FirstPage() {
  return (
    <Container className="text-center py-5 bg-grey">
      <Row className="align-items-center">
        <Col md={6} className="d-flex flex-column justify-content-center">
          <h2 className="mb-3">Benvenuto nel Salone di Enrico Di Nardo</h2>

          <p>
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
                className="d-block w-100 rounded"
                style={{ maxHeight: "300px", objectFit: "cover" }}
              />
            </Carousel.Item>
            <Carousel.Item>
              <Image
                src={barber2}
                alt="Taglio moderno"
                className="d-block w-100 rounded"
                style={{ maxHeight: "300px", objectFit: "cover" }}
              />
            </Carousel.Item>
            <Carousel.Item>
              <Image
                src={locale}
                alt="Salone"
                className="d-block w-100 rounded"
                style={{ maxHeight: "300px", objectFit: "cover" }}
              />
            </Carousel.Item>
          </Carousel>
          <div
            className="mt-3"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%", // Forma circolare
              backgroundColor: "black", // Sfondo nero per le aree vuote
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", // Ombra per dare profondità
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden" // Nasconde eventuali bordi fuori dal cerchio
            }}
          >
            <img
              src={logo}
              alt="Logo Barber Shop"
              style={{
                maxWidth: "100%", // Adatta l'immagine alla larghezza del cerchio
                maxHeight: "100%", // Adatta l'immagine all'altezza del cerchio
                objectFit: "contain" // Mantiene l'immagine senza tagliarla o distorcerla
              }}
            />
          </div>
        </Col>
      </Row>
      <h3 className="mt-4">
        Che aspetti? Registrati o accedi per prenotare la tua esperienza
        esclusiva nel mio salone!
      </h3>
      <div className="mt-3">
        <Link to="/register">
          <Button variant="primary" className="mx-2">
            Registrati
          </Button>
        </Link>
        <Link to="/login">
          <Button variant="outline-primary" className="mx-2">
            Accedi
          </Button>
        </Link>
      </div>
    </Container>
  );
}

export default FirstPage;
