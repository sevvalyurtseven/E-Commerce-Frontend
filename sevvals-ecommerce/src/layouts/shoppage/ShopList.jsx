import {
  faAngleDown,
  faListCheck,
  faTableCellsLarge,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductCard from "../../components/ProductCard";
import Pagination from "../../components/Pagination"; // Pagination bileşeni import edilmesi

import manken1 from "../../assets/best-seller-products/fixed-height-4.png";
import manken2 from "../../assets/best-seller-products/fixed-height-5.png";
import manken3 from "../../assets/best-seller-products/fixed-height-6.png";
import manken4 from "../../assets/best-seller-products/fixed-height-3.png";
import manken5 from "../../assets/best-seller-products/product-cover-5.png";
import manken6 from "../../assets/best-seller-products/fixed-height.png";
import manken7 from "../../assets/best-seller-products/fixed-height-5.png";
import manken8 from "../../assets/best-seller-products/fixed-height-6.png";
import manken9 from "../../assets/best-seller-products/product-cover-5-1.png";
import manken10 from "../../assets/best-seller-products/fixed-height-7.png";
import { useState } from "react";

const products = [
  {
    id: 1,
    image: manken1,
    title: "Graphic Design",
    department: "English Department",
    originalPrice: 16.48,
    discountedPrice: 6.48,
  },
  {
    id: 2,
    image: manken2,
    title: "Graphic Design",
    department: "English Department",
    originalPrice: 18.99,
    discountedPrice: 8.99,
  },
  {
    id: 3,
    image: manken3,
    title: "Graphic Design",
    department: "English Department",
    originalPrice: 20.0,
    discountedPrice: 10.0,
  },
  {
    id: 4,
    image: manken4,
    title: "Graphic Design",
    department: "English Department",
    originalPrice: 20.0,
    discountedPrice: 10.0,
  },
  {
    id: 5,
    image: manken5,
    title: "Graphic Design",
    department: "English Department",
    originalPrice: 20.0,
    discountedPrice: 10.0,
  },
  {
    id: 6,
    image: manken6,
    title: "Graphic Design",
    department: "English Department",
    originalPrice: 20.0,
    discountedPrice: 10.0,
  },
  {
    id: 7,
    image: manken7,
    title: "Graphic Design",
    department: "English Department",
    originalPrice: 20.0,
    discountedPrice: 10.0,
  },
  {
    id: 8,
    image: manken8,
    title: "Graphic Design",
    department: "English Department",
    originalPrice: 20.0,
    discountedPrice: 10.0,
  },
  {
    id: 9,
    image: manken9,
    title: "Graphic Design",
    department: "English Department",
    originalPrice: 20.0,
    discountedPrice: 10.0,
  },
  {
    id: 10,
    image: manken10,
    title: "Graphic Design",
    department: "English Department",
    originalPrice: 20.0,
    discountedPrice: 10.0,
  },
  {
    id: 11,
    image: manken10,
    title: "Graphic Design",
    department: "English Department",
    originalPrice: 20.0,
    discountedPrice: 10.0,
  },
  {
    id: 12,
    image: manken10,
    title: "Graphic Design",
    department: "English Department",
    originalPrice: 20.0,
    discountedPrice: 10.0,
  },
];

const itemsPerPage = 12;

function ShopList() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full flex flex-col py-10 px-10">
      <div className="flex items-center sm:justify-between justify-center flex-wrap sm:flex-nowrap gap-5 sm:gap-0 px-10">
        <p className="text-neutral-500 text-md font-bold leading-normal tracking-widest">
          Showing all 12 results
        </p>

        <div className="flex items-center gap-5">
          <p className="text-neutral-500 text-md font-bold leading-normal tracking-widest">
            Views:
          </p>
          <button className="border border-solid border-gray-200 rounded-[5px] text-2xl p-4">
            <FontAwesomeIcon icon={faTableCellsLarge} />
          </button>
          <button className="border border-solid border-gray-200 rounded-[5px] text-2xl p-4">
            <FontAwesomeIcon icon={faListCheck} />
          </button>
        </div>

        <div className="flex items-center gap-5">
          <button className="border border-solid border-gray-200 rounded-[5px] text-md py-4 px-6 text-neutral-500  font-normal leading-normal tracking-wider">
            Popularity <FontAwesomeIcon icon={faAngleDown} />
          </button>
          <button className="border border-solid border-[#23A6F0] bg-[#23A6F0] rounded-[5px] text-md py-4 px-6 text-white  font-bold leading-normal tracking-wider">
            Filter <FontAwesomeIcon icon={faAngleDown} />
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center py-12">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 w-[90%] py-16">
          {currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              title={product.title}
              department={product.department}
              originalPrice={product.originalPrice}
              discountedPrice={product.discountedPrice}
            />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default ShopList;
