import { useState } from "react";
import axios from "axios";

const useStoreOrder = (date, slot) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const storeOrder = async (order) => {
    setLoading(true);
    try {
      const response = await axios({
        method: "POST",
        url: `${import.meta.env.VITE_API_URL}/order/${date}/${slot}/${
          order.email
        }`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          firstname: order.firstname,
          lastname: order.lastname,
          phone: order.phone,
          email: order.email,
          cart: order.cart,
          ClientId: order.ClientId,
          ServiceId: order.ServiceId,
          CarTypeId: order.CarTypeId,
        },
      });
      setError(null);
      return response;
    } catch (err) {
      setError(err);
      console.error("Error at storeOrder:", err);
    } finally {
      setLoading(false);
    }
  };

  return { storeOrder, loading, error };
};

export default useStoreOrder;
