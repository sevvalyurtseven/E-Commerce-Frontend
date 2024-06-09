import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { fetchProductById } from "../../store/actions/productActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faStar,
  faHeart,
  faEye,
  faCartShopping,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import colors from "../../assets/featured-posts/product-colors.png";

function ProductDetail({ product }) {
  console.log("ProductDetail product:", product);
  const history = useHistory();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleBackClick = () => {
    history.goBack();
    setTimeout(() => {
      window.scrollTo({
        top: 600,
        behavior: "smooth",
      });
    }, 10);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? 1 : prev - 1));
  };

  const setSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="bg-[#FAFAFA] sm:px-20 px-4 py-8">
      <button
        onClick={handleBackClick}
        className="btn  mb-6  bg-sky-500 text-white hover:bg-[#e7a0da] hover:text-[#fafafa]"
      >
        <FontAwesomeIcon icon={faAngleLeft} /> Back
      </button>
      {product && (
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center lg:items-start">
            <div className="w-full lg:w-1/2">
              <div className="relative w-full h-full lg:h-auto lg:max-h-[500px] overflow-hidden mb-6 lg:mb-0 flex justify-center items-center">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {product.images.map((img, index) => (
                    <div
                      key={index}
                      className="w-full flex-shrink-0 h-full flex justify-center items-center"
                    >
                      <img
                        src={img.url}
                        className="object-contain max-h-[500px] rounded-md"
                        alt={product.name}
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
              <div className="flex mt-4 space-x-2 justify-center lg:justify-start">
                {product.images.map((img, index) => (
                  <img
                    key={index}
                    src={img.url}
                    className={`w-16 h-16 object-contain cursor-pointer rounded-md ${
                      currentSlide === index ? "border-2 border-blue-500" : ""
                    }`}
                    onClick={() => setSlide(index)}
                    alt={`Thumbnail ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col w-full lg:w-1/2 mt-10 lg:mt-0 lg:ml-10 px-4 lg:px-10 gap-4">
              <h2 className="text-3xl lg:text-2xl font-base leading-normal tracking-wider text-slate-800 abril-fatface">
                {product.name}
              </h2>
              <div className="flex items-center mt-3">
                <span className="text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      className="mr-2 text-3xl lg:text-lg"
                    />
                  ))}
                </span>
                <span className="ml-2 text-xl lg:text-lg text-neutral-500 font-bold leading-normal">
                  {product.rating} Reviews
                </span>
              </div>
              <div className="mt-3">
                <span className="text-4xl lg:text-2xl font-bold tracking-wider leading-normal abril-fatface">
                  ${product.price}
                </span>
                <div className="mt-2">
                  <span className="text-xl lg:text-sm tracking-wider font-bold text-neutral-500">
                    Availability:{" "}
                  </span>
                  <span className="text-xl lg:text-sm tracking-wider font-bold text-sky-500">
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
                <div className="mt-10 mb-5">
                  <p className="text-2xl lg:text-base tracking-wider leading-normal font-base text-gray-500">
                    {product.description}
                  </p>
                </div>
                <hr />
                <img
                  className="mt-5 lg:mt-3 w-[40%] lg:w-[20%]"
                  src={colors}
                  alt="product colors"
                />
                <div className="mt-10 lg:mt-5 flex items-center space-x-2">
                  <button className="px-7 lg:px-5 py-4 lg:py-2 bg-sky-500 text-white rounded-md font-bold">
                    Select Options
                  </button>
                  <button className="px-5 lg:px-4 py-4 lg:py-3 border rounded-full">
                    <FontAwesomeIcon icon={faHeart} />
                  </button>
                  <button className="px-5 lg:px-4 py-4 lg:py-3 border rounded-full">
                    <FontAwesomeIcon icon={faCartShopping} />
                  </button>
                  <button className="px-5 lg:px-4 py-4 lg:py-3 border rounded-full">
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
