import Clients from "../Clients";

function Companies() {
  return (
    <div className="flex flex-col justify-center items-center py-24 bg-[#FAFAFA] gap-8">
      <div className="flex flex-col items-center  gap-8 w-[50%]">
        <h2 className="text-slate-800 lg:text-4xl text-5xl font-bold leading-tight tracking-wider text-center">
          Big Companies Are Here
        </h2>
        <p className="text-center text-neutral-500 lg:text-sm text-m font-normal leading-tight tracking-wider">
          Problems trying to resolve the conflict between <br /> the two major
          realms of Classical physics: Newtonian mechanics
        </p>
      </div>
      <Clients />
    </div>
  );
}
export default Companies;
