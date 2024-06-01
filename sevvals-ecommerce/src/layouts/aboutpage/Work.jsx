import blondeGirl from "../../assets/about/blondegirl.png";

function Work() {
  return (
    <div className="flex justify-between bg-[#2A7CC7] py-20 lg:py-0">
      <div className="flex flex-col justify-center gap-8 mx-auto items-center sm:items-start text-center sm:text-start">
        <h4 className="text-white text-base font-bold leading-normal tracking-wider">
          WORK WITH US
        </h4>
        <h2 className="text-white  text-6xl font-bold leading-tight tracking-wider">
          Now Let’s grow Yours
        </h2>
        <p className=" text-white  text-m font-normal leading-tight tracking-wider">
          The gradual accumulation of information about atomic and <br />
          small-scale behavior during the first quarter of the 20th
        </p>
        <div className="flex items-start">
          <button className="text-center text-neutral-50  text-m font-bold leading-snug tracking-wider border border-solid px-9 py-4 transition-transform duration-300 ease-in-out transform hover:scale-110 hover:text-sky-500 hover:bg-white">
            Button
          </button>
        </div>
      </div>

      <img src={blondeGirl} className="hidden lg:block " />
    </div>
  );
}
export default Work;
