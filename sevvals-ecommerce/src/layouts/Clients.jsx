import hooli from "../assets/brands/col-md-2.png";
import lyft from "../assets/brands/Vector.png";
import yaprak from "../assets/brands/col-md-2-1.png";
import stripe from "../assets/brands/col-md-2-2.png";
import aws from "../assets/brands/col-md-2-3.png";
import robot from "../assets/brands/col-md-2-4.png";

function Clients() {
  const clients = [hooli, lyft, yaprak, stripe, aws, robot];
  return (
    <div className="w-[75%] mx-auto flex flex-col sm:flex-row sm:justify-between items-center sm:py-10 py-20 gap-10">
      {clients.map((image, index) => (
        <div key={index}>
          <img src={image} />
        </div>
      ))}
    </div>
  );
}

export default Clients;
