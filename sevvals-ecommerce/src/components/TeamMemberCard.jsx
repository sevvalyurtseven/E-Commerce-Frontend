import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const TeamMemberCard = ({ image, name, profession }) => {
  return (
    <div className="flex flex-col items-center text-center gap-6 transition-transform duration-300 ease-in-out transform hover:scale-110 border border-[#fafafa] shadow-md">
      <img src={image} alt={name} className="w-full h-full" />

      <h3 className="text-center text-slate-800 text-xl font-bold leading-normal tracking-wider">
        {name}
      </h3>
      <h4 className="text-center text-neutral-500 text-lg font-bold leading-normal tracking-wider">
        {profession}
      </h4>
      <div className="flex items-center gap-5 text-[#23A6F0] text-3xl pb-28">
        <FontAwesomeIcon icon={faFacebook} />
        <FontAwesomeIcon icon={faInstagram} />
        <FontAwesomeIcon icon={faTwitter} />
      </div>
    </div>
  );
};

export default TeamMemberCard;
