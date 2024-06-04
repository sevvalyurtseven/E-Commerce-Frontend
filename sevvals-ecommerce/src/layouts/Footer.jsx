import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div className="flex justify-between items-center py-10 px-10 bg-[#FAFAFA]">
        <h1 className="text-slate-800 text-2xl font-bold leading-loose tracking-wider">
          Bandage
        </h1>
        <div className="text-[#23A6F0] text-2xl flex gap-5">
          <FontAwesomeIcon icon={faFacebook} />
          <FontAwesomeIcon icon={faInstagram} />
          <FontAwesomeIcon icon={faTwitter} />
        </div>
      </div>
      <hr />
      <div className="flex flex-wrap justify-around items-start py-10 gap-10 px-6">
        {" "}
        {/* Added gap-10 for spacing */}
        <div className="flex flex-col gap-4">
          {" "}
          {/* Removed unnecessary outer div */}
          <h5 className=" text-slate-800 text-base font-bold leading-normal tracking-wider">
            Company Info
          </h5>
          <nav className="flex flex-col gap-3 text-neutral-500 text-sm font-bold leading-normal tracking-wider">
            <Link to="">About Us</Link>
            <Link to="">Carrier</Link>
            <Link to="">We are hiring</Link>
            <Link to="">Blog</Link>
          </nav>
        </div>
        <div className="flex flex-col gap-4">
          {" "}
          {/* Removed unnecessary outer div */}
          <h5 className=" text-slate-800 text-base font-bold leading-normal tracking-wider">
            Legal
          </h5>
          <nav className="flex flex-col gap-3 text-neutral-500 text-sm font-bold leading-normal tracking-wider">
            <Link to="">About Us</Link>
            <Link to="">Carrier</Link>
            <Link to="">We are hiring</Link>
            <Link to="">Blog</Link>
          </nav>
        </div>
        <div className="flex flex-col gap-4">
          {" "}
          {/* Removed unnecessary outer div */}
          <h5 className=" text-slate-800 text-base font-bold leading-normal tracking-wider">
            Features
          </h5>
          <nav className="flex flex-col gap-3 text-neutral-500 text-sm font-bold leading-normal tracking-wider">
            <Link to="">Business Marketing</Link>
            <Link to="">User Analytic</Link>
            <Link to="">Live Chat</Link>
            <Link to="">Unlimited Support</Link>
          </nav>
        </div>
        <div className="flex flex-col gap-4">
          {" "}
          {/* Removed unnecessary outer div */}
          <h5 className=" text-slate-800 text-base font-bold leading-normal tracking-wider">
            Resources
          </h5>
          <nav className="flex flex-col gap-3 text-neutral-500 text-sm font-bold leading-normal tracking-wider">
            <Link to="">IOS & Android</Link>
            <Link to="">Watch a Demo</Link>
            <Link to="">Customers</Link>
            <Link to="">API</Link>
          </nav>
        </div>
        <div className="flex flex-col gap-4">
          {" "}
          {/* Removed unnecessary outer div */}
          <h5 className="text-slate-800 text-base font-bold leading-normal tracking-wider">
            Get In Touch
          </h5>
          <div className="flex items-center">
            <input
              type="email"
              placeholder="Your Email"
              className="input input-bordered px-1"
            />
            <button className="btn bg-sky-500 text-white px-2">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
