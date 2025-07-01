import { useState } from "react";
import axios from "axios";
import { addClient } from "../redux/clientSlice";
import { useDispatch } from "react-redux";

const useStoreClient = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const storeClient = async (
    firstname,
    lastname,
    email,
    phone,
    modelo,
    marca,
    carType,
    carTypeId
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
          carTypeId: carTypeId,
        },
      });
      console.log(response.data);
      const data = response.data;
      dispatch(
        addClient({
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          phone: data.phone,
          modelo: data.car.modelo,
          marca: data.car.marca,
          carType: data.car.carType,
          carTypeId: data.car.carTypeId,
          id: data.id,
        })
      );
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
