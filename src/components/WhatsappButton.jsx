import { FaWhatsapp } from "react-icons/fa6";
import styles from "./whatsappButton.module.css";

export default function WhatsappButton() {
  return (
    <a
      href="https://wa.me/+59895422422" // Cambia por tu número
      className={styles.whatsappButton}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
    >
      <FaWhatsapp size={32} />
    </a>
  );
}
