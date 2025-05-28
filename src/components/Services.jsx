import styles from "./services.module.css";
import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import MoreInfoModal from "./MoreInfoModal";
import { useSelector, useDispatch } from "react-redux";
import { addService, emptyDateTime } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { prev, next } from "../redux/reserveStepSlice";

const Services = () => {
  const [service, setService] = useState("");
  const [lavadoCompletoPrecio, setLavadoCompletoPrecio] = useState("");
  const [total, setTotal] = useState("");
  const [lavadoYEnceradoPrecio, setLavadoYEnceradoPrecio] = useState("");
  const [modalShowCompleto, setModalShowCompleto] = useState(false);
  const [modalShowEncerado, setModalShowEncerado] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { carType } = useSelector((state) => state.client);
  const { prices } = useSelector((state) => state.services);

  useEffect(() => {
    if (!carType || !prices) return;

    if (carType === "Auto - furgón chico") {
      setLavadoCompletoPrecio(prices.chico.lavado);
      setLavadoYEnceradoPrecio(prices.chico.lavadoYEncerado);
    } else if (carType === "Pick Up pequeñas - SUV") {
      setLavadoCompletoPrecio(prices.suv.lavado);
      setLavadoYEnceradoPrecio(prices.suv.lavadoYEncerado);
    } else {
      setLavadoCompletoPrecio(prices.grande.lavado);
      setLavadoYEnceradoPrecio(prices.grande.lavadoYEncerado);
    }
  }, [carType, prices]);

  const handleChange = (service, price) => {
    setService((prev) => (prev === service ? null : service));
    setTotal(price);
  };

  const handleNext = () => {
    dispatch(
      addService({
        service,
        carType,
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
      <Form className="d-flex py-4  px-2 flex-column align-items-start gap-2 w-100">
        {/* Lavado Completo */}
        <div className="border p-1 rounded-3">
          <div className="d-flex align-items-center w-100 mb-2">
            <Form.Check
              type="switch"
              id="custom-switch-completo"
              checked={service === "Lavado completo"}
              onChange={() =>
                handleChange("Lavado completo", lavadoCompletoPrecio)
              }
            />
            <span className=" ms-2">
              Lavado completo -{" "}
              <button
                type="button"
                className={styles.moreInfoButton}
                onClick={() => setModalShowCompleto(true)}
              >
                Más info -
              </button>{" "}
              ${lavadoCompletoPrecio}
            </span>
          </div>

          {/* Modal Lavado Completo */}
          <MoreInfoModal
            serviceType="Lavado completo"
            show={modalShowCompleto}
            onHide={() => setModalShowCompleto(false)}
          />

          {/* Lavado con Encerado */}
          <div className="d-flex align-items-center w-100">
            <Form.Check
              type="switch"
              id="custom-switch-encerado"
              checked={service === "Lavado completo y encerado"}
              onChange={() =>
                handleChange(
                  "Lavado completo y encerado",
                  lavadoYEnceradoPrecio
                )
              }
            />
            <span className=" ms-2">
              Lavado con encerado -{" "}
              <button
                type="button"
                className={styles.moreInfoButton}
                onClick={() => setModalShowEncerado(true)}
              >
                Más info -
              </button>{" "}
              ${lavadoYEnceradoPrecio}
            </span>
          </div>
          {/* Modal Lavado con Encerado */}
          <MoreInfoModal
            serviceType="Lavado completo y encerado"
            show={modalShowEncerado}
            onHide={() => setModalShowEncerado(false)}
          />
        </div>

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
