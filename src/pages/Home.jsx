import { useState } from "react";
import NavbarComponent from "../components/Navbar";
import styles from "./home.module.css";
import { Container, Row } from "react-bootstrap";
import CenteredModal from "../components/ExistingReserveModal.jsx";
import EmailModal from "../components/emailModal.jsx";
import Footer from "../components/Footer";
import WhatsappButton from "../components/WhatsappButton";
import { Link } from "react-router-dom";

function Home() {
  const [modalShow, setModalShow] = useState(false);
  const [emailModalShow, setEmailModalShow] = useState(false);

  return (
    <>
      <NavbarComponent />
      <Container fluid className={styles.container}>
        <Row className=" px-5 h-100 d-flex flex-column align-items-center justify-content-center text-center">
          <h2 className={`${styles.title} d-block  mb-4`}>Bienvenido</h2>
          <h3 className={`${styles.subtitle} d-block  mb-4`}>
            Comenzá haciendo click abajo {/* <FaHandPointDown size={25} /> */}
          </h3>

          <div className="d-flex flex-column justify-content-center align-items-center gap-1 w-100 d-block  py-4">
            <button
              className="action-button"
              onClick={() => setEmailModalShow(true)}
            >
              Reservar
            </button>
            <EmailModal
              show={emailModalShow}
              onHide={() => setEmailModalShow(false)}
            />
            <Link to="/mis-reservas" className={styles.alreadyReserveLink}>
              Ya tengo una reserva
            </Link>
            <CenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </div>
        </Row>
      </Container>
      <WhatsappButton />
      <Footer />
    </>
  );
}

export default Home;
