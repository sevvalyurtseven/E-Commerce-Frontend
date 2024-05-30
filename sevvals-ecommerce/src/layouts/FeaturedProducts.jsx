import girl1 from "../assets/we-love-what-we-do/contentGirl.png";
import girl2 from "../assets/we-love-what-we-do/contentGirl2.png";

function FeaturedProducts() {
  return (
    <div className="flex flex-col w-full py-20">
      <div className="flex justify-center items-center flex-wrap-reverse gap-8 ">
        <div className="flex h-80 sm:h-auto">
          <img src={girl1} />
          <img src={girl2} />
        </div>
        <div className="flex flex-col gap-6 mx-36 ">
          <h3 className="text-sky-500 text-base font-bold leading-normal tracking-wider">
            Featured Products
          </h3>
          <h1 className="text-slate-800 text-[40px] font-bold leading-[50px] tracking-wider">
            We love what we do
          </h1>
          <p className=" text-neutral-500 text-sm font-normal leading-tight tracking-wider">
            Problems trying to resolve the conflict between{" "}
            <br className="hidden sm:block" />
            the two major realms of Classical physics:{" "}
            <br className="hidden sm:block" />
            Newtonian mechanics.{" "}
          </p>
          <p className=" text-neutral-500 text-sm font-normal  leading-tight tracking-wider ">
            Problems trying to resolve the conflict between{" "}
            <br className="hidden sm:block" />
            the two major realms of Classical physics:{" "}
            <br className="hidden sm:block" />
            Newtonian mechanics
          </p>
        </div>
      </div>
    </div>
  );
}
export default FeaturedProducts;
