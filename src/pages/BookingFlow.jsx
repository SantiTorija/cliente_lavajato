import { useSelector, useDispatch } from "react-redux";
import NavbarComponent from "../components/Navbar";
import Calendar from "./Calendar";
import ConfirmClientDataForm from "./ConfirmClientData";
import ClientDataForm from "./ClientDataForm";
import Services from "../components/Services";
import Confirmation from "./Confirmation";
import styles from "./bookingFlow.module.css";
import Footer from "../components/Footer";
import WhatsappButton from "../components/WhatsappButton";
import { prev, next } from "../redux/reserveStepSlice";
import {
  Button,
  Card,
  Container,
  ProgressBar,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { useState } from "react";

const steps = [
  { id: 1, label: "Datos del cliente" },
  { id: 2, label: "Fecha y hora" },
  { id: 3, label: "Selecciona servicio" },
  { id: 4, label: "Confirmación" },
];

export default function BookingFlow() {
  const reserveStep = useSelector((state) => state.reserveStep);
  const client = useSelector((state) => state.client);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const handlePrev = () => {
    dispatch(prev());
  };

  const handleNext = () => {
    // Verificar si estamos en el paso 2 (Fecha y hora) y si hay fecha y hora seleccionada
    if (reserveStep === 2) {
      if (!cart.date || !cart.slot) {
        // Mostrar toast rojo si no hay fecha y hora seleccionada
        setShowToast(true);
        return;
      }
    }

    dispatch(next());
  };

  const renderStepContent = () => {
    switch (reserveStep) {
      case 1:
        return client.firstname ? (
          <ConfirmClientDataForm />
        ) : (
          <ClientDataForm />
        );
      case 2:
        return <Calendar showError={showToast} />;
      case 3:
        return <Services />;
      case 4:
        return <Confirmation />;
      default:
        return null;
    }
  };

  const progressPercentage = (reserveStep / steps.length) * 100;

  return (
    <>
      <NavbarComponent />
      <Container className="my-4 w-100 d-flex justify-content-center">
        <Card
          className={`${styles.bookingCard} ${
            reserveStep === 2 ? styles.calendarStepCard : ""
          }`}
        >
          <h5 className="mb-2 mt-2 text-start ms-3">
            {steps.find((s) => s.id === reserveStep)?.label || ""}
          </h5>

          <div>
            <ProgressBar
              now={progressPercentage}
              style={{
                "--bs-progress-bar-bg": "rgb(204,119,65)",
                height: "4px",
              }}
            />
          </div>

          <Card.Body>{renderStepContent()}</Card.Body>
          {reserveStep === 2 && (
            <div className="d-flex justify-content-center mt-4 gap-3">
              <div className={styles.buttonWrapper}>
                <Button className="back-button w-50 me-1" onClick={handlePrev}>
                  Atrás
                </Button>
                <Button
                  className="action-button w-50 ms-1"
                  onClick={handleNext}
                >
                  Siguiente
                </Button>
              </div>
            </div>
          )}
        </Card>
      </Container>

      {/* Toast de Bootstrap */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={4000}
          autohide
          bg="danger"
        >
          <Toast.Header closeButton>
            <strong className="me-auto">¡Atención!</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            Selecciona una fecha y hora antes de continuar
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <WhatsappButton />
      <Footer />
    </>
  );
}
