import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="w-full flex flex-col pt-10">
      <div className="bg-[#FAFAFA]   px-20 py-10">
        <div className="sm:px-36 flex sm:flex-row flex-col sm:justify-between justify-start sm:items-center items-start">
          <h1 className="text-slate-800 text-2xl font-bold leading-loose tracking-wider">
            Bandage
          </h1>
          <div className="text-[#23A6F0] text-2xl flex gap-5">
            <FontAwesomeIcon icon={faFacebook} />
            <FontAwesomeIcon icon={faInstagram} />
            <FontAwesomeIcon icon={faTwitter} />
          </div>
        </div>
      </div>
      <div className="flex justify-center py-10">
        <div className="flex sm:flex-row flex-col justify-between gap-14">
          <div className="flex flex-col gap-5">
            <h5 className="text-slate-800 text-base font-bold leading-normal tracking-wider ">
              Company Info
            </h5>

            <nav className="flex flex-col gap-3 text-neutral-500 text-sm font-bold leading-normal tracking-wider">
              <Link to="">About Us</Link>
              <Link to="">Carrier</Link>
              <Link to="">We are hiring</Link>
              <Link to="">Blog</Link>
            </nav>
          </div>
          <div className="flex flex-col gap-5">
            <h5 className="text-slate-800 text-base font-bold leading-normal tracking-wider ">
              Legal
            </h5>

            <nav className="flex flex-col gap-3 text-neutral-500 text-sm font-bold leading-normal tracking-wider">
              <Link to="">About Us</Link>
              <Link to="">Carrier</Link>
              <Link to="">We are hiring</Link>
              <Link to="">Blog</Link>
            </nav>
          </div>

          <div className="flex flex-col gap-5">
            <h5 className="text-slate-800 text-base font-bold leading-normal tracking-wider">
              Features
            </h5>

            <nav className="flex flex-col gap-3 text-neutral-500 text-sm font-bold leading-normal tracking-wider">
              <Link to="">Business Marketing</Link>
              <Link to="">User Analytic</Link>
              <Link to="">Live Chat</Link>
              <Link to="">Unlimited Support</Link>
            </nav>
          </div>
          <div className="flex flex-col gap-5">
            <h5 className="text-slate-800 text-base font-bold leading-normal tracking-wider">
              Resources
            </h5>

            <nav className="flex flex-col gap-3 text-neutral-500 text-sm font-bold leading-normal tracking-wider">
              <Link to="">IOS & Android</Link>
              <Link to="">Watch a Demo</Link>
              <Link to="">Customers</Link>
              <Link to="">API</Link>
            </nav>
          </div>
          <div className="flex flex-col gap-5">
            <h5 className="text-slate-800 text-base font-bold leading-normal tracking-wider">
              Get In Touch
            </h5>
            <div className="flex border rounded-md">
              <input
                type="email"
                placeholder="Your Email"
                className="bg-white tracking-wider text-sm px-1"
              />
              <button
                type="submit"
                className="text-sm tracking-wider text-white bg-[#23A6F0] py-4 px-3"
              >
                Subscribe
              </button>
            </div>
            <p className="text-xs tracking-wider text-[#737373]">
              Lore imp sum dolor Amit{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="py-6 bg-[#FAFAFA]">
        <div className="w-[75%] m-auto text-sm font-bold text-[#737373] tracking-wider text-center sm:text-start">
          <p>Made With Love By Finland All Right Reserved</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
