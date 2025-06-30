import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const useFetchServicePricesByCarType = () => {
  const [servicePrices, setServicePrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const carType = useSelector((state) => state.client.client.carType);

  useEffect(() => {
    if (!carType) {
      setLoading(false);
      setServicePrices([]);
      return;
    }

    const fetchServicePrices = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/service-prices/car-type-name/${carType}`
        );
        setServicePrices(response.data);
      } catch (err) {
        setError(
          err.message ||
            "Ocurrió un error al cargar los precios de los servicios."
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchServicePrices();
  }, [carType]);

  return { servicePrices, loading, error };
};

export default useFetchServicePricesByCarType;
