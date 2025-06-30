import { useState } from "react";

const useUpdateClient = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateClientField = async (clientId, field, value, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const {
        countryCode = null,
        validate = true,
        showSuccess = true,
      } = options;

      // Validaciones básicas
      if (validate) {
        if (!clientId) throw new Error("ID de cliente requerido");
        if (!field) throw new Error("Campo requerido");
        if (value === undefined || value === null)
          throw new Error("Valor requerido");
      }

      // Preparar datos - SIN SWITCH!
      let updateData = {};

      // Si es teléfono, agregar código de país
      if (field === "phone" && countryCode) {
        updateData[field] = `${countryCode}${value}`;
      } else {
        updateData[field] = value;
      }
      // Si es carType y hay carTypeId, incluirlo
      if (field === "carType" && options.carTypeId) {
        updateData["carTypeId"] = options.carTypeId;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/client/${clientId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar cliente");
      }

      const result = await response.json();

      if (showSuccess) {
        console.log(`${field} actualizado exitosamente`);
      }

      return result.client;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateClientField, loading, error };
};

export default useUpdateClient;
