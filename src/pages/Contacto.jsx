import NavbarComponent from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsappButton from "../components/WhatsappButton";
import styles from "./contacto.module.css";

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
          <p>
            <strong>WhatsApp:</strong> 095 422 422
            <a
              href="https://wa.me/59895422422"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactButton}
            >
              Contactar
            </a>
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:lavajato@gmail.com" className={styles.emailLink}>
              lavajato@gmail.com
            </a>
            <a
              href="mailto:lavajato@gmail.com"
              className={styles.contactButton}
            >
              Contactar
            </a>
          </p>
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
