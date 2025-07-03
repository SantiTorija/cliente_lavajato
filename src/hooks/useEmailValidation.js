import { useState, useEffect } from "react";

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

const useEmailValidation = (initialEmail = "") => {
  const [email, setEmail] = useState(initialEmail);
  const [isValid, setIsValid] = useState(false);

  // Validar email cuando cambie (solo formato)
  useEffect(() => {
    if (email) {
      const valid = validateEmailFormat(email);
      setIsValid(valid);
    } else {
      setIsValid(false);
    }
  }, [email]);

  // Función para actualizar el email
  const updateEmail = (newEmail) => {
    setEmail(newEmail);
  };

  // Función para resetear la validación
  const resetValidation = () => {
    setEmail("");
    setIsValid(false);
  };

  // Función para verificar dominio (on-demand)
  const verifyDomain = () => {
    return verifyEmailExists(email);
  };

  return {
    email,
    isValid,
    updateEmail,
    resetValidation,
    verifyDomain,
  };
};

export default useEmailValidation;
