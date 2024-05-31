import Clients from "../layouts/Clients";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import BestSellerProducts from "../layouts/productdetailpage/BestSellerProducts";
import ProductDescription from "../layouts/productdetailpage/ProductDescription";
import ProductDetail from "../layouts/productdetailpage/ProductDetail";

function ProductDetailPage() {
  return (
    <>
      <Header />
      <ProductDetail />
      <ProductDescription />
      <BestSellerProducts />
      <Clients />
      <Footer />
    </>
  );
}

export default ProductDetailPage;
