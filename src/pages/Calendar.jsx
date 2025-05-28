import { useState, useEffect, useCallback } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import AvailableSlots from "../components/AvailableSlots";
import axios from "axios";
import useFetchAvailableDays from "../hooks/useFetchAvailability";
import { useSelector } from "react-redux";
import { Container, Col, Row } from "react-bootstrap";
import NavbarComponent from "../components/Navbar";

function MyCalendar() {
  const [date, setDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [activeDate, setActiveDate] = useState(new Date());
  /*   const [availableDays, setAvailableDays] = useState([]);*/
  const [loading, setLoading] = useState(false);

  const orders = useSelector((state) => state.orders);

  useEffect(() => {
    orders && orders.length > 0;
  }, []);

  // Fetch availability when month/year changes
  const { availableDays } = useFetchAvailableDays(activeDate);

  useEffect(() => {
    console.log(orders);
  }, []);

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
      // Deshabilitar si el día es domingo (día 0)
      return date.getDay() === 0;
    }
    return false;
  };

  return (
    availableDays && (
      <>
        <Container className="w-100 px-4">
          <Row className="align-items-between gap-4  d-flex justify-content-center align-items-center mt-5 bg-white rounded-3 py-2">
            <Col className="w-100  d-flex flex-column align-items-start mb-2 border-white ">
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
            {selectedDay && (
              <Col className="w-100 mt-2">
                <AvailableSlots
                  slotsAvailable={findDaySlots(selectedDay)}
                  selectedDay={selectedDay}
                />
              </Col>
            )}
          </Row>
        </Container>
      </>
    )
  );
}

export default MyCalendar;
