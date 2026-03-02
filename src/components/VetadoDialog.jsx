import { Modal, Button } from "react-bootstrap";

const VETADO_MESSAGE_P1 =
  "Lo sentimos, debido a que reiteradas veces faltó sin previo aviso no puede avanzar con la reserva.";

const VETADO_MESSAGE_P2 =
  "Puede comunicarse directamente con Lavajato para regularizar esta situación, gracias.";
function VetadoDialog({ show, onClose }) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>No puede realizar reservas</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {" "}
        <p>{VETADO_MESSAGE_P1}</p>
        <p>{VETADO_MESSAGE_P2}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button className="action-button" onClick={onClose}>
          Entendido
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default VetadoDialog;
