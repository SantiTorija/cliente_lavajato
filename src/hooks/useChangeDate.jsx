import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addReserveToEdit } from "../redux/orderToEditSlice";
import { addClient } from "../redux/clientSlice";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const useChangeDate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchOrderToEdit = async (email, orderId) => {
    const result = await MySwal.fire({
      title: "Estas a punto de editar esta orden",
      text: "Si continuas, te llevaremos a seleccionar una nueva hora, y al final del proceso se sobrescribirá esta orden",
      icon: "info",
      iconColor: "#1976d2",
      showCancelButton: true,
      confirmButtonText: "Continuar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#1976d2",
      cancelButtonColor: "#b0bec5",
      background: "#e3f2fd",
      color: "#0d47a1",
    });
    if (!result.isConfirmed) return;
    setLoading(true);
    try {
      const responseOrder = await axios.get(
        `${import.meta.env.VITE_API_URL}/order/${orderId}`
      );
      const responseClient = await axios.get(
        `${import.meta.env.VITE_API_URL}/client/${email.trim()}`
      );
      console.log(responseOrder.data);
      if (responseOrder.data.length > 0) {
        dispatch(addReserveToEdit(responseOrder.data[0]));
        dispatch(addClient(responseClient.data[0]));
        navigate(`/reservas/${email}`);
      } else {
        console.log(responseOrder.data.length);
        alert(`no hay reserva`);
      }
      setError(null);
    } catch (err) {
      setError(err);
      console.error("Error fetching reserve:", err);
    } finally {
      setLoading(false);
    }
  };

  return { fetchOrderToEdit, loading, error };
};

export default useChangeDate;
