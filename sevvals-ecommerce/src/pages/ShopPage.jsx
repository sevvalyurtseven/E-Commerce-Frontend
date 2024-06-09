import React from "react";
import { useParams } from "react-router-dom";
import Shop from "../layouts/shoppage/Shop";
import ShopList from "../layouts/shoppage/ShopList";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import Clients from "../layouts/Clients";

function ShopPage() {
  const { gender, categoryName, categoryId } = useParams();

  // Parametrelerin doğru geçtiğini kontrol etmek için
  console.log("ShopPage params:", { gender, categoryName, categoryId });

  return (
    <>
      <Header />
      <Shop
        gender={gender}
        categoryName={categoryName}
        categoryId={categoryId}
      />
      <ShopList
        gender={gender}
        categoryName={categoryName}
        categoryId={categoryId}
      />
      <Clients />
      <Footer />
    </>
  );
}

export default ShopPage;
