import { useState } from "react";
import axios from "axios";
import { emptyOrderToEdit } from "../redux/orderToEditSlice";
import { useDispatch } from "react-redux";

const useUpdateOrder = () => {
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const updateOrder = async (order, orderToEdit) => {
    setLoadingUpdate(true);
    try {
      const response = await axios({
        method: "PUT",
        url: `${import.meta.env.VITE_API_URL}/order/${
          orderToEdit.id
        }/?dateToEdit=${orderToEdit.cart.date}&&slotToEdit=${
          orderToEdit.cart.slot
        }`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          firstname: order.firstname,
          lastname: order.lastname,
          phone: order.phone,
          cart: order.cart,
          ServiceId: order.ServiceId,
          CarTypeId: order.CartTypeId,
        },
      });
      dispatch(emptyOrderToEdit());
      setError(null);
      return response;
    } catch (err) {
      setError(err);
      console.error("Error fetching availability:", err);
    } finally {
      setLoadingUpdate(false);
    }
  };

  return { updateOrder, loadingUpdate, error };
};

export default useUpdateOrder;
