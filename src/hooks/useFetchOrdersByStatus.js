import { useDispatch } from "react-redux";
import { fetchOrdersByStatus } from "../redux/ordersByStatusSlice";

const useFetchOrdersByStatus = () => {
  const dispatch = useDispatch();
  return (status, email) => dispatch(fetchOrdersByStatus({ status, email }));
};

export default useFetchOrdersByStatus;
