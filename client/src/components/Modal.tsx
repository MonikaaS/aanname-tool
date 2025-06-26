import { useRef } from 'react';
import { motion } from 'framer-motion';
import Slider from 'react-slick';

const Modal = () => {
  const sliderRef = useRef<any>();

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
        transition={{ ease: 'easeOut', duration: 0.5, delay: 0.3 }}
        className="w-full mx-auto mt-40"
      >
        <motion.h2
          animate={{ y: [0, -10], opacity: [0, 1] }}
          transition={{ ease: 'easeOut', duration: 0.5, delay: 0.5 }}
          className="mb-20 text-xl font-bold text-center font-poppins"
        >
          How does the assumption tool work?
        </motion.h2>
        <Slider {...settings} ref={sliderRef}>
          <motion.div
            animate={{ y: [10, 0], opacity: [0, 1] }}
            transition={{ ease: 'easeOut', duration: 0.5, delay: 0.7 }}
            className="w-10/12 mx-auto mb-10"
          >
            <div className="w-56 h-auto p-2 m-2 mx-auto mb-12 font-medium text-black bg-white border-2 border-black rounded-md box-shadow md:w-64 md:h-64 font-poppins">
              {' '}
              <motion.h3
                animate={{ y: [10, 0], opacity: [0, 1] }}
                transition={{ ease: 'easeOut', duration: 0.5, delay: 0.8 }}
                className="w-full p-4 pt-2 pb-0 font-bold text-md"
              >
                What is the assumption tool?
              </motion.h3>
              <motion.p
                animate={{ y: [10, 0], opacity: [0, 1] }}
                transition={{ ease: 'easeOut', duration: 0.5, delay: 0.8 }}
                className="w-full p-4 pt-2 pb-0 pr-2 placeholder-black bg-white rounded-md resize-none font-xss h-28 hover:bg-opacity-25 focus:outline-none"
              >
                The assumption tool is a conversational tool.
                <br></br>
                <br></br>
                Together, you bring assumptions about a project to the surface
                and make them discussable.
              </motion.p>
            </div>
          </motion.div>
          <div className="w-10/12 mx-auto mb-10">
            <div className="w-56 h-auto p-2 m-2 mx-auto mb-12 font-medium text-black bg-white border-2 border-black rounded-md box-shadow md:w-64 md:h-64 font-poppins">
              {' '}
              <h3 className="w-full p-4 pt-2 pb-0 font-bold text-md">
                What are assumptions?
              </h3>
              <p className="w-full p-4 pt-2 pb-0 pr-2 placeholder-black bg-white rounded-md resize-none font-xss h-28 hover:bg-opacity-25 focus:outline-none">
                An assumption is something you think or believe without being
                sure.
                <br></br>
                <br></br>
                The important thing is that they are not fixed.
              </p>
            </div>
          </div>
          <div className="w-10/12 mx-auto mb-10">
            <div className="w-56 h-auto p-2 m-2 mx-auto mb-12 font-medium text-black bg-white border-2 border-black rounded-md box-shadow md:w-64 md:h-64 font-poppins">
              <h3 className="w-full p-4 pt-2 pb-0 font-bold text-md">
                Drafting assumptions
              </h3>
              <p className="w-full p-4 pt-2 pr-2 placeholder-black bg-white rounded-md resize-none font-xss h-28 hover:bg-opacity-25 focus:outline-none">
                In a short amount of time, you will try to formulate as many
                assumptions about the project as possible.
                <br></br>
                <br></br>
                It doesn't matter if they are right or wrong.
              </p>
            </div>
          </div>
          <div className="w-10/12 mx-auto mb-10">
            <div className="w-56 h-auto p-2 m-2 mx-auto mb-12 font-medium text-black bg-white border-2 border-black rounded-md box-shadow md:w-64 md:h-64 font-poppins">
              <h3 className="w-full p-4 pt-2 pb-0 font-bold text-md">
                Critiquing assumptions
              </h3>
              <p className="w-full p-4 pt-2 placeholder-black bg-white rounded-md resize-none font-xss h-28 hover:bg-opacity-25 focus:outline-none">
                Through critical questions, you will discuss the assumptions
                with each other.
                <br></br>
                <br></br>
                And you will come up with new solutions for your project.
              </p>
            </div>
          </div>
          <div className="w-10/12 mx-auto mb-10">
            <div className="w-56 h-auto p-2 m-2 mx-auto mb-12 font-medium text-black bg-white border-2 border-black rounded-md box-shadow md:w-64 md:h-64 font-poppins">
              <h3 className="w-full p-4 pt-2 pb-0 font-bold text-md">
                Reflecting on assumptions
              </h3>
              <p className="w-full p-4 pt-2 pr-2 placeholder-black bg-white rounded-md resize-none font-xss h-28 hover:bg-opacity-25 focus:outline-none">
                Reflect on how the assumptions fit within the project.
                <br></br> <br></br>
                By discussing them, you will gain new insights.
              </p>
            </div>
          </div>
        </Slider>
      </motion.div>
      <motion.div
        animate={{ y: [0, -10], opacity: [0, 1] }}
        transition={{ ease: 'easeOut', duration: 0.5, delay: 0.5 }}
      >
        <button
          className="block w-20 p-2 mx-auto mt-10 text-xs font-medium bg-white border-2 border-black rounded-lg font-poppins box-shadow focus:outline-none"
          onClick={() => gotoNext()}
        >
          Next
        </button>
      </motion.div>
    </div>
  );
};

export default Modal;
