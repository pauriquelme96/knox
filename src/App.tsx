import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PlaningPage } from "@pages/planing/PlaningPage";
import { PlaningDetail } from "@pages/planing/PlaningDetail/PlaningDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PlaningPage />} />
        <Route path="/planing/:id" element={<PlaningDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
