import img1 from "../assets/top-product-of-the-week/image1.png";
import img2 from "../assets/top-product-of-the-week/image2.png";
import img3 from "../assets/top-product-of-the-week/image3.png";

const products = [
  {
    id: 1,
    image: img2,
    title: "Top Product Of the Week",
    buttonText: "EXPLORE ITEMS",
  },
  {
    id: 2,
    image: img3,
    title: "Top Product Of the Week",
    buttonText: "EXPLORE ITEMS",
  },
];

function TopProductOfTheWeek() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-5 py-20">
      <div className="relative md:w-[42%] w-[80%]">
        <img src={img1} alt="Top Product Of the Week" />
        <div className="absolute bottom-0 left-0 md:w-4/6 w-full md:h-2/6 h-3/6 border border-cyan-600 bg-cyan-600 bg-opacity-75 md:p-3 p-16">
          <div className="flex flex-col items-center">
            <h4 className="text-white text-2xl font-bold leading-loose tracking-wider text-left">
              Top Product Of <br /> the Week
            </h4>
            <div className="flex items-center ">
              <button className="text-white border border-white py-4 text-sm font-bold leading-snug tracking-wider">
                EXPLORE ITEMS
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5 md:w-[45%] w-[80%]">
        {products.map((product) => (
          <div key={product.id} className="relative">
            <img src={product.image} alt={product.title} />
            <div className="absolute bottom-0 left-0 md:w-4/6 w-full md:h-max h-4/6 border border-cyan-600 bg-cyan-600 bg-opacity-75 md:p-3 p-12">
              <div className="flex flex-col items-center">
                <h4 className="text-white text-2xl font-bold leading-loose tracking-wider text-center">
                  {product.title}
                </h4>
                <div className="flex items-center text-[#23A6F0] text-3xl">
                  <button className="text-white border border-white py-3 px-8 text-sm font-bold leading-snug tracking-wider">
                    {product.buttonText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopProductOfTheWeek;
