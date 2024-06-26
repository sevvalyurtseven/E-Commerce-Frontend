import React from "react";
import { Link, useHistory } from "react-router-dom";
import ShopCard from "../../components/ShopCard";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

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

function Shop({ gender, categoryName, categoryId }) {
  const categories = useSelector((state) => state.products.categories); // Kategori bilgilerini almak için
  const history = useHistory(); // URL yönlendirmeleri için

  const topCategories = categories
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5); // En yüksek reytinge sahip 5 kategoriyi al

  const handleCategoryClick = (category) => {
    const gender = category.gender === "k" ? "kadin" : "erkek";
    const categoryName = convertToEnglish(category.title);
    history.push(`/shop/${gender}/${categoryName}/${category.id}`); // Kategoriye göre yönlendirme yap
  };

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
          <div key={category.id} onClick={() => handleCategoryClick(category)}>
            <ShopCard
              title={category.title}
              gender={category.gender === "k" ? "KADIN" : "ERKEK"}
              image={category.img}
              link={`/shop/${
                category.gender === "k" ? "kadin" : "erkek"
              }/${convertToEnglish(category.title)}/${category.id}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;
