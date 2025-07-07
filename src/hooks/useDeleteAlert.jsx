import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch } from "react-redux";
import { deleteOrder } from "../redux/ordersByStatusSlice";

const MySwal = withReactContent(Swal);
const useDeleteAlert = () => {
  const dispatch = useDispatch();
  const handleDelete = async (orderId, orderDate, orderSlot, setToast) => {
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
        try {
          await dispatch(
            deleteOrder({ orderId, orderDate, orderSlot })
          ).unwrap();
          setToast({
            show: true,
            message: "Reserva eliminada correctamente",
            variant: "success",
          });
        } catch (error) {
          setToast({
            show: true,
            message: "Ocurrió un error al eliminar la reserva",
            variant: "danger",
          });
        }
      }
    });
  };
  return { handleDelete };
};

export default useDeleteAlert;
