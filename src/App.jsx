import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import TopBar from "./components/TopBar";
import FirstPage from "./components/FirstPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <TopBar />
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/Home" element={""} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
