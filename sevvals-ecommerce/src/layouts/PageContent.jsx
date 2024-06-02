import { Route, Switch } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ShopPage from "../pages/ShopPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import ContactPage from "../pages/ContactPage";
import TeamPage from "../pages/TeamPage";
import AboutPage from "../pages/AboutPage";
import SignUpPage from "../pages/SignUpPage";

function PageContent() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/shop">
          <ShopPage />
        </Route>
        <Route path="/product-detail">
          <ProductDetailPage />
        </Route>
        <Route path="/contact">
          <ContactPage />
        </Route>

        <Route path="/team">
          <TeamPage />
        </Route>

        <Route path="/about">
          <AboutPage />
        </Route>

        <Route path="/signup">
          <SignUpPage />
        </Route>
      </Switch>
    </>
  );
}

export default PageContent;
