import { useState, useEffect } from "react";
import axios from "axios";

const useFetchServicesAndPrice = (carTypeId) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [services, setServices] = useState([]);

  const fetchServicesAndPrices = async () => {
    console.log(carTypeId);
    if (!carTypeId) return;

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/service-price/car-type/${carTypeId}`
      );
      console.log(response.data);
      setServices(response.data);
    } catch (err) {
      setError(err);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  // Cargar los servicios y precios cuando cambie el carTypeId
  useEffect(() => {
    fetchServicesAndPrices();
  }, [carTypeId]);

  return { services, loading, error, refetch: fetchServicesAndPrices };
};

export default useFetchServicesAndPrice;
