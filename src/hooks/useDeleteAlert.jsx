import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";

const MySwal = withReactContent(Swal);
const useDeleteAlert = () => {
  const handleDelete = async (orderId, orderDate, orderSlot) => {
    MySwal.fire({
      title: "Atención",
      html: `
       <p>Estás por eliminar tu reserva <strong>¿Estás seguro?</strong></p>
      
      `,
      icon: "warning",
      iconColor: "rgba(242, 0, 0, 0.6)",
      showCancelButton: true,
      confirmButtonColor: "rgba(242, 0, 0, 0.6)",
      cancelButtonColor: "rgba(98, 98, 98, 0.6)",
      confirmButtonText: "Sí, cancelar",
      cancelButtonText: "No,conservar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Lógica para eliminar la orden

        const responseDelete = await axios.delete(
          `${import.meta.env.VITE_API_URL}/order/${orderId}/${orderDate}/
              ${orderSlot}
            }`
        );

        console.log(responseDelete);
      }
    });
  };
  return { handleDelete };
};

export default useDeleteAlert;
