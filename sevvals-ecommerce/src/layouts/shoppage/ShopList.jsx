import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/actions/productActions";
import ProductCard from "../../components/ProductCard";
import Pagination from "../../components/Pagination"; // Pagination bileşeni import edilmesi
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faListCheck,
  faTableCellsLarge,
} from "@fortawesome/free-solid-svg-icons";

function ShopList() {
  const dispatch = useDispatch();
  const { productList, total, isFetching } = useSelector(
    (state) => state.products
  );
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const itemsPerPage = 25;
  const totalPages = Math.ceil(total / itemsPerPage);

  const currentProducts = productList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isFetching && currentPage === 1) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <button className="btn loading">Loading</button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col py-10 px-10">
      <div className="flex items-center sm:justify-between justify-center flex-wrap sm:flex-nowrap gap-5 sm:gap-0 px-10">
        <p className="text-neutral-500 text-md font-bold leading-normal tracking-widest">
          Showing all {total} results
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
              image={product.images[0]?.url} // Değiştirilmiş image
              title={product.name}
              department={product.description}
              originalPrice={product.price}
              discountedPrice={product.price}
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
