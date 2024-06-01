import member1 from "../../assets/team/member1.jpg";
import member2 from "../../assets/team/member2.jpg";
import member3 from "../../assets/team/member3.jpg";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import TeamMemberCard from "../../components/TeamMemberCard";

function Team() {
  const members = [
    { image: member1, name: "Member 1", profession: "Profession 1" },
    { image: member2, name: "Member 2", profession: "Profession 2" },
    { image: member3, name: "Member 3", profession: "Profession 3" },
  ];
  return (
    <div>
      <div className=" flex justify-center py-24 ">
        <div className="flex flex-col items-center gap-8">
          <div className="text-slate-800 lg:text-4xl text-5xl font-bold leading-[50px] tracking-wider transition-transform duration-300 ease-in-out transform hover:scale-110 hover:text-sky-500 border border-[#fafafa] px-4 py-4 shadow-sm rounded-xl">
            <Link to="/team">Meet Our Team</Link>
          </div>

          <p className="w-3/5 sm:w-full text-center text-neutral-500 lg:text-sm text-lg font-normal leading-tight tracking-wider">
            Problems trying to resolve the conflict between{" "}
            <br className="hidden sm:block" /> the two major realms of Classical
            physics: Newtonian mechanics
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-16 lg:px-40 px-8 pb-10">
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
  );
}

export default Team;
