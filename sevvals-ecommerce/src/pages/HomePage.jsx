import BestSellerProducts from "../layouts/homepage/BestSellerProducts";
import BestServices from "../layouts/homepage/BestServices";
import Clients from "../layouts/Clients";
import FeaturedProducts from "../layouts/homepage/FeaturedProducts";
import Header from "../layouts/Header";
import MainBanner from "../layouts/homepage/MainBanner";
import TopProductOfTheWeek from "../layouts/homepage/TopProductOfTheWeek";
import FeaturedPosts from "../layouts/homepage/FeaturedPosts";
import Footer from "../layouts/Footer";

function HomePage({ handleProductClick }) {
  return (
    <>
      <Header />
      <MainBanner />
      <Clients />
      <TopProductOfTheWeek />
      <BestSellerProducts handleProductClick={handleProductClick} />
      <FeaturedProducts />
      <BestServices />
      <FeaturedPosts />
      <Footer />
    </>
  );
}

export default HomePage;
