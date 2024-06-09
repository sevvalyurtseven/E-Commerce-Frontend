import React from "react";
import { useLocation } from "react-router-dom";
import colors from "../assets/featured-posts/product-colors.png";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const convertToEnglish = (str) => {
  const charMap = {
    ç: "c",
    ğ: "g",
    ı: "i",
    ö: "o",
    ş: "s",
    ü: "u",
    Ç: "C",
    Ğ: "G",
    İ: "I",
    Ö: "O",
    Ş: "S",
    Ü: "U",
  };
  return str.replace(/[\u00c0-\u024f]/g, (c) => charMap[c] || c).toLowerCase();
};

function ProductCard({
  image,
  title,
  department,
  originalPrice,
  discountedPrice,
  product,
  category,
}) {
  const location = useLocation();
  const history = useHistory();

  // Ürün tıklandığında detay sayfasına yönlendirmek için
  const handleProductClick = () => {
    const categoryTitleSlug = convertToEnglish(category.title).replace(
      /\s+/g,
      "-"
    );
    const productNameSlug = convertToEnglish(product.name).replace(/\s+/g, "-");
    const url = `/shop/${
      category.gender === "k" ? "kadin" : "erkek"
    }/${categoryTitleSlug}/${category.id}/${productNameSlug}/${product.id}`;

    history.push(url);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="flex flex-col items-center text-center gap-5 bg-white border border-gray-100 rounded-md shadow-md pb-6 h-full cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-110"
      onClick={handleProductClick}
    >
      <div className="flex-grow flex items-center justify-center overflow-hidden">
        <img src={image} alt={title} className="object-contain w-full" />
      </div>
      <div className="flex-grow flex flex-col justify-between">
        <div>
          <h5 className="text-slate-800 text-base font-bold leading-normal tracking-wider line-clamp-2">
            {title}
          </h5>
          <p className="text-center text-neutral-500 text-sm font-bold leading-normal tracking-wider line-clamp-2">
            {department}
          </p>
        </div>
        <div className="flex justify-center items-center gap-2">
          <h5 className="text-center text-stone-300 text-base font-bold leading-normal tracking-wider">
            ${originalPrice}
          </h5>
          <h5 className="text-center text-teal-700 text-base font-bold leading-normal tracking-wider">
            ${discountedPrice}
          </h5>
        </div>
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
