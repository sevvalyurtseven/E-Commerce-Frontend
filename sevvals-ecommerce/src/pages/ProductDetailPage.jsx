import { useParams } from "react-router-dom";
import Clients from "../layouts/Clients";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import BestSellerProducts from "../layouts/productdetailpage/BestSellerProducts";
import ProductDescription from "../layouts/productdetailpage/ProductDescription";
import ProductDetail from "../layouts/productdetailpage/ProductDetail";

function ProductDetailPage() {
  const { gender, categoryName, categoryId, productNameSlug, productId } =
    useParams();
  console.log("ProductDetail Page params:", {
    gender,
    categoryName,
    categoryId,
    productNameSlug,
    productId,
  }); // Parametrelerin doğru geçtiğini kontrol edin
  return (
    <>
      <Header />
      <ProductDetail
        gender={gender}
        categoryName={categoryName}
        categoryId={categoryId}
        productNameSlug={productNameSlug}
        productId={productId}
      />
      <ProductDescription />
      <BestSellerProducts />
      <Clients />
      <Footer />
    </>
  );
}

export default ProductDetailPage;
