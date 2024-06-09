import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../store/actions/productActions";
import Clients from "../layouts/Clients";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import BestSellerProducts from "../layouts/productdetailpage/BestSellerProducts";
import ProductDescription from "../layouts/productdetailpage/ProductDescription";
import ProductDetail from "../layouts/productdetailpage/ProductDetail";

function ProductDetailPage({ handleProductClick }) {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { product, isFetchingProduct } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  if (isFetchingProduct) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <button className="btn loading">Loading</button>
      </div>
    );
  }

  return (
    <>
      <Header />
      <ProductDetail product={product} />
      <ProductDescription />
      <BestSellerProducts handleProductClick={handleProductClick} />
      <Clients />
      <Footer />
    </>
  );
}

export default ProductDetailPage;
