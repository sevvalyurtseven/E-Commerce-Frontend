import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import family from "../../assets/contact/contact.png";
import { faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import faceebok from "../../assets/contact/logos_facebook.svg";
import linkedin from "../../assets/contact/logos_linkedin-icon.svg";

function ContactInfo() {
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="flex flex-col gap-6 lg:gap-8 lg:p-40 p-20 justify-center lg:justify-start items-center lg:items-start">
        <h2 className="text-slate-800 text-base font-bold leading-normal tracking-wider">
          CONTACT US
        </h2>
        <h3 className="text-slate-800 md:text-5xl lg:text-6xl text-3xl font-bold lg:leading-[80px] leading-none text-center lg:text-start tracking-wider">
          Get in touch <br className="hidden md:block" />
          today!
        </h3>
        <p className=" text-neutral-500 lg:text-xl text-2xl font-normal leading-[30px] tracking-wider text-center lg:text-start">
          We know how large objects will act, <br className="hidden lg:block" />
          but things on a small scale
        </p>
        <p className="text-slate-800  text-xl font-bold leading-loose tracking-wider">
          Phone ; +451 215 215
        </p>
        <p className="text-slate-800 text-xl   font-bold leading-loose tracking-wider">
          Fax : +451 215 215
        </p>
        <div className="flex lg:gap-11 gap-8">
          <FontAwesomeIcon
            icon={faTwitter}
            className="text-3xl  text-[#23A6F0] "
          />
          <img src={faceebok} />
          <FontAwesomeIcon icon={faInstagram} className="text-3xl" />
          <img src={linkedin} />
        </div>
      </div>

      <div className="flex flex-1 justify-center items-center px-16 lg:px-0">
        <img src={family} />
      </div>
    </div>
  );
}
export default ContactInfo;
