import { FaRegCircleCheck } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./thankYou.module.css";
import { emptyCart } from "../redux/cartSlice";
import { removeClient } from "../redux/clientSlice";
import { emptyOrderToEdit } from "../redux/orderToEditSlice";
import { useState } from "react";
import LoaderOverlay from "../components/LoaderOverlay";

function ThankYou() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { email } = useSelector((state) => state.client);

  const handleBackHome = () => {
    setLoading(true);
    dispatch(emptyCart());
    dispatch(removeClient());
    dispatch(emptyOrderToEdit());
    setTimeout(() => {
      setLoading(false);
      window.location.href = "/";
    }, 250);
  };

  return (
    <div className={styles.containerThanks}>
      <LoaderOverlay show={loading} />
      <div className={styles.cardThanks}>
        <h1 className={styles.titleThanks}>TU RESERVA YA ESTÁ LISTA</h1>
        <div className={styles.checkIconThanks}>
          <FaRegCircleCheck />
        </div>
        <p className={styles.messageThanks}>
          Muchas gracias por confiar en Lavajato
        </p>
        <p className={styles.messageThanks}>
          Te llegará un email de confirmación con toda la información a
          <strong> {email}</strong>
        </p>
        <button className={styles.buttonThanks} onClick={handleBackHome}>
          VOLVER AL INICIO
        </button>
      </div>
    </div>
  );
}

export default ThankYou;
