import { useState, useEffect } from "react";
import axios from "axios";

const useFetchCarTypes = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [carTypes, setCarTypes] = useState([]);

  const fetchCarTypes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/car-type`
      );
      setCarTypes(response.data);
      console.log(response.data);
    } catch (err) {
      setError(err);
      setCarTypes([]);
    } finally {
      setLoading(false);
    }
  };

  // Opcional: Cargar los tipos de carro automáticamente al montar el componente
  useEffect(() => {
    fetchCarTypes();
  }, []);

  return { carTypes, loading, error, refetch: fetchCarTypes };
};

export default useFetchCarTypes;
