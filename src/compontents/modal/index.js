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
    <div className="bg-yellow-100">
      <div className="w-full mx-auto mt-40">
        <h2 className="mb-20 text-xl font-medium text-center font-open-sans">
          {" "}
          Hoe werkt de aanname tool?
        </h2>
        <Slider {...settings} ref={sliderRef}>
          <div className="w-10/12 mx-auto mb-10">
            <h3 className="font-bold text-center font-open-sans">
              Wat is de aanname tool?
            </h3>
            <p className="w-8/12 mx-auto text-center font-open-sans">
              Stel gezamenlijk in een team aannames over het op te lossen
              probleem op.
            </p>
          </div>
          <div className="w-10/12 mx-auto mb-10">
            <h3 className="font-bold text-center font-open-sans">
              Aannames opstellen
            </h3>
            <p className="w-8/12 mx-auto text-center font-open-sans">
              Stel gezamenlijk in een team aannames over het op te lossen
              probleem op.
            </p>
          </div>
          <div className="w-10/12 mx-auto mb-10">
            <h3 className="font-medium text-center font-open-sans">
              Aannames bekritiseren
            </h3>
            <p className="w-8/12 mx-auto text-center font-open-sans">
              Bekritiseer door middel van vragen de aannames, zodat het gesprek
              met elkaar op gang komt.
            </p>
          </div>
          <div className="w-10/12 mx-auto mb-10">
            <h3 className="font-medium text-center font-open-sans">
              Reflecteer de aannames
            </h3>
            <p className="w-8/12 mx-auto text-center font-open-sans">
              Reflecteer samen op de aannames, door de kaartjes op de juiste
              plek te schuiven.
            </p>
          </div>
        </Slider>
      </div>
      <button
        className="block w-20 p-2 mx-auto mt-10 text-xs font-medium bg-white border-2 border-black rounded-lg font-open-sans box-shadow focus:outline-none"
        onClick={() => gotoNext()}
      >
        Volgende
      </button>
    </div>
  );
};

export default Modal;
