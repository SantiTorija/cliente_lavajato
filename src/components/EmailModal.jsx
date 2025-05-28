import { Container, Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import useIsClient from "../hooks/useFetchIsClient";
//import styles from "./emailModal.module.css";

function EmailModal(props) {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");

  const emailsMatch = email && confirmEmail && email === confirmEmail;

  const { fetchIsClient } = useIsClient();

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
            />
          </Form.Group>

          <Form.Group className="mt-2" controlId="formConfirmarEmail">
            <Form.Label>Confirmar Email</Form.Label>
            <Form.Control
              type="email"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button className="back-button" onClick={props.onHide}>
            Cerrar
          </Button>
          <Button
            className="action-button"
            onClick={() => fetchIsClient(email)}
          >
            Siguiente
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default EmailModal;
