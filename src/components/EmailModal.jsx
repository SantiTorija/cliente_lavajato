import { Container, Button, Modal, Form, Toast } from "react-bootstrap";
import { useState, useEffect } from "react";
import useIsClient from "../hooks/useFetchIsClient";
import useEmailValidation from "../hooks/useEmailValidation";
import { AiOutlineWarning } from "react-icons/ai";
//import styles from "./emailModal.module.css";
import LoaderOverlay from "../components/LoaderOverlay";

function EmailModal(props) {
  const [showToast, setShowToast] = useState(false);

  // Usar los hooks de validación de email
  const emailHook = useEmailValidation("");
  const confirmEmailHook = useEmailValidation("");

  // Al montar, leer el email guardado en localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem("client_email");
    if (savedEmail) {
      emailHook.updateEmail(savedEmail);
      confirmEmailHook.updateEmail(savedEmail);
    }
  }, [props.show]);

  const emailsMatch =
    emailHook.email &&
    confirmEmailHook.email &&
    emailHook.email === confirmEmailHook.email;
  const emailsDiffer =
    emailHook.email &&
    confirmEmailHook.email &&
    emailHook.email !== confirmEmailHook.email;
  const bothEmailsValid = emailHook.isValid && confirmEmailHook.isValid;

  const { fetchIsClient, loading, error } = useIsClient();

  const handleNext = () => {
    if (!emailsMatch) {
      setShowToast(true);
      return;
    }

    if (!bothEmailsValid) {
      setShowToast(true);
      return;
    }

    localStorage.setItem("client_email", emailHook.email);
    fetchIsClient(emailHook.email, () => {
      setShowToast(true);
    });
  };

  return (
    <Container>
      <LoaderOverlay show={loading} />
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
              value={emailHook.email}
              onChange={(e) => emailHook.updateEmail(e.target.value)}
              required
              autoComplete="email"
              isInvalid={!emailHook.isValid && emailHook.email !== ""}
              isValid={emailHook.isValid && emailHook.email !== ""}
            />
            {emailHook.email && !emailHook.isValid && (
              <Form.Text className="text-danger d-flex align-items-center gap-1">
                <AiOutlineWarning /> Formato de email inválido
              </Form.Text>
            )}
            {emailHook.email && emailHook.isValid && (
              <Form.Text className="text-success">
                ✓ Formato de email válido
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mt-2" controlId="formConfirmarEmail">
            <Form.Label>Confirmar Email</Form.Label>
            <Form.Control
              type="email"
              value={confirmEmailHook.email}
              onChange={(e) => confirmEmailHook.updateEmail(e.target.value)}
              required
              autoComplete="email"
              isInvalid={
                !confirmEmailHook.isValid && confirmEmailHook.email !== ""
              }
              isValid={
                confirmEmailHook.isValid && confirmEmailHook.email !== ""
              }
            />
            {confirmEmailHook.email && !confirmEmailHook.isValid && (
              <Form.Text className="text-danger d-flex align-items-center gap-1">
                <AiOutlineWarning /> Formato de email inválido
              </Form.Text>
            )}
            {confirmEmailHook.email && confirmEmailHook.isValid && (
              <Form.Text className="text-success">
                ✓ Formato de email válido
              </Form.Text>
            )}
            {emailsDiffer && (
              <Form.Text className="text-danger d-flex align-items-center gap-1">
                <AiOutlineWarning /> Los emails no coinciden
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
            disabled={
              !emailHook.email || !confirmEmailHook.email || !bothEmailsValid
            }
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
        delay={4000}
        autohide
        style={{ position: "fixed", top: 20, right: 20, zIndex: 9999 }}
      >
        <Toast.Header closeButton={false}>
          <strong className="me-auto">Error de validación</strong>
        </Toast.Header>
        <Toast.Body className="text-white">
          {!emailsMatch
            ? "Los emails no coinciden. Por favor, verifica que ambos sean iguales."
            : error ||
              "Por favor, ingresa emails válidos y verifica que existan."}
        </Toast.Body>
      </Toast>
    </Container>
  );
}

export default EmailModal;
