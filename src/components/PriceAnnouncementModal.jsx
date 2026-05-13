import { useState, useEffect, useCallback } from "react";
import { Modal, Button } from "react-bootstrap";

const STORAGE_KEY = "lavajato_home_price_announcement_seen";
const COUNTDOWN_START = 7;

function PriceAnnouncementModal() {
  const [show, setShow] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_START);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    setShow(true);
  }, []);

  useEffect(() => {
    if (!show || secondsLeft <= 0) return;
    const id = window.setTimeout(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);
    return () => window.clearTimeout(id);
  }, [show, secondsLeft]);

  const handleClose = useCallback(() => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setShow(false);
  }, []);

  const canClose = secondsLeft <= 0;

  return (
    <Modal
      show={show}
      onHide={canClose ? handleClose : undefined}
      backdrop={canClose ? true : "static"}
      keyboard={canClose}
      centered
      aria-labelledby="price-announcement-modal-title"
    >
      <Modal.Header closeButton={canClose}>
        <Modal.Title id="price-announcement-modal-title">Aviso</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="mb-0">
          Estimado cliente:
          <br />
          <br />
          Le informamos que a partir del <strong>15 de mayo</strong> se verá
          reflejado un ajuste de precios.
          <br />
          <br />
          Muchas gracias por elegirnos!
        </p>
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        <Button
          className="action-button text-nowrap"
          disabled={!canClose}
          onClick={handleClose}
          aria-busy={!canClose}
        >
          {canClose ? "Cerrar anuncio" : `Cerrar en: ${secondsLeft}`}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PriceAnnouncementModal;
