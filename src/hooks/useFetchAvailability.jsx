import { useState, useEffect } from "react";
import axios from "axios";

const useFetchAvailableDays = (activeDate) => {
  const [availableDays, setAvailableDays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAvailability = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/day/availability/${activeDate.getFullYear()}/${
            activeDate.getMonth() + 1
          }`
        );
        setAvailableDays(response.data);
        console.log(response.data);
        setError(null);
      } catch (err) {
        setError(err);
        console.error("Error fetching availability:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, [activeDate]);

  return { availableDays, loading, error };
};

export default useFetchAvailableDays;
