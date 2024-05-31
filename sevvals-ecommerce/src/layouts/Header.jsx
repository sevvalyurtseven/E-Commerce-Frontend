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
import "./Header.css"; // Import your CSS file
import { Link } from "react-router-dom";

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
    <div className="header-container">
      {!isMobile ? (
        <div className="flex flex-col gap-3">
          <div className="header-top">
            <div className="header-top-info">
              <span className="header-top-follow-us">
                <FontAwesomeIcon icon={faPhone} /> (225) 555-0118
              </span>
              <span className="header-top-follow-us">
                <FontAwesomeIcon icon={faEnvelope} />{" "}
                michelle.rivera@example.com
              </span>
            </div>
            <span className="header-top-follow-us">
              Follow Us and get a chance to win 80% off
            </span>
            <div className="flex items-center gap-3 text-white">
              <span className="header-top-follow-us">Follow Us :</span>
              <FontAwesomeIcon icon={faInstagram} className="w-4 h-4" />
              <FontAwesomeIcon icon={faYoutube} className="w-4 h-4" />
              <FontAwesomeIcon icon={faFacebook} className="w-4 h-4" />
              <FontAwesomeIcon icon={faTwitter} className="w-4 h-4" />
            </div>
          </div>
          <div className="header-main">
            <span className="text-slate-800 text-2xl font-bold">Bandage</span>
            <div className="header-main-links">
              <Link to="/" className="text-neutral-500 text-base font-bold">
                Home
              </Link>
              <Link to="/shop" className="text-slate-800 text-base font-medium">
                Shop <FontAwesomeIcon icon={faAngleDown} />
              </Link>
              <Link
                to="/about"
                className="text-neutral-500 text-base font-bold"
              >
                About
              </Link>
              <Link to="/team" className="text-neutral-500 text-base font-bold">
                Blog
              </Link>
              <Link
                to="/contact"
                className="text-neutral-500 text-base font-bold"
              >
                Contact
              </Link>
              <Link
                to="/pages"
                className="text-neutral-500 text-base font-bold"
              >
                Pages
              </Link>
            </div>
            <div className="header-main-auth">
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
      ) : (
        <div>
          <div className="mobile-header-container">
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
          <div className="mobile-header-nav">
            <nav className="mobile-header-links">
              <Link to="/">Home</Link>
              <Link to="/shop">Shop</Link>
              <Link to="/about">About</Link>
              <Link to="/team">Blog</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/pages">Pages</Link>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
