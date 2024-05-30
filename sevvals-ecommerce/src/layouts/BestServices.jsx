import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookReader,
  faBookOpen,
  faArrowTrendUp,
} from "@fortawesome/free-solid-svg-icons";

function BestServices() {
  const fontAwesomeIcons = [faBookReader, faBookOpen, faArrowTrendUp];

  const featureItems = [
    { title: "Easy Wins", description: "Get your best-looking smile now!" },
    {
      title: "Concrete",
      description:
        "Defalcate is most focused on helping you discover your most beautiful smile",
    },
    {
      title: "Hack Growth",
      description: "Overcame any hurdle or any other problem.",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h4 className=" text-neutral-500 text-xl font-normal leading-[30px] tracking-wider">
        Featured Products
      </h4>
      <h1 className=" text-slate-800 text-2xl font-bold leading-loose tracking-wider">
        THE BEST SERVICES{" "}
      </h1>
      <p className=" text-neutral-500 text-sm font-normal leading-tight tracking-wider">
        Problems trying to resolve the conflict between{" "}
      </p>

      <div className="flex flex-wrap  items-center pt-28 px-20">
        {fontAwesomeIcons.map((icon, index) => (
          <div
            key={index}
            className="flex flex-col justify-center mx-auto gap-4 items-center w-full sm:w-1/5 pb-28 "
          >
            <FontAwesomeIcon icon={icon} className="text-7xl text-[#23A6F0]" />
            <h2 className="text-center text-slate-800 text-2xl font-bold leading-loose tracking-wider">
              {featureItems[index].title}
            </h2>
            <p className="text-center text-neutral-500 text-sm font-normal leading-tight tracking-wider">
              {featureItems[index].description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BestServices;
