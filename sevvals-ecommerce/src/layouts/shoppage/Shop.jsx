import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import shop1 from "../../assets/shop/card-cover-5.png";
import shop2 from "../../assets/shop/media bg-cover.png";
import shop3 from "../../assets/shop/media bg-cover1.png";
import shop4 from "../../assets/shop/media bg-cover2.png";
import shop5 from "../../assets/shop/media bg-cover3.png";
import ShopCard from "../../components/ShopCard";

function Shop() {
  const shops = [
    { id: 1, title: "CLOTHS", itemCount: 5, image: shop1 },
    { id: 2, title: "SHOES", itemCount: 8, image: shop2 },
    { id: 3, title: "ACCESSORIES", itemCount: 12, image: shop3 },
    { id: 4, title: "ELECTRONICS", itemCount: 7, image: shop4 },
    { id: 5, title: "BOOKS", itemCount: 9, image: shop5 },
  ];

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
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 px-12 pt-10">
        {shops.map((shop) => (
          <ShopCard
            key={shop.id}
            title={shop.title}
            itemCount={shop.itemCount}
            image={shop.image}
          />
        ))}
      </div>
    </div>
  );
}

export default Shop;
