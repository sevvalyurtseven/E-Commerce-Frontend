import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import colors from "../assets/featured-posts/product-colors.png";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/actions/shoppingCartActions";
import { toast } from "react-toastify";

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
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  // Ürün detay sayfasına yönlendirmek için
  const handleViewDetails = (e) => {
    e.stopPropagation();
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

  // Ürünü sepete eklemek için
  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
    toast.success("Ürün sepete eklendi!");
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 3000); // 3 saniye sonra mesajı kaldır
  };

  return (
    <div className="relative flex flex-col items-center text-center gap-5 bg-white border border-gray-100 rounded-md shadow-md pb-6 h-full cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-110">
      {isAddedToCart && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10 backdrop-blur-md">
          <p className="text-white text-lg font-bold">Sepete eklendi!</p>
        </div>
      )}
      <div
        className={`flex-grow flex items-center justify-center overflow-hidden ${
          isAddedToCart ? "blur-sm" : ""
        }`}
      >
        <img src={image} alt={title} className="object-contain w-full" />
      </div>
      <div
        className={`flex-grow flex flex-col justify-between ${
          isAddedToCart ? "blur-sm" : ""
        }`}
      >
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
      <div className="flex justify-between gap-2 mt-2 w-full px-4">
        <button
          className="btn bg-sky-500 text-white hover:bg-[#e7a0da] hover:text-[#fafafa] w-1/2"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
        <button
          className="btn bg-gray-300 text-black hover:bg-gray-400 w-1/2"
          onClick={handleViewDetails}
        >
          More Details
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
