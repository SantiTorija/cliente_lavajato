import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styles from "./brandLogos.module.css";

const BrandLogos = ({ logos = [], id }) => {
  const [isVisible, setIsVisible] = useState(true);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const duplicatedLogos = [...logos, ...logos];

  return (
    <div
      ref={wrapperRef}
      className={`${styles.brandLogosWrapper} ${!isVisible ? styles.paused : ""}`}
      id={id}
    >
      <div className={styles.brandLogosTrack}>
        {duplicatedLogos.map((logo, index) => (
          <div key={`${logo.alt}-${index}`} className={styles.logoItem}>
            <img
              src={logo.src}
              alt={logo.alt}
              className={styles.logo}
              loading="lazy" // Optimización de carga
            />
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
