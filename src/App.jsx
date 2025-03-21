import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import TopBar from "./components/TopBar";
import FirstPage from "./components/FirstPage";
import Registrazione from "./components/Register";
import LoginPage from "./components/LoginPage";
import Prenotazione from "./components/Prenotazione";
import ProtectedRoute from "./components/ProtectedRoute";

import BarberAppointments from "./components/BarberAppointments";
import ModificaUtente from "./components/ModificaUtente";
import AppuntamentiPage from "./components/AppuntamentiPage";
import LicensePage from "./components/LicensePage";
import OrariLiberi from "./components/OrariLiberi";
import Presentazione from "./components/Presentazione";
import Locazione from "./components/Locazione";

function App() {
  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/lavori" element={<Presentazione />} />
        <Route path="/locazione" element={<Locazione />} />
        <Route path="/register" element={<Registrazione />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/contatti" element={<LicensePage />} />{" "}
        {/* Rotte protette */}
        <Route element={<ProtectedRoute />}>
          <Route path="/prenota/" element={<Prenotazione />} />
          <Route
            path="/appuntamento/barber/appuntamenti"
            element={<BarberAppointments />}
          />{" "}
          {/* Aggiungi la rotta per il barbiere */}
        </Route>
        <Route path="/modifica-utente" element={<ModificaUtente />} />
        <Route path="/appuntamenti" element={<AppuntamentiPage />} />
        <Route path="/appuntamento/orariliberi" element={<OrariLiberi />} />
        <Route path="*" element={<h1>Pagina non trovata</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
