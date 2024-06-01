import girl from "../../assets/about/aboutbanner.png";

function HeaderContent() {
  return (
    <div className="flex flex-col py-10">
      <div className="flex flex-col lg:flex-row flex-wrap lg:flex-nowrap justify-evenly  items-center">
        <div className="flex flex-col lg:items-start items-center gap-10">
          <h3 className="text-slate-800 text-base font-bold leading-normal tracking-wider hidden sm:block">
            ABOUT COMPANY
          </h3>
          <h1 className=" text-slate-800 text-5xl font-bold leading-20 tracking-wider">
            ABOUT US
          </h1>
          <p className="text-neutral-500 text-2xl font-normal leading-7 tracking-wider text-center sm:text-start sm:w-full w-4/5">
            We know how large objects will act,{" "}
            <br className="hidden sm:block" />
            but things on a small scale
          </p>

          <div className="sm:px-7 px-10 py-3 bg-[#23A6F0] rounded-5 flex-col items-center gap-3 border-0 border-solid rounded">
            <button className="text-white text-sm font-bold leading-snug tracking-tight">
              Get Quote Now
            </button>
          </div>
        </div>
        <div className="flex  h-full pt-20 ">
          <img src={girl} className="flex object-cover" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row flex-wrap lg:flex-nowrap justify-around  items-center px-12 lg:px-0">
        <div className="flex flex-col lg:items-start items-center gap-10 py-28 lg:py-10 text-center lg:text-start">
          <h5 className="text-red-500 lg:text-sm text-m font-normal leading-tight tracking-wider">
            Problems trying
          </h5>

          <h2 className="text-slate-800 lg:text-2xl text-4xl font-bold leading-tight tracking-tight ">
            Met minim Mollie non desert <br className="hidden sm:block" /> Alamo
            est sit cliquey dolor do <br className="hidden sm:block" /> met
            sent.
          </h2>
        </div>
        <div className="flex lg:items-start items-center text-center lg:text-start px-12 lg:px-0">
          <h5 className="text-neutral-500 text-m font-normal leading-tight tracking-wider">
            Problems trying to resolve the conflict between the two major realms
            of <br className="hidden sm:block" /> Classical physics: Newtonian
            mechanics
          </h5>
        </div>
      </div>
    </div>
  );
}
export default HeaderContent;
