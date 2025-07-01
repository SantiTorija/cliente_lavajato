import { Container, Button, Modal } from "react-bootstrap";

//import styles from "./moreInfoModal.module.css";

function MoreInfoModal(props) {
  return (
    <Container>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.serviceType}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{props.serviceDescription}</p>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button
            className="bg-light text-dark border-1 border-dark w-25"
            onClick={props.onHide}
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default MoreInfoModal;
