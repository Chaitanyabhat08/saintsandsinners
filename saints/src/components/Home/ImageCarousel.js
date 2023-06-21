import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ImageCarousel.css";

export default function ImageCarousel({ images }) {
  const sliderRef = useRef();

  const settings = {
    infinite: true,
    dots: true,
    slidesToShow: 1,
    arrows: true,
    slidesToScroll: 1,
    lazyLoad: true,
  };

  const handleMouseEnter = () => {
    sliderRef.current.slickNext();
  };

  const handleMouseLeave = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Slider {...settings} ref={sliderRef}>
        {images.map((item) => (
          <div key={item.id}>
            <img style={{ width: "100%", maxWidth: "500px" }} src={item.src} alt={item.alt} className="carousel-image" />
          </div>
        ))}
      </Slider>
    </div>
  );
}
