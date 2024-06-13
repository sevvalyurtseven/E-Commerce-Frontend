import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ShopPage from "../pages/ShopPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import ContactPage from "../pages/ContactPage";
import TeamPage from "../pages/TeamPage";
import AboutPage from "../pages/AboutPage";
import SignUpPage from "../pages/SignUpPage";
import LoginPage from "../pages/LoginPage";
import ShoppingCartPage from "../pages/ShoppingCartPage";
import OrderPage from "../pages/OrderPage";
import ProtectedRoute from "../components/ProtectedRoute";
import OrderConfirmation from "./confirmpage/OrderConfirmation";

function PageContent() {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.scrollToTop) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [location]);

  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route
        exact
        path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId"
        component={ProductDetailPage}
      />
      <Route
        path="/shop/:gender/:categoryName/:categoryId"
        component={ShopPage}
      />
      <Route exact path="/shop" component={ShopPage} />
      <Route path="/cart" component={ShoppingCartPage} />
      <ProtectedRoute path="/order" component={OrderPage} />{" "}
      {/* ProtectedRoute kullanımı */}
      <Route path="/order-confirmation" component={OrderConfirmation} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/team" component={TeamPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/signup" component={SignUpPage} />
      <Route path="/login" component={LoginPage} />
    </Switch>
  );
}

export default PageContent;
