import { Container, Row, Col } from "react-bootstrap";
import NavbarComponent from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./servicios.module.css";
import ceramico from "../assets/images/ceramico.jpg";
import neumaticos from "../assets/images/neumaticos.jpg";
import baterias from "../assets/images/bateria.png";
import chapa from "../assets/images/blackcar.png";
import WhatsappButton from "../components/WhatsappButton";
import BrandLogos from "../components/BrandLogos";

// Array de logos de ejemplo
const brandLogos = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Repsol_logo.svg/2560px-Repsol_logo.svg.png",
    alt: "Repsol",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStX4VdEbAvRph8wXbll7vQV0GwiriWfHroxg&s",
    alt: "millard",
  },
  {
    src: "https://www.shutterstock.com/image-vector/bridgestone-logo-sign-icon-emblem-600nw-2286811601.jpg",
    alt: "Bridgestone",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnnS3zC8qV2UJnqMY1sz2S-9EcHJlU0lVirQ&s",
    alt: "Winda",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNHbXRxyYG8jEADYMqrCqndW4irkx7vUP6UA&s",
    alt: "Continental",
  },
];

const neumaticosLogos = brandLogos.filter(
  (logo) =>
    logo.alt.toLowerCase().includes("winda") ||
    logo.alt.toLowerCase().includes("bridgestone") ||
    logo.alt.toLowerCase().includes("continental")
);
const neumaticosLogosRepetidos = [...neumaticosLogos, ...neumaticosLogos];

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

        <BrandLogos logos={brandLogos} />

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
                <a
                  href="https://wa.me/59895422422"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`action-button ${styles.contactarBtn}`}
                  style={{ textAlign: "center" }}
                >
                  Contactar
                </a>
              </Col>
              <Col className="d-none d-md-block" md={6}>
                <img className="w-100" src={ceramico} alt="Cerámico" />
              </Col>
            </Row>
          </Container>
        </section>
        <section>
          <Container className="mt-5" fluid>
            <Row className="align-items-center mb-4">
              <Col className="d-sm-block d-md-none" md={6}>
                <img className="w-75 mb-2" src={neumaticos} alt="Cerámico" />
                <BrandLogos logos={neumaticosLogosRepetidos} />
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
                <a
                  href="https://wa.me/59895422422"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`action-button ${styles.contactarBtn}`}
                  style={{ textAlign: "center" }}
                >
                  Contactar
                </a>
              </Col>
              <div className="w-100 d-none d-md-block">
                <BrandLogos logos={neumaticosLogosRepetidos} />
              </div>
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
                <a
                  href="https://wa.me/59895422422"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`action-button ${styles.contactarBtn}`}
                  style={{ textAlign: "center" }}
                >
                  Contactar
                </a>
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
                <BrandLogos logos={brandLogos} />
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
                <a
                  href="https://wa.me/59895422422"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`action-button ${styles.contactarBtn}`}
                  style={{ textAlign: "center" }}
                >
                  Contactar
                </a>
              </Col>
              <div className="d-none d-md-block w-100">
                <BrandLogos logos={brandLogos} />
              </div>
            </Row>
          </Container>
        </section>
      </div>
      <WhatsappButton />
      <Footer />
    </>
  );
}
