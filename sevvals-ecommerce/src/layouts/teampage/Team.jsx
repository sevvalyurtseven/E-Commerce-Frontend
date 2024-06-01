import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import team1 from "../../assets/team/team3.png";
import team2 from "../../assets/team/team2.png";
import team3 from "../../assets/team/team5.png";
import team4 from "../../assets/team/team1.png";
import team5 from "../../assets/team/team4.png";
import member1 from "../../assets/team/member1.jpg";
import member2 from "../../assets/team/member2.jpg";
import member3 from "../../assets/team/member3.jpg";
import member4 from "../../assets/team/member4.jpg";
import member5 from "../../assets/team/member5.jpg";
import member6 from "../../assets/team/member6.jpg";
import member7 from "../../assets/team/member7.jpg";
import member8 from "../../assets/team/member8.jpg";
import member9 from "../../assets/team/member9.jpg";
import { faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import faceebok from "../../assets/contact/logos_facebook.svg";
import linkedin from "../../assets/contact/logos_linkedin-icon.svg";
import TeamMemberCard from "../../components/TeamMemberCard";

function Team() {
  const members = [
    { image: member1, name: "Member 1", profession: "Profession 1" },
    { image: member2, name: "Member 2", profession: "Profession 2" },
    { image: member3, name: "Member 3", profession: "Profession 3" },
    { image: member4, name: "Member 4", profession: "Profession 4" },
    { image: member5, name: "Member 5", profession: "Profession 5" },
    { image: member6, name: "Member 6", profession: "Profession 6" },
    { image: member7, name: "Member 7", profession: "Profession 7" },
    { image: member8, name: "Member 8", profession: "Profession 8" },
    { image: member9, name: "Member 9", profession: "Profession 9" },
  ];

  return (
    <div className="flex flex-col py-20 gap-6 justify-center items-center ">
      <h5 className="text-center text-neutral-500 text-base font-bold leading-normal tracking-wider">
        WHAT WE DO
      </h5>
      <h2 className="text-center text-slate-800 sm:text-6xl text-5xl font-bold leading-[80px] tracking-wider">
        Innovation tailored for you
      </h2>
      <div className="flex items-center justify-center gap-4">
        <h5 className="text-center text-slate-800 text-sm font-bold leading-normal tracking-wider">
          Home
        </h5>
        <FontAwesomeIcon
          className="text-[#BDBDBD] text-2xl tracking-wider"
          icon={faAngleRight}
        />
        <h5 className="text-center text-neutral-500 text-sm font-bold leading-normal tracking-wider">
          Team
        </h5>
      </div>
      <div className="flex flex-col lg:flex-row gap-2 pt-10 flex-wrap lg:flex-nowrap">
        <img src={team1} alt="team1" className="lg:w-full" />
        <div className="flex lg:flex-col flex-row gap-2  w-[59%] lg:w-full">
          <img src={team2} alt="team2" />
          <img src={team3} alt="team3" />
        </div>
        <div className="flex lg:flex-col flex-row gap-2 w-[59%] lg:w-full">
          <img src={team4} alt="team4" />
          <img src={team5} alt="team5" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center sm:pt-20 pt-10">
        <h1 className="text-slate-800 text-5xl font-bold leading-[50px] tracking-wider text-center">
          Meet Our <br className="sm:hidden block" />
          Team
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-8 py-16 lg:px-40 px-8">
          {members.map((member, index) => (
            <TeamMemberCard
              key={index}
              image={member.image}
              name={member.name}
              profession={member.profession}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-10">
        <h1 className="text-slate-800 text-[40px] font-bold leading-[50px] tracking-wider text-center">
          Start your 14 days free trial
        </h1>
        <p className="text-center text-neutral-500 text-base font-normal leading-tight tracking-wider w-4/5">
          Met minim Mollie non desert Alamo est sit cliquey dolor{" "}
          <br className="hidden sm:block" /> do met sent. RELIT official
          consequent.
        </p>
        <button className="text-center text-white text-sm font-bold leading-snug tracking-wider border rounded-md border-solid bg-[#23A6F0] px-12 py-5 transition-transform duration-300 ease-in-out transform hover:scale-110 hover:bg-[#2F80ED]">
          Try it free now
        </button>
      </div>
      <div className="flex items-center justify-center gap-10 pt-10">
        <FontAwesomeIcon icon={faTwitter} className="text-4xl text-[#23A6F0]" />
        <img src={faceebok} alt="facebook" />
        <FontAwesomeIcon icon={faInstagram} className="text-4xl" />
        <img src={linkedin} alt="linkedin" />
      </div>
    </div>
  );
}

export default Team;
