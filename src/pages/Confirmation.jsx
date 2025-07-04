import { useSelector, useDispatch } from "react-redux";
import useFormatDate from "../hooks/useFormatDate";
import { emptyService, emptyCart } from "../redux/cartSlice";
import { setStartStep } from "../redux/reserveStepSlice";
import { useNavigate } from "react-router-dom";
import useStoreOrder from "../hooks/useStoreOrder";
import useUpdateOrder from "../hooks/useUpdateOrder";
import NavbarComponent from "../components/Navbar";
import { Card, Container } from "react-bootstrap";
import styles from "./confirmation.module.css";
import { prev } from "../redux/reserveStepSlice";
import Footer from "../components/Footer";
import WhatsappButton from "../components/WhatsappButton";
import LoaderOverlay from "../components/LoaderOverlay";
import { useState } from "react";
import useSwalOrderError from "../hooks/useSwalOrderError";

function Confirmation() {
  const { firstname, lastname, email, carType, clientId, carTypeId } =
    useSelector((state) => state.client);
  const orders = useSelector((state) => state.orders);

  const cart = useSelector((state) => state.cart);
  console.log(cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePrev = () => {
    dispatch(emptyService());
    dispatch(prev());
  };

  const { storeOrder, loadingStore, error } = useStoreOrder(
    cart.date,
    cart.slot
  );
  const { updateOrder, loadingUpdate } = useUpdateOrder();

  const showOrderError = useSwalOrderError();

  const handleStoreOrder = async () => {
    const result = await storeOrder({
      firstname: firstname,
      lastname: lastname,
      email: email,
      cart: cart,
      ServiceId: cart.serviceId,
      ClientId: clientId,
      CarTypeId: carTypeId,
    });

    if (result && result.error) {
      console.log("Disparando SweetAlert2 con error:", result.error, email);
      showOrderError(email);
      return; // No navegar
    }

    dispatch(emptyCart());
    dispatch(setStartStep());
    navigate("/gracias");
  };

  const handleUpdateOrder = async () => {
    try {
      await updateOrder(
        {
          firstname: firstname,
          lastname: lastname,
          phone: email,
          cart: cart,
          ServiceId: cart.serviceId,
          CarTypeId: carTypeId,
        },
        orders[0]
      );
      dispatch(emptyCart());
      dispatch(setStartStep());
      navigate("/gracias");
    } catch (error) {
      alert("hubo un error");
      console.log(error);
    }
  };

  return (
    <>
      <Container className="py-4 text-start d-flex flex-column justify-content-center align-items-center">
        <LoaderOverlay show={loadingStore} />
        <LoaderOverlay show={loadingUpdate} />
        <Card className={`${styles.card} mt-4 mx-auto`}>
          <strong className="mb-3">Resumen</strong>
          <Card.Body className="d-flex flex-column align-items-start gap-2">
            <div className="d-flex justify-content-between align-items-center border rounded-3 p-1 w-100">
              <div className="d-flex flex-column">
                <span className={styles.font}>Servicio </span>
                <strong className={styles.font}>{cart.service}</strong>
              </div>
              <div className={styles.font}>${cart.total}</div>
            </div>
            <div className="d-flex justify-content-between align-items-center border rounded-3  p-1 w-100">
              <div className="d-flex flex-column">
                <span className={styles.font}>Dia y hora </span>
                <strong className={styles.font}>
                  {useFormatDate(cart.date)} / {cart.slot}{" "}
                </strong>
              </div>
            </div>

            <span className="fs-6 mb-3">
              Total <span className="text-primary"> ${cart.total}</span>
            </span>
          </Card.Body>
          <p className={styles.warning}>
            Atención: <br />
            Esta reserva se podrá cancelar con 24 horas de anticipación como
            mínimo. En caso de no presentarse se efectuará un recargo del 30% en
            su próxima reserva
          </p>
        </Card>
        <div className="d-flex justify-content-center gap-2 mt-4 w-100">
          <button className={`back-button w-50`} onClick={() => handlePrev()}>
            Atrás
          </button>
          <button
            className={`action-button w-50`}
            onClick={() =>
              orders.length > 0 ? handleUpdateOrder() : handleStoreOrder()
            }
          >
            Reservar
          </button>
        </div>
      </Container>
      <WhatsappButton />
    </>
  );
}

export default Confirmation;
