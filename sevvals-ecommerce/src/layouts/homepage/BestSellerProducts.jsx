import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/actions/productActions";
import ProductCard from "../../components/ProductCard";

function BestSellerProducts() {
  const dispatch = useDispatch();
  const { productList, total, isFetching } = useSelector(
    (state) => state.products
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedProducts, setDisplayedProducts] = useState([]);

  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    setDisplayedProducts(productList.slice(0, currentPage * itemsPerPage));
  }, [productList, currentPage, itemsPerPage]);

  const handleLoadMore = () => {
    if (displayedProducts.length < total) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  if (isFetching && currentPage === 1) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <button className="btn loading">Loading</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h4 className="text-neutral-500 text-xl font-normal leading-[30px] tracking-tight">
        Featured Products
      </h4>
      <h1 className="text-slate-800 text-2xl font-bold leading-loose tracking-tight">
        BESTSELLER PRODUCTS
      </h1>
      <p className="text-neutral-500 text-sm font-normal leading-tight tracking-tight">
        Problems trying to resolve the conflict between
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 w-[90%] py-16">
        {displayedProducts.map((product) => (
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
      {displayedProducts.length < total && (
        <button
          onClick={handleLoadMore}
          className="border border-[#23A6F0] text-[#23A6F0] font-bold p-4 hover:bg-[#23A6F0] hover:text-white transition-transform duration-300 ease-in-out transform hover:scale-110"
        >
          LOAD MORE PRODUCTS
        </button>
      )}
    </div>
  );
}

export default BestSellerProducts;
