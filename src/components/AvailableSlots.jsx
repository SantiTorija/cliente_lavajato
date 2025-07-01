import { useDispatch } from "react-redux";
import { addDateAndTime } from "../redux/cartSlice";
import { next, prev } from "../redux/reserveStepSlice";
import useFormatDate from "../hooks/useFormatDate";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import styles from "./availableSlot.module.css";
import { useState } from "react";
import LoaderOverlay from "./LoaderOverlay";
import { useEffect } from "react";

const AvailableSlots = ({ slotsAvailable, selectedDay }) => {
  const dispatch = useDispatch();
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filteredSlots, setFilteredSlots] = useState([]);

  const slot = [
    "08 AM - 10 AM",
    "10 AM - 12 PM",
    "13 PM - 15 PM",
    "15 PM - 17 PM",
  ];

  const handleNext = () => {
    if (selectedSlot) {
      dispatch(addDateAndTime({ date: selectedDay, slot: selectedSlot }));
      dispatch(next());
    }
  };

  const handlePrev = () => {
    dispatch(prev());
  };

  /* function slotsToShow(slot, ocupados) {
    return slot.filter((slot) => !ocupados.includes(slot));
  } */
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setFilteredSlots(slot.filter((slot) => !slotsAvailable.includes(slot)));
      setLoading(false);
    }, 100);
  }, [slotsAvailable]);
  const formatDate = useFormatDate(selectedDay);

  return (
    <>
      {slotsAvailable.length < 4 ? (
        <div className="d-flex flex-column justify-content-between h-100">
          <LoaderOverlay show={loading} />
          <div className="d-flex flex-column align-items-start gap-3">
            <strong className="mb-4">Disponibles para {formatDate}:</strong>
          </div>
          <div className="d-flex flex-column align-items-start gap-3 w-100 w-md-100">
            <div className={styles.slotsContainer}>
              {filteredSlots.map((slotItem) => (
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

          {/* Botones de navegación */}
          <div className="d-flex justify-content-around mt-4 w-100 gap-3">
            <Button className="back-button w-50" onClick={handlePrev}>
              Atrás
            </Button>
            <Button
              className="action-button w-50"
              onClick={handleNext}
              disabled={!selectedSlot}
            >
              Siguiente
            </Button>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column justify-content-between h-100">
          <div className="text-center">
            <p>No hay espacio disponible</p>
          </div>
        </div>
      )}
    </>
  );
};

AvailableSlots.propTypes = {
  slotsAvailable: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedDay: PropTypes.string.isRequired,
};

export default AvailableSlots;
