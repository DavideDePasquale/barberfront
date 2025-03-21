import React from "react";

const Locazione = () => {
  const handleMapClick = () => {
    window.open(
      "https://www.google.com/maps/place/Barber+Shop/@44.123456,10.123456,15z/data=!4m6!3m5!1s0x1338078575f08031:0x10fdd3cdc9847db0!8m2!3d44.123456!4d10.123456!16s%2Fg%2F11b73nfdbm?entry=ttu",
      "_blank"
    );
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center py-5"
      style={{ backgroundColor: "#343a40" }}
    >
      <div
        className="card p-4 shadow"
        style={{
          maxWidth: "900px",
          width: "50%",
          backgroundColor: "rgb(217 217 217 / 92%)",
          borderRadius: "15px"
        }}
      >
        <div className="row">
          <div className="col-md-8">
            <div
              style={{
                cursor: "pointer",
                borderRadius: "10px",
                overflow: "hidden",
                width: "100%",
                paddingTop: "100%",
                position: "relative"
              }}
              onClick={handleMapClick}
            >
              <iframe
                title="Mappa del Barber Shop"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: "0"
                }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2866.091229306888!2d10.123456!3d44.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1338078575f08031%3A0x10fdd3cdc9847db0!2sBarber+Shop!5e0!3m2!1sit!2sit!4v1698765432100!5m2!1sit!2sit"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <div className="col-md-4 d-flex flex-column justify-content-center">
            <div>
              <h5
                className="mb-4"
                style={{ fontWeight: "bold", color: "#333" }}
              >
                Dove Trovarci
              </h5>
              <p className="mb-3" style={{ fontSize: "14px" }}>
                <strong>Indirizzo:</strong>
                <br />
                Via Canonico Pasquale Uva, 13 , 76011 Bisceglie, Italia
              </p>
              <p className="mb-3">
                <strong>Telefono:</strong>
                <br />
                <a
                  href="tel:+390123456789"
                  style={{ color: "#007bff", textDecoration: "none" }}
                >
                  0123 456 789
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Locazione;
