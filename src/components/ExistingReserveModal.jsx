import { Container, Button, Modal, Form } from "react-bootstrap";
import styles from "./existingReserveModal.module.css";
import { useState } from "react";
import useChangeDate from "../hooks/useChangeDate";
import useIsClient from "../hooks/useFetchIsClient";
import useDeleteAlert from "../hooks/useDeleteAlert";

function ExistingReserveModal(props) {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");

  const emailsMatch = email && confirmEmail && email === confirmEmail;

  const { fetchOrderToEdit } = useChangeDate();
  const { fetchIsClient } = useIsClient();
  const { handleDelete } = useDeleteAlert();

  const handleDateChange = (email) => {
    fetchOrderToEdit(email);
    fetchIsClient(email);
  };

  return (
    <Container>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className=" mb-3">
          <span className={styles.title}>Por favor, ingrese su email</span>
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
        <Modal.Footer className="d-flex justify-content-start">
          <div className="d-flex justify-content-between align-items-center gap-2 mt-3 w-100">
            <Button
              onClick={() => email && fetchOrderToEdit(email)}
              className="action-button"
            >
              Buscar
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ExistingReserveModal;
