import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PlanningPage } from "@pages/planning/PlanningPage";
import { PlanningDetail } from "@pages/planning/PlanningDetail/PlanningDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PlanningPage />} />
        <Route path="/planning/:id" element={<PlanningDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
