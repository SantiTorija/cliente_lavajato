import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import styles from "./navbar.module.css";
import logoNuevo from "../assets/images/logoNuevo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { emptyCart } from "../redux/cartSlice";
import { removeClient } from "../redux/clientSlice";
import { emptyOrderToEdit } from "../redux/orderToEditSlice";
import { setStartStep } from "../redux/reserveStepSlice";

function NavbarComponent() {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
        <nav className="d-flex align-items-center justify-content-between">
          <Navbar.Brand
            as={Link}
            to="/"
            onClick={handleLogoClick}
            style={{ cursor: "pointer" }}
          >
            <img style={{ width: "7rem" }} src={logoNuevo} alt="" />
          </Navbar.Brand>
          <div className="d-none d-md-flex ms-3 align-items-center">
            <Link to="/servicios" className={styles.navlink}>
              Servicios
            </Link>
            <Link to="/contacto" className={styles.navlink}>
              Contacto
            </Link>
          </div>
        </nav>
        <div className="d-md-none ms-auto">
          <FaBars
            size={28}
            color="#fff"
            style={{ cursor: "pointer" }}
            onClick={handleShow}
          />
        </div>
        <Offcanvas
          show={show}
          onHide={handleClose}
          placement="end"
          className={styles.offcanvas}
        >
          <Offcanvas.Header closeButton className="bg-black">
            <Offcanvas.Title id="offcanvasNavbarLabel">
              <img style={{ width: "5rem" }} src={logoNuevo} alt="" />
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="bg-black">
            <div className="d-flex flex-column flex-md-row align-items-md-center gap-3">
              <Link
                to="/servicios"
                className={styles.navlink}
                onClick={handleClose}
              >
                Servicios
              </Link>
              <Link
                to="/contacto"
                className={styles.navlink}
                onClick={handleClose}
              >
                Contacto
              </Link>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
