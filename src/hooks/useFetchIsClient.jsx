import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addClient } from "../redux/clientSlice";
import axios from "axios";

// Función para validar formato de email con regex mejorado
const validateEmailFormat = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

// Función para verificar estructura del dominio
const validateDomainStructure = (email) => {
  const domain = email.split("@")[1];
  if (!domain) return false;

  // Verificar que el dominio tenga estructura válida
  const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return domainRegex.test(domain);
};

// Función para verificar si el email es válido (formato + estructura de dominio)
const verifyEmailExists = (email) => {
  const isValidFormat = validateEmailFormat(email);
  if (!isValidFormat) return false;

  const hasValidDomainStructure = validateDomainStructure(email);
  return hasValidDomainStructure;
};

const useIsClient = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchIsClient = async (email, onEmailError) => {
    // Validar email antes de proceder
    if (!verifyEmailExists(email)) {
      setError("Formato de email inválido");
      if (onEmailError) {
        onEmailError("Formato de email inválido");
      }
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/client/${email.trim()}`
      );
      console.log(response.data);
      if (response.data) {
        dispatch(addClient(response.data));
        navigate(`/reservas/${email}`);
      } else {
        navigate(`/reservas/${email}`);
      }
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
