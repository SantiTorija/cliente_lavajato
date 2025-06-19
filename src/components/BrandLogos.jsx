import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./brandLogos.module.css";

const BrandLogos = ({
  logos = [],
  autoplaySpeed = 2500,
  slidesToShow = { desktop: 5, tablet: 3, mobile: 2 },
  id,
}) => {
  const isNeumaticos = id === "logos-neumaticos";
  const settings = {
    dots: false,
    infinite: isNeumaticos ? false : true,
    slidesToShow: slidesToShow.desktop,
    slidesToScroll: 1,
    autoplay: isNeumaticos ? false : true,
    autoplaySpeed: autoplaySpeed,
    pauseOnHover: true,
    arrows: isNeumaticos ? false : true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: slidesToShow.tablet,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: slidesToShow.mobile,
        },
      },
    ],
  };

  return (
    <div className={styles.brandLogosFade} id={id}>
      <div className={styles.fadeLeft}></div>
      <div className={styles.fadeRight}></div>
      <div className={styles.brandLogosContainer}>
        <Slider {...settings} className={styles.slider}>
          {logos.map((logo, index) => (
            <div key={index} className={styles.logoWrapper}>
              <img src={logo.src} alt={logo.alt} className={styles.logo} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BrandLogos;
