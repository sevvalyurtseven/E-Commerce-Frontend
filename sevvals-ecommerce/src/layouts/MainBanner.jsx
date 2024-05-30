import { useState } from "react";
import curlyGirl from "../assets/slide-curly-girl/none.png";

function MainBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "SUMMER 2020",
      subtitle: "NEW COLLECTION",
      description:
        "We know how large objects will act,\n but things on a small scale.",
      image: curlyGirl,
    },
    {
      id: 2,
      title: "WINTER 2020",
      subtitle: "EXCLUSIVE COLLECTION",
      description: "Discover our exclusive winter collection.",
      image: curlyGirl,
    },
    {
      id: 3,
      title: "SPRING 2021",
      subtitle: "FRESH ARRIVALS",
      description: "Fresh arrivals just for you.",
      image: curlyGirl,
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="sm:py-10 sm:pl-12 sm:pr-28 py-10 px-12">
      <div className="bg-gradient-to-r from-cyan-200 to-emerald-200 rounded-xl relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out transform"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={slide.id} className="w-full flex-shrink-0 h-full">
              <div className="flex flex-col md:flex-row items-center justify-between  h-full">
                <div className="flex-1 sm:text-left sm:pl-32 text-center">
                  <h3 className="text-sky-600 text-base font-bold pb-8 pt-20">
                    {slide.title}
                  </h3>
                  <h1 className="text-slate-800 text-4xl md:text-6xl font-bold pb-8">
                    {slide.subtitle}
                  </h1>
                  <p className="text-neutral-500 text-lg md:text-xl whitespace-pre-line pb-4">
                    {slide.description}
                  </p>
                  <button className="bg-sky-500 text-white text-lg md:text-2xl font-bold px-6 py-3 rounded mt-4">
                    SHOP NOW
                  </button>
                </div>
                <div className="relative w-full md:w-1/2 h-full mt-10 md:mt-0 mx-auto flex items-center">
                  <img
                    src={slide.image}
                    className="w-full h-full object-cover md:object-right rounded-md"
                    alt={slide.subtitle}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-0 transform -translate-y-1/2  text-white p-3 z-10"
        >
          ‹
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-0 transform -translate-y-1/2  text-white p-3 z-10"
        >
          ›
        </button>
      </div>
    </div>
  );
}

export default MainBanner;
