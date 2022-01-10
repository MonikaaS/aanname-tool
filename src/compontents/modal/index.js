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
    <div className="hidden bg-yellow-100 md:block">
      <div className="w-full mx-auto mt-40">
        <h2 className="mb-20 text-xl font-bold text-center font-poppins">
          {" "}
          Hoe werkt de aanname tool?
        </h2>
        <Slider {...settings} ref={sliderRef}>
          <div className="w-10/12 mx-auto mb-10">
            <h3 className="font-medium text-center font-poppins">
              Wat is de aanname tool?
            </h3>
            <p className="w-8/12 mx-auto text-xs text-center font-poppins">
              Hier komt kort een uitleg over wat de aanname tool is en wat het
              doel is.
            </p>
          </div>
          <div className="w-10/12 mx-auto mb-10">
            <h3 className="font-medium text-center font-poppins">
              Aannames opstellen
            </h3>
            <p className="w-8/12 mx-auto text-xs text-center font-poppins">
              Korte uitleg over feature
            </p>
          </div>
          <div className="w-10/12 mx-auto mb-10">
            <h3 className="font-medium text-center font-poppins">
              Aannames bekritiseren
            </h3>
            <p className="w-8/12 mx-auto text-xs text-center font-poppins">
              Korte uitleg over feature
            </p>
          </div>
          <div className="w-10/12 mx-auto mb-10">
            <h3 className="font-medium text-center font-poppins">
              Reflecteer de aannames
            </h3>
            <p className="w-8/12 mx-auto text-xs text-center font-poppins">
              Korte uitleg over feature
            </p>
          </div>
        </Slider>
      </div>
      <button
        className="block w-20 p-2 mx-auto mt-10 text-xs font-medium bg-white border-2 border-black rounded-lg font-poppins box-shadow focus:outline-none"
        onClick={() => gotoNext()}
      >
        Volgende
      </button>
    </div>
  );
};

export default Modal;
