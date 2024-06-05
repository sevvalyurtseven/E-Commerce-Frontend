import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/actions/productActions";
import ProductCard from "../../components/ProductCard";

function BestSellerProducts() {
  const dispatch = useDispatch();
  const { productList, isFetching } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <button className="btn loading">Loading</button>
      </div>
    );
  }

  const displayedProducts = productList.slice(0, 8);

  return (
    <div className="bg-[#FAFAFA] py-10">
      <div className="w-[80%] mx-auto">
        <h1 className="text-slate-800 text-2xl font-bold leading-loose tracking-wider text-center sm:text-start">
          BESTSELLER PRODUCTS
        </h1>
        <hr />
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 py-10">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              image={product.images[0]?.url}
              title={product.name}
              department={product.description}
              originalPrice={product.price}
              discountedPrice={product.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BestSellerProducts;
