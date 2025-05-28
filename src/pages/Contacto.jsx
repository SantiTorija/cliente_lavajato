import NavbarComponent from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsappButton from "../components/WhatsappButton";
import styles from "./contacto.module.css";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";

export default function Contacto() {
  return (
    <div className={styles.fullHeight}>
      <NavbarComponent />
      <section id="hero">
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>Contacto</h1>
        </div>
      </section>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1.5rem",
            }}
          >
            <span className={styles.contactInfo}>
              <FaWhatsapp
                style={{
                  color: "#fff",
                  fontSize: "2.2em",
                  verticalAlign: "middle",
                }}
              />
              <span className={styles.contactText}>095 422 422</span>
            </span>
            <a
              href="https://wa.me/59895422422"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactButton + " " + styles.mainButton}
              style={{ minWidth: 130, textAlign: "center" }}
            >
              Contactar
            </a>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1.5rem",
            }}
          >
            <span className={styles.contactInfo}>
              <FaEnvelope
                style={{
                  color: "#fff",
                  fontSize: "2.1em",
                  verticalAlign: "middle",
                }}
              />
              <a
                href="mailto:lavajato@gmail.com"
                className={styles.emailLink + " " + styles.contactText}
              >
                lavajato@gmail.com
              </a>
            </span>
            <a
              href="mailto:lavajato@gmail.com"
              className={styles.contactButton + " " + styles.mainButton}
              style={{ minWidth: 130, textAlign: "center" }}
            >
              Contactar
            </a>
          </div>
          <div className={styles.mapContainer}>
            <iframe
              title="Mapa Lavajato"
              src="https://www.google.com/maps?q=Dr.+Jos%C3%A9+Mar%C3%ADa+Montero+2798,+11200+Montevideo,+Departamento+de+Montevideo&output=embed"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
      <WhatsappButton />
      <Footer />
    </div>
  );
}
