import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import Companies from "../layouts/aboutpage/Companies";
import HeaderContent from "../layouts/aboutpage/HeaderContent";
import StatsSection from "../layouts/aboutpage/StatsSection";
import Team from "../layouts/aboutpage/Team";
import Work from "../layouts/aboutpage/Work";

function AboutPage() {
  return (
    <>
      <Header />
      <HeaderContent />
      <StatsSection />
      <Team />
      <Companies />
      <Work />
      <Footer />
    </>
  );
}

export default AboutPage;
