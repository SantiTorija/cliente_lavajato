import { Container, Button, Modal, Form, Toast } from "react-bootstrap";
import { useState, useEffect } from "react";
import useIsClient from "../hooks/useFetchIsClient";
//import styles from "./emailModal.module.css";

function EmailModal(props) {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [showToast, setShowToast] = useState(false);

  // Al montar, leer el email guardado en localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem("client_email");
    if (savedEmail) {
      setEmail(savedEmail);
      setConfirmEmail(savedEmail);
    }
  }, [props.show]);

  const emailsMatch = email && confirmEmail && email === confirmEmail;
  const emailsDiffer = email && confirmEmail && email !== confirmEmail;

  const { fetchIsClient } = useIsClient();

  const handleNext = () => {
    if (!emailsMatch) {
      setShowToast(true);
      return;
    }
    localStorage.setItem("client_email", email);
    fetchIsClient(email);
  };

  return (
    <Container>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Por favor, ingrese su email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mt-2" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              isInvalid={emailsDiffer}
              isValid={emailsMatch}
            />
          </Form.Group>

          <Form.Group className="mt-2" controlId="formConfirmarEmail">
            <Form.Label>Confirmar Email</Form.Label>
            <Form.Control
              type="email"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              required
              autoComplete="email"
              isInvalid={emailsDiffer}
              isValid={emailsMatch}
            />
            {emailsDiffer && (
              <Form.Text className="text-danger">
                Los emails no coinciden
              </Form.Text>
            )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button className="back-button" onClick={props.onHide}>
            Cerrar
          </Button>
          <Button
            className="action-button"
            onClick={handleNext}
            disabled={!email || !confirmEmail}
          >
            Siguiente
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Toast de error */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        bg="danger"
        delay={3000}
        autohide
        style={{ position: "fixed", top: 20, right: 20, zIndex: 9999 }}
      >
        <Toast.Header closeButton={false}>
          <strong className="me-auto">Error</strong>
        </Toast.Header>
        <Toast.Body className="text-white">
          Los emails no coinciden. Por favor, verifica que ambos sean iguales.
        </Toast.Body>
      </Toast>
    </Container>
  );
}

export default EmailModal;
