import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import TopBar from "./components/TopBar";
import FirstPage from "./components/FirstPage";
import Registrazione from "./components/Register";

function App() {
  return (
    <>
      <BrowserRouter>
        <TopBar />
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/Home" element={""} />
          <Route path="/register" element={<Registrazione />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
