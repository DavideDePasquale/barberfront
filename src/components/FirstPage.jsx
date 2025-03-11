import { Link } from "react-router-dom";
import { ArrowRight, Calendar2Check, Scissors } from "react-bootstrap-icons";

const FirstPage = () => {
  return (
    <div
      style={{
        backgroundImage: "url('https://source.unsplash.com/1600x900/?barber')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        textShadow: "2px 2px 10px rgba(0, 0, 0, 0.7)"
      }}
    >
      <h1 className="text-center" style={{ fontSize: "30px" }}>
        Benvenuti in <strong style={{ marginInline: "20px" }}>BarberApp</strong>{" "}
        <Scissors />
      </h1>
      <h5 className="text-center mt-4">
        Vuoi prenotare un trattamento? Devi prima registrarti! <ArrowRight />{" "}
        <Link
          to="/register"
          style={{ color: "white", textDecoration: "underline" }}
        >
          <Scissors className="me-3" style={{ fontSize: "40px" }} />
          <Calendar2Check className="me-3" style={{ fontSize: "40px" }} />
        </Link>
      </h5>
    </div>
  );
};

export default FirstPage;
