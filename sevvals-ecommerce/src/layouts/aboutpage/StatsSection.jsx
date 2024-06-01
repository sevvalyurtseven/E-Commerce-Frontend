import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-regular-svg-icons";
import video from "../../assets/about/video.png";

function StatsSection() {
  const stats = [
    { value: "15K", label: "Happy Customers" },
    { value: "150K", label: "Monthly Visitors" },
    { value: "15", label: "Countries Worldwide" },
    { value: "100+", label: "Top Partners" },
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-evenly justify-center items-center py-28  flex-wrap lg:flex-nowrap gap-10 lg:gap-0">
        {stats.map((stat, index) => (
          <div key={index}>
            <h1 className="text-center text-slate-800 text-[58px] font-bold leading-[80px] tracking-tight">
              {stat.value}
            </h1>
            <p className="text-center text-neutral-500 text-base font-bold leading-normal tracking-tight">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
      <div className="py-6 flex items-center justify-center">
        <div className="relative rounded-2xl overflow-hidden">
          <img src={video} alt="video thumbnail" />
          <div className="absolute inset-0 flex items-center justify-center">
            <FontAwesomeIcon
              icon={faCirclePlay}
              className=" text-7xl text-white rounded-full bg-[#23A6F0] transition-transform duration-300 ease-in-out transform hover:scale-110"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsSection;
