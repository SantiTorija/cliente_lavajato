import React from "react";
import NavbarComponent from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./servicios.module.css";
import { Container, Button, Row, Col } from "react-bootstrap";
import ceramico from "../assets/images/ceramico.jpg";
import neumaticos from "../assets/images/neumaticos.jpg";
import baterias from "../assets/images/bateria.png";
import chapa from "../assets/images/blackcar.png";
import WhatsappButton from "../components/WhatsappButton";

export default function Servicios() {
  return (
    <>
      <div className={styles.fullHeight}>
        <NavbarComponent />

        <section id="hero">
          <div className={styles.heroContainer}>
            <h1 className={styles.heroTitle}>Servicios</h1>
          </div>
        </section>
        <section>
          <Container fluid>
            <Row className="align-items-center">
              <Col className="d-sm-block d-md-none" md={6}>
                <img className="w-100" src={ceramico} alt="Cerámico" />
              </Col>
              <Col
                className="d-flex flex-column justify-content-center p-5"
                md={6}
              >
                <h2 className="mb-4 text-white">
                  Mantenimiento por kilometraje
                </h2>
                <p className="text-white">
                  Recomendado hacer cada 10.000km o 1 año (lo que suceda
                  primero). El servicio incluye: cambio de aceite, todo los
                  filtros (aceite, aire, combustible, habitáculo), alineación 3D
                  y balanceo. Chequeo del tren delantero y trasero, inspección
                  de luces y sistema eléctrico, mantenimiento de frenos
                  delanteros y traseros, escaneo de sistema y reseteo de
                  servicio. Nos aseguramos de utilizar materiales de primera
                  calidad para garantizar todos nuestro trabajos.
                </p>
                <button className="action-button w-50 w-md-25">
                  Contactar
                </button>
              </Col>
              <Col className="d-none d-md-block" md={6}>
                <img className="w-100" src={ceramico} alt="Cerámico" />
              </Col>
            </Row>
          </Container>
        </section>
        <section>
          <Container className="mt-5" fluid>
            <Row className="align-items-center">
              <Col className="d-sm-block d-md-none" md={6}>
                <img className="w-75" src={neumaticos} alt="Cerámico" />
              </Col>
              <Col className="d-none d-md-block ps-5" md={6}>
                <img className="w-50 ps-5" src={neumaticos} alt="neumaticos" />
              </Col>
              <Col
                className="d-flex flex-column justify-content-center p-5"
                md={6}
              >
                <h2 className="mb-4 text-white">Neumáticos</h2>
                <p className="text-white">
                  Venta y colocación de neumáticos. Contamos con herramientas de
                  última generación para realizar un proceso ágil y seguro.
                  Servicio de Alineación 3D y balanceo. Somos distribuidores
                  Bridgestone y comercializamos todas las marcas. Cotiza con tu
                  medida ahora.
                </p>
                <button className="action-button w-25">Contactar</button>
              </Col>
            </Row>
          </Container>
        </section>
        <section>
          <Container className="mt-5" fluid>
            <Row className="align-items-center">
              <Col className="d-sm-block d-md-none" md={6}>
                <img className="w-100" src={baterias} alt="Cerámico" />
              </Col>
              <Col
                className="d-flex flex-column justify-content-center p-5"
                md={6}
              >
                <h2 className="mb-4 text-white">Baterías</h2>
                <p className="text-white">
                  En una larga alianza con baterías MOURA, ofrecemos un producto
                  de confianza con 2 años de garantía. Contamos con un amplio
                  stock de baterías para poder solucionar su problema en el
                  acto. Contamos con equipo de testeo de baterías, que
                  rápidamente nos va a informar de su estado. Con la compra de
                  su batería la colocación es gratis. Cotiza tu batería aquí
                </p>
                <button className="action-button w-50 w-md-25">
                  Contactar
                </button>
              </Col>
              <Col className="d-none d-md-block" md={6}>
                <img
                  className="w-75 opacity-75 mt-5"
                  src={baterias}
                  alt="Cerámico"
                />
              </Col>
            </Row>
          </Container>
        </section>
        <section className="mt-5">
          <Container fluid>
            <Row className="align-items-center">
              <Col className="d-sm-block d-md-none" md={6}>
                <img className="w-100" src={chapa} alt="Cerámico" />
              </Col>
              <Col className="d-none d-md-block ps-5" md={6}>
                <img className="w-75 ps-5" src={chapa} alt="neumaticos" />
              </Col>
              <Col
                className="d-flex flex-column justify-content-center p-5"
                md={6}
              >
                <h2 className="mb-4 text-white">Chapa y pintura</h2>
                <p className="text-white">
                  Trabajamos para casi todas las aseguradoras del país. Nos
                  encargamos de todos los tramites frente a las compañías para
                  que puedas resolverlo de una manera fácil y rápida. Si tuviste
                  un accidente o te chocaron no dudes en consultarnos. También
                  realizamos trabajos particulares. Cotiza tu reparación aqui
                </p>
                <button className="action-button w-50">Contactar</button>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
      <WhatsappButton />
      <Footer />
    </>
  );
}
