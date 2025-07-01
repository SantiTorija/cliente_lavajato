import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import AvailableSlots from "../components/AvailableSlots";
import useFetchAvailableDays from "../hooks/useFetchAvailability";
import { useSelector, useDispatch } from "react-redux";
import { Container, Col, Row, Button } from "react-bootstrap";
import { prev } from "../redux/reserveStepSlice";
import LoaderOverlay from "../components/LoaderOverlay";
import PropTypes from "prop-types";

function MyCalendar() {
  const dispatch = useDispatch();
  const [date] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [activeDate, setActiveDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const orders = useSelector((state) => state.orders);

  useEffect(() => {
    orders && orders.length > 0;
  }, []);

  // Fetch availability when month/year changes
  const { availableDays, loadingAvailableDays } =
    useFetchAvailableDays(activeDate);

  // Handle calendar view change
  const handleActiveStartDateChange = (activeStartDate) => {
    setSelectedDay(null);
    setLoading(true);
    if (activeStartDate) {
      setActiveDate(activeStartDate);
    }
    setLoading(false);
  };

  //chequea si dentro del array availability hay uno con la fecha de ese dia
  const someDayAvailableOnDate = (dateStr) => {
    return availableDays.some((day) => day.date === dateStr);
  };
  //si hay un dia lo encuentra y devuelve si hay slots disponibles
  const findDayAndCheckSlots = (dateStr) => {
    return (
      availableDays.find((day) => day.date === dateStr).slots_available.length <
      4
    );
  };

  //encuentra los slots del dia, sino devuelve []
  const findDaySlots = (dateStr) => {
    return availableDays.find((day) => day.date === dateStr)
      ? availableDays.find((day) => day.date === dateStr).slots_available
      : [];
  };

  const isDayFree = (date) => {
    // Formatear la fecha a 'YYYY-MM-DD' para comparar
    const dateStr = date.toISOString().split("T")[0];
    // Buscar si existe un registro para esta fecha
    if (availableDays.length === 0) {
      return true;
    } else if (availableDays.length > 0 && someDayAvailableOnDate(dateStr)) {
      return findDayAndCheckSlots(dateStr) ? true : false;
    } else {
      return true;
    }
  };
  // Handle day selection
  const handleDateChange = (newDate) => {
    setSelectedDay(null);
    const dateKey = newDate.toISOString().split("T")[0];
    setSelectedDay(dateKey);
  };

  const handleTileClassName = (date) => {
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
      return date.getDay() === 0 || date.getDay() === 6;
    }
    return false;
  };

  const handlePrev = () => {
    dispatch(prev());
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
              {loading ? (
                <p>Loading availableDays...</p>
              ) : (
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

export default MyCalendar;
