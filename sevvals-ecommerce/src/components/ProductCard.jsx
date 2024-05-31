import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import colors from "../assets/featured-posts/product-colors.png";

function ProductCard({
  image,
  title,
  department,
  originalPrice,
  discountedPrice,
}) {
  const location = useLocation(); // Mevcut URL'yi almak için useLocation kullanılması
  return (
    <div className="flex flex-col items-center text-center gap-5">
      <img src={image} alt={title} className="w-full h-full" />
      <h5 className="text-slate-800 text-base font-bold leading-normal tracking-wider">
        {title}
      </h5>
      <p className="text-center text-neutral-500 text-sm font-bold leading-normal tracking-wider">
        {department}
      </p>
      <div className="flex justify-center items-center gap-2">
        <h5 className="text-center text-stone-300 text-base font-bold leading-normal tracking-wider">
          ${originalPrice}
        </h5>
        <h5 className="text-center text-teal-700 text-base font-bold leading-normal tracking-wider">
          ${discountedPrice}
        </h5>
      </div>
      {location.pathname === "/shop" && (
        <div className="flex justify-center">
          <img src={colors} alt="product colors" />
        </div>
      )}
    </div>
  );
}

export default ProductCard;
