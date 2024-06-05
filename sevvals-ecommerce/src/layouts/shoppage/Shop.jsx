import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ShopCard from "../../components/ShopCard";
import { useSelector } from "react-redux";

function Shop() {
  const categories = useSelector((state) => state.products.categories);

  const topCategories = categories
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  return (
    <div className="bg-[#FAFAFA] flex flex-col py-10">
      <div className="flex flex-col sm:flex-row gap-5 sm:gap-0 justify-between items-center px-12">
        <h2 className="text-center text-slate-800 text-2xl font-bold leading-loose tracking-wider">
          Shop
        </h2>

        <div className="flex gap-4">
          <Link to="/" className="font-bold tracking-wider">
            Home
          </Link>

          <FontAwesomeIcon
            className="text-[#BDBDBD] text-2xl tracking-wider"
            icon={faAngleRight}
          />

          <p className="text-[#BDBDBD] font-bold tracking-wider">Shop</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-12 pt-10">
        {topCategories.map((category) => (
          <ShopCard
            key={category.id}
            title={category.title}
            gender={category.gender === "k" ? "KADIN" : "ERKEK"}
            image={category.img}
            link={`/shop/${category.gender === "k" ? "kadin" : "erkek"}/${
              category.code
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Shop;
