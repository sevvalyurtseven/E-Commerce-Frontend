import React from "react";
import { useParams } from "react-router-dom";
import Shop from "../layouts/shoppage/Shop";
import ShopList from "../layouts/shoppage/ShopList";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import Clients from "../layouts/Clients";

function ShopPage({ handleProductClick }) {
  const { gender, categoryName, categoryId } = useParams();
  console.log("ShopPage params:", { gender, categoryName, categoryId }); // Parametrelerin doğru geçtiğini kontrol edin
  return (
    <>
      <Header />
      <Shop
        gender={gender}
        categoryName={categoryName}
        categoryId={categoryId}
      />
      <ShopList
        categoryId={categoryId}
        handleProductClick={handleProductClick}
      />
      <Clients />
      <Footer />
    </>
  );
}

export default ShopPage;
