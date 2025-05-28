import { useState } from "react";
import axios from "axios";
import { emptyOrderToEdit } from "../redux/orderToEditSlice";
import { useDispatch } from "react-redux";

const useUpdateOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const updateOrder = async (order, orderToEdit) => {
    setLoading(true);
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
        },
      });
      dispatch(emptyOrderToEdit());
      setError(null);
      return response;
    } catch (err) {
      setError(err);
      console.error("Error fetching availability:", err);
    } finally {
      setLoading(false);
    }
  };

  return { updateOrder, loading, error };
};

export default useUpdateOrder;
