import { useState } from "react";
import axios from "axios";

const useStoreClient = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const storeClient = async (
    firstname,
    lastname,
    email,
    phone,
    modelo,
    marca,
    carType
  ) => {
    setLoading(true);
    try {
      const response = await axios({
        method: "POST",
        url: `${import.meta.env.VITE_API_URL}/client`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          firstname: firstname,
          lastname: lastname,
          phone: phone,
          email: email,
          marca: marca,
          modelo: modelo,
          carType: carType,
        },
      });
      console.log(response.data);
      setError(null);
    } catch (err) {
      setError(err);
      console.error("Error fetching availability:", err);
    } finally {
      setLoading(false);
    }
  };

  return { storeClient, loading, error };
};

export default useStoreClient;
