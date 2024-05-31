import {
  faAngleRight,
  faAngleLeft,
  faStar,
  faEye,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import kucuk1 from "../../assets/product-detail/kucuk1.png";
import kucuk2 from "../../assets/product-detail/kucuk2.png";
import sariKoltuk from "../../assets/product-detail/sarikoltuk.png";
import colors from "../../assets/featured-posts/product-colors.png";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const slides = [
  {
    id: 1,
    image: sariKoltuk,
  },
  {
    id: 2,
    image: kucuk1,
  },
  {
    id: 3,
    image: kucuk2,
  },
];

function ProductDetail() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const setSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="bg-[#FAFAFA] sm:px-20 px-0">
      <div className="flex items-center sm:justify-start justify-center gap-3 py-10">
        <Link
          to="/"
          className=" text-slate-800 text-m font-bold leading-normal tracking-wider cursor-pointer hover:text-sky-500 "
        >
          Home
        </Link>
        <FontAwesomeIcon
          icon={faAngleRight}
          className="text-xl text-stone-300 "
        />
        <Link
          to="/shop"
          className=" text-stone-300 text-m font-bold leading-normal tracking-wider cursor-pointer hover:text-sky-500"
        >
          Shop
        </Link>
      </div>
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="w-full md:w-1/2">
            <div className="relative w-full h-64 md:h-96 overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {slides.map((slide) => (
                  <div key={slide.id} className="w-full flex-shrink-0 h-full">
                    <img
                      src={slide.image}
                      className="w-full h-full object-cover md:object-right rounded-md"
                      alt="Product Detail"
                    />
                  </div>
                ))}
              </div>
              <div className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2">
                <button onClick={prevSlide} className="focus:outline-none">
                  <FontAwesomeIcon
                    icon={faAngleLeft}
                    className="text-2xl text-gray-800"
                  />
                </button>
              </div>
              <div className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2">
                <button onClick={nextSlide} className="focus:outline-none">
                  <FontAwesomeIcon
                    icon={faAngleRight}
                    className="text-2xl text-gray-800"
                  />
                </button>
              </div>
            </div>
            <div className="flex mt-4 space-x-2 justify-center md:justify-start">
              {slides.map((slide, index) => (
                <img
                  key={slide.id}
                  src={slide.image}
                  className={`w-16 h-16 object-cover cursor-pointer rounded-md ${
                    currentSlide === index ? "border-2 border-blue-500" : ""
                  }`}
                  onClick={() => setSlide(index)}
                  alt={`Thumbnail ${index + 1}`}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col md:w-1/2 mt-10 md:mt-0 md:ml-10 px-10 gap-1">
            <h2 className="md:text-2xl text-3xl font-base leading-normal tracking-wider text-slate-800 ">
              Floating Phone
            </h2>
            <div className="flex items-center mt-3">
              <span className="text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <FontAwesomeIcon
                    key={i}
                    icon={faStar}
                    className="mr-2 md:text-lg text-3xl"
                  />
                ))}
              </span>
              <span className="ml-2 md:text-lg text-xl text-neutral-500 font-bold leading-normal">
                10 Reviews
              </span>
            </div>
            <div className="mt-3">
              <span className="text-4xl md:text-2xl font-bold tracking-wider leading-normal abril-fatface">
                $1,139.33
              </span>
              <div className="mt-2 ">
                <span className="text-neutral-500 text-xl md:text-sm tracking-wider font-bold">
                  Availability :{" "}
                </span>
                <span className="text-sky-500  text-xl md:text-sm tracking-wider font-bold">
                  In Stock
                </span>
              </div>
              <div className="mt-10 mb-5">
                <p className="text-gray-500 text-2xl md:text-base tracking-wider leading-normal font-base">
                  Met minim Mollie non desert Alamo est sit cliquey dolor do met
                  sent. RELIT official consequent door ENIM RELIT Mollie.
                  Excitation venial consequent sent nostrum met.
                </p>
              </div>
              <hr />
              <img
                className="mt-5 md:mt-3 w-[40%] md:w-[20%]"
                src={colors}
                alt="product colors"
              />
              <div className="md:mt-5 mt-10 flex items-center space-x-2">
                <button className="px-7 md:px-5 py-4 md:py-2 bg-sky-500 text-white rounded-md font-bold">
                  Select Options
                </button>
                <button className="md:px-4 px-5 md:py-3 py-4 border rounded-full">
                  <FontAwesomeIcon icon={faHeart} />
                </button>
                <button className="md:px-4 px-5 md:py-3 py-4 border rounded-full">
                  <FontAwesomeIcon icon={faCartShopping} />
                </button>
                <button className="md:px-4 px-5 md:py-3 py-4 border rounded-full">
                  <FontAwesomeIcon icon={faEye} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
