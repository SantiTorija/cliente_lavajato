import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { emptyCart, emptyService } from "../redux/cartSlice";
import { setStep } from "../redux/reserveStepSlice";

const useSwalOrderError = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showOrderError = (email) => {
    console.log("Ejecutando showOrderError para:", email);
    Swal.fire({
      icon: "error",
      title: "Estimado cliente",
      html: `<p>Lamentamos informarle que el horario seleccionado fue reservado por otra persona antes de completar la orden.</p><p>Por favor, elige otro horario y disculpa las molestias.</p>`,
      confirmButtonText: "Elegir otro horario",
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(emptyCart());
        dispatch(emptyService());
        dispatch(setStep(2));
        navigate(`/reservas/${email}`);
      }
    });
  };

  return showOrderError;
};

export default useSwalOrderError;
