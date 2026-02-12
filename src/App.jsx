import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Weather from "./pages/Weather";
import Plan from "./pages/Plan";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/weather/:city" element={<Weather />} />
            <Route path="/plan" element={<Plan />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
