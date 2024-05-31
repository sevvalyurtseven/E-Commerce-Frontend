import Clients from "../layouts/Clients";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import Shop from "../layouts/shoppage/Shop";
import ShopList from "../layouts/shoppage/ShopList";

function ShopPage() {
  return (
    <>
      <Header />
      <Shop />
      <ShopList />
      <Clients />

      <Footer />
    </>
  );
}

export default ShopPage;
