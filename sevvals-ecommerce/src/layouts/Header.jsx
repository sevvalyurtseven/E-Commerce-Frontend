import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faBars,
  faCartShopping,
  faPhone,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

import { faEnvelope, faHeart } from "@fortawesome/free-regular-svg-icons";

function Header() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    handleResize(); // Set the initial state

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-white">
      {!isMobile && (
        <div className="flex flex-col gap-3 bg-white">
          <div className="flex justify-between items-center bg-slate-800 p-6">
            <div className="flex items-center gap-10">
              <span className="text-white text-sm font-bold">
                <FontAwesomeIcon icon={faPhone} /> (225) 555-0118
              </span>
              <span className="text-white text-sm font-bold">
                <FontAwesomeIcon icon={faEnvelope} />{" "}
                michelle.rivera@example.com
              </span>
            </div>
            <span className="text-white text-sm font-bold">
              Follow Us and get a chance to win 80% off
            </span>
            <div className="flex items-center gap-3 text-white">
              <span className="text-white text-sm font-bold">Follow Us :</span>
              <FontAwesomeIcon icon={faInstagram} className="w-4 h-4" />
              <FontAwesomeIcon icon={faYoutube} className="w-4 h-4" />
              <FontAwesomeIcon icon={faFacebook} className="w-4 h-4" />
              <FontAwesomeIcon icon={faTwitter} className="w-4 h-4" />
            </div>
          </div>
          <div className="flex justify-between items-center px-9 py-4 bg-white">
            <span className="text-slate-800 text-2xl font-bold">Bandage</span>
            <div className="flex items-center gap-6  tracking-wide">
              <span className="text-neutral-500 text-m font-bold">Home</span>
              <span className="text-slate-800 text-m font-medium">
                Shop <FontAwesomeIcon icon={faAngleDown} />
              </span>
              <span className="text-neutral-500 text-m font-bold">About</span>
              <span className="text-neutral-500 text-m font-bold">Blog</span>
              <span className="text-neutral-500 text-m font-bold">Contact</span>
              <span className="text-neutral-500 text-m font-bold">Pages</span>
            </div>
            <div className="flex items-center gap-8 text-center text-sky-500 text-m tracking-wide font-bold ">
              <span className="flex items-center gap-2">
                <FontAwesomeIcon icon={faUser} />
                <span>Login</span>
                <span>/</span>
                <span>Register</span>
              </span>

              <span>
                <FontAwesomeIcon icon={faSearch} />
              </span>
              <span>
                <FontAwesomeIcon icon={faCartShopping} />
              </span>
              <span>
                <FontAwesomeIcon icon={faHeart} />
              </span>
            </div>
          </div>
        </div>
      )}

      {isMobile && (
        <div className="bg-white">
          <div className="container mx-auto p-10 flex justify-between items-center">
            <a href="#" className="text-2xl font-bold">
              Bandage
            </a>
            <div className="flex space-x-7 text-xl">
              <a href="#">
                <FontAwesomeIcon icon={faSearch} />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={faCartShopping} />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={faBars} />
              </a>
            </div>
          </div>
          <div className="container mx-auto py-4">
            <nav className="flex flex-col items-center space-y-4 text-2xl tracking-widest text-neutral-500 font-normal gap-3">
              <a href="#">Home</a>
              <a href="#">Shop</a>
              <a href="#">About</a>
              <a href="#">Blog</a>
              <a href="#">Contact</a>
              <a href="#">Pages</a>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
