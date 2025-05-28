import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import styles from "./navbar.module.css";
import logoNuevo from "../assets/images/logoNuevo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { emptyCart } from "../redux/cartSlice";
import { removeClient } from "../redux/clientSlice";
import { emptyOrderToEdit } from "../redux/orderToEditSlice";
import { setStartStep } from "../redux/reserveStepSlice";

function NavbarComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoClick = (e) => {
    e.preventDefault();
    dispatch(emptyCart());
    dispatch(removeClient());
    dispatch(emptyOrderToEdit());
    dispatch(setStartStep());
    navigate("/");
  };

  return (
    <Navbar expand="md" className={styles.navbar}>
      <Container>
        <nav className="d-flex align-items-center justify-content-between w-100">
          <Navbar.Brand
            as={Link}
            to="/"
            onClick={handleLogoClick}
            style={{ cursor: "pointer" }}
          >
            <img style={{ width: "7rem" }} src={logoNuevo} alt="" />
          </Navbar.Brand>
          <div
            className={`d-flex align-items-center justify-content-end w-100 ${styles.menuLinks}`}
          >
            <Link to="/servicios" className={styles.navlink}>
              Servicios
            </Link>
            <Link to="/contacto" className={styles.navlink}>
              Contacto
            </Link>
            <button
              className={`d-none d-md-inline-block ${styles.reserveBtn}`}
              onClick={() => navigate("/")}
              type="button"
            >
              Reservar
            </button>
          </div>
        </nav>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
