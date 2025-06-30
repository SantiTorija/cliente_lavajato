import PropTypes from "prop-types";
import styles from "./brandLogos.module.css";

const BrandLogos = ({ logos = [], id }) => {
  // Duplicamos logos para el loop infinito
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className={styles.brandLogosWrapper} id={id}>
      <div className={styles.brandLogosTrack}>
        {duplicatedLogos.map((logo, index) => (
          <div key={index} className={styles.logoItem}>
            <img src={logo.src} alt={logo.alt} className={styles.logo} />
          </div>
        ))}
      </div>
    </div>
  );
};

BrandLogos.propTypes = {
  logos: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    })
  ),
  id: PropTypes.string,
};

export default BrandLogos;
