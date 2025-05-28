import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/home";
import MyCalendar from "./pages/Calendar";
import Confirmation from "./pages/Confirmation";
import ClientDataForm from "./pages/ClientDataForm";
import ConfirmClientDataForm from "./pages/ConfirmClientData";
import ThankYou from "./pages/ThankYou";
import BookingFlow from "./pages/BookingFlow";
import Servicios from "./pages/Servicios";
import Contacto from "./pages/Contacto";
import MisReservas from "./pages/MisReservas";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/datos-cliente/:email" element={<ClientDataForm />} />
        <Route path="/confirmar-datos" element={<ConfirmClientDataForm />} />
        <Route path="/calendario" element={<MyCalendar />} />
        <Route path="/reservas/:email" element={<BookingFlow />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/gracias" element={<ThankYou />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/mis-reservas" element={<MisReservas />} />
      </Routes>
    </>
  );
}

export default App;
