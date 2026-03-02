import { useState, useEffect } from "react";
import axios from "axios";

/**
 * Hook para obtener disponibilidad por rango de fechas.
 * @param {string|null} startDate - Fecha inicio YYYY-MM-DD
 * @param {string|null} endDate - Fecha fin YYYY-MM-DD
 */
const useFetchAvailableDays = (startDate, endDate) => {
  const [availableDays, setAvailableDays] = useState([]);
  const [loadingAvailableDays, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!startDate || !endDate) {
      setAvailableDays([]);
      return;
    }

    const fetchAvailability = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/day/availability/range`,
          {
            params: { startDate, endDate },
          }
        );
        setAvailableDays(response.data);
        setError(null);
      } catch (err) {
        setError(err);
        console.error("Error fetching availability:", err);
        setAvailableDays([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, [startDate, endDate]);

  return { availableDays, loadingAvailableDays, error };
};

export default useFetchAvailableDays;
