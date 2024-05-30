import post1 from "../../assets/featured-posts/post2.png";
import post2 from "../../assets/featured-posts/post1.png";
import PostCard from "../../components/PostCard";

function FeaturedPosts() {
  const posts = [
    {
      image: post1,
      title: "Graphic Design",
      department: "English Department",
      sales: 15,
      originalPrice: 16.48,
      discountedPrice: 6.48,
      hours: 22,
      lessons: 64,
      progress: 70,
    },
    {
      image: post2,
      title: "UI/UX Design",
      department: "Design Department",
      sales: 20,
      originalPrice: 18.99,
      discountedPrice: 8.99,
      hours: 30,
      lessons: 72,
      progress: 80,
    },
  ];

  return (
    <div className="flex py-10 justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <h4 className=" text-sky-500 text-sm font-bold leading-normal tracking-wider">
          Practice Advice
        </h4>
        <h2 className=" text-slate-800 text-[40px] font-bold leading-[50px] tracking-wider">
          Featured Posts
        </h2>
        <div className="flex flex-wrap py-20 px-10 gap-5">
          {posts.map((post, index) => (
            <PostCard key={index} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeaturedPosts;
