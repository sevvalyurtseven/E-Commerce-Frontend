import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faChartBar,
  faChartLine,
  faClock,
  faDownload,
  faStar,
  faEye,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import colors from "../assets/featured-posts/product-colors.png";

function PostCard({
  image,
  title,
  department,
  sales,
  originalPrice,
  discountedPrice,
  hours,
  lessons,
  progress,
}) {
  return (
    <div className="flex flex-wrap justify-center sm:justify-start text-center sm:text-start gap-10 py-6 border sm:border-none border-[#E5E5E5]">
      <div className="relative">
        <p className="absolute top-5 left-5 text-center h-6 px-3 bg-red-500 rounded-[3px] shadow justify-start items-center flex text-white tracking-wider">
          Sales
        </p>
        <div className="absolute md:bottom-20 bottom-5 gap-3 flex items-center justify-center left-8">
          <div className="w-10 h-10 p-2.5 bg-white rounded-[44.79px] justify-center items-center inline-flex">
            <FontAwesomeIcon icon={faStar} />
          </div>
          <div className="w-10 h-10 p-2.5 bg-white rounded-[44.79px] justify-center items-center inline-flex">
            <FontAwesomeIcon icon={faEye} />
          </div>
          <div className="w-10 h-10 p-2.5 bg-white rounded-[44.79px] justify-center items-center inline-flex">
            <FontAwesomeIcon icon={faCartShopping} />
          </div>
        </div>
        <img src={image} alt={title} />
      </div>
      <div className="flex flex-col items-center sm:items-start gap-5 sm:px-6 sm:py-6">
        <h4 className="text-sky-500 text-sm font-bold leading-normal tracking-wider">
          {department}
        </h4>
        <h2 className="text-slate-800 text-base font-bold leading-normal tracking-wider">
          {title}
        </h2>
        <p className="text-neutral-500 text-sm font-normal leading-tight tracking-wider md:w-full w-[50%]">
          We focus on ergonomics and <br className="hidden sm:block" />
          meeting you where you work. It's <br className="hidden sm:block" />
          only a keystroke away.
        </p>
        <div className="flex gap-2 items-center sm:items-start">
          <FontAwesomeIcon icon={faDownload} className="text-[#737373]" />
          <span className="text-sm font-bold tracking-wider text-[#737373]">
            {sales} Sales
          </span>
        </div>
        <div className="flex gap-2 font-bold items-center sm:items-start">
          <span className="text-[#BDBDBD]">${originalPrice}</span>
          <span className="text-[#23856D]">${discountedPrice}</span>
        </div>
        <div className="flex pb-2 justify-center sm:justify-start">
          <img src={colors} alt="product colors" />
        </div>
        <div className="flex  items-center sm:items-start gap-3 pb-3">
          <FontAwesomeIcon icon={faClock} className="text-[#23A6F0]" />
          <p className="text-neutral-500 text-xs font-normal leading-none tracking-wider">
            {hours}h...
          </p>
          <FontAwesomeIcon icon={faChartLine} className="text-[#23A6F0]" />
          <p className="text-neutral-500 text-xs font-normal leading-none tracking-wider">
            {lessons} Lessons
          </p>
          <FontAwesomeIcon icon={faChartBar} className="text-[#E77C40]" />
          <p className="text-neutral-500 text-xs font-normal leading-none tracking-wider">
            Progress
          </p>
        </div>
        <div className="flex justify-center sm:justify-start">
          <button className="text-center sm:border border-solid rounded-3xl border-sky-500 text-sky-500 sm:px-8 py-3 font-bold tracking-wider">
            Learn More
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
