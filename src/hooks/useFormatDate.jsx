import { useMemo } from "react";

const useFormatDate = (dateString) => {
  const formattedDate = useMemo(() => {
    // [Solución] Crear la fecha directamente en la zona horaria local
    const [year, month, day] = dateString.split("-");
    const date = new Date(year, month - 1, day); // Sin UTC

    if (isNaN(date.getTime())) {
      console.error("Formato de fecha inválido. Usa 'YYYY-MM-DD'.");
      return "";
    }

    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("es-ES", options);
  }, [dateString]);

  return formattedDate;
};

export default useFormatDate;
