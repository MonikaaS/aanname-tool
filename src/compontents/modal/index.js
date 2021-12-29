import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Slider from "react-slick";

const Modal = () => {
  const sliderRef = useRef();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const gotoNext = () => {
    sliderRef.current.slickNext();
  };

  return (
    <div>
      <div className="w-full mx-auto mt-40">
        <h2 className="text-center"> Wat is de aanname tool?</h2>
        <Slider {...settings} ref={sliderRef}>
          <div className="w-10/12 mx-auto">
            <h3 className="text-center">1</h3>
          </div>
          <div className="w-10/12 mx-auto">
            <h3 className="text-center">2</h3>
          </div>
          <div className="w-10/12 mx-auto">
            <h3 className="text-center">3</h3>
          </div>
          <div className="w-10/12 mx-auto">
            <h3 className="text-center">4</h3>
          </div>
          <div className="w-10/12 mx-auto">
            <h3 className="text-center">5</h3>
          </div>
          <div className="w-10/12 mx-auto">
            <h3 className="text-center">6</h3>
          </div>
        </Slider>
      </div>
      <button className="mt-20" onClick={() => gotoNext()}>
        Volgende
      </button>
    </div>
  );
};

export default Modal;
