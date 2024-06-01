import hooli from "../assets/brands/col-md-2.png";
import lyft from "../assets/brands/Vector.png";
import yaprak from "../assets/brands/col-md-2-1.png";
import stripe from "../assets/brands/col-md-2-2.png";
import aws from "../assets/brands/col-md-2-3.png";
import robot from "../assets/brands/col-md-2-4.png";

function Clients() {
  const clients = [hooli, lyft, yaprak, stripe, aws, robot];
  return (
    <div className="flex flex-col justify-center items-center py-24 bg-[#FAFAFA] gap-8">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-6 gap-16 ">
        {clients.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              className="w-full  max-w-[100%] sm:max-w-[100%] md:max-w-[80%]"
              alt={`client-${index}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Clients;
