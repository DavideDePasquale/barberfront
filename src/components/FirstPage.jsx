import { Link } from "react-router-dom";
import { ArrowRight, Calendar2Check, Scissors } from "react-bootstrap-icons";
import { Sun, Cloudy, Snow, CloudRainFill } from "react-bootstrap-icons";

const FirstPage = () => {
  return (
    <>
      <h1
        className="text-center"
        style={{
          fontSize: "30px",
          textShadow: "2px 2px 10px #8964646b",
          marginTop: "20%"
        }}
      >
        Benvenuti in{" "}
        <strong
          style={{
            textShadow: "2px 2px 10px #8964646b",
            marginInline: "20px"
          }}
        >
          BarberApp
        </strong>
        <Scissors />
      </h1>
      <h5 className="text-center mt-5">
        Vuoi prenotare un trattamento? Clicca qui! <ArrowRight />{" "}
        <Link to="/appuntamento">
          <Scissors
            className="me-3"
            style={{ fontSize: "40px", color: "black" }}
          />
          <Calendar2Check
            className="me-3"
            style={{ fontSize: "40px", color: "black" }}
          />
        </Link>
      </h5>
    </>
  );
};
export default FirstPage;
