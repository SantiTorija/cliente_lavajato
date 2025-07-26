import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

// Función utilitaria para formatear fechas (sin hooks)
const formatDate = (dateString) => {
  if (!dateString || dateString === "-") return "-";

  // Crear la fecha directamente en la zona horaria local
  const [year, month, day] = dateString.split("-");
  const date = new Date(year, month - 1, day); // Sin UTC

  if (isNaN(date.getTime())) {
    console.error("Formato de fecha inválido. Usa 'YYYY-MM-DD'.");
    return "";
  }

  const options = { day: "numeric", month: "long", year: "numeric" };
  return date.toLocaleDateString("es-ES", options);
};

const FutureOrdersAlert = ({ show, orders, onDecision }) => {
  React.useEffect(() => {
    if (show) {
      MySwal.fire({
        title: (
          <span style={{ color: "#b71c1c", fontWeight: 700 }}>
            ¡Ya tienes una reserva futura!
          </span>
        ),
        html: (
          <div style={{ color: "#fff", maxWidth: "90%", margin: "0 auto" }}>
            <p>Ya tienes las siguientes reservas agendadas:</p>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {orders.map((order, idx) => {
                const date = order.cart?.date || "-";
                const slot = order.cart?.slot || "-";
                const formattedDate = formatDate(date);
                return (
                  <li key={order.id || idx} style={{ marginBottom: 8 }}>
                    <div
                      style={{
                        color: "#fff",
                        fontWeight: 600,
                        textAlign: "left",
                        border: "1px solid #fff",
                        padding: "10px",
                        borderRadius: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      <div>fecha: {formattedDate}</div>
                      <div>hora: {slot}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <p>¿Deseas continuar y crear otra reserva?</p>
          </div>
        ),
        background: "#111",
        showCancelButton: true,
        confirmButtonText: "Avanzar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#b71c1c",
        cancelButtonColor: "#333",
        reverseButtons: true, // Invertir el orden de los botones
        customClass: {
          popup: "swal2-border-radius",
          title: "swal2-title-custom",
          confirmButton: "swal2-confirm-custom",
          cancelButton: "swal2-cancel-custom",
        },
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          onDecision(true);
        } else {
          onDecision(false);
        }
      });
    }
    // eslint-disable-next-line
  }, [show]);

  return null;
};

export default FutureOrdersAlert;
