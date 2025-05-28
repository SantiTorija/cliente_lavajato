import { useState } from "react";
import NavbarComponent from "../components/Navbar";
import Calendar from "./Calendar";
import ConfirmClientDataForm from "./ConfirmClientData";
import ClientDataForm from "./ClientDataForm";
import Services from "../components/Services";
import Confirmation from "./Confirmation";
import { useSelector } from "react-redux";
import styles from "./bookingFlow.module.css";
import Footer from "../components/Footer";
import WhatsappButton from "../components/WhatsappButton";

import {
  Button,
  Card,
  Container,
  Row,
  Col,
  ProgressBar,
} from "react-bootstrap";

const steps = [
  { id: 1, label: "Datos del cliente" },
  { id: 2, label: "Fecha y hora" },
  { id: 3, label: "Selecciona servicio" },
  { id: 4, label: "Confirmación" },
];

export default function BookingFlow() {
  const reserveStep = useSelector((state) => state.reserveStep);
  const client = useSelector((state) => state.client);

  const renderStepContent = () => {
    switch (reserveStep) {
      case 1:
        return client.firstname ? (
          <ConfirmClientDataForm />
        ) : (
          <ClientDataForm />
        );
      case 2:
        return <Calendar />;
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
        <Card className={styles.bookingCard}>
          <h5 className="mb-2 mt-2 text-start ms-3">
            {steps.find((s) => s.id === reserveStep).label}
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
        </Card>
      </Container>
      <WhatsappButton />
      <Footer />
    </>
  );
}
