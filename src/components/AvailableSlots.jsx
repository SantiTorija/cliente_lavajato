import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDateAndTime } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import useFormatDate from "../hooks/useFormatDate";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import { Container, Col, Row, Button } from "react-bootstrap";
import MoreInfoModal from "./MoreInfoModal";
import styles from "./availableSlot.module.css";
import { next, prev } from "../redux/reserveStepSlice";
import { emptyDateTime } from "../redux/cartSlice";

const AvailableSlots = ({ slotsAvailable, selectedDay }) => {
  const [loading, setLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("");
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const { carType } = useSelector((state) => state.client);
  const [lavado, setLavado] = useState("");
  const [lavadoYEncerado, setLavadoYEncerado] = useState("");
  const [tipoLavado, setTipoLavado] = useState(null);
  const [total, setTotal] = useState("");
  const [modalShowEncerado, setModalShowEncerado] = useState(false);
  const [modalShowCompleto, setModalShowCompleto] = useState(false);

  AvailableSlots.propTypes = {
    slotsAvailable: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedDay: PropTypes.string.isRequired,
  };

  const formatDate = useFormatDate(selectedDay);

  const slot = [
    "08 AM - 10 AM",
    "10 AM - 12 PM",
    "13 PM - 15 PM",
    "15 PM - 17 PM",
  ];

  useEffect(() => {
    if (carType === "Auto - furgón chico") {
      setLavado("800");
      setLavadoYEncerado("1100");
    } else if (carType === "Pick Up pequeñas - SUV") {
      setLavado("1000");
      setLavadoYEncerado("1300");
    } else {
      setLavado("1200");
      setLavadoYEncerado("1500");
    }
    console.log(slotsAvailable);
  }, [carType]);

  const getSlotNumber = (timeRange) => {
    return (
      Object.entries(slot).find(([key, value]) => value === timeRange)?.[0] ||
      null
    );
  };

  function slotsToShow(slot, ocupados) {
    return slot.filter((slot) => !ocupados.includes(slot));
  }

  const handleSeveReserve = () => {
    if (!selectedSlot) {
      alert("seleccione un horario");
    } else {
      dispatch(
        addDateAndTime({
          date: selectedDay,
          slot: selectedSlot,
        })
      );
      dispatch(next());
    }
    return;
  };

  const handleChange = (type, price) => {
    setTipoLavado((prev) => (prev === type ? null : type));
    setTotal(price);
  };

  const handlePrev = () => {
    dispatch(emptyDateTime());
    dispatch(prev());
  };

  useEffect(() => {
    console.log(cart);
  }, [cart, selectedSlot]);

  return (
    <>
      {loading ? (
        <p>Loading slots...</p>
      ) : slotsAvailable.length < 4 ? (
        <div className=" d-flex flex-column justify-content-between h-100">
          <div className="d-flex flex-column align-items-start gap-3">
            <strong className="mb-4">Disponibles para {formatDate}:</strong>
            {/* <select
              className="mb-4"
              value={selectedSlot}
              name=""
              id=""
              onChange={(e) => setSelectedSlot(e.target.value)}
            >
              <option value="" disabled>
                Selecciona un horario
              </option>
              {slotsToShow(slot, slotsAvailable).map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select> */}
          </div>
          <div className="d-flex flex-column align-items-start gap-3 w-100 w-md-100">
            {/* <strong className="">Seleccione tipo de lavado</strong> */}
            {/*  <Form className="d-flex flex-column align-items-start gap-2 w-100">
              <div className="d-flex align-items-center">
                <Form.Check // prettier-ignore
                  type="switch"
                  id="custom-switch-completo"
                  checked={tipoLavado === "Lavado completo"}
                  onChange={() => handleChange("Lavado completo", lavado)}
                />
                <span className="text-white">
                  Lavado completo -{" "}
                  <button
                    type="button"
                    className={styles.moreInfoButton}
                    onClick={() => setModalShowCompleto(true)}
                  >
                    Mas info -
                  </button>{" "}
                  ${`${lavado}`}
                </span>
              </div>
              <MoreInfoModal
                serviceType={"Lavado completo"}
                show={modalShowCompleto}
                onHide={() => setModalShowCompleto(false)}
              />
              
              <div className="d-flex w-100 align-items-center">
                <Form.Check // prettier-ignore
                  type="switch"
                  id="custom-switch-encerado"
                  checked={tipoLavado === "Lavado completo y encerado"}
                  onChange={() =>
                    handleChange("Lavado completo y encerado", lavadoYEncerado)
                  }
                />
                <span className="w-100 text-white">
                  Lavado con encerado -{" "}
                  <button
                    type="button"
                    onClick={() => setModalShowEncerado(true)}
                    className={styles.moreInfoButton}
                  >
                    Mas info -
                  </button>{" "}
                  ${`${lavadoYEncerado}`}
                </span>
              </div>
              <MoreInfoModal
                serviceType={"Lavado completo y encerado"}
                show={modalShowEncerado}
                onHide={() => setModalShowEncerado(false)}
              />
              
            </Form> */}
            <div className={styles.slotsContainer}>
              {slotsToShow(slot, slotsAvailable).map((slotItem) => (
                <div
                  key={slotItem}
                  onClick={() => setSelectedSlot(slotItem)}
                  className={`${styles.slotItem} ${
                    selectedSlot === slotItem ? styles.active : ""
                  }`}
                >
                  {slotItem}
                </div>
              ))}
            </div>
          </div>
          <div className="w-100 d-flex justify-content-center pt-3 gap-2">
            <Button
              type="button"
              className="mt-2 back-button w-50"
              onClick={() => handlePrev()}
            >
              Atrás
            </Button>
            <Button
              type="button"
              className="mt-2 action-button w-50"
              onClick={() => handleSeveReserve()}
            >
              Siguiente
            </Button>
          </div>
        </div>
      ) : (
        "No hay espacio disponible"
      )}
    </>
  );
};

export default AvailableSlots;
