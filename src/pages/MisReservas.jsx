import { useState, useCallback, useEffect } from "react";
import NavbarComponent from "../components/Navbar";
import Footer from "../components/Footer";
import { Container, Form, Button, Tabs, Tab, Toast } from "react-bootstrap";
import styles from "./misReservas.module.css";
import useFetchOrdersByStatus from "../hooks/useFetchOrdersByStatus";
import { FaEdit, FaTrash } from "react-icons/fa";
import useDeleteAlert from "../hooks/useDeleteAlert";
import useChangeDate from "../hooks/useChangeDate";
import LoaderOverlay from "../components/LoaderOverlay";
import useEmailValidation from "../hooks/useEmailValidation";
import { AiOutlineWarning } from "react-icons/ai";
import { useSelector } from "react-redux";

export default function MisReservas() {
  const [email, setEmail] = useState("");
  const [key, setKey] = useState("Active");
  const [searchedEmail, setSearchedEmail] = useState("");
  const fetchOrdersByStatus = useFetchOrdersByStatus();
  const { orders, loading, error } = useSelector(
    (state) => state.ordersByStatus
  );
  const [emailError, setEmailError] = useState("");
  const { handleDelete } = useDeleteAlert();
  const { fetchOrderToEdit, loadingOrderToEdit } = useChangeDate();
  const emailValidation = useEmailValidation("");
  const [toast, setToast] = useState({
    show: false,
    message: "",
    variant: "success",
  });

  useEffect(() => {
    const savedEmail = localStorage.getItem("client_email");
    if (savedEmail) {
      setEmail(savedEmail);
      emailValidation.updateEmail(savedEmail);
    }
  }, []);

  // Buscar reservas al hacer click en Buscar
  const handleBuscar = useCallback(() => {
    if (!email.trim()) {
      setEmailError("Ingrese un email");
      return;
    }
    setEmailError("");
    setSearchedEmail(email.trim());
    fetchOrdersByStatus(key, email.trim());
  }, [email, key, fetchOrdersByStatus]);

  // Volver a buscar al cambiar de tab si ya se buscó un email
  useEffect(() => {
    if (searchedEmail) {
      fetchOrdersByStatus(key, searchedEmail);
    }
  }, [key]);

  // Limpiar error de email al cambiar el input
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    localStorage.setItem("client_email", e.target.value);
    emailValidation.updateEmail(e.target.value);
    if (emailError) setEmailError("");
    setSearchedEmail(""); // Limpiar resultados previos al cambiar email
  };

  // Utilidad para formatear fecha sin hook
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    const date = new Date(year, month - 1, day);
    if (isNaN(date.getTime())) return "";
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("es-ES", options);
  };

  return (
    <>
      <NavbarComponent />
      <Container className="py-5" style={{ minHeight: "70vh" }}>
        <LoaderOverlay show={loadingOrderToEdit} />
        <h1 className="text-white mb-4">Mis reservas</h1>
        <div className="d-flex align-items-start gap-2">
          <div className="w-100" style={{ maxWidth: 400 }}>
            <Form.Group className="mb-0">
              <Form.Control
                className="input-email-responsive"
                type="email"
                placeholder="Ingrese email"
                value={email}
                onChange={handleEmailChange}
                isInvalid={!emailValidation.isValid && email !== ""}
                isValid={emailValidation.isValid && email !== ""}
              />
              {email && !emailValidation.isValid && (
                <Form.Text className="text-danger d-flex align-items-center gap-1 mt-1">
                  <AiOutlineWarning /> Formato de email inválido
                </Form.Text>
              )}
            </Form.Group>
          </div>

          <Button
            className={styles.btnBuscar}
            onClick={handleBuscar}
            disabled={loading}
          >
            Buscar
          </Button>
        </div>
        {emailError && (
          <div style={{ color: "red", marginBottom: 8 }}>{emailError}</div>
        )}
        <h4 className="text-white mt-5 mb-3">Reservas</h4>
        <div className={styles.tabsContainer}>
          <Tabs
            id="reservas-tabs"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className={styles.navPills + " mb-3"}
            fill
          >
            <Tab eventKey="Active" title="Activas">
              <div className="text-white">
                <LoaderOverlay show={loading} />
                {error && <div>Error: {error.message}</div>}
                {!loading &&
                  !error &&
                  orders.length === 0 &&
                  searchedEmail &&
                  !emailError && (
                    <div style={{ color: "red" }}>
                      No hay ninguna reserva. Revise si hay algún error
                    </div>
                  )}
                {!loading && !error && orders.length > 0 && (
                  <div className="d-flex flex-column gap-3">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="d-flex justify-content-between align-items-center border rounded-3 p-2 bg-white"
                        style={{ minWidth: 300, maxWidth: 600 }}
                      >
                        <div className="w-100">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex flex-column">
                              <span className={styles.font}>Servicio </span>
                              <strong className={styles.font}>
                                {order.cart.service} / {order.cart.carType}
                              </strong>
                            </div>
                            <div className={styles.font}>
                              ${order.cart.total}
                            </div>
                          </div>
                          <div className="d-flex flex-column mt-2">
                            <span className={styles.font}>Día y hora </span>
                            <strong className={styles.font}>
                              {formatDate(order.cart.date)} / {order.cart.slot}
                            </strong>
                          </div>
                        </div>
                        {key === "Active" && (
                          <div className="d-flex flex-column align-items-end ms-3 gap-2">
                            <button
                              className="btn btn-outline-primary btn-sm"
                              title="Editar"
                              onClick={() =>
                                fetchOrderToEdit(order.email, order.id)
                              }
                            >
                              <FaEdit />
                            </button>
                            <button
                              className="btn btn-outline-danger btn-sm"
                              title="Eliminar"
                              onClick={() =>
                                handleDelete(
                                  order.id,
                                  order.cart.date,
                                  order.cart.slot,
                                  setToast
                                )
                              }
                            >
                              <FaTrash />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Tab>
            <Tab eventKey="Inactive" title="Inactivas">
              <div className="text-white">
                {loading && "Cargando..."}
                {error && <div>Error: {error.message}</div>}
                {!loading &&
                  !error &&
                  orders.length === 0 &&
                  searchedEmail &&
                  !emailError && (
                    <div style={{ color: "red" }}>
                      No hay ninguna reserva. Revise si hay algún error
                    </div>
                  )}
                {!loading && !error && orders.length > 0 && (
                  <div className="d-flex flex-column gap-3">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="d-flex justify-content-between align-items-center border rounded-3 p-2 bg-white"
                        style={{ minWidth: 300, maxWidth: 600 }}
                      >
                        <div className="w-100">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex flex-column">
                              <span className={styles.font}>Servicio </span>
                              <strong className={styles.font}>
                                {order.cart.service} / {order.cart.carType}
                              </strong>
                            </div>
                            <div className={styles.font}>
                              ${order.cart.total}
                            </div>
                          </div>
                          <div className="d-flex flex-column mt-2">
                            <span className={styles.font}>Día y hora </span>
                            <strong className={styles.font}>
                              {formatDate(order.cart.date)} / {order.cart.slot}
                            </strong>
                          </div>
                        </div>
                        {key === "Active" && (
                          <div className="d-flex flex-column align-items-end ms-3 gap-2">
                            <button
                              className="btn btn-outline-primary btn-sm"
                              title="Editar"
                              onClick={() => fetchOrderToEdit(order.id)}
                            >
                              <FaEdit />
                            </button>
                            <button
                              className="btn btn-outline-danger btn-sm"
                              title="Eliminar"
                              onClick={() =>
                                handleDelete(
                                  order.id,
                                  order.cart.date,
                                  order.cart.slot,
                                  setToast
                                )
                              }
                            >
                              <FaTrash />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Tab>
          </Tabs>
        </div>
      </Container>
      <Toast
        onClose={() => setToast({ ...toast, show: false })}
        show={toast.show}
        delay={3000}
        autohide
        bg={toast.variant}
        style={{ position: "fixed", top: 20, right: 20, zIndex: 9999 }}
      >
        <Toast.Body className="text-white">{toast.message}</Toast.Body>
      </Toast>
      <Footer />
    </>
  );
}
