import { useState, useRef, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import AvailableSlots from "../components/AvailableSlots";
import useFetchAvailableDays from "../hooks/useFetchAvailability";
import { useDispatch } from "react-redux";
import { Container, Col, Row } from "react-bootstrap";
import LoaderOverlay from "../components/LoaderOverlay";
import PropTypes from "prop-types";
import { emptyDateTime } from "../redux/cartSlice";

function MyCalendar({ showError = false }) {
  const [date] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [activeDate, setActiveDate] = useState(new Date());
  const [visibleRange, setVisibleRange] = useState({ startDate: null, endDate: null });
  const dispatch = useDispatch();

  const visibleDatesRef = useRef(new Set());
  const prevActiveRef = useRef(null);

  if (prevActiveRef.current?.getTime() !== activeDate.getTime()) {
    visibleDatesRef.current.clear();
    prevActiveRef.current = activeDate;
  }

  // Recolectar fechas visibles desde tileClassName y obtener rango para el fetch
  const { availableDays, loadingAvailableDays } =
    useFetchAvailableDays(visibleRange.startDate, visibleRange.endDate);

  useEffect(() => {
    const dates = Array.from(visibleDatesRef.current);
    if (dates.length === 0) return;
    const sorted = dates.sort();
    setVisibleRange({ startDate: sorted[0], endDate: sorted[sorted.length - 1] });
  }, [activeDate]);

  // Handle calendar view change
  const handleActiveStartDateChange = (activeStartDate) => {
    setSelectedDay(null);
    if (activeStartDate) {
      setActiveDate(activeStartDate);
    }
  };

  //chequea si dentro del array availability hay uno con la fecha de ese dia
  const someDayAvailableOnDate = (dateStr) => {
    return availableDays.some((day) => day.date === dateStr);
  };
  //si hay un dia lo encuentra y devuelve si hay slots disponibles
  const findDayAndCheckSlots = (dateStr) => {
    const day = availableDays.find((day) => day.date === dateStr);
    if (!day) return false;
    return day.slots_available.length < 4;
  };

  //encuentra los slots del dia, sino devuelve []
  const findDaySlots = (dateStr) => {
    const day = availableDays.find((day) => day.date === dateStr);
    return day ? day.slots_available : [];
  };

  const isDayFree = (date) => {
    const dateStr = date.toISOString().split("T")[0];
    if (availableDays.length === 0) {
      return true;
    }
    if (someDayAvailableOnDate(dateStr)) {
      return findDayAndCheckSlots(dateStr);
    }
    return true;
  };
  // Handle day selection
  const handleDateChange = (newDate) => {
    dispatch(emptyDateTime());
    setSelectedDay(null);
    const dateKey = newDate.toISOString().split("T")[0];
    setSelectedDay(dateKey);
  };

  const handleTileClassName = (date) => {
    const dateStr = date.toISOString().split("T")[0];
    visibleDatesRef.current.add(dateStr);

    const classes = [];

    if (isDayFree(date)) {
      classes.push("available-day");
    } else {
      classes.push("unavailable-day");
    }

    if (
      selectedDay &&
      date.toISOString().split("T")[0] === selectedDay &&
      isDayFree(date)
    ) {
      classes.push("selected-day");
    } else if (
      selectedDay &&
      date.toISOString().split("T")[0] === selectedDay &&
      !isDayFree(date)
    ) {
      classes.push("selected-unavailable-day");
    }

    return classes.join(" ");
  };

  const disableSundays = ({ date, view }) => {
    // Solo deshabilitar en la vista de mes
    if (view === "month") {
      // Deshabilitar si el día es sábado (6) o domingo (0)
      if (date.getDay() === 0 || date.getDay() === 6) return true;

      // Deshabilitar el día actual
      const today = new Date();
      const uruguayTime = new Date(
        today.toLocaleString("en-US", { timeZone: "America/Montevideo" })
      );
      const isToday =
        date.getDate() === uruguayTime.getDate() &&
        date.getMonth() === uruguayTime.getMonth() &&
        date.getFullYear() === uruguayTime.getFullYear();

      if (isToday) return true;
    }
    return false;
  };

  return (
    availableDays && (
      <>
        <Container className="w-100 px-4">
          <LoaderOverlay show={loadingAvailableDays} />
          <Row className="align-items-center gap-4 d-flex justify-content-center  mt-5 bg-white rounded-3 py-2">
            <Col
              xs={12}
              md={6}
              className="d-flex flex-column align-items-start mb-2 border-white "
            >
              {/* <span>{orders ? `Bienvenido ${orders[0].firstname}` : ""}</span> */}
              <Calendar
                onChange={handleDateChange}
                value={date}
                onActiveStartDateChange={({ activeStartDate }) =>
                  handleActiveStartDateChange(activeStartDate)
                }
                tileClassName={({ date }) => handleTileClassName(date)}
                tileDisabled={disableSundays}
                minDate={new Date()}
                locale="es" // Configura el idioma
              />
              {/* Mensaje de error debajo del calendario */}
              {showError && (
                <div className="mt-3 text-center w-100">
                  <p className="text-danger mb-0 fw-bold">
                    ⚠️ Selecciona una fecha y hora antes de continuar
                  </p>
                </div>
              )}
            </Col>
            <Col
              xs={12}
              md={4}
              className={`mt-2 flex-column align-items-center justify-content-center ${
                selectedDay ? "d-flex" : "d-none"
              }`}
            >
              {selectedDay && (
                <AvailableSlots
                  slotsAvailable={findDaySlots(selectedDay)}
                  selectedDay={selectedDay}
                />
              )}
            </Col>
          </Row>
        </Container>
      </>
    )
  );
}

MyCalendar.propTypes = {
  showError: PropTypes.bool,
};

export default MyCalendar;
