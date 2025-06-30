import styles from "./services.module.css";
import { useState } from "react";
import { Form, Button, Toast } from "react-bootstrap";
import MoreInfoModal from "./MoreInfoModal";
import { useSelector, useDispatch } from "react-redux";
import { addService, emptyDateTime } from "../redux/cartSlice";
import { next, prev } from "../redux/reserveStepSlice";
import useFetchServices from "../hooks/useFetchServices";

const Services = () => {
  const [service, setService] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [total, setTotal] = useState("");
  const [modalShowCompleto, setModalShowCompleto] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  const { carTypeId } = useSelector((state) => state.client);

  const { services, loading, error } = useFetchServices(carTypeId);

  const handleChange = (service, price) => {
    setService((prev) => (prev === service ? null : service));
    setTotal(price);
    setShowError(false);
  };

  const handleNext = () => {
    if (!service) {
      setShowError(true);
      setShowToast(true);
      return;
    }
    dispatch(
      addService({
        service,
        serviceId,
        total,
      })
    );
    dispatch(next());
    return;
  };

  const handlePrev = () => {
    dispatch(emptyDateTime());
    dispatch(prev());
  };

  return (
    <>
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        bg="danger"
        delay={3000}
        autohide
        style={{ position: "fixed", top: 20, right: 20, zIndex: 9999 }}
      >
        <Toast.Header closeButton={false}>
          <strong className="me-auto">Atención</strong>
        </Toast.Header>
        <Toast.Body className="text-white">
          Debe seleccionar al menos un servicio para continuar.
        </Toast.Body>
      </Toast>
      <Form className="d-flex py-4  px-2 flex-column align-items-start gap-2 w-100">
        {services.map((item) => (
          <div
            className="border p-2 rounded-3 mb-2 w-100"
            key={item.Service.id}
          >
            <div
              className="d-flex justify-content-between align-items-center w-100"
              style={{ minHeight: 48 }}
            >
              <div className="d-flex align-items-center">
                <Form.Check
                  type="switch"
                  id={`custom-switch-${item.Service.id}`}
                  checked={serviceId === item.Service.id}
                  onChange={() => {
                    setServiceId(item.Service.id);
                    setService(item.Service.name);
                    setTotal(item.price);
                    setShowError(false);
                  }}
                  className="me-2"
                />
                <div className="d-flex flex-column align-items-start">
                  <span className={styles.serviceFont}>
                    {item.Service.name}
                  </span>
                  <button
                    type="button"
                    className={`${styles.moreInfoButton} `}
                    onClick={() => setModalShowCompleto(true)}
                    style={{
                      color: "#0097a7",
                      background: "none",
                      border: "none",
                      fontWeight: 600,
                    }}
                  >
                    Más info
                  </button>
                </div>
              </div>
              <span className={styles.priceFont} style={{ color: "#444" }}>
                ${Number(item.price).toFixed(2)}
              </span>
            </div>
            <MoreInfoModal
              serviceType={item.Service.name}
              show={modalShowCompleto}
              onHide={() => setModalShowCompleto(false)}
            />
          </div>
        ))}
        {showError && (
          <div className="text-danger fw-bold mt-2">
            Debe seleccionar al menos un servicio para continuar.
          </div>
        )}
        <p className={styles.disclaimerFont}>
          Atención:
          <br /> Si al momento de la visita se determina que la categoría
          seleccionada no corresponde al tamaño o tipo real del vehículo, se
          ajustará el precio del servicio para reflejar adecuadamente el tamaño
          y tipo correctos.
        </p>
      </Form>
      <div className="w-100 d-flex justify-content-center pb-3 gap-2 px-3">
        <Button
          type="button"
          className="mt-2 back-button w-50"
          onClick={() => handlePrev()}
        >
          Atrás
        </Button>
        <Button
          type="button"
          onClick={() => handleNext()}
          className="mt-2 action-button w-50"
        >
          Siguiente
        </Button>
      </div>
    </>
  );
};

export default Services;
