import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Coin from "./pages/Coin";
import Footer from "./components/Footer";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/coin/:id" element={<Coin />} />
    </Routes>
    <Footer />
    </>
  );
}

export default App;
