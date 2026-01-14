import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Coin from "./pages/Coin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/coin/:id" element={<Coin />} />
    </Routes>
  );
}

export default App;
