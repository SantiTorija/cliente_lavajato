import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import styles from "./navbar.module.css";
import logoNuevo from "../assets/images/logoLavajato.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { emptyCart } from "../redux/cartSlice";
import { removeClient } from "../redux/clientSlice";
import { emptyOrderToEdit } from "../redux/orderToEditSlice";
import { setStartStep } from "../redux/reserveStepSlice";
import { useEffect, useState } from "react";

function NavbarComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isReserva = location.pathname.startsWith("/reservas");

  // Estado para ocultar el menú tras la transición
  const [hideMenu, setHideMenu] = useState(false);

  useEffect(() => {
    if (isReserva) {
      // Espera a que termine la transición de opacidad antes de ocultar
      const timeout = setTimeout(() => setHideMenu(true), 500);
      return () => clearTimeout(timeout);
    } else {
      setHideMenu(false);
    }
  }, [isReserva]);

  const handleLogoClick = (e) => {
    e.preventDefault();
    dispatch(emptyCart());
    dispatch(removeClient());
    dispatch(emptyOrderToEdit());
    dispatch(setStartStep());
    navigate("/");
  };

  return (
    <Navbar
      expand="md"
      className={`${styles.navbar} ${isReserva ? styles.navbarReserva : ""}`}
    >
      <Container>
        <div
          className={`d-flex w-100 align-items-center ${
            isReserva ? styles.centerLogoContainer : "justify-content-between"
          }`}
          style={{ position: "relative" }}
        >
          <Navbar.Brand
            as={Link}
            to="/"
            onClick={handleLogoClick}
            style={{
              cursor: "pointer",
              transition: "all 0.7s cubic-bezier(0.4,0,0.2,1)",
            }}
            className={isReserva ? styles.logoCenter : ""}
          >
            <img
              style={{
                width: "7rem",
                transition: "all 0.7s cubic-bezier(0.4,0,0.2,1)",
              }}
              src={logoNuevo}
              alt=""
            />
          </Navbar.Brand>
          <div
            className={`d-flex align-items-center ${styles.menuLinks} ${
              isReserva ? styles.menuFade : ""
            }`}
            style={{
              position: isReserva ? "absolute" : "static",
              right: isReserva ? 0 : undefined,
              left: isReserva ? 0 : undefined,
              width: isReserva ? "100%" : undefined,
              justifyContent: "flex-end",
              pointerEvents: hideMenu ? "none" : undefined,
              opacity: hideMenu ? 0 : undefined,
              transition: "opacity 0.5s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            {!hideMenu && (
              <>
                <Link to="/servicios" className={styles.navlink}>
                  Servicios
                </Link>
                <Link to="/contacto" className={styles.navlink}>
                  Contacto
                </Link>
                {location.pathname === "/" && (
                  <button
                    className={`d-none d-md-inline-block ${styles.reserveBtn}`}
                    onClick={() => navigate("/")}
                    type="button"
                  >
                    Reservar
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
