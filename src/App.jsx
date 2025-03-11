import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import TopBar from "./components/TopBar";
import FirstPage from "./components/FirstPage";
import Registrazione from "./components/Register";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import Prenotazione from "./components/Prenotazione";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/register" element={<Registrazione />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Rotte protette */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/prenota" element={<Prenotazione />} />
        </Route>

        <Route path="*" element={<h1>Pagina non trovata</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
