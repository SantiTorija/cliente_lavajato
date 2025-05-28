import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

const useFetchOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchOrder = async (email) => {
    console.log(email);
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/order/${email.trim()}`
      );
      if (response.data) {
        dispatch(addClient(response.data[0]));
        navigate("/confirmar-datos");
      } else {
        navigate(`/datos-cliente/${email}`);
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
