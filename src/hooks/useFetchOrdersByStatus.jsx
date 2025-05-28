import { useState } from "react";
import axios from "axios";

const useFetchOrdersByStatus = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);

  const fetchOrdersByStatus = async (status, email) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/order/status/${status}/email/${email.trim()}`
      );
      setOrders(response.data);
    } catch (err) {
      setError(err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  return { fetchOrdersByStatus, orders, loading, error };
};

export default useFetchOrdersByStatus;
