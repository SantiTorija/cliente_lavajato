import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addClient } from "../redux/clientSlice";
import axios from "axios";

const useIsClient = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchIsClient = async (email) => {
    console.log(email);
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/client/${email.trim()}`
      );
      if (response.data) {
        dispatch(addClient(response.data[0]));
        navigate(`/reservas/${email}`);
      } else {
        navigate(`/reservas/${email}`);
      }
      setError(null);
    } catch (err) {
      setError(err);
      console.error("Error fetching client:", err);
    } finally {
      setLoading(false);
    }
  };

  return { fetchIsClient, loading, error };
};

export default useIsClient;
