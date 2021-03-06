import { useRef } from "react";
import { motion } from "framer-motion";
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
      <motion.div
        animate={{ y: [0, -10], opacity: [0, 1] }}
        transition={{ ease: "easeOut", duration: 0.5, delay: 0.3 }}
        className="w-full mx-auto mt-40"
      >
        <motion.h2
          animate={{ y: [0, -10], opacity: [0, 1] }}
          transition={{ ease: "easeOut", duration: 0.5, delay: 0.5 }}
          className="mb-20 text-xl font-bold text-center font-poppins"
        >
          {" "}
          Hoe werkt de aanname tool?
        </motion.h2>
        <Slider {...settings} ref={sliderRef}>
          <motion.div
            animate={{ y: [10, 0], opacity: [0, 1] }}
            transition={{ ease: "easeOut", duration: 0.5, delay: 0.7 }}
            className="w-10/12 mx-auto mb-10"
          >
            <div className="w-56 h-auto p-2 m-2 mx-auto mb-12 font-medium text-black bg-white border-2 border-black rounded-md box-shadow md:w-64 md:h-64 font-poppins">
              {" "}
              <motion.h3
                animate={{ y: [10, 0], opacity: [0, 1] }}
                transition={{ ease: "easeOut", duration: 0.5, delay: 0.8 }}
                className="w-full p-4 pt-2 pb-0 font-bold text-md"
              >
                Wat is de aanname tool?
              </motion.h3>
              <motion.p
                animate={{ y: [10, 0], opacity: [0, 1] }}
                transition={{ ease: "easeOut", duration: 0.5, delay: 0.8 }}
                className="w-full p-4 pt-2 pb-0 pr-2 placeholder-black bg-white rounded-md resize-none font-xss h-28 hover:bg-opacity-25 focus:outline-none"
              >
                De aanname tool is een conversational tool
                <br></br>
                <br></br>
                Gezamenlijk haal je de aannames naar boven over een project en
                maakt deze bespreekbaar
              </motion.p>
            </div>
          </motion.div>
          <div className="w-10/12 mx-auto mb-10">
            <div className="w-56 h-auto p-2 m-2 mx-auto mb-12 font-medium text-black bg-white border-2 border-black rounded-md box-shadow md:w-64 md:h-64 font-poppins">
              {" "}
              <h3 className="w-full p-4 pt-2 pb-0 font-bold text-md">
                Wat zijn aannames??
              </h3>
              <p className="w-full p-4 pt-2 pb-0 pr-2 placeholder-black bg-white rounded-md resize-none font-xss h-28 hover:bg-opacity-25 focus:outline-none">
                Een aanname is iets wat je denkt of vindt zonder het zeker te
                weten
                <br></br>
                <br></br>
                Belangrijk is dat ze niet vast staan
              </p>
            </div>
          </div>
          <div className="w-10/12 mx-auto mb-10">
            <div className="w-56 h-auto p-2 m-2 mx-auto mb-12 font-medium text-black bg-white border-2 border-black rounded-md box-shadow md:w-64 md:h-64 font-poppins">
              <h3 className="w-full p-4 pt-2 pb-0 font-bold text-md">
                Aannames opstellen
              </h3>
              <p className="w-full p-4 pt-2 pr-2 placeholder-black bg-white rounded-md resize-none font-xss h-28 hover:bg-opacity-25 focus:outline-none">
                In een korte tijd ga je proberen zo veel mogelijk aannames over
                het project op te stellen
                <br></br>
                <br></br>
                Het maakt niet uit of deze goed of fout zijn
              </p>
            </div>
          </div>
          <div className="w-10/12 mx-auto mb-10">
            <div className="w-56 h-auto p-2 m-2 mx-auto mb-12 font-medium text-black bg-white border-2 border-black rounded-md box-shadow md:w-64 md:h-64 font-poppins">
              <h3 className="w-full p-4 pt-2 pb-0 font-bold text-md">
                Aannames bekritiseren
              </h3>
              <p className="w-full p-4 pt-2 placeholder-black bg-white rounded-md resize-none font-xss h-28 hover:bg-opacity-25 focus:outline-none">
                Doormiddel van kritische vragen, ga je met elkaar de aannames
                bespreken
                <br></br>
                <br></br>
                En kom je op nieuwe oplossingen voor jouw project
              </p>
            </div>
          </div>
          <div className="w-10/12 mx-auto mb-10">
            <div className="w-56 h-auto p-2 m-2 mx-auto mb-12 font-medium text-black bg-white border-2 border-black rounded-md box-shadow md:w-64 md:h-64 font-poppins">
              <h3 className="w-full p-4 pt-2 pb-0 font-bold text-md">
                Reflecteren op aannames
              </h3>
              <p className="w-full p-4 pt-2 pr-2 placeholder-black bg-white rounded-md resize-none font-xss h-28 hover:bg-opacity-25 focus:outline-none">
                Reflecteer op hoe de aannames binnen het project vallen
                <br></br> <br></br>
                Door het te bespreken kom je op nieuwe inzichten
              </p>
            </div>
          </div>
        </Slider>
      </motion.div>
      <motion.div
        animate={{ y: [0, -10], opacity: [0, 1] }}
        transition={{ ease: "easeOut", duration: 0.5, delay: 0.5 }}
      >
        <button
          className="block w-20 p-2 mx-auto mt-10 text-xs font-medium bg-white border-2 border-black rounded-lg font-poppins box-shadow focus:outline-none"
          onClick={() => gotoNext()}
        >
          Volgende
        </button>
      </motion.div>
    </div>
  );
};

export default Modal;
